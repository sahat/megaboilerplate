import { join } from 'path';
import { cpy } from '../utils';

async function generateLessPreprocessor(params) {
  const cssDir = join(__base, 'build', params.uuid, 'public', 'stylesheets');
  const mainLess = join(__base, 'modules', 'css-preprocessor', 'main.less');
  const normalizeCss = join(__base, 'modules', 'css-preprocessor', 'normalize.css');

  switch (params.framework) {
    case 'express':
      if (params.cssFramework === 'none') {
        await cpy([normalizeCss, mainLess], cssDir);
      } else {
        await cpy([mainLess], cssDir);
      }
      break;
    case 'hapi':
      break;
    case 'meteor':
      break;
    default:
  }
}

export default generateLessPreprocessor;
