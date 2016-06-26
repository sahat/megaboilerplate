import { set } from 'lodash';
import { getModule, addNpmScriptMemory, replaceCodeMemory } from '../utils';

export default async function generateDeployment(params) {
  switch (params.deployment) {
    case 'heroku':
      if (params.testing) {
        addNpmScriptMemory('deploy', 'npm test && git push heroku master', params);
      } else {
        addNpmScriptMemory('deploy', 'git push heroku master', params);
      }
      break;
    case 'azure':
      set(params.build, ['.deployment'], await getModule('deployment/azure-dot-deployment'));
      set(params.build, ['deploy.cmd'], await getModule('deployment/azure-deploy.cmd'));

      // Add additional deployment task which globally installs webpack and compiles
      // bundle.js after NPM dependencies have been installed.
      if (params.buildTool === 'webpack') {
        await replaceCodeMemory(params, 'deploy.cmd', 'WEBPACK_BUILD', await getModule('deployment/webpack-build.cmd'));
      }
      break;
    case 'digitalOcean':
      break;
    default:
  }
}
