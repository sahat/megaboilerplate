import { join } from 'path';
import { cpy, replaceCode, templateReplace, addNpmPackage, addNpmScript } from '../utils';

async function genereateWebpackBuildTool(params) {
  const build = join(__base, 'build', params.uuid);
  const webpack = join(__dirname, 'modules', 'webpack', 'webpack.config.js');

  await cpy([webpack], build);

  await addNpmScript('postinstall', 'webpack', params);

  await addNpmPackage('webpack', params, true);

  switch (params.cssPreprocessor) {
    case 'sass':
      break;

    case 'less':
      break;

    default:
      break;
  }

  switch (params.jsFramework) {
    case 'react':
      break;

    case 'angularjs':
      break;

    default:
      break;
  }
}

export default genereateWebpackBuildTool;
