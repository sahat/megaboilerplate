import { getModule, replaceCodeMemory, templateReplaceMemory, addEnvMemory, addNpmPackageMemory } from '../utils';

export default async function generateTwitterAuthenticationExpress(params) {
  if (params.jsFramework) {
    await replaceCodeMemory(params, 'server.js', 'TWITTER_ROUTES', await getModule('authentication/twitter/jwt-routes.js'));
    await replaceCodeMemory(params, 'controllers/user.js', 'AUTH_TWITTER_JWT', await getModule('authentication/twitter/twitter-jwt.js'));

    if (params.jsFramework === 'react') {
      const isHandlebars = params.templateEngine === 'handlebars' ? '-handlebars' : '';
      await replaceCodeMemory(params, 'controllers/user.js', 'AUTH_JWT_CALLBACK', await getModule(`authentication/controllers/jwt-callback-render${isHandlebars}.js`));
    } else if (params.jsFramework === 'angularjs') {
      await replaceCodeMemory(params, 'controllers/user.js', 'AUTH_JWT_CALLBACK', await getModule('authentication/controllers/jwt-callback-send.js'));
    }
  } else {
    await replaceCodeMemory(params, 'server.js', 'TWITTER_ROUTES', await getModule('authentication/twitter/passport-routes.js'));
    await replaceCodeMemory(params, 'config/passport.js', 'PASSPORT_TWITTER_REQUIRE', await getModule('authentication/twitter/passport-require.js'));
    await addNpmPackageMemory('passport-twitter', params);
  }

  switch (params.database) {
    case 'mongodb':
      if (params.jsFramework) {
        await replaceCodeMemory(params, 'controllers/user.js', 'AUTH_TWITTER_JWT_DB', await getModule('authentication/twitter/twitter-jwt-mongodb.js'), { indentLevel: 3 });
      } else {
        await replaceCodeMemory(params, 'config/passport.js', 'PASSPORT_TWITTER_STRATEGY', await getModule('authentication/twitter/twitter-strategy-mongodb.js'));
      }
      break;
    case 'mysql':
    case 'sqlite':
    case 'postgresql':
      if (params.jsFramework) {
        await replaceCodeMemory(params, 'controllers/user.js', 'AUTH_TWITTER_JWT_DB', await getModule('authentication/twitter/twitter-jwt-sql.js'), { indentLevel: 3 });
      } else {
        await replaceCodeMemory(params, 'config/passport.js', 'PASSPORT_TWITTER_STRATEGY', await getModule('authentication/twitter/twitter-strategy-sql.js'));
      }
      break;
    default:
      break;
  }

  await addEnvMemory(params, {
    TWITTER_KEY: '6NNBDyJ2TavL407A3lWxPFKBI',
    TWITTER_SECRET: 'ZHaYyK3DQCqv49Z9ofsYdqiUgeoICyh6uoBgFfu7OeYC7wTQKa'
  });

  if (params.jsFramework && params.jsFramework === 'angularjs') {
    await replaceCodeMemory(params, 'app/partials/login.html', 'SIGN_IN_WITH_TWITTER', await getModule(`authentication/twitter/views/sign-in-button-angular-${params.cssFramework}.html`));
    await replaceCodeMemory(params, 'app/partials/signup.html', 'SIGN_IN_WITH_TWITTER', await getModule(`authentication/twitter/views/sign-in-button-angular-${params.cssFramework}.html`));
  } else if (params.jsFramework && params.jsFramework === 'react') {
    await replaceCodeMemory(params, 'app/components/Account/Login.js', 'SIGN_IN_WITH_TWITTER', await getModule(`authentication/twitter/views/sign-in-button-react-${params.cssFramework}.js`));
    await replaceCodeMemory(params, 'app/components/Account/Signup.js', 'SIGN_IN_WITH_TWITTER', await getModule(`authentication/twitter/views/sign-in-button-react-${params.cssFramework}.js`));
  } else {
    switch (params.templateEngine) {
      case 'jade':
        await replaceCodeMemory(params, 'views/account/login.jade', 'SIGN_IN_WITH_TWITTER', await getModule(`authentication/twitter/views/sign-in-button-${params.cssFramework}.jade`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/signup.jade', 'SIGN_IN_WITH_TWITTER', await getModule(`authentication/twitter/views/sign-in-button-${params.cssFramework}.jade`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/profile.jade', 'TWITTER_LINK', await getModule('authentication/common/views/jade/oauth-link.jade'));
        templateReplaceMemory(params, 'views/account/profile.jade', {
          providerPath: 'twitter',
          providerName: 'Twitter'
        });
        break;
      case 'handlebars':
        await replaceCodeMemory(params, 'views/account/login.handlebars', 'SIGN_IN_WITH_TWITTER', await getModule(`authentication/twitter/views/sign-in-button-${params.cssFramework}.html`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/signup.handlebars', 'SIGN_IN_WITH_TWITTER', await getModule(`authentication/twitter/views/sign-in-button-${params.cssFramework}.html`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/profile.handlebars', 'TWITTER_LINK', await getModule('authentication/common/views/handlebars/oauth-link.handlebars'));
        templateReplaceMemory(params, 'views/account/profile.handlebars', {
          providerPath: 'twitter',
          providerName: 'Twitter'
        });
        break;
      case 'nunjucks':
        await replaceCodeMemory(params, 'views/account/login.html', 'SIGN_IN_WITH_TWITTER', await getModule(`authentication/twitter/views/sign-in-button-${params.cssFramework}.html`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/signup.html', 'SIGN_IN_WITH_TWITTER', await getModule(`authentication/twitter/views/sign-in-button-${params.cssFramework}.html`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/profile.html', 'TWITTER_LINK', await getModule('authentication/common/views/nunjucks/oauth-link.html'));
        templateReplaceMemory(params, 'views/account/profile.html', {
          providerPath: 'twitter',
          providerName: 'Twitter'
        });
        break;
      default:
        break;
    }
  }

  if (params.jsFramework === 'react') {
    await replaceCodeMemory(params, 'app/actions/oauth.js', 'TWITTER_LOGIN_ACTION', await getModule('js-framework/react/actions/oauth/twitter.js'));
    await replaceCodeMemory(params, 'app/actions/oauth.js', 'TWITTER_LINK_ACTION', await getModule('js-framework/react/actions/oauth/twitter-link.js'));
    await replaceCodeMemory(params, 'app/components/Account/Profile.js', 'TWITTER_LINK', await getModule(`js-framework/react/components/Account/profile/twitter-link-${params.cssFramework}.js`));
    await replaceCodeMemory(params, 'app/components/Account/Profile.js', 'TWITTER_LINK_REFERENCE', await getModule('js-framework/react/components/Account/profile/twitter-link-reference.js'));
  }

  if (params.jsFramework === 'angularjs') {
    await replaceCodeMemory(params, 'app/partials/profile.html', 'TWITTER_LINK', await getModule(`js-framework/angularjs/partials/profile/twitter-link-${params.cssFramework}.html`));
    await replaceCodeMemory(params, 'app/app.js', 'SATELLIZER_TWITTER_CONFIG', await getModule('js-framework/angularjs/satellizer-twitter.js'));
  }
}
