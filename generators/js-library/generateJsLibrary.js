import { join } from 'path';
import { slugify, getModule, replaceCodeMemory, templateReplaceMemory, addNpmScriptMemory, addNpmPackageMemory } from '../utils';

async function generateJsLibrary(params) {
  const author = params.jsLibraryAuthor || 'Author name';
  const libraryName = slugify(params.jsLibraryName || params.appName);
  const description = 'Library Description';
  const username = params.jsLibraryGithubUsername || 'username';
  const options = params.jsLibraryOptions;
  const licenseMap = {
    mit: 'MIT',
    apache: 'Apache 2.0',
    gplv3: 'GPLv3'
  };

  params.build = {
    examples: {
      'browser.html': await getModule('js-library/examples/browser.html'),
      'node.js': await getModule('js-library/examples/node.js')
    },
    src: {
      'index.js': await getModule('js-library/src/index.js')
    },
    test: {
      'index.test.js': await getModule('js-library/test/index.test.js')
    },
    '.babelrc': await getModule('js-library/.babelrc'),
    '.gitignore': await getModule('js-library/.gitignore'),
    '.npmignore': await getModule('js-library/.npmignore'),
    'CHANGELOG.md': await getModule('js-library/CHANGELOG.md'),
    'package.json': await getModule('js-library/package.json'),
    'README.md': await getModule('js-library/README.md'),
    'webpack.config.js': await getModule('js-library/webpack.config.js')
  };

  params.build.examples['browser.html'] = templateReplaceMemory(params.build.examples['browser.html'], {
    name: libraryName
  });

  params.build['CHANGELOG.md'] = templateReplaceMemory(params.build['CHANGELOG.md'], {
    user: username,
    repo: libraryName
  });

  params.build['README.md'] = templateReplaceMemory(params.build['README.md'], {
    name: libraryName,
    user: username,
    repo: libraryName
  });

  params.build['package.json'] = templateReplaceMemory(params.build['package.json'], {
    author: author,
    name: libraryName,
    description: description,
    username: username,
    repo: libraryName,
    license: licenseMap[params.jsLibraryLicense]
  });

  if (options.includes('eslint')) {
    params.build['.eslintrc'] = await getModule('js-library/.eslintrc');
    params.build['.eslintignore'] = await getModule('js-library/.eslintignore');
    
    await addNpmPackageMemory('babel-eslint', params, true);
    await addNpmPackageMemory('eslint', params, true);
    await addNpmScriptMemory('lint', 'eslint src test examples', params);
  }

  if (options.includes('travis')) {
    params.build['.travis.yml'] = await getModule('js-library/.travis.yml');
  }

  if (options.includes('coverage')) {
    params.build['.istanbul.yml'] = await getModule('js-library/.istanbul.yml');
    await addNpmPackageMemory('isparta', params, true);
    await addNpmScriptMemory('test:cov', 'babel-node ./node_modules/isparta/bin/isparta cover ./node_modules/mocha/bin/_mocha -- --recursive', params);
  }

  if (options.includes('badges')) {
    params.build['README.md'] = await replaceCodeMemory(params.build['README.md'], 'BADGES', await getModule('js-library/badges.md'));
  }

  switch (params.jsLibraryLicense) {
    case 'mit':
      params.build['LICENSE'] = await getModule('js-library/license/mit');
      params.build['LICENSE'] = templateReplaceMemory(params.build['LICENSE'], { author: author });
      break;
    case 'apache':
      params.build['LICENSE'] = await getModule('js-library/license/apache');
      params.build['LICENSE'] = templateReplaceMemory(params.build['LICENSE'], { author: author });
      break;
    case 'gplv3':
      params.build['LICENSE'] = await getModule('js-library/license/gplv3');
      params.build['LICENSE'] = templateReplaceMemory(params.build['LICENSE'], {
        author: author,
        description: description,
        name: libraryName
      });
      break;
    default:
  }
}

export default generateJsLibrary;
