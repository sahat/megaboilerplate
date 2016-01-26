import { join } from 'path';
import { copy, replaceCode, removeCode, addNpmPackage } from '../utils';

async function generateCommonAuthenticationExpress(params) {
  let app = join(__base, 'build', params.uuid, 'app.js');
  let passportConfigFile = join(__base, 'build', params.uuid, 'config', 'passport.js');
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
}

export default generateCommonAuthenticationExpress;
