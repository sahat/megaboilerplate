import { join } from 'path';
import { replaceCode, appendFile, addNpmPackage } from '../utils';

async function generateFacebookAuthenticationExpress(params) {
  const build = join(__base, 'build', params.uuid);
  const app = join(build, 'app.js');
  const env = join(build, '.env');
  const config = join(build, 'config', 'passport.js');
  const strategyRequire = join(__dirname, 'modules', 'facebook', 'passport-require.js');
  const passportRoutes = join(__dirname, 'modules', 'facebook', 'passport-routes.js');
  const jwtRoutes = join(__dirname, 'modules', 'facebook', 'jwt-routes.js');

  if (params.jsFramework) {
    await replaceCode(app, 'FACEBOOK_ROUTES', jwtRoutes);
  } else {
    await replaceCode(app, 'FACEBOOK_ROUTES', passportRoutes);
    await replaceCode(config, 'PASSPORT_FACEBOOK_REQUIRE', strategyRequire);
  }

  await addNpmPackage('passport-facebook', params);

  switch (params.database) {
    case 'mongodb':
      const mongodbStrategy = join(__dirname, 'modules', 'facebook', 'facebook-strategy-mongodb.js');
      await replaceCode(config, 'PASSPORT_FACEBOOK_STRATEGY', mongodbStrategy);
      break;

    case 'mysql':
    case 'sqlite':
    case 'postgresql':
      const sqlStrategy = join(__dirname, 'modules', 'facebook', 'facebook-strategy-sql.js');
      await replaceCode(config, 'PASSPORT_FACEBOOK_STRATEGY', sqlStrategy);
      break;
    
    default:
      break;
  }

  await appendFile(env, '\nFACEBOOK_ID=754220301289665');
  await appendFile(env, '\nFACEBOOK_SECRET=41860e58c256a3d7ad8267d3c1939a4a\n');
}

export default generateFacebookAuthenticationExpress;
