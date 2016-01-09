import { join } from 'path';
import { replaceCode, removeCode, addDependencies } from '../utils';

let dependencies = require('../../modules/dependencies');

async function generateGoogleAuthenticationExpress(params) {
  let config = join(__base, 'build', params.uuid, 'config', 'passport.js');
  let require = join(__base, 'modules', 'authentication', 'google', 'passport-require.js');
  let strategy = join(__base, 'modules', 'authentication', 'google', 'passport-strategy.js');
  let routes = join(__base, 'modules', 'authentication', 'google', 'passport-routes.js');

  if (params.authentication.includes('google')) {
    // TODO
  } else {
    await removeCode(config, 'PASSPORT_GOOGLE_REQUIRE');
    await removeCode(config, 'PASSPORT_GOOGLE_STRATEGY');
  }
}

export default generateGoogleAuthenticationExpress;
