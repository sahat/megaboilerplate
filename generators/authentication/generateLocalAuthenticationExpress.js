import { join } from 'path';
import { replaceCode, removeCode, addNpmPackage } from '../utils';

async function generateLocalAuthenticationExpress(params) {
  const app = join(__base, 'build', params.uuid, 'app.js');
  const config = join(__base, 'build', params.uuid, 'config', 'passport.js');
  const require = join(__dirname, 'modules', 'local', 'passport-require.js');
  const strategy = join(__dirname, 'modules', 'local', 'passport-strategy.js');
  const routes = join(__dirname, 'modules', 'local', 'passport-routes.js');

  await replaceCode(app, 'PASSPORT_LOCAL_ROUTES', routes);
  await replaceCode(config, 'PASSPORT_LOCAL_REQUIRE', require);
  await replaceCode(config, 'PASSPORT_LOCAL_STRATEGY', strategy);

  await addNpmPackage('passport-local', params);
  await addNpmPackage('async', params);
  await addNpmPackage('nodemailer', params);
  await addNpmPackage('bcrypt-nodejs', params);
}

export default generateLocalAuthenticationExpress;
