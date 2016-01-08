import { join } from 'path';
import { copy } from '../utils';

async function generateSassPreprocessor(params) {
  let build = join(__base, 'build', params.uuid);
  let mainSass = join(__base, 'modules', 'css-preprocessor', 'main.scss');

  switch (params.framework) {
    case 'express':
      await copy(mainSass, path.join(build, 'public', 'stylesheets', 'main.scss'));
      break;
    case 'hapi':
      break;
    case 'meteor':
      break;
    default:
  }
}

export default generateSassPreprocessor;
