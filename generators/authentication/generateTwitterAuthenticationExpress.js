import { join } from 'path';
import { replaceCode, removeCode, addDependencies } from '../utils';

let dependencies = require('../../modules/dependencies');

async function generateTwitterAuthenticationExpress(params) {
  let config = join(__base, 'build', params.uuid, 'config', 'passport.js');
  let require = join(__base, 'modules', 'authentication', 'twitter', 'passport-require.js');
  let strategy = join(__base, 'modules', 'authentication', 'twitter', 'passport-strategy.js');
  let routes = join(__base, 'modules', 'authentication', 'twitter', 'passport-routes.js');

  if (params.authentication.includes('twitter')) {
    // TODO
  } else {
    await removeCode(config, 'PASSPORT_TWITTER_REQUIRE');
    await removeCode(config, 'PASSPORT_TWITTER_STRATEGY');
  }
}

export default generateTwitterAuthenticationExpress;
