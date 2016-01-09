import { join } from 'path';
import { replaceCode, removeCode, addDependencies } from '../utils';

let dependencies = require('../../modules/dependencies');

async function generateEmailAuthenticationExpress(params) {
  let config = join(__base, 'build', params.uuid, 'config', 'passport.js');
  let require = join(__base, 'modules', 'authentication', 'email', 'passport-require.js');
  let strategy = join(__base, 'modules', 'authentication', 'email', 'passport-strategy.js');
  let routes = join(__base, 'modules', 'authentication', 'email', 'passport-routes.js');

  if (params.authentication.includes('email')) {
    await addDependencies(dependencies.authentication.email, params);
    await replaceCode(config, 'PASSPORT_LOCAL_REQUIRE', require);
    await replaceCode(config, 'PASSPORT_LOCAL_STRATEGY', strategy);
  } else {
    await removeCode(config, 'PASSPORT_LOCAL_REQUIRE');
    await removeCode(config, 'PASSPORT_LOCAL_STRATEGY');
  }
}

export default generateEmailAuthenticationExpress;
