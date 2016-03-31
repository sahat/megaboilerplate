import { join } from 'path';
import { cpy, copy, mkdirs, replaceCode, templateReplace, addNpmScript, addNpmPackage } from '../utils';

async function generateJsLibrary(params) {
  const build = join(__base, 'build', params.uuid);
  const author = params.jsLibraryAuthor;
  const libraryName = slugify(params.jsLibraryName || params.appName);
  const description = 'Library Description';
  const username = params.jsLibraryGithubUsername;
  const options = params.jsLibraryOptions;
  const licenseMap = {
    mit: 'MIT',
    apache: 'Apache 2.0',
    gplv3: 'GPLv3'
  };

  await mkdirs(join(build, 'examples'));
  await mkdirs(join(build, 'src'));
  await mkdirs(join(build, 'test'));

  await cpy([
    join(__dirname, 'modules', 'examples', 'browser.html'),
    join(__dirname, 'modules', 'examples', 'node.js')
  ], join(build, 'examples'));

  await templateReplace(join(build, 'examples', 'browser.html'), { name: libraryName });

  await cpy([
    join(__dirname, 'modules', 'src', 'index.js'),
    join(__dirname, 'modules', 'src', 'another.js')
  ], join(build, 'src'));

  await cpy([join(__dirname, 'modules', 'test', 'index.test.js')], join(build, 'test'));

  await cpy([
    join(__dirname, 'modules', '.babelrc'),
    join(__dirname, 'modules', '.gitignore'),
    join(__dirname, 'modules', '.npmignore'),
    join(__dirname, 'modules', 'CHANGELOG.md'),
    join(__dirname, 'modules', 'package.json'),
    join(__dirname, 'modules', 'README.md'),
    join(__dirname, 'modules', 'webpack.config.js')
  ], build);

  await templateReplace(join(build, 'CHANGELOG.md'), {
    user: username,
    repo: libraryName
  });

  await templateReplace(join(build, 'README.md'), {
    name: libraryName,
    user: username,
    repo: libraryName
  });

  await templateReplace(join(build, 'package.json'), {
    author: author,
    name: libraryName,
    description: description,
    username: username,
    repo: libraryName,
    license: licenseMap[params.jsLibraryLicense]
  });

  if (options.includes('eslint')) {
    await cpy([
      join(__dirname, 'modules', '.eslintrc'),
      join(__dirname, 'modules', '.eslintignore')
    ], build);
    await addNpmPackage('babel-eslint', params, true);
    await addNpmPackage('eslint', params, true);
    await addNpmScript('lint', 'eslint src test examples', params);
  }

  if (options.includes('travis')) {
    await cpy([join(__dirname, 'modules', '.travis.yml')], build);
  }

  if (options.includes('coverage')) {
    await cpy([join(__dirname, 'modules', '.istanbul.yml')], build);
    await addNpmPackage('isparta', params, true);
    await addNpmScript('test:cov', 'babel-node ./node_modules/isparta/bin/isparta cover ./node_modules/mocha/bin/_mocha -- --recursive', params);
  }


  if (options.includes('badges')) {
    await replaceCode(join(build, 'README.md'), 'BADGES', join(__dirname, 'modules', 'badges.md'));
  }

  switch (params.jsLibraryLicense) {
    case 'mit':
      await copy(join(__dirname, 'modules', 'license', 'mit'), join(build, 'LICENSE'));
      await templateReplace(join(build, 'LICENSE'), { author: author });
      break;
    case 'apache':
      await copy(join(__dirname, 'modules', 'license', 'apache'), join(build, 'LICENSE'));
      await templateReplace(join(build, 'LICENSE'), { author: author });
      break;
    case 'gplv3':
      await copy(join(__dirname, 'modules', 'license', 'gplv3'), join(build, 'LICENSE'));
      await templateReplace(join(build, 'LICENSE'), {
        author: author,
        description: description,
        name: libraryName
      });
      break;
    default:
  }

  function slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }
}

export default generateJsLibrary;
