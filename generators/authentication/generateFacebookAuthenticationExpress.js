import { join } from 'path';
import { replaceCode, removeCode, addNpmPackage } from '../utils';

async function generateFacebookAuthenticationExpress(params) {
  const app = join(__base, 'build', params.uuid, 'app.js');
  const config = join(__base, 'build', params.uuid, 'config', 'passport.js');
  const require = join(__dirname, 'modules', 'facebook', 'passport-require.js');
  const strategy = join(__dirname, 'modules', 'facebook', 'passport-strategy.js');
  const routes = join(__dirname, 'modules', 'facebook', 'passport-routes.js');

  await replaceCode(app, 'PASSPORT_FACEBOOK_ROUTES', routes);
  await replaceCode(config, 'PASSPORT_FACEBOOK_REQUIRE', require);
  await replaceCode(config, 'PASSPORT_FACEBOOK_STRATEGY', strategy);

  await addNpmPackage('passport-facebook', params);
}

export default generateFacebookAuthenticationExpress;
