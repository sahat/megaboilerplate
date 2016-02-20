import { join } from 'path';
import { copy, mkdirs, replaceCode, removeCode, addNpmPackage } from '../utils';

async function generateCommonAuthenticationExpress(params) {
  let build = join(__base, 'build', params.uuid);
  let app = join(build, 'app.js');
  let passportConfigFile = join(build, 'config', 'passport.js');
  let passportConfigModule = join(__base, 'modules', 'authentication', 'common', 'passport-config.js');
  let passportRequire = join(__base, 'modules', 'authentication', 'common', 'passport-require.js');
  let passportMiddleware = join(__base, 'modules', 'authentication', 'common', 'passport-middleware.js');
  let passportSerializer = join(__base, 'modules', 'authentication', 'common', 'passport-serializer.js');
  let passportDeserializer = join(__base, 'modules', 'authentication', 'common', 'passport-deserializer.js');
  let passportUserModel = join(__base, 'modules', 'authentication', 'common', 'passport-user-model.js');

  // Passport middleware
  await replaceCode(app, 'PASSPORT_REQUIRE', passportRequire);
  await replaceCode(app, 'PASSPORT_MIDDLEWARE', passportMiddleware);

  // Passport config file
  await copy(passportConfigModule, passportConfigFile);
  await replaceCode(passportConfigFile, 'PASSPORT_USER_MODEL', passportUserModel);
  await replaceCode(passportConfigFile, 'PASSPORT_SERIALIZER', passportSerializer, { leadingBlankLine: true });
  await replaceCode(passportConfigFile, 'PASSPORT_DESERIALIZER', passportDeserializer, { leadingBlankLine: true });

  await addNpmPackage('passport', params);

  switch (params.database) {
    case 'mongodb':
      const mongooseUserModel = join(__base, 'modules', 'authentication', 'models', 'user.js');
      const userController = join(__base, 'modules', 'authentication', 'controllers', 'user.js');

      await copy(mongooseUserModel, join(build, 'models', 'user.js'));
      await copy(userController, join(build, 'controllers', 'user.js'));
      break;
    default:
      break;
  }

  switch (params.templateEngine) {
    case 'jade':
      const loginJade = join(__base, 'modules', 'authentication', 'common', 'views', 'login.jade');
      await mkdirs(join(build, 'views', 'account'));
      await copy(loginJade, join(build, 'views', 'account', 'login.jade'));
      break;
    default:
      break;
  }
}

export default generateCommonAuthenticationExpress;
