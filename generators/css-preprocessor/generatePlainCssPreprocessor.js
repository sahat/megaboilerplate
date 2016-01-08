import { join } from 'path';
import { copy } from '../utils';

async function generatePlainCssPreprocessor(params) {
  let build = join(__base, 'build', params.uuid);
  let mainCss = join(__base, 'modules', 'css-preprocessor', 'main.css');

  switch (params.framework) {
    case 'express':
      await copy(mainCss, path.join(build, 'public', 'stylesheets', 'main.css'));
      break;
    case 'hapi':
      break;
    case 'meteor':
      break;
    default:
  }
}

export default generatePlainCssPreprocessor;
