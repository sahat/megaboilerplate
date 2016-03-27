import { join } from 'path';
import { replaceCode, appendFile, addNpmPackage } from '../utils';

async function generateGoogleAuthenticationExpress(params) {
  const build = join(__base, 'build', params.uuid);
  const app = join(build, 'app.js');
  const env = join(build, '.env');
  const config = join(build, 'config', 'passport.js');
  const userController = join(build, 'controllers', 'user.js');
  const strategyRequire = join(__dirname, 'modules', 'google', 'passport-require.js');
  const passportRoutes = join(__dirname, 'modules', 'google', 'passport-routes.js');
  const jwtRoutes = join(__dirname, 'modules', 'google', 'jwt-routes.js');

  if (params.jsFramework) {
    await replaceCode(app, 'GOOGLE_ROUTES', jwtRoutes);
  } else {
    await replaceCode(app, 'GOOGLE_ROUTES', passportRoutes);
    await replaceCode(config, 'PASSPORT_GOOGLE_REQUIRE', strategyRequire);

    await addNpmPackage('passport-google-oauth', params);

    
  }


  switch (params.database) {
    case 'mongodb':
      if (params.jsFramework) {
        await replaceCode(userController, 'AUTH_GOOGLE_JWT_DB', join(__dirname, 'modules', 'google', 'google-jwt-mongodb.js'), { indentLevel: 3 });
      } else {
        const mongodbStrategy = join(__dirname, 'modules', 'google', 'google-strategy-mongodb.js');
        await replaceCode(config, 'PASSPORT_GOOGLE_STRATEGY', mongodbStrategy);
      }
   
      break;

    case 'mysql':
    case 'sqlite':
    case 'postgresql':
      if (params.jsFramework) {
        await replaceCode(userController, 'AUTH_GOOGLE_JWT_DB', join(__dirname, 'modules', 'google', 'google-jwt-sql.js'), { indentLevel: 3 });
      } else {
        const sqlStrategy = join(__dirname, 'modules', 'google', 'google-strategy-sql.js');
        await replaceCode(config, 'PASSPORT_GOOGLE_STRATEGY', sqlStrategy);
      }

      break;

    default:
      break;
  }

  await appendFile(env, '\nGOOGLE_ID=828110519058.apps.googleusercontent.com');
  await appendFile(env, '\nGOOGLE_SECRET=JdZsIaWhUFIchmC1a_IZzOHb\n');
}




export default generateGoogleAuthenticationExpress;
