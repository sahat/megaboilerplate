import { join } from 'path';
import { replaceCode, appendFile, addNpmPackage } from '../utils';

async function generateTwitterAuthenticationExpress(params) {
  const build = join(__base, 'build', params.uuid);
  const app = join(build, 'app.js');
  const env = join(build, '.env');
  const config = join(build, 'config', 'passport.js');
  const strategyRequire = join(__dirname, 'modules', 'twitter', 'passport-require.js');
  const passportRoutes = join(__dirname, 'modules', 'twitter', 'passport-routes.js');
  const jwtRoutes = join(__dirname, 'modules', 'twitter', 'passport-routes.js');

  if (params.jsFramework) {
    await replaceCode(app, 'TWITTER_ROUTES', jwtRoutes);
  } else {
    await replaceCode(app, 'TWITTER_ROUTES', passportRoutes);
    await replaceCode(config, 'PASSPORT_TWITTER_REQUIRE', strategyRequire);
  }

  await addNpmPackage('passport-twitter', params);

  switch (params.database) {
    case 'mongodb':
      if (params.jsFramework) {
        await replaceCode(userController, 'AUTH_TWITTER_JWT_DB', join(__dirname, 'modules', 'twitter', 'twitter-jwt-sql.js'), { indentLevel: 3 });
      } else {

      }
      const mongodbStrategy = join(__dirname, 'modules', 'twitter', 'twitter-strategy-mongodb.js');
      await replaceCode(config, 'PASSPORT_TWITTER_STRATEGY', mongodbStrategy);
      break;

    case 'mysql':
    case 'sqlite':
    case 'postgresql':
      if (params.jsFramework) {
        await replaceCode(userController, 'AUTH_TWITTER_JWT_DB', join(__dirname, 'modules', 'twitter', 'twitter-jwt-sql.js'), { indentLevel: 3 });
      } else {

      }
      const sqlStrategy = join(__dirname, 'modules', 'twitter', 'twitter-strategy-sql.js');
      await replaceCode(config, 'PASSPORT_TWITTER_STRATEGY', sqlStrategy);
      break;

    default:
      break;
  }

  await appendFile(env, '\nTWITTER_KEY=6NNBDyJ2TavL407A3lWxPFKBI');
  await appendFile(env, '\nTWITTER_SECRET=ZHaYyK3DQCqv49Z9ofsYdqiUgeoICyh6uoBgFfu7OeYC7wTQKa\n');
}

export default generateTwitterAuthenticationExpress;
