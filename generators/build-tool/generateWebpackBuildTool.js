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
