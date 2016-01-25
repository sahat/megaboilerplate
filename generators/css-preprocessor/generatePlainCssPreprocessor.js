import { join } from 'path';
import { cpy } from '../utils';

async function generatePlainCssPreprocessor(params) {
  const cssDir = join(__base, 'build', params.uuid, 'public', 'stylesheets');
  const mainCss = join(__base, 'modules', 'css-preprocessor', 'main.css');
  const normalizeCss = join(__base, 'modules', 'css-preprocessor', 'normalize.css');

  switch (params.framework) {
    case 'express':
      if (params.cssFramework === 'none') {
        await cpy([normalizeCss, mainCss], cssDir);
      }
      break;
    case 'hapi':
      break;
    case 'meteor':
      break;
    default:
  }
}

export default generatePlainCssPreprocessor;
