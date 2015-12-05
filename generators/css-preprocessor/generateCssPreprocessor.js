let generatePlainCssPreprocessor = require('./generatePlainCssPreprocessor');

async function generateCssPreprocessor(params) {
  switch (params.cssPreprocessor) {
    case 'css':
      await generatePlainCssPreprocessor(params);
      break;
    case 'sass':
      // TODO
      break;
    case 'less':
      // TODO
      break;
    case 'postcss':
      // TODO
      break;
    default:
      // TODO
  }
}

module.exports = generateCssPreprocessor;
