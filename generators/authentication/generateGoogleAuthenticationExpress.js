import { getModule, replaceCodeMemory, templateReplaceMemory, addEnvMemory, addNpmPackageMemory } from '../utils';

export default async function generateGoogleAuthenticationExpress(params) {
  if (params.jsFramework) {
    await replaceCodeMemory(params, 'server.js', 'GOOGLE_ROUTES', await getModule('authentication/google/jwt-routes.js'));
    await replaceCodeMemory(params, 'controllers/user.js', 'AUTH_GOOGLE_JWT', await getModule('authentication/google/google-jwt.js'));
    
    if (params.jsFramework === 'react') {
      const isHandlebars = params.templateEngine === 'handlebars' ? '-handlebars' : '';
      await replaceCodeMemory(params, 'controllers/user.js', 'AUTH_JWT_CALLBACK', await getModule(`authentication/controllers/jwt-callback-render${isHandlebars}.js`));
    } else if (params.jsFramework === 'angularjs') {
      await replaceCodeMemory(params, 'controllers/user.js', 'AUTH_JWT_CALLBACK', await getModule('authentication/controllers/jwt-callback-send.js'));
    }
  } else {
    await replaceCodeMemory(params, 'server.js', 'GOOGLE_ROUTES', await getModule('authentication/google/passport-routes.js'));
    await replaceCodeMemory(params, 'config/passport.js', 'PASSPORT_GOOGLE_REQUIRE', await getModule('authentication/google/passport-require.js'));
    addNpmPackageMemory('passport-google-oauth', params);
  }

  switch (params.database) {
    case 'mongodb':
      if (params.jsFramework) {
        await replaceCodeMemory(params, 'controllers/user.js', 'AUTH_GOOGLE_JWT_DB', await getModule('authentication/google/google-jwt-mongodb.js'), { indentLevel: 3 });
      } else {
        await replaceCodeMemory(params, 'config/passport.js', 'PASSPORT_GOOGLE_STRATEGY', await getModule('authentication/google/google-strategy-mongodb.js'));
      }
      break;
    case 'mysql':
    case 'sqlite':
    case 'postgresql':
      if (params.jsFramework) {
        await replaceCodeMemory(params, 'controllers/user.js', 'AUTH_GOOGLE_JWT_DB', await getModule('authentication/google/google-jwt-sql.js'), { indentLevel: 3 });
      } else {
        await replaceCodeMemory(params, 'config/passport.js', 'PASSPORT_GOOGLE_STRATEGY', await getModule('authentication/google/google-strategy-sql.js'));
      }
      break;
    default:
      break;
  }

  if (params.jsFramework) {
    addEnvMemory(params, {
      GOOGLE_SECRET: 'SyXmZcdT6vPFeqcs0jaPhdVP'
    });
  } else {
    addEnvMemory(params, {
      GOOGLE_ID: '814958990796-p1centjebv1k0htp3am05tfg5k10nl0k.apps.googleusercontent.com',
      GOOGLE_SECRET: 'SyXmZcdT6vPFeqcs0jaPhdVP'
    });
  }

  if (params.jsFramework && params.jsFramework === 'angularjs') {
    await replaceCodeMemory(params, 'app/partials/login.html', 'SIGN_IN_WITH_GOOGLE', await getModule(`authentication/google/views/sign-in-button-angular-${params.cssFramework}.html`));
    await replaceCodeMemory(params, 'app/partials/signup.html', 'SIGN_IN_WITH_GOOGLE', await getModule(`authentication/google/views/sign-in-button-angular-${params.cssFramework}.html`));
  } else if (params.jsFramework && params.jsFramework === 'react') {
    await replaceCodeMemory(params, 'app/components/Account/Login.js', 'SIGN_IN_WITH_GOOGLE', await getModule(`authentication/google/views/sign-in-button-react-${params.cssFramework}.js`));
    await replaceCodeMemory(params, 'app/components/Account/Signup.js', 'SIGN_IN_WITH_GOOGLE', await getModule(`authentication/google/views/sign-in-button-react-${params.cssFramework}.js`));
  } else {
    switch (params.templateEngine) {
      case 'jade':
        await replaceCodeMemory(params, 'views/account/login.jade', 'SIGN_IN_WITH_GOOGLE', await getModule(`authentication/google/views/sign-in-button-${params.cssFramework}.jade`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/signup.jade', 'SIGN_IN_WITH_GOOGLE', await getModule(`authentication/google/views/sign-in-button-${params.cssFramework}.jade`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/profile.jade', 'GOOGLE_LINK', await getModule('authentication/common/views/jade/oauth-link.jade'));
        templateReplaceMemory(params, 'views/account/profile.jade', {
          providerPath: 'google',
          providerName: 'Google'
        });
        break;
      case 'handlebars':
        await replaceCodeMemory(params, 'views/account/login.handlebars', 'SIGN_IN_WITH_GOOGLE', await getModule(`authentication/google/views/sign-in-button-${params.cssFramework}.html`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/signup.handlebars', 'SIGN_IN_WITH_GOOGLE', await getModule(`authentication/google/views/sign-in-button-${params.cssFramework}.html`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/profile.handlebars', 'GOOGLE_LINK', await getModule('authentication/common/views/handlebars/oauth-link.handlebars'));
        templateReplaceMemory(params, 'views/account/profile.handlebars', {
          providerPath: 'google',
          providerName: 'Google'
        });
        break;
      case 'nunjucks':
        await replaceCodeMemory(params, 'views/account/login.html', 'SIGN_IN_WITH_GOOGLE', await getModule(`authentication/google/views/sign-in-button-${params.cssFramework}.html`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/login.html', 'SIGN_IN_WITH_GOOGLE', await getModule(`authentication/google/views/sign-in-button-${params.cssFramework}.html`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/profile.html', 'GOOGLE_LINK', await getModule('authentication/common/views/nunjucks/oauth-link.html'));
        templateReplaceMemory(params, 'views/account/profile.html', {
          providerPath: 'google',
          providerName: 'Google'
        });
        break;
      default:
        break;
    }
  }

  if (params.jsFramework === 'react') {
    await replaceCodeMemory(params, 'app/actions/oauth.js', 'GOOGLE_LOGIN_ACTION', await getModule('js-framework/react/actions/oauth/google.js'));
    await replaceCodeMemory(params, 'app/actions/oauth.js', 'GOOGLE_LINK_ACTION', await getModule('js-framework/react/actions/oauth/google-link.js'));
    await replaceCodeMemory(params, 'app/components/Account/Profile.js', 'GOOGLE_LINK', await getModule(`js-framework/react/components/Account/profile/google-link-${params.cssFramework}.js`));
    await replaceCodeMemory(params, 'app/components/Account/Profile.js', 'GOOGLE_LINK_REFERENCE', await getModule('js-framework/react/components/Account/profile/google-link-reference.js'));
  }

  if (params.jsFramework === 'angularjs') {
    await replaceCodeMemory(params, 'app/partials/profile.html', 'GOOGLE_LINK', await getModule(`js-framework/angularjs/partials/profile/google-link-${params.cssFramework}.html`));
    await replaceCodeMemory(params, 'app/app.js', 'SATELLIZER_GOOGLE_CONFIG', await getModule('js-framework/angularjs/satellizer-google.js'));
  }
}
