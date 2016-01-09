import { join } from 'path';
import { replaceCode, removeCode, addDependencies } from '../utils';

let dependencies = require('../../modules/dependencies');

async function generateFacebookAuthenticationExpress(params) {
  let config = join(__base, 'build', params.uuid, 'config', 'passport.js');
  let require = join(__base, 'modules', 'authentication', 'facebook', 'passport-require.js');
  let strategy = join(__base, 'modules', 'authentication', 'facebook', 'passport-strategy.js');
  let routes = join(__base, 'modules', 'authentication', 'facebook', 'passport-routes.js');

  if (params.authentication.includes('facebook')) {
    // TODO
  } else {
    await removeCode(config, 'PASSPORT_FACEBOOK_REQUIRE');
    await removeCode(config, 'PASSPORT_FACEBOOK_STRATEGY');
  }
}

export default generateFacebookAuthenticationExpress;
