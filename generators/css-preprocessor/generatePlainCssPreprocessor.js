import { join } from 'path';
import { cpy } from '../utils';

async function generatePlainCssPreprocessor(params) {
  const cssDir = join(__base, 'build', params.uuid, 'public', 'css');
  const mainCss = join(__dirname, 'modules', 'main.css');

  switch (params.framework) {
    case 'express':
      await cpy([mainCss], cssDir);
      break;
    case 'hapi':
      break;
    case 'meteor':
      break;
    default:
  }
}

export default generatePlainCssPreprocessor;
