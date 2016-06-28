import { get, set, template, last, isEmpty, dropRight } from 'lodash';
import { basename, join } from 'path';
const path = require('path');
const archiver = require('archiver');
const shortid = require('shortid');
const fs = require('fs-extra');
const Promise = require('bluebird');
const cpy = require('cpy');
const copy = Promise.promisify(fs.copy);
const move = Promise.promisify(fs.move);
const readFile = Promise.promisify(fs.readFile);
const writeFile = Promise.promisify(fs.writeFile);
const appendFile = Promise.promisify(fs.appendFile);
const remove = Promise.promisify(fs.remove);
const readJson = Promise.promisify(fs.readJson);
const writeJson = Promise.promisify(fs.writeJson);
const stat = Promise.promisify(fs.stat);
const mkdirs = Promise.promisify(fs.mkdirs);
const traverse = require('traverse');
const AWS = require('aws-sdk');
const stream = require('stream');
const schedule = require('node-schedule');
const moment = require('moment');

const npmDependencies = require('./npmDependencies.json');

export { cpy };
export { copy };
export { move };
export { remove };
export { mkdirs };
export { readFile };
export { writeFile };
export { appendFile };
export { readJson };
export { writeJson };

/**
 * @private
 * @param subStr {string} - what to indent
 * @param options {object} - how many levels (2 spaces per level) or how many spaces to indent
 * @returns {string}
 */
function indentCode(subStr, options) {
  const defaultIndentation = 2;
  let indent;

  if (options.indentLevel) {
    indent = ' '.repeat(options.indentLevel * defaultIndentation);
  } else if (options.indentSpaces) {
    indent = ' '.repeat(options.indentSpaces);
  }
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

export function walkAndRemoveCommentsMemory(params) {
  const fileExt = ['eot', 'ttf', 'otf', 'svg', 'woff', 'woff2', 'jpeg', 'jpg', 'gif', 'png',
    'sqlite', 'ico'];

  /**
   * Checks if buffer is a binary file
   * @param path {Array}
   * @return Boolean
   */
  const isBinaryFile = (path) => {
    const filename = path.slice(-1)[0];
    const ext = filename.split('.').pop();
    return fileExt.includes(ext);
  };

  traverse(params.build).forEach(function () {
    if (Buffer.isBuffer(this.node) && !isBinaryFile(this.path)) {
      const buf = removeCodeMemory(this.node, '//=');
      this.update(this.node, true);
      set(params, ['build'].concat(this.path), buf);
    }
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

function uploadAndReturnDownloadLink(archive) {
  const blobName = `megaboilerplate-${shortid.generate()}.zip`;
  return new Promise((resolve, reject) => {
    var s3 = new AWS.S3();
    s3.createBucket({ Bucket: 'myBucket'}, function() {
      var params = {
        Bucket: process.env.S3_BUCKET,
        Key: blobName ,
        Body: archive,
        ContentLength: archive.pointer(),
        ACL: 'public-read'
      };
      s3.putObject(params, function(err, data) {
        if (err) {
          console.log(err);
          return reject(err);
        }
        console.log('Successfully uploaded data to S3');
        resolve(`https://s3.amazonaws.com/${process.env.S3_BUCKET}/${blobName}`);
      });
    });
  })
}

export function createZipArchive(res, params) {
  const archive = archiver('zip');

  let uploadPromise;

  archive.on('error', function (err) {
    res.status(500).send(err.message);
  });

  archive.on('end', function () {
    if (params.generateDownloadLink) {
      uploadPromise.then((link) => {
        res.send({ link: link });
      }).catch((err) => {
        console.info(err.stack);
        console.info(params);
        res.status(500).send(err.message);
      })
    } else {
      res.end();
    }

  });

  traverse(params.build).forEach(function () {
    if (Buffer.isBuffer(this.node)) {
      archive.append(this.node, { name: this.path.join('/') });
      this.update(this.node, true);
    }
  });

  if (params.generateDownloadLink) {
    uploadPromise = uploadAndReturnDownloadLink(archive);
  } else {
    archive.pipe(res);
    res.attachment('megaboilerplate-app.zip');
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
  if (!params) {
    throw new Error(`Did you forget to pass params to addNpmPackage('${pkgName}')?`);
  }

  if (!npmDependencies[pkgName]) {
    throw new Error(`Package "${pkgName}" is missing in the npmDependencies.json`);
  }

  const packageJson = join(__base, 'build', params.uuid, 'package.json');
  const packageObj = await readJson(packageJson);
  const pkgVersion = npmDependencies[pkgName];

  if (isDev) {
    packageObj.devDependencies = packageObj.devDependencies || {};
    packageObj.devDependencies[pkgName] = pkgVersion;
  } else {
    packageObj.dependencies[pkgName] = pkgVersion;
  }

  // Sort dependencies alphabetically in package.json
  packageObj.dependencies = sortJson(packageObj.dependencies);

  if (packageObj.devDependencies) {
    packageObj.devDependencies = sortJson(packageObj.devDependencies);
  }

  await writeJson(packageJson, packageObj, { spaces: 2 });
}

export function addNpmPackageMemory(pkgName, params, isDev) {
  if (!params) {
    throw new Error(`Did you forget to pass params to addNpmPackage('${pkgName}')?`);
  }
  if (!npmDependencies[pkgName]) {
    throw new Error(`Package "${pkgName}" is missing in the npmDependencies.json`);
  }

  const packageJson = params.build['package.json'];
  const packageObj = JSON.parse(packageJson.toString());
  const pkgVersion = npmDependencies[pkgName];

  if (isDev) {
    packageObj.devDependencies = packageObj.devDependencies || {};
    packageObj.devDependencies[pkgName] = pkgVersion;
  } else {
    packageObj.dependencies[pkgName] = pkgVersion;
  }

  // Sort dependencies alphabetically in package.json
  packageObj.dependencies = sortJson(packageObj.dependencies);

  if (packageObj.devDependencies) {
    packageObj.devDependencies = sortJson(packageObj.devDependencies);
  }

  params.build['package.json'] = Buffer.from(JSON.stringify(packageObj, null, 2));
}

function sortJson(obj) {
  return Object.keys(obj).sort().reduce((a, b) => {
    a[b] = obj[b];
    return a;
  }, {});
}

/**
 * Add NPM script to package.json.
 */
export async function addNpmScript(name, value, params) {
  if (!params) {
    throw new Error(`Did you forget to pass params to addNpmScript('${name}')?`);
  }
  const packageJson = path.join(__base, 'build', params.uuid, 'package.json');
  const packageObj = await readJson(packageJson);
  packageObj.scripts[name] = value;

  // Sort scripts alphabetically in package.json
  packageObj.scripts = sortJson(packageObj.scripts);

  await writeJson(packageJson, packageObj, { spaces: 2 });
}

export async function addNpmScriptMemory(name, value, params) {
  if (!params) {
    throw new Error(`Did you forget to pass params to addNpmScript('${name}')?`);
  }

  const packageJson = params.build['package.json'];
  const packageObj = JSON.parse(packageJson.toString());

  packageObj.scripts[name] = value;
  packageObj.scripts = sortJson(packageObj.scripts);

  params.build['package.json'] = Buffer.from(JSON.stringify(packageObj, null, 2));
}

/**
 * Cleanup build files.
 * @param params
 */
export async function cleanup(params) {
  await remove(path.join(__base, 'build', params.uuid));
}

export async function prepare(params) {
  params.uuid = shortid.generate();
  // params.uuid = 'testing';
  // await remove(path.join(__base, 'build', params.uuid));
  // await mkdirs(path.join(__base, 'build', params.uuid));
  // console.info('Created', params.uuid);
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
  const emptyClass = ' class=""';
  const emptyClassName = ' className=""'; // React

  array.forEach((line, index) => {
    // Strip empty classes
    if (line.includes(emptyClass)) {
      array[index] = line.split(emptyClass).join('');
    } else if (line.includes(emptyClassName)) {
      array[index] = line.split(emptyClassName).join('');
    }

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

export function removeCodeMemory(src, templateString) {
  let array = src.toString().split('\n');
  const emptyClass = ' class=""';
  const emptyClassName = ' className=""'; // React

  array.forEach((line, index) => {
    // Strip empty css classes
    if (line.includes(emptyClass)) {
      array[index] = line.split(emptyClass).join('');
    } else if (line.includes(emptyClassName)) {
      array[index] = line.split(emptyClassName).join('');
    }

    if (line.includes(templateString)) {
      array[index] = null;
    }
  });

  array = array.filter((value) => {
    return value !== null;
  });


  return Buffer.from(array.join('\n'));
}

export function appendCodeMemory(src, templateString) {
  let array = src.toString().split('\n');
  const emptyClass = ' class=""';
  const emptyClassName = ' className=""'; // React

  array.forEach((line, index) => {
    // Strip empty css classes
    if (line.includes(emptyClass)) {
      array[index] = line.split(emptyClass).join('');
    } else if (line.includes(emptyClassName)) {
      array[index] = line.split(emptyClassName).join('');
    }

    if (line.includes(templateString)) {
      array[index] = null;
    }
  });

  array = array.filter((value) => {
    return value !== null;
  });


  return Buffer.from(array.join('\n'));
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

  if (opts.debug) {
    console.log(array);
  }

  array.forEach((line, index) => {
    const re = new RegExp(subStr + '(_INDENT[0-9]+)?' + '($|\r\n|\r|\n)');
    const isMatch = re.test(line);

    // Preserve whitespace if it detects //_ token
    if (line.indexOf('//_') > -1) {
      array[index] = '';
    }

    if (opts.debug) {
      console.log(re, isMatch, line);
    }

    if (isMatch) {
      let indentLevel;

      if (line.includes('_INDENT')) {
        indentLevel = line.split('_INDENT').pop();
      }

      if (indentLevel || opts.indentLevel) {
        newSrcData = indentCode(newSrcData, { indentLevel: indentLevel || opts.indentLevel });
      }

      if (opts.indentSpaces) {
        newSrcData = indentCode(newSrcData, { indentSpaces: opts.indentSpaces });
      }

      if (isEmpty(last(newSrcData.toString().split('\n')))) {
        newSrcData = dropRight(newSrcData.toString().split('\n')).join('\n');
      }

      if (opts.leadingBlankLine) {
        newSrcData = ['\n', newSrcData].join('');
      }

      if (opts.trailingBlankLine) {
        newSrcData = [newSrcData, '\n'].join('');
      }

      array[index] = newSrcData;
    }
  });

  srcData = array.join('\n');

  await writeFile(srcFile, srcData);
}

export async function replaceCodeMemory(params, filepath, templateString, module, opts = {}) {
  const src = get(params, ['build'].concat(filepath.split('/')));

  if (!src) {
    throw new Error('replaceCode FAILED: ' + ['build'].concat(filepath.split('/')));
  }

  const array = src.toString().split('\n');

  if (opts.debug) {
    console.log(array);
  }

  array.forEach((line, index) => {
    const re = new RegExp(templateString + '(_INDENT[0-9]+)?' + '($|\r\n|\r|\n)');
    const isMatch = re.test(line);

    // Preserve whitespace on //_ token
    if (line.includes('//_')) {
      array[index] = '';
    }

    if (opts.debug) {
      console.log(re, isMatch, line);
    }

    if (isMatch) {
      let indentLevel;

      if (line.includes('_INDENT')) {
        indentLevel = line.split('_INDENT').pop();
      }

      if (indentLevel || opts.indentLevel) {
        module = indentCode(module, { indentLevel: indentLevel || opts.indentLevel });
      }

      if (opts.indentSpaces) {
        module = indentCode(module, { indentSpaces: opts.indentSpaces });
      }

      if (isEmpty(last(module.toString().split('\n')))) {
        module = dropRight(module.toString().split('\n')).join('\n');
      }

      // add blank line before module
      if (opts.leadingBlankLine) {
        module = ['\n', module].join('');
      }

      // add blank line after module
      if (opts.trailingBlankLine) {
        module = [module, '\n'].join('');
      }

      array[index] = module;
    }
  });

  set(params, ['build', ...filepath.split('/')], Buffer.from(array.join('\n')));
}

/**
 * lodash _.template() function
 * @param srcFile
 * @param data
 */
export async function templateReplace(srcFile, data) {
  const src = await readFile(srcFile);
  const compiled = template(src.toString());
  const newSrc = compiled(data);
  await writeFile(srcFile, newSrc);
}

export function templateReplaceMemory(params, filepath, data) {
  const src = get(params, ['build'].concat(filepath.split('/')));
  const compiled = template(src.toString());
  set(params, ['build', ...filepath.split('/')], Buffer.from(compiled(data)));
}

/**
 * Add env vars to .env
 * @param params
 * @param data
 */
export async function addEnv(params, data) {
  const env = path.join(__base, 'build', params.uuid, '.env');
  const vars = [];
  for (const i in data) {
    if (data.hasOwnProperty(i)) {
      vars.push([i, `'${data[i]}'`].join('='));
    }
  }
  await appendFile(env, '\n' + vars.join('\n') + '\n');
}

export function addEnvMemory(params, data) {
  if (!params.build['.env']) {
    throw new Error('Cannot find .env file');
  }
  const env = params.build['.env'];
  const vars = [];
  for (const i in data) {
    if (data.hasOwnProperty(i)) {
      vars.push([i, `'${data[i]}'`].join('='));
    }
  }
  params.build['.env'] = Buffer.concat([env, Buffer.from('\n' + vars.join('\n') + '\n')])
}


export async function getModule(str) {
  const modulePath = str.split('/');
  if (!get(__modules, modulePath)) {
    const generatorType = modulePath[0];
    const fileBuffer = await readFile(join(__base, 'generators', generatorType, 'modules', ...modulePath.slice(1)));
    set(__modules, modulePath, fileBuffer);
  }
  return get(__modules, modulePath);
}

export function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}
