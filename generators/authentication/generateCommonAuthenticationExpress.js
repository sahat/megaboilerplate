import { set } from 'lodash';
import { randomBytes } from 'crypto';
import { getModule, replaceCodeMemory, addNpmPackageMemory, addEnvMemory } from '../utils';

export default async function generateCommonAuthenticationExpress(params) {
  // Add User controller
  set(params.build, ['controllers', 'user.js'], await getModule('authentication/controllers/user.js'));

  if (params.jsFramework) {
    await replaceCodeMemory(params, 'server.js', 'IS_AUTHENTICATED_MIDDLEWARE', await getModule('authentication/common/is-authenticated-jwt.js'));
    await replaceCodeMemory(params, 'server.js', 'JWT_REQUIRE', await getModule('authentication/common/jwt-require-server.js'));
    await replaceCodeMemory(params, 'server.js', 'USER_MODEL_REQUIRE', await getModule('authentication/models/user-model-app-require.js'));
    await replaceCodeMemory(params, 'controllers/user.js', 'ENSURE_AUTHENTICATED_MIDDLEWARE', await getModule('authentication/common/ensure-authenticated-jwt.js'));
    await replaceCodeMemory(params, 'controllers/user.js', 'JWT_REQUIRE', await getModule('authentication/common/jwt-require-controller.js'));
    await replaceCodeMemory(params, 'controllers/user.js', 'GENERATE_TOKEN', await getModule('authentication/common/generate-token.js'));
  } else {
    await replaceCodeMemory(params, 'controllers/user.js', 'ENSURE_AUTHENTICATED_MIDDLEWARE', await getModule('authentication/common/ensure-authenticated-passport.js'));
    await replaceCodeMemory(params, 'controllers/user.js', 'PASSPORT_REQUIRE', await getModule('authentication/common/passport-require.js'));
    await replaceCodeMemory(params, 'server.js', 'PASSPORT_REQUIRE', await getModule('authentication/common/passport-require.js'));
    await replaceCodeMemory(params, 'server.js', 'PASSPORT_MIDDLEWARE', await getModule('authentication/common/passport-middleware.js'));
    await replaceCodeMemory(params, 'server.js', 'PASSPORT_CONFIG_REQUIRE', await getModule('authentication/common/passport-config-require.js'));
  }

  // Add user controller reference
  await replaceCodeMemory(params, 'server.js', 'USER_CONTROLLER', await getModule('authentication/controllers/user-require.js'));

  if (params.jsFramework) {
    await replaceCodeMemory(params, 'server.js', 'UNLINK_ROUTE', await getModule('authentication/common/unlink-route.js'));
    await replaceCodeMemory(params, 'server.js', 'ACCOUNT_ROUTES', await getModule('authentication/common/routes/account-routes-jwt.js'));
    await addNpmPackageMemory('jsonwebtoken', params);
    await addNpmPackageMemory('moment', params);
    await addNpmPackageMemory('request', params);
  } else {
    set(params.build, ['config', 'passport.js'], await getModule('authentication/common/passport-config.js'));

    // Add passport.js serializer function
    await replaceCodeMemory(params, 'config/passport.js', 'PASSPORT_SERIALIZER', await getModule('authentication/common/passport-serializer.js'));

    // Add User model reference to passport.js config
    await replaceCodeMemory(params, 'config/passport.js', 'PASSPORT_USER_MODEL', await getModule('authentication/models/user-model-passport-require.js'));

    // Add app routes
    await replaceCodeMemory(params, 'server.js', 'LOGOUT_ROUTE', await getModule('authentication/common/logout-route.js'));
    await replaceCodeMemory(params, 'server.js', 'UNLINK_ROUTE', await getModule('authentication/common/unlink-route.js'));
    await replaceCodeMemory(params, 'server.js', 'ACCOUNT_ROUTES', await getModule('authentication/common/routes/account-routes-passport.js'));

    // Add user controller methods
    await replaceCodeMemory(params, 'controllers/user.js', 'USER_SIGNUP_GET', await getModule('authentication/controllers/user-signup-get.js'));
    await replaceCodeMemory(params, 'controllers/user.js', 'USER_LOGIN_GET', await getModule('authentication/controllers/user-login-get.js'));
    await replaceCodeMemory(params, 'controllers/user.js', 'USER_LOGIN_POST', await getModule('authentication/controllers/user-login-post.js'));
    await replaceCodeMemory(params, 'controllers/user.js', 'USER_LOGOUT', await getModule('authentication/controllers/user-logout.js'));
    await replaceCodeMemory(params, 'controllers/user.js', 'USER_ACCOUNT_GET', await getModule('authentication/controllers/user-account-get.js'));
    await replaceCodeMemory(params, 'controllers/user.js', 'USER_FORGOT_GET', await getModule('authentication/controllers/user-forgot-get.js'));
    await replaceCodeMemory(params, 'controllers/user.js', 'USER_RESET_GET_ROUTE', await getModule('authentication/controllers/user-reset-get-route.js'));

    await addNpmPackageMemory('passport', params);
  }

  switch (params.database) {
    case 'mongodb':
      // User model
      set(params.build, ['models', 'User.js'], await getModule('authentication/models/mongodb/user.js'));

      await replaceCodeMemory(params, 'controllers/user.js', 'USER_SIGNUP_POST', await getModule('authentication/controllers/mongodb/user-signup-post.js'), { indentLevel: 1 });
      await replaceCodeMemory(params, 'controllers/user.js', 'USER_ACCOUNT_PUT', await getModule('authentication/controllers/mongodb/user-account-put.js'), { indentLevel: 1 });
      await replaceCodeMemory(params, 'controllers/user.js', 'USER_ACCOUNT_DELETE', await getModule('authentication/controllers/mongodb/user-account-delete.js'), { indentLevel: 1 });
      await replaceCodeMemory(params, 'controllers/user.js', 'USER_PROVIDER_UNLINK', await getModule('authentication/controllers/mongodb/user-provider-unlink.js'), { indentLevel: 1 });
      await replaceCodeMemory(params, 'controllers/user.js', 'USER_FORGOT_POST', await getModule('authentication/controllers/mongodb/user-forgot-post.js'), { indentLevel: 3 });
      await replaceCodeMemory(params, 'controllers/user.js', 'USER_RESET_GET', await getModule('authentication/controllers/mongodb/user-reset-get.js'), { indentLevel: 1 });
      await replaceCodeMemory(params, 'controllers/user.js', 'USER_RESET_POST', await getModule('authentication/controllers/mongodb/user-reset-post.js'), { indentLevel: 3 });

      if (params.jsFramework) {
        await replaceCodeMemory(params, 'server.js', 'IS_AUTHENTICATION_USER_QUERY', await getModule('authentication/common/is-authenticated-jwt-mongodb.js'));
        await replaceCodeMemory(params, 'controllers/user.js', 'USER_LOGIN_POST', await getModule('authentication/controllers/mongodb/user-login-jwt-post.js'), { indentLevel: 1 });
        await replaceCodeMemory(params, 'controllers/user.js', 'PROFILE_UPDATE_RESPONSE', await getModule('authentication/controllers/responses/json/profile-update-response-mongodb.js'), { indentLevel: 3 });
        await replaceCodeMemory(params, 'controllers/user.js', 'USER_RESET_POST_SUCCESS', await getModule('authentication/controllers/responses/json/user-reset-post-success-mongodb.js'));
      } else {
        await replaceCodeMemory(params, 'server.js', 'USER_HELPER_MIDDLEWARE', await getModule('authentication/common/user-middleware-mongodb.js'));
        await replaceCodeMemory(params, 'config/passport.js', 'PASSPORT_DESERIALIZER', await getModule('authentication/common/passport-deserializer.js'));
        await replaceCodeMemory(params, 'controllers/user.js', 'PROFILE_UPDATE_RESPONSE', await getModule('authentication/controllers/responses/session/profile-update-response-mongodb.js'), { indentLevel: 3 });
        await replaceCodeMemory(params, 'controllers/user.js', 'USER_RESET_POST_SUCCESS', await getModule('authentication/controllers/responses/session/user-reset-post-success-mongodb.js'));
      }
      break;
    case 'mysql':
    case 'sqlite':
    case 'postgresql':
      // User model and migrations
      set(params.build, ['models', 'User.js'], await getModule('authentication/models/sql/user.js'));
      set(params.build, ['migrations', '20160315161907_users.js'], await getModule('authentication/migrations/20160315161907_users.js'));

      await replaceCodeMemory(params, 'controllers/user.js', 'USER_SIGNUP_POST', await getModule('authentication/controllers/sql/user-signup-post.js'), { indentLevel: 1 });
      await replaceCodeMemory(params, 'controllers/user.js', 'USER_ACCOUNT_PUT', await getModule('authentication/controllers/sql/user-account-put.js'), { indentLevel: 1 });
      await replaceCodeMemory(params, 'controllers/user.js', 'USER_ACCOUNT_DELETE', await getModule('authentication/controllers/sql/user-account-delete.js'), { indentLevel: 1 });
      await replaceCodeMemory(params, 'controllers/user.js', 'USER_PROVIDER_UNLINK', await getModule('authentication/controllers/sql/user-provider-unlink.js'), { indentLevel: 1 });
      await replaceCodeMemory(params, 'controllers/user.js', 'USER_FORGOT_POST', await getModule('authentication/controllers/sql/user-forgot-post.js'), { indentLevel: 3 });
      await replaceCodeMemory(params, 'controllers/user.js', 'USER_RESET_GET', await getModule('authentication/controllers/sql/user-reset-get.js'), { indentLevel: 1 });
      await replaceCodeMemory(params, 'controllers/user.js', 'USER_RESET_POST', await getModule('authentication/controllers/sql/user-reset-post.js'), { indentLevel: 3 });

      if (params.jsFramework) {
        await replaceCodeMemory(params, 'server.js', 'IS_AUTHENTICATION_USER_QUERY', await getModule('authentication/common/is-authenticated-jwt-sql.js'));
        await replaceCodeMemory(params, 'controllers/user.js', 'USER_LOGIN_POST', await getModule('authentication/controllers/sql/user-login-jwt-post.js'), { indentLevel: 1 });
        await replaceCodeMemory(params, 'controllers/user.js', 'PROFILE_UPDATE_RESPONSE', await getModule('authentication/controllers/responses/json/profile-update-response-sql.js'), { indentLevel: 1 });
        await replaceCodeMemory(params, 'controllers/user.js', 'USER_RESET_POST_SUCCESS', await getModule('authentication/controllers/responses/json/user-reset-post-success-sql.js'));
      } else {
        await replaceCodeMemory(params, 'server.js', 'USER_HELPER_MIDDLEWARE', await getModule('authentication/common/user-middleware-sql.js'));
        await replaceCodeMemory(params, 'config/passport.js', 'PASSPORT_DESERIALIZER', await getModule('authentication/common/passport-deserializer-sql.js'));
        await replaceCodeMemory(params, 'controllers/user.js', 'PROFILE_UPDATE_RESPONSE', await getModule('authentication/controllers/responses/session/profile-update-response-sql.js'), { indentLevel: 1 });
        await replaceCodeMemory(params, 'controllers/user.js', 'USER_RESET_POST_SUCCESS', await getModule('authentication/controllers/responses/session/user-reset-post-success-sql.js'));
      }
      break;
    default:
      break;
  }

  if (params.jsFramework) {
    await replaceCodeMemory(params, 'controllers/user.js', 'SIGNUP_VALIDATION_ERROR', await getModule('authentication/controllers/responses/json/common-validation-error.js'), { indentLevel: 2 });
    await replaceCodeMemory(params, 'controllers/user.js', 'SIGNUP_EMAIL_ALREADY_EXISTS', await getModule('authentication/controllers/responses/json/signup-email-already-exists.js'), { indentLevel: 2 });
    await replaceCodeMemory(params, 'controllers/user.js', 'SIGNUP_SUCCESS_RESPONSE', await getModule('authentication/controllers/responses/json/signup-success-response.js'), { indentLevel: 2 });
    await replaceCodeMemory(params, 'controllers/user.js', 'PROFILE_UPDATE_VALIDATION_ERROR', await getModule('authentication/controllers/responses/json/common-validation-error.js'), { indentLevel: 2 });
    await replaceCodeMemory(params, 'controllers/user.js', 'ACCOUNT_DELETE_SUCCESS', await getModule('authentication/controllers/responses/json/account-delete-success.js'));
    await replaceCodeMemory(params, 'controllers/user.js', 'PROVIDER_UNLINK_ERROR', await getModule('authentication/controllers/responses/json/provider-unlink-error.js'), { indentLevel: 4 });
    await replaceCodeMemory(params, 'controllers/user.js', 'PROVIDER_UNLINK_SUCCESS', await getModule('authentication/controllers/responses/json/provider-unlink-success.js'), { indentLevel: 3 });
    await replaceCodeMemory(params, 'controllers/user.js', 'FORGOT_POST_VALIDATION_ERROR', await getModule('authentication/controllers/responses/json/common-validation-error.js'), { indentLevel: 2 });
    await replaceCodeMemory(params, 'controllers/user.js', 'FORGOT_POST_INVALID_EMAIL_ERROR', await getModule('authentication/controllers/responses/json/forgot-post-invalid-email-error.js'));
    await replaceCodeMemory(params, 'controllers/user.js', 'FORGOT_POST_SUCCESS', await getModule('authentication/controllers/responses/json/forgot-post-success.js'), { indentLevel: 4 });
    await replaceCodeMemory(params, 'controllers/user.js', 'RESET_POST_VALIDATION_ERROR', await getModule('authentication/controllers/responses/json/common-validation-error.js'), { indentLevel: 3 });
    await replaceCodeMemory(params, 'controllers/user.js', 'RESET_POST_INVALID_TOKEN_ERROR', await getModule('authentication/controllers/responses/json/reset-post-invalid-token-error.js'));
    await replaceCodeMemory(params, 'controllers/user.js', 'RESET_POST_SUCCESS', await getModule('authentication/controllers/responses/json/reset-post-success.js'), { indentLevel: 4 });
  } else {
    await replaceCodeMemory(params, 'controllers/user.js', 'SIGNUP_VALIDATION_ERROR', await getModule('authentication/controllers/responses/session/signup-validation-error.js'), { indentLevel: 2 });
    await replaceCodeMemory(params, 'controllers/user.js', 'SIGNUP_EMAIL_ALREADY_EXISTS', await getModule('authentication/controllers/responses/session/signup-email-already-exists.js'), { indentLevel: 3 });
    await replaceCodeMemory(params, 'controllers/user.js', 'SIGNUP_SUCCESS_RESPONSE', await getModule('authentication/controllers/responses/session/signup-success-response.js'), { indentLevel: 3 });
    await replaceCodeMemory(params, 'controllers/user.js', 'PROFILE_UPDATE_VALIDATION_ERROR', await getModule('authentication/controllers/responses/session/profile-update-validation-error.js'), { indentLevel: 2 });
    await replaceCodeMemory(params, 'controllers/user.js', 'ACCOUNT_DELETE_SUCCESS', await getModule('authentication/controllers/responses/session/account-delete-success.js'));
    await replaceCodeMemory(params, 'controllers/user.js', 'PROVIDER_UNLINK_ERROR', await getModule('authentication/controllers/responses/session/provider-unlink-error.js'), { indentLevel: 4 });
    await replaceCodeMemory(params, 'controllers/user.js', 'PROVIDER_UNLINK_SUCCESS', await getModule('authentication/controllers/responses/session/provider-unlink-success.js'), { indentLevel: 3 });
    await replaceCodeMemory(params, 'controllers/user.js', 'FORGOT_POST_VALIDATION_ERROR', await getModule('authentication/controllers/responses/session/forgot-post-validation-error.js'), { indentLevel: 2 });
    await replaceCodeMemory(params, 'controllers/user.js', 'FORGOT_POST_INVALID_EMAIL_ERROR', await getModule('authentication/controllers/responses/session/forgot-post-invalid-email-error.js'));
    await replaceCodeMemory(params, 'controllers/user.js', 'FORGOT_POST_SUCCESS', await getModule('authentication/controllers/responses/session/forgot-post-success.js'), { indentLevel: 4 });
    await replaceCodeMemory(params, 'controllers/user.js', 'RESET_POST_VALIDATION_ERROR', await getModule('authentication/controllers/responses/session/reset-post-validation-error.js'), { indentLevel: 2 });
    await replaceCodeMemory(params, 'controllers/user.js', 'RESET_POST_INVALID_TOKEN_ERROR', await getModule('authentication/controllers/responses/session/reset-post-invalid-token-error.js'));
    await replaceCodeMemory(params, 'controllers/user.js', 'RESET_POST_SUCCESS', await getModule('authentication/controllers/responses/session/reset-post-success.js'), { indentLevel: 4 });
  }

  const isUsingOauth = (
    params.authentication.includes('facebook') ||
    params.authentication.includes('twitter') ||
    params.authentication.includes('google') ||
    params.authentication.includes('github')
  );

  switch (params.templateEngine) {
    case 'jade':
      if (params.jsFramework) {
        if (isUsingOauth && params.jsFramework === 'react') {
          set(params, ['build', 'views', 'loading.jade'], await getModule('authentication/common/views/jade/loading.jade'));
        }
      } else {
        set(params, ['build', 'views', 'account', 'login.jade'], await getModule(`authentication/common/views/jade/login-${params.cssFramework}.jade`));
        set(params, ['build', 'views', 'account', 'signup.jade'], await getModule(`authentication/common/views/jade/signup-${params.cssFramework}.jade`));
        set(params, ['build', 'views', 'account', 'forgot.jade'], await getModule(`authentication/common/views/jade/forgot-${params.cssFramework}.jade`));
        set(params, ['build', 'views', 'account', 'reset.jade'], await getModule(`authentication/common/views/jade/reset-${params.cssFramework}.jade`));
        set(params, ['build', 'views', 'account', 'profile.jade'], await getModule(`authentication/common/views/jade/profile-${params.cssFramework}.jade`));
      }
      break;
    case 'handlebars':
      if (params.jsFramework) {
        if (isUsingOauth && params.jsFramework === 'react') {
          set(params, ['build', 'views', 'loading.handlebars'], await getModule('authentication/common/views/handlebars/loading.handlebars'));
        }
      } else {
        set(params, ['build', 'views', 'account', 'login.handlebars'], await getModule(`authentication/common/views/handlebars/login-${params.cssFramework}.handlebars`));
        set(params, ['build', 'views', 'account', 'signup.handlebars'], await getModule(`authentication/common/views/handlebars/signup-${params.cssFramework}.handlebars`));
        set(params, ['build', 'views', 'account', 'forgot.handlebars'], await getModule(`authentication/common/views/handlebars/forgot-${params.cssFramework}.handlebars`));
        set(params, ['build', 'views', 'account', 'reset.handlebars'], await getModule(`authentication/common/views/handlebars/reset-${params.cssFramework}.handlebars`));
        set(params, ['build', 'views', 'account', 'profile.handlebars'], await getModule(`authentication/common/views/handlebars/profile-${params.cssFramework}.handlebars`));
      }
      break;
    case 'nunjucks':
      if (params.jsFramework) {
        if (isUsingOauth && params.jsFramework === 'react') {
          set(params, ['build', 'views', 'loading.html'], await getModule('authentication/common/views/nunjucks/loading.html'));
        }
      } else {
        set(params, ['build', 'views', 'account', 'login.html'], await getModule(`authentication/common/views/nunjucks/login-${params.cssFramework}.html`));
        set(params, ['build', 'views', 'account', 'signup.html'], await getModule(`authentication/common/views/nunjucks/signup-${params.cssFramework}.html`));
        set(params, ['build', 'views', 'account', 'forgot.html'], await getModule(`authentication/common/views/nunjucks/forgot-${params.cssFramework}.html`));
        set(params, ['build', 'views', 'account', 'reset.html'], await getModule(`authentication/common/views/nunjucks/reset-${params.cssFramework}.html`));
        set(params, ['build', 'views', 'account', 'profile.html'], await getModule(`authentication/common/views/nunjucks/profile-${params.cssFramework}.html`));
      }
      break;
    default:
      break;
  }

  if (params.jsFramework === 'angularjs') {
    await replaceCodeMemory(params, 'app/app.js', 'SATELLIZER_COMMON_CONFIG', await getModule('js-framework/angularjs/satellizer-common.js'));
  }

  if (params.jsFramework) {
    addEnvMemory(params, {
      TOKEN_SECRET: randomBytes(32).toString('hex')
    });
  }
}
