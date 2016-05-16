import { join } from 'path';
import { copy, move, replaceCode, addNpmPackage } from '../utils';

async function generateNoneBuildTool(params) {
  const build = join(__base, 'build', params.uuid);
  const server = join(build, 'server.js');

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
}

export default generateNoneBuildTool;
