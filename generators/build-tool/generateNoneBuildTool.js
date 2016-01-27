import { join } from 'path';
import { cpy, replaceCode, addNpmPackage } from '../utils';

async function generateNoneBuildTool(params) {
  const app = join(__base, 'build', params.uuid, 'app.js');

  await addNpmPackage('gulp', params);
  await addNpmPackage('gulp-sourcemaps', params);
  await addNpmPackage('gulp-plumber', params);

  switch (params.cssPreprocessor) {
    case 'sass':
      const sassMiddlewareRequire = join(__base, 'modules', 'build-tool', 'none', 'sass-middleware-require.js');
      const sassMiddleware = join(__base, 'modules', 'build-tool', 'none', 'sass-middleware.js');

      await addNpmPackage('node-sass-middleware', params);

      await replaceCode(app, 'CSS_PREPROCESSOR_MIDDLEWARE_REQUIRE', sassMiddlewareRequire);
      await replaceCode(app, 'CSS_PREPROCESSOR_MIDDLEWARE', sassMiddleware, { leadingBlankLine: true });
      break;

    case 'less':
      const lessMiddlewareRequire = join(__base, 'modules', 'build-tool', 'none', 'less-middleware-require.js');
      const lessMiddleware = join(__base, 'modules', 'build-tool', 'none', 'less-middleware.js');

      await addNpmPackage('node-sass-middleware', params);

      await replaceCode(app, 'CSS_PREPROCESSOR_MIDDLEWARE_REQUIRE', lessMiddlewareRequire);
      await replaceCode(app, 'CSS_PREPROCESSOR_MIDDLEWARE', lessMiddleware, { leadingBlankLine: true });
      break;

    case 'postcss':
      const postcssMiddlewareRequire = join(__base, 'modules', 'build-tool', 'none', 'postcss-middleware-require.js');
      const postcssMiddleware = join(__base, 'modules', 'build-tool', 'none', 'postcss-middleware.js');

      await addNpmPackage('postcss-middleware', params);

      await replaceCode(app, 'CSS_PREPROCESSOR_MIDDLEWARE_REQUIRE', postcssMiddlewareRequire);
      await replaceCode(app, 'CSS_PREPROCESSOR_MIDDLEWARE', postcssMiddleware, { leadingBlankLine: true });
      break;

    default:
      break;
  }
}

export default generateNoneBuildTool;
