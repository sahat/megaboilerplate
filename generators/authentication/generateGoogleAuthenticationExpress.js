import { join } from 'path';
import { replaceCode, removeCode, addNpmPackage } from '../utils';

async function generateGoogleAuthenticationExpress(params) {
  const config = join(__base, 'build', params.uuid, 'config', 'passport.js');
  const require = join(__base, 'modules', 'authentication', 'google', 'passport-require.js');
  const strategy = join(__base, 'modules', 'authentication', 'google', 'passport-strategy.js');
  const routes = join(__base, 'modules', 'authentication', 'google', 'passport-routes.js');

  // TODO
}

export default generateGoogleAuthenticationExpress;
