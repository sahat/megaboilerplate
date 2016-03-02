import { join } from 'path';
import { replaceCode, removeCode, addNpmPackage } from '../utils';

async function generateGoogleAuthenticationExpress(params) {
  const app = join(__base, 'build', params.uuid, 'app.js');
  const config = join(__base, 'build', params.uuid, 'config', 'passport.js');
  const require = join(__dirname, 'modules', 'google', 'passport-require.js');
  const strategy = join(__dirname, 'modules', 'google', 'passport-strategy.js');
  const routes = join(__dirname, 'modules', 'google', 'passport-routes.js');

  await replaceCode(app, 'PASSPORT_GOOGLE_ROUTES', routes);
  await replaceCode(config, 'PASSPORT_GOOGLE_REQUIRE', require);
  await replaceCode(config, 'PASSPORT_GOOGLE_STRATEGY', strategy);

  await addNpmPackage('passport-google-oauth', params);
}

export default generateGoogleAuthenticationExpress;
