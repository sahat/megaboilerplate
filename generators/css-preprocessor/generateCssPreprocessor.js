let generatePlainCssPreprocessor = require('./generatePlainCssPreprocessor');
let generateSassPreprocessor = require('./generateSassPreprocessor');
let generateLessPreprocessor = require('./generateLessPreprocessor');

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
    case 'postcss':
      // TODO
      break;
    default:
      // TODO
  }
}

module.exports = generateCssPreprocessor;
