import { join } from 'path';
import { replaceCode, appendFile, addNpmPackage } from '../utils';

async function generateGoogleAuthenticationExpress(params) {
  const build = join(__base, 'build', params.uuid);
  const app = join(build, 'app.js');
  const env = join(build, '.env');
  const config = join(build, 'config', 'passport.js');
  const require = join(__dirname, 'modules', 'google', 'passport-require.js');
  const strategy = join(__dirname, 'modules', 'google', 'passport-strategy.js');
  const routes = join(__dirname, 'modules', 'google', 'passport-routes.js');

  await replaceCode(app, 'PASSPORT_GOOGLE_ROUTES', routes);
  await replaceCode(config, 'PASSPORT_GOOGLE_REQUIRE', require);
  await replaceCode(config, 'PASSPORT_GOOGLE_STRATEGY', strategy);

  await addNpmPackage('passport-google-oauth', params);

  await appendFile(env, '\nGOOGLE_ID=828110519058.apps.googleusercontent.com');
  await appendFile(env, '\nGOOGLE_SECRET=JdZsIaWhUFIchmC1a_IZzOHb\n');
}




export default generateGoogleAuthenticationExpress;
