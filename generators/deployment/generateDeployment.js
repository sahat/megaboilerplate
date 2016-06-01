import { addNpmScriptMemory } from '../utils';

export default async function generateDeployment(params) {
  switch (params.deployment) {
    case 'heroku':
      if (params.testing) {
        addNpmScriptMemory('deploy', 'npm test && git push heroku master', params);
      } else {
        addNpmScriptMemory('deploy', 'git push heroku master', params);
      }
      addNpmScriptMemory('postdeploy', 'echo Succesfully deployed to Heroku!', params);
      break;
    case 'azure':
      break;
    case 'bluemix':
      break;
    case 'digitalOcean':
      break;
    default:
  }
}
