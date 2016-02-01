import { join } from 'path';
import { cpy } from '../utils';

async function generateLessPreprocessor(params) {
  const cssDir = join(__base, 'build', params.uuid, 'public', 'css');
  const mainLess = join(__base, 'modules', 'css-preprocessor', 'main.less');

  switch (params.framework) {
    case 'express':
      await cpy([mainLess], cssDir);
      break;
    case 'hapi':
      break;
    case 'meteor':
      break;
    default:
  }
}

export default generateLessPreprocessor;
