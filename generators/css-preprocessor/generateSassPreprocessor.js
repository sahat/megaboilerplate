import { join } from 'path';
import { cpy } from '../utils';

async function generateSassPreprocessor(params) {
  const cssDir = join(__base, 'build', params.uuid, 'public', 'css');
  const mainSass = join(__dirname, 'modules', 'main.scss');

  switch (params.framework) {
    case 'express':
      await cpy([mainSass], cssDir);
      break;
    case 'hapi':
      break;
    case 'meteor':
      break;
    default:
  }
}

export default generateSassPreprocessor;
