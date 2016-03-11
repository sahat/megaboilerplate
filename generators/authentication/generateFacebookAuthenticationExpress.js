import { join } from 'path';
import { replaceCode, appendFile, addNpmPackage } from '../utils';

async function generateFacebookAuthenticationExpress(params) {
  const build = join(__base, 'build', params.uuid);
  const app = join(build, 'app.js');
  const env = join(build, '.env');
  const config = join(build, 'config', 'passport.js');
  const require = join(__dirname, 'modules', 'facebook', 'passport-require.js');
  const strategy = join(__dirname, 'modules', 'facebook', 'passport-strategy.js');
  const routes = join(__dirname, 'modules', 'facebook', 'passport-routes.js');

  await replaceCode(app, 'PASSPORT_FACEBOOK_ROUTES', routes);
  await replaceCode(config, 'PASSPORT_FACEBOOK_REQUIRE', require);
  await replaceCode(config, 'PASSPORT_FACEBOOK_STRATEGY', strategy);

  await addNpmPackage('passport-facebook', params);

  await appendFile(env, '\nFACEBOOK_ID=754220301289665');
  await appendFile(env, '\nFACEBOOK_SECRET=41860e58c256a3d7ad8267d3c1939a4a\n');
}

export default generateFacebookAuthenticationExpress;
