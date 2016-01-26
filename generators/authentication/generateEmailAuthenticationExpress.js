import { join } from 'path';
import { replaceCode, removeCode, addNpmPackage } from '../utils';

async function generateEmailAuthenticationExpress(params) {
  const config = join(__base, 'build', params.uuid, 'config', 'passport.js');
  const require = join(__base, 'modules', 'authentication', 'email', 'passport-require.js');
  const strategy = join(__base, 'modules', 'authentication', 'email', 'passport-strategy.js');
  const routes = join(__base, 'modules', 'authentication', 'email', 'passport-routes.js');

  await replaceCode(config, 'PASSPORT_LOCAL_REQUIRE', require);
  await replaceCode(config, 'PASSPORT_LOCAL_STRATEGY', strategy);

  await addNpmPackage('passport-local', params);
}

export default generateEmailAuthenticationExpress;
