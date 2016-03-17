import { join } from 'path';
import { replaceCode, appendFile, addNpmPackage } from '../utils';

async function generateTwitterAuthenticationExpress(params) {
  const build = join(__base, 'build', params.uuid);
  const app = join(build, 'app.js');
  const env = join(build, '.env');
  const config = join(build, 'config', 'passport.js');
  const require = join(__dirname, 'modules', 'twitter', 'passport-require.js');
  const routes = join(__dirname, 'modules', 'twitter', 'passport-routes.js');

  await replaceCode(app, 'PASSPORT_TWITTER_ROUTES', routes);
  await replaceCode(config, 'PASSPORT_TWITTER_REQUIRE', require);

  await addNpmPackage('passport-twitter', params);

  switch (params.database) {
    case 'mongodb':
      const mongodbStrategy = join(__dirname, 'modules', 'twitter', 'twitter-strategy-mongodb.js');
      await replaceCode(config, 'PASSPORT_TWITTER_STRATEGY', mongodbStrategy);
      break;

    case 'mysql':
    case 'sqlite':
    case 'postgresql':
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
