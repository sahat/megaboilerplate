import { set } from 'lodash';
import { getModule, addNpmScriptMemory } from '../utils';

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
      break;
    case 'digitalOcean':
      break;
    default:
  }
}
