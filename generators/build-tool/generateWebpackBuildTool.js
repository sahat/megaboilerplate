import { set } from 'lodash';
import { getModule, replaceCodeMemory, addNpmScriptMemory, addNpmPackageMemory } from '../utils';

export default async function genereateWebpackBuildTool(params) {
  set(params, ['build', 'webpack.config.js'], await getModule('build-tool/webpack/webpack.config.js'));

  await addNpmScriptMemory('build', 'webpack --display-error-details', params);
  await addNpmScriptMemory('postinstall', 'npm run build', params);
  await addNpmPackageMemory('webpack', params);
  await addNpmPackageMemory('webpack-dev-middleware', params);
  await addNpmPackageMemory('webpack-hot-middleware', params);
  await addNpmPackageMemory('babel-core', params);
  await addNpmPackageMemory('babel-loader', params);
  await addNpmPackageMemory('babel-preset-es2015', params);

  switch (params.framework) {
    case 'express':
      await replaceCodeMemory(params, 'server.js', 'WEBPACK_REQUIRE', await getModule('build-tool/webpack/webpack-require.js'));
      await replaceCodeMemory(params, 'server.js', 'WEBPACK_COMPILER', await getModule('build-tool/webpack/webpack-compiler.js'));
      await replaceCodeMemory(params, 'server.js', 'WEBPACK_MIDDLEWARE', await getModule('build-tool/webpack/webpack-middleware.js'));
      break;
    case 'meteor':
      break;
    default:
      break;
  }

  switch (params.cssPreprocessor) {
    case 'sass':
      await replaceCodeMemory(params, 'server.js', 'CSS_PREPROCESSOR_MIDDLEWARE_REQUIRE', await getModule('build-tool/none/sass-middleware-require.js'));
      await replaceCodeMemory(params, 'server.js', 'CSS_PREPROCESSOR_MIDDLEWARE', await getModule('build-tool/none/sass-middleware.js'));
      await addNpmPackageMemory('node-sass-middleware', params);
      break;
    case 'less':
      await replaceCodeMemory(params, 'server.js', 'CSS_PREPROCESSOR_MIDDLEWARE_REQUIRE', await getModule('build-tool/none/less-middleware-require.js'));
      await replaceCodeMemory(params, 'server.js', 'CSS_PREPROCESSOR_MIDDLEWARE', await getModule('build-tool/none/less-middleware.js'));
      await addNpmPackageMemory('less-middleware', params);
      break;
    case 'postcss':
      await replaceCodeMemory(params, 'server.js', 'CSS_PREPROCESSOR_MIDDLEWARE_REQUIRE', await getModule('build-tool/none/postcss-middleware-require.js'));
      await replaceCodeMemory(params, 'server.js', 'CSS_PREPROCESSOR_MIDDLEWARE', await getModule('build-tool/none/postcss-middleware.js'));
      await addNpmPackageMemory('postcss-middleware', params);
      await addNpmPackageMemory('postcss-cssnext', params);
      await addNpmPackageMemory('postcss-import', params);
      break;
    case 'stylus':
      await replaceCodeMemory(params, 'server.js', 'CSS_PREPROCESSOR_MIDDLEWARE_REQUIRE', await getModule('build-tool/none/stylus-middleware-require.js'));
      await replaceCodeMemory(params, 'server.js', 'CSS_PREPROCESSOR_MIDDLEWARE', await getModule('build-tool/none/stylus-middleware.js'));
      await addNpmPackageMemory('express-stylus', params);
      await addNpmPackageMemory('nib', params);
      break;
    default:
      break;
  }

  switch (params.jsFramework) {
    case 'react':
      await replaceCodeMemory(params, 'webpack.config.js', 'WEBPACK_JAVASCRIPT_LOADER', await getModule('build-tool/webpack/webpack-react-loader.js'));
      await replaceCodeMemory(params, 'app/store/configureStore.js', 'WEBPACK_HOT_REDUCER', await getModule('build-tool/webpack/webpack-hot-reducer.js'));
      await addNpmPackageMemory('babel-plugin-react-transform', params);
      await addNpmPackageMemory('react-transform-hmr', params);
      await addNpmPackageMemory('react-transform-catch-errors', params);
      await addNpmPackageMemory('babel-preset-react', params);
      await addNpmPackageMemory('redbox-react', params);
      break;
    case 'angularjs':
      break;
    default:
      await replaceCodeMemory(params, 'webpack.config.js', 'WEBPACK_JAVASCRIPT_LOADER', await getModule('build-tool/webpack/webpack-vanillajs-loader.js'));
      break;
  }
}
