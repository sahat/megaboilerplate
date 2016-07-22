import { getModule, replaceCodeMemory, templateReplaceMemory, addEnvMemory, addNpmPackageMemory } from '../utils';

export default async function generateGithubAuthenticationExpress(params) {
  if (params.jsFramework) {
    await replaceCodeMemory(params, 'server.js', 'GITHUB_ROUTES', await getModule('authentication/github/jwt-routes.js'));
    await replaceCodeMemory(params, 'controllers/user.js', 'AUTH_GITHUB_JWT', await getModule('authentication/github/github-jwt.js'));
    
    if (params.jsFramework === 'react') {
      const isHandlebars = params.templateEngine === 'handlebars' ? '-handlebars' : '';
      await replaceCodeMemory(params, 'controllers/user.js', 'AUTH_JWT_CALLBACK', await getModule(`authentication/controllers/jwt-callback-render${isHandlebars}.js`));
    } else if (params.jsFramework === 'angularjs') {
      await replaceCodeMemory(params, 'controllers/user.js', 'AUTH_JWT_CALLBACK', await getModule('authentication/controllers/jwt-callback-send.js'));
    }
  } else {
    await replaceCodeMemory(params, 'server.js', 'GITHUB_ROUTES', await getModule('authentication/github/passport-routes.js'));
    await replaceCodeMemory(params, 'config/passport.js', 'PASSPORT_GITHUB_REQUIRE', await getModule('authentication/github/passport-require.js'));
    addNpmPackageMemory('passport-github', params);
  }

  switch (params.database) {
    case 'mongodb':
      if (params.jsFramework) {
        await replaceCodeMemory(params, 'controllers/user.js', 'AUTH_GITHUB_JWT_DB', await getModule('authentication/github/github-jwt-mongodb.js'), { indentLevel: 3 });
      } else {
        await replaceCodeMemory(params, 'config/passport.js', 'PASSPORT_GITHUB_STRATEGY', await getModule('authentication/github/github-strategy-mongodb.js'));
      }
      break;
    case 'mysql':
    case 'sqlite':
    case 'postgresql':
      if (params.jsFramework) {
        await replaceCodeMemory(params, 'controllers/user.js', 'AUTH_GITHUB_JWT_DB', await getModule('authentication/github/github-jwt-sql.js'), { indentLevel: 3 });
      } else {
        await replaceCodeMemory(params, 'config/passport.js', 'PASSPORT_GITHUB_STRATEGY', await getModule('authentication/github/github-strategy-sql.js'));
      }
      break;
    default:
      break;
  }

  if (params.jsFramework) {
    addEnvMemory(params, {
      GITHUB_SECRET: '9ca9e8c49bc89cd5626c175e42ad863e8285e78d'
    });
  } else {
    addEnvMemory(params, {
      GITHUB_ID: 'c8d5bf482c0ece46fa1a',
      GITHUB_SECRET: '9ca9e8c49bc89cd5626c175e42ad863e8285e78d'
    });
  }

  if (params.jsFramework && params.jsFramework === 'angularjs') {
    await replaceCodeMemory(params, 'app/partials/login.html', 'SIGN_IN_WITH_GITHUB', await getModule(`authentication/github/views/sign-in-button-angular-${params.cssFramework}.html`));
    await replaceCodeMemory(params, 'app/partials/signup.html', 'SIGN_IN_WITH_GITHUB', await getModule(`authentication/github/views/sign-in-button-angular-${params.cssFramework}.html`));
  } else if (params.jsFramework && params.jsFramework === 'react') {
    await replaceCodeMemory(params, 'app/components/Account/Login.js', 'SIGN_IN_WITH_GITHUB', await getModule(`authentication/github/views/sign-in-button-react-${params.cssFramework}.js`));
    await replaceCodeMemory(params, 'app/components/Account/Signup.js', 'SIGN_IN_WITH_GITHUB', await getModule(`authentication/github/views/sign-in-button-react-${params.cssFramework}.js`));
  } else {
    switch (params.templateEngine) {
      case 'jade':
        await replaceCodeMemory(params, 'views/account/login.jade', 'SIGN_IN_WITH_GITHUB', await getModule(`authentication/github/views/sign-in-button-${params.cssFramework}.jade`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/signup.jade', 'SIGN_IN_WITH_GITHUB', await getModule(`authentication/github/views/sign-in-button-${params.cssFramework}.jade`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/profile.jade', 'GITHUB_LINK', await getModule('authentication/common/views/jade/oauth-link.jade'));
        templateReplaceMemory(params, 'views/account/profile.jade', {
          providerPath: 'github',
          providerName: 'Github'
        });
        break;
      case 'handlebars':
        await replaceCodeMemory(params, 'views/account/login.handlebars', 'SIGN_IN_WITH_GITHUB', await getModule(`authentication/github/views/sign-in-button-${params.cssFramework}.html`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/signup.handlebars', 'SIGN_IN_WITH_GITHUB', await getModule(`authentication/github/views/sign-in-button-${params.cssFramework}.html`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/profile.handlebars', 'GITHUB_LINK', await getModule('authentication/common/views/handlebars/oauth-link.handlebars'));
        templateReplaceMemory(params, 'views/account/profile.handlebars', {
          providerPath: 'github',
          providerName: 'Github'
        });
        break;
      case 'nunjucks':
        await replaceCodeMemory(params, 'views/account/login.html', 'SIGN_IN_WITH_GITHUB', await getModule(`authentication/github/views/sign-in-button-${params.cssFramework}.html`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/login.html', 'SIGN_IN_WITH_GITHUB', await getModule(`authentication/github/views/sign-in-button-${params.cssFramework}.html`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'views/account/profile.html', 'GITHUB_LINK', await getModule('authentication/common/views/nunjucks/oauth-link.html'));
        templateReplaceMemory(params, 'views/account/profile.html', {
          providerPath: 'github',
          providerName: 'Github'
        });
        break;
      default:
        break;
    }
  }

  if (params.jsFramework === 'react') {
    await replaceCodeMemory(params, 'app/actions/oauth.js', 'GITHUB_LOGIN_ACTION', await getModule('js-framework/react/actions/oauth/github.js'));
    await replaceCodeMemory(params, 'app/actions/oauth.js', 'GITHUB_LINK_ACTION', await getModule('js-framework/react/actions/oauth/github-link.js'));
    await replaceCodeMemory(params, 'app/components/Account/Profile.js', 'GITHUB_LINK', await getModule(`js-framework/react/components/Account/profile/github-link-${params.cssFramework}.js`));
    await replaceCodeMemory(params, 'app/components/Account/Profile.js', 'GITHUB_LINK_REFERENCE', await getModule('js-framework/react/components/Account/profile/github-link-reference.js'));
  }

  if (params.jsFramework === 'angularjs') {
    await replaceCodeMemory(params, 'app/partials/profile.html', 'GITHUB_LINK', await getModule(`js-framework/angularjs/partials/profile/github-link-${params.cssFramework}.html`));
    await replaceCodeMemory(params, 'app/app.js', 'SATELLIZER_GITHUB_CONFIG', await getModule('js-framework/angularjs/satellizer-github.js'));
  }
}
