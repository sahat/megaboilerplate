import { getModule, replaceCodeMemory, templateReplaceMemory, addEnvMemory, addNpmPackageMemory } from '../utils';

export default async function generateVkAuthenticationExpress(params) {
  if (params.jsFramework) {
    await replaceCodeMemory(params, 'server.js', 'VK_ROUTES', await getModule('authentication/vk/jwt-routes.js'));
    await replaceCodeMemory(params, 'controllers/user.js', 'AUTH_VK_JWT', await getModule('authentication/vk/vk-jwt.js'));

    if (params.jsFramework === 'react') {
      const isHandlebars = params.templateEngine === 'handlebars' ? '-handlebars' : '';
      await replaceCodeMemory(params, 'controllers/user.js', 'AUTH_JWT_CALLBACK', await getModule(`authentication/controllers/jwt-callback-render${isHandlebars}.js`));
    } else if (params.jsFramework === 'angularjs') {
      await replaceCodeMemory(params, 'controllers/user.js', 'AUTH_JWT_CALLBACK', await getModule('authentication/controllers/jwt-callback-send.js'));
    }
  } else {
    await replaceCodeMemory(params, 'server.js', 'VK_ROUTES', await getModule('authentication/vk/passport-routes.js'));
    await replaceCodeMemory(params, 'config/passport.js', 'PASSPORT_VK_REQUIRE', await getModule('authentication/vk/passport-require.js'));
    addNpmPackageMemory('passport-vkontakte', params);
  }

  switch (params.database) {
    case 'mongodb':
      if (params.jsFramework) {
        await replaceCodeMemory(params, 'controllers/user.js', 'AUTH_VK_JWT_DB', await getModule('authentication/vk/vk-jwt-mongodb.js'), { indentLevel: 3 });
      } else {
        await replaceCodeMemory(params, 'config/passport.js', 'PASSPORT_VK_STRATEGY', await getModule('authentication/vk/vk-strategy-mongodb.js'));
      }
      break;
    case 'mysql':
    case 'sqlite':
    case 'postgresql':
      if (params.jsFramework) {
        await replaceCodeMemory(params, 'controllers/user.js', 'AUTH_VK_JWT_DB', await getModule('authentication/vk/vk-jwt-sql.js'), { indentLevel: 3 });
      } else {
        await replaceCodeMemory(params, 'config/passport.js', 'PASSPORT_VK_STRATEGY', await getModule('authentication/vk/vk-strategy-sql.js'));
      }
      break;
    default:
      break;
  }

  if (params.jsFramework) {
    await addEnvMemory(params, {
      VKONTAKTE_SECRET: 'W4MvuGuWZDqmDravgesY'
    });
  } else {
    await addEnvMemory(params, {
      VKONTAKTE_ID: '5389715',
      VKONTAKTE_SECRET: 'W4MvuGuWZDqmDravgesY'
    });
  }

  if (params.jsFramework && params.jsFramework === 'angularjs') {
    await replaceCodeMemory(params, 'app/partials/login.html', 'SIGN_IN_WITH_VK', await getModule(`authentication/vk/views/sign-in-button-angular-${params.cssFramework}.html`));
    await replaceCodeMemory(params, 'app/partials/signup.html', 'SIGN_IN_WITH_VK', await getModule(`authentication/vk/views/sign-in-button-angular-${params.cssFramework}.html`));
  } else if (params.jsFramework && params.jsFramework === 'react') {
    await replaceCodeMemory(params, 'app/components/Account/Login.js', 'SIGN_IN_WITH_VK', await getModule(`authentication/vk/views/sign-in-button-react-${params.cssFramework}.js`));
    await replaceCodeMemory(params, 'app/components/Account/Signup.js', 'SIGN_IN_WITH_VK', await getModule(`authentication/vk/views/sign-in-button-react-${params.cssFramework}.js`));
  } else {
    switch (params.templateEngine) {
      case 'jade':
        await replaceCodeMemory(params, 'views/account/login.jade', 'SIGN_IN_WITH_VK', await getModule(`authentication/vk/views/sign-in-button-${params.cssFramework}.jade`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/signup.jade', 'SIGN_IN_WITH_VK', await getModule(`authentication/vk/views/sign-in-button-${params.cssFramework}.jade`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/profile.jade', 'VK_LINK', await getModule('authentication/common/views/jade/oauth-link.jade'));
        templateReplaceMemory(params, 'views/account/profile.jade', {
          providerPath: 'vk',
          providerName: 'VK'
        });
        break;
      case 'handlebars':
        await replaceCodeMemory(params, 'views/account/login.handlebars', 'SIGN_IN_WITH_VK', await getModule(`authentication/vk/views/sign-in-button-${params.cssFramework}.html`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/signup.handlebars', 'SIGN_IN_WITH_VK', await getModule(`authentication/vk/views/sign-in-button-${params.cssFramework}.html`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/profile.handlebars', 'VK_LINK', await getModule('authentication/common/views/handlebars/oauth-link.handlebars'));
        templateReplaceMemory(params, 'views/account/profile.handlebars', {
          providerPath: 'vk',
          providerName: 'VK'
        });
        break;
      case 'nunjucks':
        await replaceCodeMemory(params, 'views/account/login.html', 'SIGN_IN_WITH_VK', await getModule(`authentication/vk/views/sign-in-button-${params.cssFramework}.html`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/signup.html', 'SIGN_IN_WITH_VK', await getModule(`authentication/vk/views/sign-in-button-${params.cssFramework}.html`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/profile.html', 'VK_LINK', await getModule('authentication/common/views/nunjucks/oauth-link.html'));
        templateReplaceMemory(params, 'views/account/profile.html', {
          providerPath: 'vk',
          providerName: 'VK'
        });
        break;
      default:
        break;
    }
  }

  if (params.jsFramework === 'react') {
    await replaceCodeMemory(params, 'app/actions/oauth.js', 'VK_LOGIN_ACTION', await getModule('js-framework/react/actions/oauth/vk.js'));
    await replaceCodeMemory(params, 'app/actions/oauth.js', 'VK_LINK_ACTION', await getModule('js-framework/react/actions/oauth/vk-link.js'));
    await replaceCodeMemory(params, 'app/components/Account/Profile.js', 'VK_LINK', await getModule(`js-framework/react/components/Account/profile/vk-link-${params.cssFramework}.js`));
    await replaceCodeMemory(params, 'app/components/Account/Profile.js', 'VK_LINK_REFERENCE', await getModule('js-framework/react/components/Account/profile/vk-link-reference.js'));
  }

  if (params.jsFramework === 'angularjs') {
    await replaceCodeMemory(params, 'app/partials/profile.html', 'VK_LINK', await getModule(`js-framework/angularjs/partials/profile/vk-link-${params.cssFramework}.html`));
    await replaceCodeMemory(params, 'app/app.js', 'SATELLIZER_VK_CONFIG', await getModule('js-framework/angularjs/satellizer-vk.js'));
  }
}
