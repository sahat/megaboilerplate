import generateGulpBuildTool from './generateGulpBuildTool';
import generateWebpackBuildTool from './generateWebpackBuildTool';
import generateNpmBuildTool from './generateNpmBuildTool';
import generateNoneBuildTool from './generateNoneBuildTool';

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
    case 'none':
      await generateNoneBuildTool(params);
      break;
    default:
  }
}

export default generateBuildTool;
