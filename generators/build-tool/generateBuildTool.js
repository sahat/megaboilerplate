import generateGulpBuildTool from './generateGulpBuildTool';
import generateWebpackBuildTool from './generateWebpackBuildTool';
import generateNpmBuildTool from './generateNpmBuildTool';

async function generateBuildTool(params) {
  switch (params.buildTool) {
    case 'gulp':
      await generateGulpBuildTool(params);
      break;

    case 'webpack':
      await generateWebpackBuildTool(params);
      break;

    case 'npm':
      await generateNpmBuildTool(params);
      break;

    default:
  }
}

export default generateBuildTool;
