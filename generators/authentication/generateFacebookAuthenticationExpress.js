import { join } from 'path';
import { replaceCode, removeCode, addNpmPackage } from '../utils';

async function generateFacebookAuthenticationExpress(params) {
  const config = join(__base, 'build', params.uuid, 'config', 'passport.js');
  const require = join(__base, 'modules', 'authentication', 'facebook', 'passport-require.js');
  const strategy = join(__base, 'modules', 'authentication', 'facebook', 'passport-strategy.js');
  const routes = join(__base, 'modules', 'authentication', 'facebook', 'passport-routes.js');

  // TODO
}

export default generateFacebookAuthenticationExpress;
