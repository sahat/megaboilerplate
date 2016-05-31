import { getModule, replaceCodeMemory, addNpmPackageMemory } from '../utils';

export default async function generateLocalAuthenticationExpress(params) {
  await addNpmPackageMemory('bcrypt-nodejs', params);
  await addNpmPackageMemory('async', params);

  if (params.jsFramework) {
    await replaceCodeMemory(params, 'server.js', 'LOCAL_ROUTES', await getModule('authentication/local/jwt-routes.js'));
  } else {
    await replaceCodeMemory(params, 'server.js', 'LOCAL_ROUTES', await getModule('authentication/local/passport-routes.js'));
    await replaceCodeMemory(params, 'config/passport.js', 'PASSPORT_LOCAL_REQUIRE', await getModule('authentication/local/passport-require.js'));

    await addNpmPackageMemory('passport-local', params);

    switch (params.database) {
      case 'mongodb':
        await replaceCodeMemory(params, 'config/passport.js', 'PASSPORT_LOCAL_STRATEGY', await getModule('authentication/local/local-strategy-mongodb.js'));
        break;
      case 'mysql':
      case 'sqlite':
      case 'postgresql':
        await replaceCodeMemory(params, 'config/passport.js', 'PASSPORT_LOCAL_STRATEGY', await getModule('authentication/local/local-strategy-sql.js'));
        break;
      default:
        break;
    }
  }
}
