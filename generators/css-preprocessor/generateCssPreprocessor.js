import generatePlainCssPreprocessor from './generatePlainCssPreprocessor';
import generateSassPreprocessor from './generateSassPreprocessor';
import generateLessPreprocessor from './generateLessPreprocessor';

async function generateCssPreprocessor(params) {
  switch (params.cssPreprocessor) {
    case 'css':
      await generatePlainCssPreprocessor(params);
      break;
    case 'sass':
      await generateSassPreprocessor(params);
      break;
    case 'less':
      await generateLessPreprocessor(params);
      break;
    case 'stylus':
      break;
    default:
  }
}

export default generateCssPreprocessor;
