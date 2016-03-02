import { join } from 'path';
import { copy, mkdirs, replaceCode, removeCode, addNpmPackage } from '../utils';

async function generateCommonAuthenticationExpress(params) {
  const build = join(__base, 'build', params.uuid);
  const app = join(build, 'app.js');
  const passportConfigFile = join(build, 'config', 'passport.js');
  const passportConfigModule = join(__dirname, 'modules', 'common', 'passport-config.js');
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

  // Add user controller reference
  await replaceCode(app, 'USER_CONTROLLER', userControllerRequire);

  // Passport config file
  await copy(passportConfigModule, passportConfigFile);
  await replaceCode(passportConfigFile, 'PASSPORT_USER_MODEL', passportUserModel);
  await replaceCode(passportConfigFile, 'PASSPORT_SERIALIZER', passportSerializer, { leadingBlankLine: true });
  await replaceCode(passportConfigFile, 'PASSPORT_DESERIALIZER', passportDeserializer, { leadingBlankLine: true });

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
      await mkdirs(join(build, 'views', 'account'));
      await copy(loginJade, join(build, 'views', 'account', 'login.jade'));
      break;
    default:
      break;
  }
}

export default generateCommonAuthenticationExpress;
