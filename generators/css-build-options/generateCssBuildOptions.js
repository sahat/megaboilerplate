import generateMiddlewareBuildOptions from './generateMiddlewareBuildOptions';
import generateGulpBuildOptions from "./generateGulpBuildOptions";

async function generateCssPreprocessor(params) {
  switch (params.cssBuildOptions) {
    case 'middleware':
      await generateMiddlewareBuildOptions(params);
      break;
    case 'gulp':
      await generateGulpBuildOptions(params);
      break;
    case 'grunt':
      break;
    case 'webpack':
      break;
    default:
  }
}

export default generateCssPreprocessor;
