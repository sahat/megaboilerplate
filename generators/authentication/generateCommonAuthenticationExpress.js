import { join } from 'path';
import { cpy, copy, mkdirs, appendFile, replaceCode, addNpmPackage } from '../utils';

async function generateCommonAuthenticationExpress(params) {
  const build = join(__base, 'build', params.uuid);
  const app = join(build, 'app.js');
  const env = join(build, '.env');
  const passportConfigFile = join(build, 'config', 'passport.js');
  const passportConfigModule = join(__dirname, 'modules', 'common', 'passport-config.js');
  const passportConfigRequire = join(__dirname, 'modules', 'common', 'passport-config-require.js');
  const passportCommonRoutes = join(__dirname, 'modules', 'common', 'passport-routes.js');
  const passportRequire = join(__dirname, 'modules', 'common', 'passport-require.js');
  const jwtRequire = join(__dirname, 'modules', 'common', 'jwt-require.js');
  const passportMiddleware = join(__dirname, 'modules', 'common', 'passport-middleware.js');
  const jwtIsAuthenticatedMiddleware = join(__dirname, 'modules', 'common', 'is-authenticated-jwt.js');
  const passportEnsureAuthenticated = join(__dirname, 'modules', 'common', 'ensure-authenticated-passport.js');
  const jwtEnsureAuthenticated = join(__dirname, 'modules', 'common', 'ensure-authenticated-jwt.js');
  const passportSerializer = join(__dirname, 'modules', 'common', 'passport-serializer.js');
  const passportDeserializerMongoDb = join(__dirname, 'modules', 'common', 'passport-deserializer.js');
  const passportDeserializerSql = join(__dirname, 'modules', 'common', 'passport-deserializer-sql.js');
  const passportUserModel = join(__dirname, 'modules', 'common', 'passport-user-model.js');
  const userControllerModule = join(__dirname, 'modules', 'controllers', 'user.js');
  const userControllerRequire = join(__dirname, 'modules', 'controllers', 'user-require.js');
  const accountRoutes = join(__dirname, 'modules', 'common', 'routes', 'account-routes.js');

  // Copy user controller
  await copy(userControllerModule, join(build, 'controllers', 'user.js'));

  const userController = join(build, 'controllers', 'user.js');

  // Passport middleware
  await replaceCode(app, 'PASSPORT_MIDDLEWARE', passportMiddleware);
  await replaceCode(app, 'PASSPORT_CONFIG_REQUIRE', passportConfigRequire);

  // isAuthenticated middleware
  if (params.jsFramework) {
    await replaceCode(app, 'IS_AUTHENTICATED_MIDDLEWARE', jwtIsAuthenticatedMiddleware);
    await replaceCode(userController, 'ENSURE_AUTHENTICATED_MIDDLEWARE', jwtEnsureAuthenticated);
    await replaceCode(userController, 'JWT_REQUIRE', jwtRequire);
  } else {
    await replaceCode(userController, 'ENSURE_AUTHENTICATED_MIDDLEWARE', passportEnsureAuthenticated);
    await replaceCode(userController, 'PASSPORT_REQUIRE', passportRequire);
  }

  // Add user controller reference
  await replaceCode(app, 'USER_CONTROLLER', userControllerRequire);

  // Add common Passport routes, e.g. logout, unlink
  await replaceCode(app, 'PASSPORT_COMMON_ROUTES', passportCommonRoutes);

  // Add "My Account" routes
  await replaceCode(app, 'ACCOUNT_ROUTES', accountRoutes);

  // Passport config file
  await copy(passportConfigModule, passportConfigFile);
  await replaceCode(passportConfigFile, 'PASSPORT_USER_MODEL', passportUserModel);

  if (params.jsFramework) {

  } else {
    await replaceCode(passportConfigFile, 'PASSPORT_SERIALIZER', passportSerializer);
  }

  await addNpmPackage('passport', params);


  switch (params.database) {
    case 'mongodb':
      const mongooseModel = join(__dirname, 'modules', 'models', 'mongodb', 'user.js');
      const userHelperMiddlewareForMongoDb = join(__dirname, 'modules', 'common', 'user-middleware-mongodb.js');

      await copy(mongooseModel, join(build, 'models', 'user.js'));

      await replaceCode(app, 'USER_HELPER_MIDDLEWARE', userHelperMiddlewareForMongoDb);

      if (params.jsFramework) {

      } else {
        await replaceCode(passportConfigFile, 'PASSPORT_DESERIALIZER', passportDeserializerMongoDb);
      }

      await replaceCode(userController, 'USER_SIGNUP_POST', join(__dirname, 'modules', 'controllers', 'mongodb', 'user-signup-post.js'), { indentLevel: 1 });
      await replaceCode(userController, 'USER_ACCOUNT_PUT', join(__dirname, 'modules', 'controllers', 'mongodb', 'user-account-put.js'), { indentLevel: 1 });
      await replaceCode(userController, 'USER_ACCOUNT_DELETE', join(__dirname, 'modules', 'controllers', 'mongodb', 'user-account-delete.js'), { indentLevel: 1 });
      await replaceCode(userController, 'USER_PROVIDER_UNLINK', join(__dirname, 'modules', 'controllers', 'mongodb', 'user-provider-unlink.js'), { indentLevel: 1 });
      await replaceCode(userController, 'USER_FORGOT_POST', join(__dirname, 'modules', 'controllers', 'mongodb', 'user-forgot-post.js'), { indentLevel: 3 });
      await replaceCode(userController, 'USER_RESET_GET', join(__dirname, 'modules', 'controllers', 'mongodb', 'user-reset-get.js'), { indentLevel: 1 });
      await replaceCode(userController, 'USER_RESET_POST', join(__dirname, 'modules', 'controllers', 'mongodb', 'user-reset-post.js'), { indentLevel: 3 });
      break;

    case 'mysql':
    case 'sqlite':
    case 'postgresql':
      const bookshelfModel = join(__dirname, 'modules', 'models', 'sql', 'user.js');
      const userHelperMiddlewareForSql = join(__dirname, 'modules', 'common', 'user-middleware-sql.js');

      await copy(bookshelfModel, join(build, 'models', 'user.js'));
      await copy(join(__dirname, 'modules', 'migrations'), join(build, 'migrations'));

      await replaceCode(app, 'USER_HELPER_MIDDLEWARE', userHelperMiddlewareForSql);


      await replaceCode(passportConfigFile, 'PASSPORT_DESERIALIZER', passportDeserializerSql);

      await replaceCode(userController, 'USER_SIGNUP_POST', join(__dirname, 'modules', 'controllers', 'sql', 'user-signup-post.js'), { indentLevel: 1 });
      await replaceCode(userController, 'USER_ACCOUNT_PUT', join(__dirname, 'modules', 'controllers', 'sql', 'user-account-put.js'), { indentLevel: 1 });
      await replaceCode(userController, 'USER_ACCOUNT_DELETE', join(__dirname, 'modules', 'controllers', 'sql', 'user-account-delete.js'), { indentLevel: 1 });
      await replaceCode(userController, 'USER_PROVIDER_UNLINK', join(__dirname, 'modules', 'controllers', 'sql', 'user-provider-unlink.js'), { indentLevel: 1 });
      await replaceCode(userController, 'USER_FORGOT_POST', join(__dirname, 'modules', 'controllers', 'sql', 'user-forgot-post.js'), { indentLevel: 3 });
      await replaceCode(userController, 'USER_RESET_GET', join(__dirname, 'modules', 'controllers', 'sql', 'user-reset-get.js'), { indentLevel: 1 });
      await replaceCode(userController, 'USER_RESET_POST', join(__dirname, 'modules', 'controllers', 'sql', 'user-reset-post.js'), { indentLevel: 3 });
      break;

    case 'rethinkdb':
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

  if (params.jsFramework) {
    await appendFile(env, '\nTOKEN_SECRET=Secret key for signing and verifying JWT\n');
  }
}

export default generateCommonAuthenticationExpress;
