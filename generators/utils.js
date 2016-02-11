import { last, isEmpty, dropRight } from 'lodash';

let path = require('path');
let archiver = require('archiver');
let shortid = require('shortid');
let fs = require('fs-extra');
let Promise = require('bluebird');
let cpy = require('cpy');
let copy = Promise.promisify(fs.copy);
let readFile = Promise.promisify(fs.readFile);
let writeFile = Promise.promisify(fs.writeFile);
let remove = Promise.promisify(fs.remove);
let readJson = Promise.promisify(fs.readJson);
let writeJson = Promise.promisify(fs.writeJson);
let stat = Promise.promisify(fs.stat);
let mkdirs = Promise.promisify(fs.mkdirs);

let npmDependencies = require('./npmDependencies.json');

export { cpy };
export { copy };
export { remove };
export { mkdirs };
export { readFile };
export { writeFile };
export { readJson };
export { writeJson };

/**
 * @private
 * @param subStr {string} - what to indent
 * @param indentLevel {number} - how many levels to indent
 * @returns {string}
 */
function indentCode(subStr, indentLevel) {
  let defaultIndentation = 2;
  let indent = ' '.repeat(indentLevel * defaultIndentation);
  let array = subStr.toString().split('\n').filter(Boolean);
  array.forEach((line, index) => {
    array[index] = indent + line;
  });
  return array.join('\n');
}

/**
 * Traverse files and remove placeholder comments
 * @param params
 */
export function walkAndRemoveComments(params) {
  const build = path.join(__base, 'build', params.uuid);

  return new Promise((resolve, reject) => {
    fs.walk(build)
      .on('data', (item) => {
        return stat(item.path).then((stats) => {
          if (stats.isFile()) {
            return removeCode(item.path, '//=');
          }
        });
      })
      .on('error', (err) => {
        reject(err);
      })
      .on('end', () => {
        resolve();
      });
  });
}

export async function exists(filepath) {
  try {
    await stat(filepath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    }
  }
  return true;
}

export function generateZip(req, res) {
  let archive = archiver('zip');

  archive.on('error', function(err) {
    res.status(500).send(err.message);
  });

  res.on('close', function() {
    console.log('closing...');
    console.log('Archive wrote %d bytes', archive.pointer());
    return res.status(200).send('OK').end();
  });

  res.attachment('megaboilerplate-express.zip');

  archive.pipe(res);

  let files = [
    __base + '/modules/express/app.js',
    __base + '/modules/express/package.json'
  ];

  for (let i in files) {
    archive.append(fs.createReadStream(files[i]), { name: path.basename(files[i]) });
  }

  archive.finalize();
}

/**
 * Add NPM package to package.json.
 * @param pkgName
 * @param params
 * @param isDev
 */
export async function addNpmPackage(pkgName, params, isDev) {
  const packageJson = path.join(__base, 'build', params.uuid, 'package.json');
  const packageObj = await readJson(packageJson);
  const pkgVersion = npmDependencies[pkgName];

  if (isDev) {
    packageObj.devDependencies = packageObj.devDependencies || {};
    packageObj.devDependencies[pkgName] = pkgVersion;
  } else {
    packageObj.dependencies[pkgName] = pkgVersion;
  }

  await writeJson(packageJson, packageObj, { spaces: 2 });
}

/**
 * Add NPM script to package.json.
 */
export async function addNpmScript(name, value, params) {
  const packageJson = path.join(__base, 'build', params.uuid, 'package.json');
  const packageObj = await readJson(packageJson);
  packageObj.scripts[name] = value;
  await writeJson(packageJson, packageObj, { spaces: 2 });
}

/**
 * Cleanup build files.
 * @param params
 */
export async function cleanup(params) {
  await remove(path.join(__base, 'build', params.uuid));
}

export async function prepare(params) {
  let gitignore = path.join(__base, 'modules', 'prepare', '.gitignore');
  params.uuid = shortid.generate();
  await mkdirs(path.join(__base, 'build', params.uuid));
  await copy(gitignore, path.join(__base, 'build', params.uuid, '.gitignore'));
  console.info('Created', params.uuid);
  return params;
}

/**
 * @param srcFile {buffer} - where to remove
 * @param subStr {string} - what to remove
 * @returns {string}
 */
export async function removeCode(srcFile, subStr) {
  let srcData = await readFile(srcFile);
  let array = srcData.toString().split('\n');
  array.forEach((line, index) => {
    if (line.includes(subStr)) {
      array[index] = null;
    }
  });
  array = array.filter((value) => {
    return value !== null;
  });
  srcData = array.join('\n');
  await writeFile(srcFile, srcData);
}

/**
 *
 * @param srcFile {buffer} - where to replace
 * @param subStr {string} - what to replace
 * @param newSrcFile {string} - replace it with this
 * @param [opts] {object} - options
 * @returns {string}
 */
export async function replaceCode(srcFile, subStr, newSrcFile, opts) {
  opts = opts || {};

  let srcData = await readFile(srcFile);
  let newSrcData = await readFile(newSrcFile);

  const array = srcData.toString().split('\n');

  array.forEach((line, index) => {
    const re = new RegExp(subStr + '$|(\r\n|\r|\n)');
    const isMatch = re.test(line);

    if (isMatch) {
      if (opts.indentLevel) {
        newSrcData = indentCode(newSrcData, opts.indentLevel);
      }

      if (isEmpty(last(newSrcData.toString().split('\n')))) {
        newSrcData = dropRight(newSrcData.toString().split('\n')).join('\n');
      }

      if (opts.leadingBlankLine) {
        newSrcData = ['\n', newSrcData].join('');
      }

      array[index] = newSrcData;
    }
  });

  srcData = array.join('\n');

  await writeFile(srcFile, srcData);
}
