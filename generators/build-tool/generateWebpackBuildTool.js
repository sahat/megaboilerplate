import { join } from 'path';
import { cpy, replaceCode, addNpmPackage, addNpmScript } from '../utils';

async function genereateWebpackBuildTool(params) {
  const build = join(__base, 'build', params.uuid);
  const webpackConfig = join(__dirname, 'modules', 'webpack', 'webpack.config.js');

  await cpy([webpackConfig], build);

  await addNpmScript('build', 'webpack', params);
  await addNpmScript('postinstall', 'build', params);

  await addNpmPackage('webpack', params, true);
  await addNpmPackage('webpack-hot-middleware', params, true);
  await addNpmPackage('babel-core', params, true);
  await addNpmPackage('babel-loader', params, true);
  await addNpmPackage('babel-preset-es2015', params, true);

  switch (params.framework) {
    case 'express':
      const server = join(build, 'server.js');
      const webpackRequire = join(__dirname, 'modules', 'webpack', 'webpack-require.js');
      const webpackCompiler = join(__dirname, 'modules', 'webpack', 'webpack-compiler.js');
      const webpackMiddleware = join(__dirname, 'modules', 'webpack', 'webpack-middleware.js');

      await replaceCode(server, 'WEBPACK_REQUIRE', webpackRequire);
      await replaceCode(server, 'WEBPACK_COMPILER', webpackCompiler);
      await replaceCode(server, 'WEBPACK_MIDDLEWARE', webpackMiddleware);

      break;
    case 'meteor':
      break;

    default:
      break;
  }

  switch (params.cssPreprocessor) {
    case 'sass':
      const sassMiddlewareRequire = join(__dirname, 'modules', 'none', 'sass-middleware-require.js');
      const sassMiddleware = join(__dirname, 'modules', 'none', 'sass-middleware.js');

      await addNpmPackage('node-sass-middleware', params);

      await replaceCode(server, 'CSS_PREPROCESSOR_MIDDLEWARE_REQUIRE', sassMiddlewareRequire);
      await replaceCode(server, 'CSS_PREPROCESSOR_MIDDLEWARE', sassMiddleware);
      break;

    case 'less':
      const lessMiddlewareRequire = join(__dirname, 'modules', 'none', 'less-middleware-require.js');
      const lessMiddleware = join(__dirname, 'modules', 'none', 'less-middleware.js');

      await addNpmPackage('node-sass-middleware', params);

      await replaceCode(server, 'CSS_PREPROCESSOR_MIDDLEWARE_REQUIRE', lessMiddlewareRequire);
      await replaceCode(server, 'CSS_PREPROCESSOR_MIDDLEWARE', lessMiddleware);
      break;

    case 'postcss':
      const postcssMiddlewareRequire = join(__dirname, 'modules', 'none', 'postcss-middleware-require.js');
      const postcssMiddleware = join(__dirname, 'modules', 'none', 'postcss-middleware.js');

      await addNpmPackage('postcss-middleware', params);

      await replaceCode(server, 'CSS_PREPROCESSOR_MIDDLEWARE_REQUIRE', postcssMiddlewareRequire);
      await replaceCode(server, 'CSS_PREPROCESSOR_MIDDLEWARE', postcssMiddleware);
      break;

    default:
      break;
  }

  const webpackConfigJs = join(build, 'webpack.config.js');

  switch (params.jsFramework) {
    case 'react':
      const reactLoader = join(__dirname, 'modules', 'webpack', 'webpack-react-loader.js');
      await replaceCode(webpackConfigJs, 'WEBPACK_JAVASCRIPT_LOADER', reactLoader);

      await addNpmPackage('babel-plugin-react-transform', params, true);
      await addNpmPackage('react-transform-hmr', params, true);
      await addNpmPackage('babel-preset-react', params, true);
      break;

    case 'angularjs':
      break;

    default:
      const jsLoader = join(__dirname, 'modules', 'webpack', 'webpack-vanillajs-loader.js');
      await replaceCode(webpackConfigJs, 'WEBPACK_JAVASCRIPT_LOADER', jsLoader);
      break;
  }
}

export default genereateWebpackBuildTool;
