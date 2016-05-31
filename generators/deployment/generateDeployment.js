import { addNpmScriptMemory } from '../utils';

export default async function generateDeployment(params) {
  switch (params.deployment) {
    case 'heroku':
      if (params.testing) {
        addNpmScriptMemory('deploy', 'npm test && git push heroku master');
      } else {
        addNpmScriptMemory('deploy', 'git push heroku master');
      }
      addNpmScriptMemory('postdeploy', 'echo Succesfully deployed to Heroku!');
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
