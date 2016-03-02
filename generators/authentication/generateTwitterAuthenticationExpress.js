import { join } from 'path';
import { replaceCode, removeCode, addNpmPackage } from '../utils';

async function generateTwitterAuthenticationExpress(params) {
  const app = join(__base, 'build', params.uuid, 'app.js');
  const config = join(__base, 'build', params.uuid, 'config', 'passport.js');
  const require = join(__dirname, 'modules', 'twitter', 'passport-require.js');
  const strategy = join(__dirname, 'modules', 'twitter', 'passport-strategy.js');
  const routes = join(__dirname, 'modules', 'twitter', 'passport-routes.js');

  await replaceCode(app, 'PASSPORT_TWITTER_ROUTES', routes);
  await replaceCode(config, 'PASSPORT_TWITTER_REQUIRE', require);
  await replaceCode(config, 'PASSPORT_TWITTER_STRATEGY', strategy);

  await addNpmPackage('passport-twitter', params);
}

export default generateTwitterAuthenticationExpress;
