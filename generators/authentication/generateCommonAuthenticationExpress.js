import { join } from 'path';
import { cpy, copy, mkdirs, appendFile, replaceCode, addNpmPackage } from '../utils';

async function generateCommonAuthenticationExpress(params) {
  const build = join(__base, 'build', params.uuid);
  const server = join(build, 'server.js');
  const env = join(build, '.env');
  const passportJs = join(build, 'config', 'passport.js');
  const passportConfigModule = join(__dirname, 'modules', 'common', 'passport-config.js');
  const passportConfigRequire = join(__dirname, 'modules', 'common', 'passport-config-require.js');
  const logoutRoute = join(__dirname, 'modules', 'common', 'logout-route.js');
  const unlinkRoute = join(__dirname, 'modules', 'common', 'unlink-route.js');
  const passportRequire = join(__dirname, 'modules', 'common', 'passport-require.js');
  const jwtRequire = join(__dirname, 'modules', 'common', 'jwt-require.js');
  const passportMiddleware = join(__dirname, 'modules', 'common', 'passport-middleware.js');
  const jwtIsAuthenticatedMiddleware = join(__dirname, 'modules', 'common', 'is-authenticated-jwt.js');
  const passportEnsureAuthenticated = join(__dirname, 'modules', 'common', 'ensure-authenticated-passport.js');
  const jwtEnsureAuthenticated = join(__dirname, 'modules', 'common', 'ensure-authenticated-jwt.js');
  const passportSerializer = join(__dirname, 'modules', 'common', 'passport-serializer.js');
  const passportDeserializerMongoDb = join(__dirname, 'modules', 'common', 'passport-deserializer.js');
  const passportDeserializerSql = join(__dirname, 'modules', 'common', 'passport-deserializer-sql.js');
  const userModelAppRequire = join(__dirname, 'modules', 'models', 'user-model-app-require.js');
  const userModelPassportRequire = join(__dirname, 'modules', 'models', 'user-model-passport-require.js');
  const userControllerModule = join(__dirname, 'modules', 'controllers', 'user.js');
  const userControllerRequire = join(__dirname, 'modules', 'controllers', 'user-require.js');
  const accountRoutesJwt = join(__dirname, 'modules', 'common', 'routes', 'account-routes-jwt.js');
  const accountRoutesPassport = join(__dirname, 'modules', 'common', 'routes', 'account-routes-passport.js');
  const generateTokenHelper = join(__dirname, 'modules', 'common', 'generate-token.js');

  const SQL = params.database === 'mysql' || params.database === 'postgresql' || params.database === 'sqlite';
  const MONGODB = params.database = 'mongodb';
  
  // Copy user controller
  await copy(userControllerModule, join(build, 'controllers', 'user.js'));

  const userController = join(build, 'controllers', 'user.js');

  if (params.jsFramework) {
    await replaceCode(server, 'IS_AUTHENTICATED_MIDDLEWARE', jwtIsAuthenticatedMiddleware);
    await replaceCode(server, 'JWT_REQUIRE', jwtRequire);
    await replaceCode(server, 'USER_MODEL_REQUIRE', userModelAppRequire);
    await replaceCode(userController, 'ENSURE_AUTHENTICATED_MIDDLEWARE', jwtEnsureAuthenticated);
    await replaceCode(userController, 'JWT_REQUIRE', jwtRequire);
    await replaceCode(userController, 'GENERATE_TOKEN', generateTokenHelper);
  } else {
    await replaceCode(userController, 'ENSURE_AUTHENTICATED_MIDDLEWARE', passportEnsureAuthenticated);
    await replaceCode(userController, 'PASSPORT_REQUIRE', passportRequire);
    await replaceCode(server, 'PASSPORT_REQUIRE', passportRequire);
    await replaceCode(server, 'PASSPORT_MIDDLEWARE', passportMiddleware);
    await replaceCode(server, 'PASSPORT_CONFIG_REQUIRE', passportConfigRequire);
  }

  // Add user controller reference
  await replaceCode(server, 'USER_CONTROLLER', userControllerRequire);


  if (params.jsFramework) {
    await replaceCode(server, 'UNLINK_ROUTE', unlinkRoute);
    await replaceCode(server, 'ACCOUNT_ROUTES', accountRoutesJwt);

    await addNpmPackage('jsonwebtoken', params);
    await addNpmPackage('moment', params);
  } else {
    await copy(passportConfigModule, passportJs);

    // Add passport.js serializer function
    await replaceCode(passportJs, 'PASSPORT_SERIALIZER', passportSerializer);

    // Add User model reference to passport.js config
    await replaceCode(passportJs, 'PASSPORT_USER_MODEL', userModelPassportRequire);

    // Add app routes
    await replaceCode(server, 'LOGOUT_ROUTE', logoutRoute);
    await replaceCode(server, 'UNLINK_ROUTE', unlinkRoute);
    await replaceCode(server, 'ACCOUNT_ROUTES', accountRoutesPassport);
    await replaceCode(userController, 'USER_SIGNUP_GET', join(__dirname, 'modules', 'controllers', 'user-signup-get.js'));
    await replaceCode(userController, 'USER_LOGIN_GET', join(__dirname, 'modules', 'controllers', 'user-login-get.js'));
    await replaceCode(userController, 'USER_LOGIN_POST', join(__dirname, 'modules', 'controllers', 'user-login-post.js'));
    await replaceCode(userController, 'USER_LOGOUT', join(__dirname, 'modules', 'controllers', 'user-logout.js'));
    await replaceCode(userController, 'USER_ACCOUNT_GET', join(__dirname, 'modules', 'controllers', 'user-account-get.js'));
    await replaceCode(userController, 'USER_FORGOT_GET', join(__dirname, 'modules', 'controllers', 'user-forgot-get.js'));
    await replaceCode(userController, 'USER_RESET_GET_ROUTE', join(__dirname, 'modules', 'controllers', 'user-reset-get-route.js'));

    await addNpmPackage('passport', params);
  }

  switch (params.database) {
    case 'mongodb':
      const mongooseModel = join(__dirname, 'modules', 'models', 'mongodb', 'user.js');
      const userHelperMiddlewareForMongoDb = join(__dirname, 'modules', 'common', 'user-middleware-mongodb.js');

      await copy(mongooseModel, join(build, 'models', 'user.js'));

      await replaceCode(userController, 'USER_SIGNUP_POST', join(__dirname, 'modules', 'controllers', 'mongodb', 'user-signup-post.js'), { indentLevel: 1 });
      await replaceCode(userController, 'USER_ACCOUNT_PUT', join(__dirname, 'modules', 'controllers', 'mongodb', 'user-account-put.js'), { indentLevel: 1 });
      await replaceCode(userController, 'USER_ACCOUNT_DELETE', join(__dirname, 'modules', 'controllers', 'mongodb', 'user-account-delete.js'), { indentLevel: 1 });
      await replaceCode(userController, 'USER_PROVIDER_UNLINK', join(__dirname, 'modules', 'controllers', 'mongodb', 'user-provider-unlink.js'), { indentLevel: 1 });
      await replaceCode(userController, 'USER_FORGOT_POST', join(__dirname, 'modules', 'controllers', 'mongodb', 'user-forgot-post.js'), { indentLevel: 3 });
      await replaceCode(userController, 'USER_RESET_GET', join(__dirname, 'modules', 'controllers', 'mongodb', 'user-reset-get.js'), { indentLevel: 1 });
      await replaceCode(userController, 'USER_RESET_POST', join(__dirname, 'modules', 'controllers', 'mongodb', 'user-reset-post.js'), { indentLevel: 3 });

      if (params.jsFramework) {
        await replaceCode(userController, 'USER_LOGIN_POST', join(__dirname, 'modules', 'controllers', 'mongodb', 'user-login-jwt-post.js'), { indentLevel: 1 });
        await replaceCode(userController, 'PROFILE_UPDATE_RESPONSE', join(__dirname, 'modules', 'controllers', 'responses', 'json', 'profile-update-response-mongodb.js'), { indentLevel: 3 });
      } else {
        await replaceCode(server, 'USER_HELPER_MIDDLEWARE', userHelperMiddlewareForMongoDb);
        await replaceCode(passportJs, 'PASSPORT_DESERIALIZER', passportDeserializerMongoDb);
        await replaceCode(userController, 'PROFILE_UPDATE_RESPONSE', join(__dirname, 'modules', 'controllers', 'responses', 'session', 'profile-update-response-mongodb.js'), { indentLevel: 3 });
      }
      break;

    case 'mysql':
    case 'sqlite':
    case 'postgresql':
      const bookshelfModel = join(__dirname, 'modules', 'models', 'sql', 'user.js');
      const userHelperMiddlewareForSql = join(__dirname, 'modules', 'common', 'user-middleware-sql.js');

      await copy(bookshelfModel, join(build, 'models', 'user.js'));
      await copy(join(__dirname, 'modules', 'migrations'), join(build, 'migrations'));

      await replaceCode(userController, 'USER_SIGNUP_POST', join(__dirname, 'modules', 'controllers', 'sql', 'user-signup-post.js'), { indentLevel: 1 });
      await replaceCode(userController, 'USER_ACCOUNT_PUT', join(__dirname, 'modules', 'controllers', 'sql', 'user-account-put.js'), { indentLevel: 1 });
      await replaceCode(userController, 'USER_ACCOUNT_DELETE', join(__dirname, 'modules', 'controllers', 'sql', 'user-account-delete.js'), { indentLevel: 1 });
      await replaceCode(userController, 'USER_PROVIDER_UNLINK', join(__dirname, 'modules', 'controllers', 'sql', 'user-provider-unlink.js'), { indentLevel: 1 });
      await replaceCode(userController, 'USER_FORGOT_POST', join(__dirname, 'modules', 'controllers', 'sql', 'user-forgot-post.js'), { indentLevel: 3 });
      await replaceCode(userController, 'USER_RESET_GET', join(__dirname, 'modules', 'controllers', 'sql', 'user-reset-get.js'), { indentLevel: 1 });
      await replaceCode(userController, 'USER_RESET_POST', join(__dirname, 'modules', 'controllers', 'sql', 'user-reset-post.js'), { indentLevel: 3 });

      if (params.jsFramework) {
        await replaceCode(userController, 'USER_LOGIN_POST', join(__dirname, 'modules', 'controllers', 'sql', 'user-login-jwt-post.js'), { indentLevel: 1 });
        await replaceCode(userController, 'PROFILE_UPDATE_RESPONSE', join(__dirname, 'modules', 'controllers', 'responses', 'json', 'profile-update-response-sql.js'), { indentLevel: 2 });
      } else {
        await replaceCode(server, 'USER_HELPER_MIDDLEWARE', userHelperMiddlewareForSql);
        await replaceCode(passportJs, 'PASSPORT_DESERIALIZER', passportDeserializerSql);
        await replaceCode(userController, 'PROFILE_UPDATE_RESPONSE', join(__dirname, 'modules', 'controllers', 'responses', 'session', 'profile-update-response-sql.js'), { indentLevel: 2 });
      }
      break;

    default:
      break;
  }

  if (params.jsFramework) {
    await replaceCode(userController, 'SIGNUP_VALIDATION_ERROR', join(__dirname, 'modules', 'controllers', 'responses', 'json', 'common-validation-error.js'), { indentLevel: 2 });
    await replaceCode(userController, 'SIGNUP_EMAIL_ALREADY_EXISTS', join(__dirname, 'modules', 'controllers', 'responses', 'json', 'signup-email-already-exists.js'), { indentLevel: 2 });
    await replaceCode(userController, 'SIGNUP_SUCCESS_RESPONSE', join(__dirname, 'modules', 'controllers', 'responses', 'json', 'signup-success-response.js'), { indentLevel: 2 });
    await replaceCode(userController, 'PROFILE_UPDATE_VALIDATION_ERROR', join(__dirname, 'modules', 'controllers', 'responses', 'json', 'common-validation-error.js'), { indentLevel: 2 });
    await replaceCode(userController, 'ACCOUNT_DELETE_SUCCESS', join(__dirname, 'modules', 'controllers', 'responses', 'json', 'account-delete-success.js'), { indentLevel: 1 });
    await replaceCode(userController, 'PROVIDER_UNLINK_ERROR', join(__dirname, 'modules', 'controllers', 'responses', 'json', 'provider-unlink-error.js'), { indentLevel: 4 });
    await replaceCode(userController, 'PROVIDER_UNLINK_SUCCESS', join(__dirname, 'modules', 'controllers', 'responses', 'json', 'provider-unlink-success.js'), { indentLevel: 3 });
    await replaceCode(userController, 'FORGOT_POST_VALIDATION_ERROR', join(__dirname, 'modules', 'controllers', 'responses', 'json', 'common-validation-error.js'), { indentLevel: 2 });
    await replaceCode(userController, 'FORGOT_POST_INVALID_EMAIL_ERROR', join(__dirname, 'modules', 'controllers', 'responses', 'json', 'forgot-post-invalid-email-error.js'), { indentLevel: 2 });
    await replaceCode(userController, 'FORGOT_POST_SUCCESS', join(__dirname, 'modules', 'controllers', 'responses', 'json', 'forgot-post-success.js'), { indentLevel: 4 });
    await replaceCode(userController, 'RESET_POST_VALIDATION_ERROR', join(__dirname, 'modules', 'controllers', 'responses', 'json', 'common-validation-error.js'), { indentLevel: 3 });
    await replaceCode(userController, 'RESET_POST_INVALID_TOKEN_ERROR', join(__dirname, 'modules', 'controllers', 'responses', 'json', 'reset-post-invalid-token-error.js'), { indentLevel: 2 });
    await replaceCode(userController, 'RESET_POST_SUCCESS', join(__dirname, 'modules', 'controllers', 'responses', 'json', 'reset-post-success.js'), { indentLevel: 3 });
  } else {
    await replaceCode(userController, 'SIGNUP_VALIDATION_ERROR', join(__dirname, 'modules', 'controllers', 'responses', 'session', 'signup-validation-error.js'), { indentLevel: 2 });
    await replaceCode(userController, 'SIGNUP_EMAIL_ALREADY_EXISTS', join(__dirname, 'modules', 'controllers', 'responses', 'session', 'signup-email-already-exists.js'), { indentLevel: 3 });
    await replaceCode(userController, 'SIGNUP_SUCCESS_RESPONSE', join(__dirname, 'modules', 'controllers', 'responses', 'session', 'signup-success-response.js'), { indentLevel: 3 });
    await replaceCode(userController, 'PROFILE_UPDATE_VALIDATION_ERROR', join(__dirname, 'modules', 'controllers', 'responses', 'session', 'profile-update-validation-error.js'), { indentLevel: 2 });
    await replaceCode(userController, 'ACCOUNT_DELETE_SUCCESS', join(__dirname, 'modules', 'controllers', 'responses', 'session', 'account-delete-success.js'), { indentLevel: 2 });
    await replaceCode(userController, 'PROVIDER_UNLINK_ERROR', join(__dirname, 'modules', 'controllers', 'responses', 'session', 'provider-unlink-error.js'), { indentLevel: 4 });
    await replaceCode(userController, 'PROVIDER_UNLINK_SUCCESS', join(__dirname, 'modules', 'controllers', 'responses', 'session', 'provider-unlink-success.js'), { indentLevel: 3 });
    await replaceCode(userController, 'FORGOT_POST_VALIDATION_ERROR', join(__dirname, 'modules', 'controllers', 'responses', 'session', 'forgot-post-validation-error.js'), { indentLevel: 2 });
    await replaceCode(userController, 'FORGOT_POST_INVALID_EMAIL_ERROR', join(__dirname, 'modules', 'controllers', 'responses', 'session', 'forgot-post-invalid-email-error.js'), { indentLevel: 4 });
    await replaceCode(userController, 'FORGOT_POST_SUCCESS', join(__dirname, 'modules', 'controllers', 'responses', 'session', 'forgot-post-success.js'), { indentLevel: 4 });
    await replaceCode(userController, 'RESET_POST_VALIDATION_ERROR', join(__dirname, 'modules', 'controllers', 'responses', 'session', 'reset-post-validation-error.js'), { indentLevel: 2 });
    await replaceCode(userController, 'RESET_POST_INVALID_TOKEN_ERROR', join(__dirname, 'modules', 'controllers', 'responses', 'session', 'reset-post-invalid-token-error.js'), { indentLevel: 5 });
    await replaceCode(userController, 'RESET_POST_SUCCESS', join(__dirname, 'modules', 'controllers', 'responses', 'session', 'reset-post-success.js'), { indentLevel: 4 });


  }

  const usingOAuth = (
    params.authentication.includes('facebook') ||
    params.authentication.includes('twitter') ||
    params.authentication.includes('google')
  );

  switch (params.templateEngine) {
    case 'jade':
      if (params.jsFramework) {
        if (usingOAuth) {
          await cpy([join(__dirname, 'modules', 'common', 'views', 'jade', 'loading.jade')], join(build, 'views'));
        }
      } else {
        const login = join(__dirname, 'modules', 'common', 'views', 'jade', `login-${params.cssFramework}.jade`);
        const signup = join(__dirname, 'modules', 'common', 'views', 'jade', `signup-${params.cssFramework}.jade`);
        const forgot = join(__dirname, 'modules', 'common', 'views', 'jade', `forgot-${params.cssFramework}.jade`);
        const reset = join(__dirname, 'modules', 'common', 'views', 'jade', `reset-${params.cssFramework}.jade`);
        const profile = join(__dirname, 'modules', 'common', 'views', 'jade', `profile-${params.cssFramework}.jade`);

        await copy(login, join(build, 'views', 'account', 'login.jade'));
        await copy(signup, join(build, 'views', 'account', 'signup.jade'));
        await copy(forgot, join(build, 'views', 'account', 'forgot.jade'));
        await copy(reset, join(build, 'views', 'account', 'reset.jade'));
        await copy(profile, join(build, 'views', 'account', 'profile.jade'));
      }
      break;
    case 'handlebars':
      if (params.jsFramework) {
        if (usingOAuth) {
          await cpy([join(__dirname, 'modules', 'common', 'views', 'handlebars', 'loading.handlebars')], join(build, 'views'));
        }
      } else {
        const login = join(__dirname, 'modules', 'common', 'views', 'handlebars', `login-${params.cssFramework}.handlebars`);
        const signup = join(__dirname, 'modules', 'common', 'views', 'handlebars', `signup-${params.cssFramework}.handlebars`);
        const forgot = join(__dirname, 'modules', 'common', 'views', 'handlebars', `forgot-${params.cssFramework}.handlebars`);
        const reset = join(__dirname, 'modules', 'common', 'views', 'handlebars', `reset-${params.cssFramework}.handlebars`);
        const profile = join(__dirname, 'modules', 'common', 'views', 'handlebars', `profile-${params.cssFramework}.handlebars`);

        await copy(login, join(build, 'views', 'account', 'login.handlebars'));
        await copy(signup, join(build, 'views', 'account', 'signup.handlebars'));
        await copy(forgot, join(build, 'views', 'account', 'forgot.handlebars'));
        await copy(reset, join(build, 'views', 'account', 'reset.handlebars'));
        await copy(profile, join(build, 'views', 'account', 'profile.handlebars'));
      }
      break;
    case 'nunjucks':
      if (params.jsFramework) {
        if (usingOAuth) {
          await cpy([join(__dirname, 'modules', 'common', 'views', 'nunjucks', 'loading.html')], join(build, 'views'));
        } else {
          const login = join(__dirname, 'modules', 'common', 'views', 'nunjucks', `login-${params.cssFramework}.html`);
          const signup = join(__dirname, 'modules', 'common', 'views', 'nunjucks', `signup-${params.cssFramework}.html`);
          const forgot = join(__dirname, 'modules', 'common', 'views', 'nunjucks', `forgot-${params.cssFramework}.html`);
          const reset = join(__dirname, 'modules', 'common', 'views', 'nunjucks', `reset-${params.cssFramework}.html`);
          const profile = join(__dirname, 'modules', 'common', 'views', 'nunjucks', `profile-${params.cssFramework}.html`);

          await copy(login, join(build, 'views', 'account', 'login.html'));
          await copy(signup, join(build, 'views', 'account', 'signup.html'));
          await copy(forgot, join(build, 'views', 'account', 'forgot.html'));
          await copy(reset, join(build, 'views', 'account', 'reset.html'));
          await copy(profile, join(build, 'views', 'account', 'profile.html'));
        }
      }
      break;
    default:
      break;
  }

  if (params.jsFramework) {
    await appendFile(env, '\nTOKEN_SECRET=Secret key for signing and verifying JWT\n');
  }
}

export default generateCommonAuthenticationExpress;
