import { set } from 'lodash';
import { addNpmScriptMemory, addNpmPackageMemory } from '../utils';

export default async function generateNpmBuildTool(params) {
  await addNpmPackageMemory('npm-run-all', params);
  await addNpmPackageMemory('nodemon', params);
  await addNpmScript('build', 'npm-run-all build:*', params);
  await addNpmScript('watch', 'npm-run-all --parallel watch:*', params);

  switch (params.cssPreprocessor) {
    case 'sass':
      await addNpmPackageMemory('node-sass', params);
      await addNpmScriptMemory('build:css', 'node-sass public/css/main.scss > public/css/main.css', params);
      await addNpmScriptMemory('watch:css', 'nodemon -e scss -w public/css -x npm run build:css', params);
      break;
    case 'less':
      await addNpmPackageMemory('less', params);
      await addNpmScriptMemory('build:css', 'lessc public/css/main.less > public/css/main.css', params);
      await addNpmScriptMemory('watch:css', 'nodemon -e less -w public/css -x npm run build:css', params);
      break;
    // case 'postcss':
    //   await addNpmPackageMemory('postcss-cli', params);
    //   await addNpmScript('build:css', 'postcss --use postcss-import --use cssnext public/css/main.css > public/css/main.css', params);
    //   await addNpmScript('watch:css', 'nodemon -e css -w public/css -x npm run build:css', params);
    //   break;
    default:
      break;
  }

  switch (params.jsFramework) {
    case 'react':
      await addNpmPackageMemory('babelify', params, true);
      await addNpmPackageMemory('browserify', params, true);
      await addNpmPackageMemory('watchify', params, true);
      await addNpmPackageMemory('babel-preset-es2015', params, true);
      await addNpmPackageMemory('babel-preset-react', params, true);
      await addNpmScriptMemory('build:js', 'browserify app/main.js -t [ babelify --presets [es2015 react] ] -o public/js/bundle.js', params);
      await addNpmScriptMemory('watch:js', 'watchify app/main.js -t [ babelify --presets [es2015 react] ] -v -o public/js/bundle.js', params);
      break;
    default:
      break;
  }
}
