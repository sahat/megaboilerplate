let path = require('path');
let fs = require('fs-extra');
let Promise = require('bluebird');
let copy = Promise.promisify(fs.copy);
let replaceCode = require('../../utils/replaceCode');
let removeCode = require('../../utils/removeCode');
let addDependencies = require('../../utils/addDependencies');
let packages = require('../../modules/packages');

async function generateCommonAuthenticationExpress(params) {
  let app = path.join(__base, 'build', params.uuid, 'app.js');
  let passportConfigFile = path.join(__base, 'build', params.uuid, 'config', 'passport.js');
  let passportConfigModule = path.join(__base, 'modules', 'authentication', 'common', 'passport-config.js');
  let passportRequire = path.join(__base, 'modules', 'authentication', 'common', 'passport-require.js');
  let passportMiddleware = path.join(__base, 'modules', 'authentication', 'common', 'passport-middleware.js');
  let passportSerializer = path.join(__base, 'modules', 'authentication', 'common', 'passport-serializer.js');
  let passportDeserializer = path.join(__base, 'modules', 'authentication', 'common', 'passport-deserializer.js');
  let passportUserModel = path.join(__base, 'modules', 'authentication', 'common', 'passport-user-model.js');

  // Passport middleware
  await replaceCode(app, 'PASSPORT_REQUIRE', passportRequire);
  await replaceCode(app, 'PASSPORT_MIDDLEWARE', passportMiddleware);

  // Passport config file
  await copy(passportConfigModule, passportConfigFile);
  await replaceCode(passportConfigFile, 'PASSPORT_USER_MODEL', passportUserModel);
  await replaceCode(passportConfigFile, 'PASSPORT_SERIALIZER', passportSerializer, { leadingBlankLine: true });
  await replaceCode(passportConfigFile, 'PASSPORT_DESERIALIZER', passportDeserializer, { leadingBlankLine: true });

  await addDependencies(packages.authentication.common, params);
}

module.exports = generateCommonAuthenticationExpress;
