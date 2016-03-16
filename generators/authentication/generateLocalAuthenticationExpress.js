import { join } from 'path';
import { replaceCode, removeCode, addNpmPackage } from '../utils';

async function generateLocalAuthenticationExpress(params) {
  const app = join(__base, 'build', params.uuid, 'app.js');
  const config = join(__base, 'build', params.uuid, 'config', 'passport.js');
  const require = join(__dirname, 'modules', 'local', 'passport-require.js');
  const routes = join(__dirname, 'modules', 'local', 'passport-routes.js');

  await replaceCode(app, 'PASSPORT_LOCAL_ROUTES', routes);
  await replaceCode(config, 'PASSPORT_LOCAL_REQUIRE', require);

  await addNpmPackage('passport-local', params);
  await addNpmPackage('nodemailer', params);
  await addNpmPackage('bcrypt-nodejs', params);
  await addNpmPackage('async', params);

  switch (params.database) {
    case 'mongodb':
      const mongodbStrategy = join(__dirname, 'modules', 'local', 'local-strategy-mongodb.js');
      await replaceCode(config, 'PASSPORT_LOCAL_STRATEGY', mongodbStrategy);
      break;

    case 'mysql':
    case 'sqlite':
    case 'postgresql':
      const sqlStrategy = join(__dirname, 'modules', 'local', 'local-strategy-sql.js');
      await replaceCode(config, 'PASSPORT_LOCAL_STRATEGY', sqlStrategy);
      break;

    case 'rethinkdb':
      break;

    default:
      break;
  }
}

export default generateLocalAuthenticationExpress;
