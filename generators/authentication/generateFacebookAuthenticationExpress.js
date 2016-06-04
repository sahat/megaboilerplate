import { getModule, replaceCodeMemory, templateReplaceMemory, addEnvMemory, addNpmPackageMemory } from '../utils';

export default async function generateFacebookAuthenticationExpress(params) {
  if (params.jsFramework) {
    await replaceCodeMemory(params, 'server.js', 'FACEBOOK_ROUTES', await getModule('authentication/facebook/jwt-routes.js'));
    await replaceCodeMemory(params, 'controllers/user.js', 'AUTH_FACEBOOK_JWT', await getModule('authentication/facebook/facebook-jwt.js'));

    if (params.jsFramework === 'react') {
      const isHandlebars = params.templateEngine === 'handlebars' ? '-handlebars' : '';
      await replaceCodeMemory(params, 'controllers/user.js', 'AUTH_JWT_CALLBACK', await getModule(`authentication/controllers/jwt-callback-render${isHandlebars}.js`));
    } else if (params.jsFramework === 'angularjs') {
      await replaceCodeMemory(params, 'controllers/user.js', 'AUTH_JWT_CALLBACK', await getModule('authentication/controllers/jwt-callback-send.js'));
    }
  } else {
    await replaceCodeMemory(params, 'server.js', 'FACEBOOK_ROUTES', await getModule('authentication/facebook/passport-routes.js'));
    await replaceCodeMemory(params, 'config/passport.js', 'PASSPORT_FACEBOOK_REQUIRE', await getModule('authentication/facebook/passport-require.js'));
    addNpmPackageMemory('passport-facebook', params);
  }

  switch (params.database) {
    case 'mongodb':
      if (params.jsFramework) {
        await replaceCodeMemory(params, 'controllers/user.js', 'AUTH_FACEBOOK_JWT_DB', await getModule('authentication/facebook/facebook-jwt-mongodb.js'), { indentLevel: 3 });
      } else {
        await replaceCodeMemory(params, 'config/passport.js', 'PASSPORT_FACEBOOK_STRATEGY', await getModule('authentication/facebook/facebook-strategy-mongodb.js'));
      }
      break;
    case 'mysql':
    case 'sqlite':
    case 'postgresql':
      if (params.jsFramework) {
        await replaceCodeMemory(params, 'controllers/user.js', 'AUTH_FACEBOOK_JWT_DB', await getModule('authentication/facebook/facebook-jwt-sql.js'), { indentLevel: 3 });
      } else {
        await replaceCodeMemory(params, 'config/passport.js', 'PASSPORT_FACEBOOK_STRATEGY', await getModule('authentication/facebook/facebook-strategy-sql.js'));
      }
      break;
    default:
      break;
  }

  if (params.jsFramework) {
    addEnvMemory(params, {
      FACEBOOK_SECRET: 'fb9416c436edd2690c6f6adbd94374d1'
    });
  } else {
    addEnvMemory(params, {
      FACEBOOK_ID: '980220002068787',
      FACEBOOK_SECRET: 'fb9416c436edd2690c6f6adbd94374d1'
    });
  }

  if (params.jsFramework && params.jsFramework === 'angularjs') {
    await replaceCodeMemory(params, 'app/partials/login.html', 'SIGN_IN_WITH_FACEBOOK', await getModule(`authentication/facebook/views/sign-in-button-angular-${params.cssFramework}.html`));
    await replaceCodeMemory(params, 'app/partials/signup.html', 'SIGN_IN_WITH_FACEBOOK', await getModule(`authentication/facebook/views/sign-in-button-angular-${params.cssFramework}.html`));
  } else if (params.jsFramework && params.jsFramework === 'react') {
    await replaceCodeMemory(params, 'app/components/Account/Login.js', 'SIGN_IN_WITH_FACEBOOK', await getModule(`authentication/facebook/views/sign-in-button-react-${params.cssFramework}.js`));
    await replaceCodeMemory(params, 'app/components/Account/Signup.js', 'SIGN_IN_WITH_FACEBOOK', await getModule(`authentication/facebook/views/sign-in-button-react-${params.cssFramework}.js`));
  } else {
    switch (params.templateEngine) {
      case 'jade':
        await replaceCodeMemory(params, 'views/account/login.jade', 'SIGN_IN_WITH_FACEBOOK', await getModule(`authentication/facebook/views/sign-in-button-${params.cssFramework}.jade`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/signup.jade', 'SIGN_IN_WITH_FACEBOOK', await getModule(`authentication/facebook/views/sign-in-button-${params.cssFramework}.jade`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/profile.jade', 'FACEBOOK_LINK', await getModule('authentication/common/views/jade/oauth-link.jade'));
        templateReplaceMemory(params, 'views/account/profile.jade', {
          providerPath: 'facebook',
          providerName: 'Facebook'
        });
        break;
      case 'handlebars':
        await replaceCodeMemory(params, 'views/account/login.handlebars', 'SIGN_IN_WITH_FACEBOOK', await getModule(`authentication/facebook/views/sign-in-button-${params.cssFramework}.html`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/signup.handlebars', 'SIGN_IN_WITH_FACEBOOK', await getModule(`authentication/facebook/views/sign-in-button-${params.cssFramework}.html`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/profile.handlebars', 'FACEBOOK_LINK', await getModule('authentication/common/views/handlebars/oauth-link.handlebars'));
        templateReplaceMemory(params, 'views/account/profile.handlebars', {
          providerPath: 'facebook',
          providerName: 'Facebook'
        });
        break;
      case 'nunjucks':
        await replaceCodeMemory(params, 'views/account/login.html', 'SIGN_IN_WITH_FACEBOOK', await getModule(`authentication/facebook/views/sign-in-button-${params.cssFramework}.html`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/signup.html', 'SIGN_IN_WITH_FACEBOOK', await getModule(`authentication/facebook/views/sign-in-button-${params.cssFramework}.html`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/profile.html', 'FACEBOOK_LINK', await getModule('authentication/common/views/nunjucks/oauth-link.html'));
        templateReplaceMemory(params, 'views/account/profile.html', {
          providerPath: 'facebook',
          providerName: 'Facebook'
        });
        break;
      default:
        break;
    }
  }

  if (params.jsFramework === 'react') {
    await replaceCodeMemory(params, 'app/actions/oauth.js', 'FACEBOOK_LOGIN_ACTION', await getModule('js-framework/react/actions/oauth/facebook.js'));
    await replaceCodeMemory(params, 'app/actions/oauth.js', 'FACEBOOK_LINK_ACTION', await getModule('js-framework/react/actions/oauth/facebook-link.js'));
    await replaceCodeMemory(params, 'app/components/Account/Profile.js', 'FACEBOOK_LINK', await getModule(`js-framework/react/components/Account/profile/facebook-link-${params.cssFramework}.js`));
    await replaceCodeMemory(params, 'app/components/Account/Profile.js', 'FACEBOOK_LINK_REFERENCE', await getModule('js-framework/react/components/Account/profile/facebook-link-reference.js'));
  }

  if (params.jsFramework === 'angularjs') {
    await replaceCodeMemory(params, 'app/partials/profile.html', 'FACEBOOK_LINK', await getModule(`js-framework/angularjs/partials/profile/facebook-link-${params.cssFramework}.html`));
    await replaceCodeMemory(params, 'app/app.js', 'SATELLIZER_FACEBOOK_CONFIG', await getModule('js-framework/angularjs/satellizer-facebook.js'));
  }
}
