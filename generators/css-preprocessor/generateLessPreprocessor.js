import { join } from 'path';
import { copy } from '../utils';

async function generateLessPreprocessor(params) {
  let build = join(__base, 'build', params.uuid);
  let mainLess = join(__base, 'modules', 'css-preprocessor', 'main.less');

  switch (params.framework) {
    case 'express':
      if (params.cssFramework === 'none') {
        await copy(mainLess, join(build, 'public', 'stylesheets', 'main.less'));
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
