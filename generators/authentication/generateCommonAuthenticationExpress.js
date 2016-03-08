import { join } from 'path';
import { cpy, copy, mkdirs, replaceCode, removeCode, addNpmPackage } from '../utils';

async function generateCommonAuthenticationExpress(params) {
  const build = join(__base, 'build', params.uuid);
  const app = join(build, 'app.js');
  const passportConfigFile = join(build, 'config', 'passport.js');
  const passportConfigModule = join(__dirname, 'modules', 'common', 'passport-config.js');
  const passportConfigRequire = join(__dirname, 'modules', 'common', 'passport-config-require.js');
  const passportCommonRoutes = join(__dirname, 'modules', 'common', 'passport-routes.js');
  const passportRequire = join(__dirname, 'modules', 'common', 'passport-require.js');
  const passportMiddleware = join(__dirname, 'modules', 'common', 'passport-middleware.js');
  const userHelperMiddleware = join(__dirname, 'modules', 'common', 'user-middleware.js');
  const passportSerializer = join(__dirname, 'modules', 'common', 'passport-serializer.js');
  const passportDeserializer = join(__dirname, 'modules', 'common', 'passport-deserializer.js');
  const passportUserModel = join(__dirname, 'modules', 'common', 'passport-user-model.js');
  const userControllerRequire = join(__dirname, 'modules', 'controllers', 'user-require.js');

  // Passport middleware
  await replaceCode(app, 'PASSPORT_REQUIRE', passportRequire);
  await replaceCode(app, 'PASSPORT_MIDDLEWARE', passportMiddleware);
  await replaceCode(app, 'USER_HELPER_MIDDLEWARE', userHelperMiddleware);
  await replaceCode(app, 'PASSPORT_CONFIG_REQUIRE', passportConfigRequire);

  // Add user controller reference
  await replaceCode(app, 'USER_CONTROLLER', userControllerRequire);

  // Add common Passport routes, e.g. logout, unlink
  await replaceCode(app, 'PASSPORT_COMMON_ROUTES', passportCommonRoutes);

  // Passport config file
  await copy(passportConfigModule, passportConfigFile);
  await replaceCode(passportConfigFile, 'PASSPORT_USER_MODEL', passportUserModel);
  await replaceCode(passportConfigFile, 'PASSPORT_SERIALIZER', passportSerializer);
  await replaceCode(passportConfigFile, 'PASSPORT_DESERIALIZER', passportDeserializer);

  await addNpmPackage('passport', params);

  switch (params.database) {
    case 'mongodb':
      const mongooseUserModel = join(__dirname, 'modules', 'models', 'user.js');
      const userController = join(__dirname, 'modules', 'controllers', 'user.js');

      await copy(mongooseUserModel, join(build, 'models', 'user.js'));
      await copy(userController, join(build, 'controllers', 'user.js'));

      break;
    default:
      break;
  }

  switch (params.templateEngine) {
    case 'jade':
      const loginJade = join(__dirname, 'modules', 'common', 'views', 'login.jade');
      const signupJade = join(__dirname, 'modules', 'common', 'views', 'signup.jade');
      const forgotJade = join(__dirname, 'modules', 'common', 'views', 'forgot.jade');
      const resetJade = join(__dirname, 'modules', 'common', 'views', 'reset.jade');
      const profileJade = join(__dirname, 'modules', 'common', 'views', 'profile.jade');
      await mkdirs(join(build, 'views', 'account'));
      await cpy([
        loginJade,
        signupJade,
        forgotJade,
        resetJade,
        profileJade
      ], join(build, 'views', 'account'));
      break;
    default:
      break;
  }
}

export default generateCommonAuthenticationExpress;
