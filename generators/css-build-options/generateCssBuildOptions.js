import generateMiddlewareBuildOptions from './generateMiddlewareBuildOptions';

async function generateCssPreprocessor(params) {
  switch (params.cssBuildOptions) {
    case 'middleware':
      await generateMiddlewareBuildOptions(params);
      break;
    case 'gulp':
      break;
    case 'grunt':
      break;
    case 'webpack':
      break;
    default:
  }
}

export default generateCssPreprocessor;
