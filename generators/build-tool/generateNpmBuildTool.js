import { join } from 'path';
import { replaceCode, addNpmPackage, addNpmScript } from '../utils';

async function generateNpmBuildTool(params) {
  const server = join(__base, 'build', params.uuid, 'server.js');

  await addNpmPackage('npm-run-all', params);
  await addNpmPackage('nodemon', params);

  await addNpmScript('build', 'npm-run-all build:*', params);
  await addNpmScript('watch', 'npm-run-all --parallel watch:*', params);

  switch (params.cssPreprocessor) {
    case 'sass':
      await addNpmPackage('node-sass', params);

      await addNpmScript('build:css', 'node-sass public/css/main.scss > public/css/main.css', params);
      await addNpmScript('watch:css', 'nodemon -e scss -w public/css -x npm run build:css', params);
      break;

    case 'less':
      break;

    default:
      break;
  }

  switch (params.jsFramework) {
    case 'react':
      await addNpmPackage('babelify', params, true);
      await addNpmPackage('browserify', params, true);
      await addNpmPackage('watchify', params, true);
      await addNpmPackage('babel-preset-es2015', params, true);
      await addNpmPackage('babel-preset-react', params, true);

      await addNpmScript('build:js', 'browserify app/main.js -t [ babelify --presets [es2015 react] ] -o public/js/bundle.js', params);
      await addNpmScript('watch:js', 'watchify app/main.js -t [ babelify --presets [es2015 react] ] -v -o public/js/bundle.js', params);

      break;

    case 'angularjs':
      await addNpmPackage('gulp-concat', params, true);
      await addNpmPackage('gulp-ng-annotate', params, true);
      await addNpmPackage('gulp-angular-templatecache', params, true);
      break;

    default:
      break;
  }
}

export default generateNpmBuildTool;
