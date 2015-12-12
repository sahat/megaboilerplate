let generateMiddlewareBuildOptions = require('./generateMiddlewareBuildOptions');

async function generateCssPreprocessor(params) {
  switch (params.cssBuildOptions) {
    case 'middleware':
      await generateMiddlewareBuildOptions(params);
      break;
    case 'gulp':
      // TODO
      break;
    case 'grunt':
      // TODO
      break;
    case 'webpack':
      // TODO
      break;
    default:
      // TODO
  }
}

module.exports = generateCssPreprocessor;
