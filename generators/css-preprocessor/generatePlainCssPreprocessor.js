import { join } from 'path';
import { copy } from '../utils';

async function generatePlainCssPreprocessor(params) {
  const build = join(__base, 'build', params.uuid);
  const mainCss = join(__base, 'modules', 'css-preprocessor', 'main.css');

  switch (params.framework) {
    case 'express':
      if (params.cssFramework === 'none') {
        await copy(mainCss, join(build, 'public', 'stylesheets', 'main.css'));
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
