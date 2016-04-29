import { join } from 'path';
import { replaceCode, templateReplace, addNpmPackage, addEnv } from '../utils';

async function generateVkAuthenticationExpress(params) {
  const build = join(__base, 'build', params.uuid);
  const server = join(build, 'server.js');
  const env = join(build, '.env');
  const config = join(build, 'config', 'passport.js');
  const userController = join(build, 'controllers', 'user.js');
  const strategyRequire = join(__dirname, 'modules', 'vk', 'passport-require.js');
  const passportRoutes = join(__dirname, 'modules', 'vk', 'passport-routes.js');
  const jwtRoutes = join(__dirname, 'modules', 'vk', 'jwt-routes.js');

  if (params.jsFramework) {
    await replaceCode(server, 'VK_ROUTES', jwtRoutes);
    await replaceCode(userController, 'AUTH_VK_JWT', join(__dirname, 'modules', 'vk', 'vk-jwt.js'));
  } else {
    await replaceCode(server, 'VK_ROUTES', passportRoutes);
    await replaceCode(config, 'PASSPORT_VK_REQUIRE', strategyRequire);

    await addNpmPackage('passport-vkontakte', params);
  }
  
  switch (params.database) {
    case 'mongodb':
      if (params.jsFramework) {
        await replaceCode(userController, 'AUTH_VK_JWT_DB', join(__dirname, 'modules', 'vk', 'vk-jwt-mongodb.js'), { indentLevel: 3 });
      } else {
        const mongodbStrategy = join(__dirname, 'modules', 'vk', 'vk-strategy-mongodb.js');
        await replaceCode(config, 'PASSPORT_VK_STRATEGY', mongodbStrategy);
      }
      break;

    case 'mysql':
    case 'sqlite':
    case 'postgresql':
      if (params.jsFramework) {
        await replaceCode(userController, 'AUTH_VK_JWT_DB', join(__dirname, 'modules', 'vk', 'vk-jwt-sql.js'), { indentLevel: 3 });
      } else {
        const sqlStrategy = join(__dirname, 'modules', 'vk', 'vk-strategy-sql.js');
        await replaceCode(config, 'PASSPORT_VK_STRATEGY', sqlStrategy);
      }
      break;
    
    default:
      break;
  }

  if (params.jsFramework) {
    await addEnv(params, {
      VKONTAKTE_SECRET: 'W4MvuGuWZDqmDravgesY'
    });
  } else {
    await addEnv(params, {
      VKONTAKTE_ID: '5389715',
      VKONTAKTE_SECRET: 'W4MvuGuWZDqmDravgesY'
    });
  }

  let loginPage;
  let signupPage;
  let signInButton;

  if (params.jsFramework && params.jsFramework === 'angularjs') {
    loginPage = join(build, 'app', 'views', 'login.html');
    signupPage = join(build, 'app', 'views', 'signup.html');
    signInButton = join(__dirname, 'modules', 'vk', 'views', `sign-in-button-angular-${params.cssFramework}.html`);
    await replaceCode(loginPage, 'SIGN_IN_WITH_VK', signInButton);
    await replaceCode(signupPage, 'SIGN_IN_WITH_VK', signInButton);
  } else if (params.jsFramework && params.jsFramework === 'react') {
    loginPage = join(build, 'app', 'components', 'Account', 'Login.js');
    signupPage = join(build, 'app', 'components', 'Account', 'Signup.js');
    signInButton = join(__dirname, 'modules', 'vk', 'views', `sign-in-button-react-${params.cssFramework}.js`);
    await replaceCode(loginPage, 'SIGN_IN_WITH_VK', signInButton);
    await replaceCode(signupPage, 'SIGN_IN_WITH_VK', signInButton);
  } else {
    let profileTemplate;
    let oauthLink;
    switch (params.templateEngine) {
      case 'jade':
        loginPage = join(build, 'views', 'account', 'login.jade');
        signupPage = join(build, 'views', 'account', 'signup.jade');
        signInButton = join(__dirname, 'modules', 'vk', 'views', `sign-in-button-${params.cssFramework}.jade`);
        await replaceCode(loginPage, 'SIGN_IN_WITH_VK', signInButton, { indentLevel: 3 });
        await replaceCode(signupPage, 'SIGN_IN_WITH_VK', signInButton, { indentLevel: 3 });

        // Add link/unlink button on profile page
        profileTemplate = join(build, 'views', 'account', 'profile.jade');
        oauthLink = join(__dirname, 'modules', 'common', 'views', 'oauth-link.jade');
        await replaceCode(profileTemplate, 'VK_LINK', oauthLink);
        await templateReplace(profileTemplate, {
          providerPath: 'vk',
          providerName: 'VK'
        });
        break;
      case 'handlebars':
        loginPage = join(build, 'views', 'account', 'login.handlebars');
        signupPage = join(build, 'views', 'account', 'signup.handlebars');
        signInButton = join(__dirname, 'modules', 'vk', 'views', `sign-in-button-${params.cssFramework}.html`);
        await replaceCode(loginPage, 'SIGN_IN_WITH_VK', signInButton, { indentLevel: 3 });
        await replaceCode(signupPage, 'SIGN_IN_WITH_VK', signInButton, { indentLevel: 3 });

        // Add link/unlink button on profile page
        profileTemplate = join(build, 'views', 'account', 'profile.handlebars');
        oauthLink = join(__dirname, 'modules', 'common', 'views', 'oauth-link.handlebars');
        await replaceCode(profileTemplate, 'VK_LINK', oauthLink);
        await templateReplace(profileTemplate, {
          providerPath: 'vk',
          providerName: 'VK'
        });
        break;
      case 'nunjucks':
        break;
      default:
        break;
    }
  }

  if (params.jsFramework === 'react') {
    const reactModules = join(__base, 'generators', 'js-framework', 'modules', 'react');
    const oauthAction = join(build, 'app', 'actions', 'oauth.js');
    const vkLoginAction = join(reactModules, 'actions', 'oauth', 'vk.js');
    const vkLinkAction = join(reactModules, 'actions', 'oauth', 'vk-link.js');
    await replaceCode(oauthAction, 'VK_LOGIN_ACTION', vkLoginAction);
    await replaceCode(oauthAction, 'VK_LINK_ACTION', vkLinkAction);

    // Add link/unlink button on profile page
    const profileComponent = join(build, 'app', 'components', 'Account', 'Profile.js');
    const vkLinkRender = join(reactModules, 'components', 'Account', 'profile', `vk-link-${params.cssFramework}.js`);
    const vkLinkReference = join(reactModules, 'components', 'Account', 'profile', 'vk-link-reference.js');
    await replaceCode(profileComponent, 'VK_LINK', vkLinkRender);
    await replaceCode(profileComponent, 'VK_LINK_REFERENCE', vkLinkReference);
  }

  if (params.jsFramework === 'angularjs') {
    const angularjsModules = join(__base, 'generators', 'js-framework', 'modules', 'angularjs');

    // Add link/unlink button on profile page
    const profileTemplate = join(build, 'app', 'views', 'profile.html');
    const vkLink = join(angularjsModules, 'views', 'profile', `vk-link-${params.cssFramework}.html`);
    await replaceCode(profileTemplate, 'VK_LINK', vkLink);
  }
}

export default generateVkAuthenticationExpress;
