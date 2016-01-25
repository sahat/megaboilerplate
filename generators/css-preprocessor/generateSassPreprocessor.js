import { join } from 'path';
import { cpy } from '../utils';

async function generateSassPreprocessor(params) {
  const cssDir = join(__base, 'build', params.uuid, 'public', 'stylesheets');
  const mainSass = join(__base, 'modules', 'css-preprocessor', 'main.scss');
  const normalizeCss = join(__base, 'modules', 'css-preprocessor', 'normalize.css');

  switch (params.framework) {
    case 'express':
      if (params.cssFramework === 'none') {
        await cpy([normalizeCss, mainSass], cssDir);
      } else {
        await cpy([mainSass], cssDir);
      }
      break;
    case 'hapi':
      break;
    case 'meteor':
      break;
    default:
  }
}

export default generateSassPreprocessor;
