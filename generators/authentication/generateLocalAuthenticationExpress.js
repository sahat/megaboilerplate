import { join } from 'path';
import { replaceCode, removeCode, addNpmPackage } from '../utils';

async function generateLocalAuthenticationExpress(params) {
  const server = join(__base, 'build', params.uuid, 'server.js');
  const config = join(__base, 'build', params.uuid, 'config', 'passport.js');
  const strategyRequire = join(__dirname, 'modules', 'local', 'passport-require.js');
  const passportRoutes = join(__dirname, 'modules', 'local', 'passport-routes.js');
  const jwtRoutes = join(__dirname, 'modules', 'local', 'jwt-routes.js');

  await addNpmPackage('bcrypt-nodejs', params);
  await addNpmPackage('async', params);
  
  if (params.jsFramework) {
    await replaceCode(server, 'LOCAL_ROUTES', jwtRoutes);
  } else {
    await replaceCode(server, 'LOCAL_ROUTES', passportRoutes);
    await replaceCode(config, 'PASSPORT_LOCAL_REQUIRE', strategyRequire);
    await addNpmPackage('passport-local', params);

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

      default:
        break;
    }
  }
}

export default generateLocalAuthenticationExpress;
