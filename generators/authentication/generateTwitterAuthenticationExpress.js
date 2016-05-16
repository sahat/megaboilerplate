import { join } from 'path';
import { replaceCode, templateReplace, addNpmPackage, addEnv } from '../utils';

async function generateTwitterAuthenticationExpress(params) {
  const build = join(__base, 'build', params.uuid);
  const server = join(build, 'server.js');
  const env = join(build, '.env');
  const config = join(build, 'config', 'passport.js');
  const userController = join(build, 'controllers', 'user.js');
  const strategyRequire = join(__dirname, 'modules', 'twitter', 'passport-require.js');
  const passportRoutes = join(__dirname, 'modules', 'twitter', 'passport-routes.js');
  const jwtRoutes = join(__dirname, 'modules', 'twitter', 'jwt-routes.js');
  
  if (params.jsFramework) {
    await replaceCode(server, 'TWITTER_ROUTES', jwtRoutes);
    await replaceCode(userController, 'AUTH_TWITTER_JWT', join(__dirname, 'modules', 'twitter', 'twitter-jwt.js'));

  } else {
    await replaceCode(server, 'TWITTER_ROUTES', passportRoutes);
    await replaceCode(config, 'PASSPORT_TWITTER_REQUIRE', strategyRequire);

    await addNpmPackage('passport-twitter', params);

  }

  switch (params.database) {
    case 'mongodb':
      if (params.jsFramework) {
        await replaceCode(userController, 'AUTH_TWITTER_JWT_DB', join(__dirname, 'modules', 'twitter', 'twitter-jwt-sql.js'), { indentLevel: 3 });
      } else {
        const mongodbStrategy = join(__dirname, 'modules', 'twitter', 'twitter-strategy-mongodb.js');
        await replaceCode(config, 'PASSPORT_TWITTER_STRATEGY', mongodbStrategy);
      }

      break;

    case 'mysql':
    case 'sqlite':
    case 'postgresql':
      if (params.jsFramework) {
        await replaceCode(userController, 'AUTH_TWITTER_JWT_DB', join(__dirname, 'modules', 'twitter', 'twitter-jwt-sql.js'), { indentLevel: 3 });
      } else {
        const sqlStrategy = join(__dirname, 'modules', 'twitter', 'twitter-strategy-sql.js');
        await replaceCode(config, 'PASSPORT_TWITTER_STRATEGY', sqlStrategy);
      }

      break;

    default:
      break;
  }

  if (params.jsFramework) {
    await addEnv(params, {
      TWITTER_KEY: 'ZHaYyK3DQCqv49Z9ofsYdqiUgeoICyh6uoBgFfu7OeYC7wTQKa'
    });
  } else {
    await addEnv(params, {
      TWITTER_KEY: '6NNBDyJ2TavL407A3lWxPFKBI',
      TWITTER_SECRET: 'ZHaYyK3DQCqv49Z9ofsYdqiUgeoICyh6uoBgFfu7OeYC7wTQKa'
    });
  }

  let loginPage;
  let signupPage;
  let signInButton;

  if (params.jsFramework && params.jsFramework === 'angularjs') {
    loginPage = join(build, 'app', 'partials', 'login.html');
    signupPage = join(build, 'app', 'partials', 'signup.html');
    signInButton = join(__dirname, 'modules', 'twitter', 'views', `sign-in-button-angular-${params.cssFramework}.html`);
    await replaceCode(loginPage, 'SIGN_IN_WITH_TWITTER', signInButton);
    await replaceCode(signupPage, 'SIGN_IN_WITH_TWITTER', signInButton);
  } else if (params.jsFramework && params.jsFramework === 'react') {
    loginPage = join(build, 'app', 'components', 'Account', 'Login.js');
    signupPage = join(build, 'app', 'components', 'Account', 'Signup.js');
    signInButton = join(__dirname, 'modules', 'twitter', 'views', `sign-in-button-react-${params.cssFramework}.js`);
    await replaceCode(loginPage, 'SIGN_IN_WITH_TWITTER', signInButton);
    await replaceCode(signupPage, 'SIGN_IN_WITH_TWITTER', signInButton);
  } else {
    let profileTemplate;
    let oauthLink;
    switch (params.templateEngine) {
      case 'jade':
        loginPage = join(build, 'views', 'account', 'login.jade');
        signupPage = join(build, 'views', 'account', 'signup.jade');
        signInButton = join(__dirname, 'modules', 'twitter', 'views', `sign-in-button-${params.cssFramework}.jade`);
        await replaceCode(loginPage, 'SIGN_IN_WITH_TWITTER', signInButton, { indentLevel: 3 });
        await replaceCode(signupPage, 'SIGN_IN_WITH_TWITTER', signInButton, { indentLevel: 3 });

        // Add link/unlink button on profile page
        profileTemplate = join(build, 'views', 'account', 'profile.jade');
        oauthLink = join(__dirname, 'modules', 'common', 'views', 'jade', 'oauth-link.jade');
        await replaceCode(profileTemplate, 'TWITTER_LINK', oauthLink);
        await templateReplace(profileTemplate, {
          providerPath: 'twitter',
          providerName: 'Twitter'
        });
        break;
      case 'handlebars':
        loginPage = join(build, 'views', 'account', 'login.handlebars');
        signupPage = join(build, 'views', 'account', 'signup.handlebars');
        signInButton = join(__dirname, 'modules', 'twitter', 'views', `sign-in-button-${params.cssFramework}.html`);
        await replaceCode(loginPage, 'SIGN_IN_WITH_TWITTER', signInButton, { indentLevel: 3 });
        await replaceCode(signupPage, 'SIGN_IN_WITH_TWITTER', signInButton, { indentLevel: 3 });

        // Add link/unlink button on profile page
        profileTemplate = join(build, 'views', 'account', 'profile.handlebars');
        oauthLink = join(__dirname, 'modules', 'common', 'views', 'handlebars', 'oauth-link.handlebars');
        await replaceCode(profileTemplate, 'TWITTER_LINK', oauthLink);
        await templateReplace(profileTemplate, {
          providerPath: 'twitter',
          providerName: 'Twitter'
        });
        break;
      case 'nunjucks':
        loginPage = join(build, 'views', 'account', 'login.html');
        signupPage = join(build, 'views', 'account', 'signup.html');
        signInButton = join(__dirname, 'modules', 'twitter', 'views', `sign-in-button-${params.cssFramework}.html`);
        await replaceCode(loginPage, 'SIGN_IN_WITH_TWITTER', signInButton, { indentLevel: 3 });
        await replaceCode(signupPage, 'SIGN_IN_WITH_TWITTER', signInButton, { indentLevel: 3 });

        // Add link/unlink button on profile page
        profileTemplate = join(build, 'views', 'account', 'profile.html');
        oauthLink = join(__dirname, 'modules', 'common', 'views', 'nunjucks', 'oauth-link.html');
        await replaceCode(profileTemplate, 'TWITTER_LINK', oauthLink);
        await templateReplace(profileTemplate, {
          providerPath: 'twitter',
          providerName: 'Twitter'
        });
        break;
      default:
        break;
    }
  }

  if (params.jsFramework === 'react') {
    const reactModules = join(__base, 'generators', 'js-framework', 'modules', 'react');
    const oauthAction = join(build, 'app', 'actions', 'oauth.js');
    const twitterLoginAction = join(reactModules, 'actions', 'oauth', 'twitter.js');
    const twitterLinkAction = join(reactModules, 'actions', 'oauth', 'twitter-link.js');
    await replaceCode(oauthAction, 'TWITTER_LOGIN_ACTION', twitterLoginAction);
    await replaceCode(oauthAction, 'TWITTER_LINK_ACTION', twitterLinkAction);

    // Add link/unlink button on profile page
    const profileComponent = join(build, 'app', 'components', 'Account', 'Profile.js');
    const twitterLinkRender = join(reactModules, 'components', 'Account', 'profile', `twitter-link-${params.cssFramework}.js`);
    const twitterLinkReference = join(reactModules, 'components', 'Account', 'profile', 'twitter-link-reference.js');
    await replaceCode(profileComponent, 'TWITTER_LINK', twitterLinkRender);
    await replaceCode(profileComponent, 'TWITTER_LINK_REFERENCE', twitterLinkReference);
  }

  if (params.jsFramework === 'angularjs') {
    const angularjsModules = join(__base, 'generators', 'js-framework', 'modules', 'angularjs');

    // Add link/unlink button on profile page
    const profileTemplate = join(build, 'app', 'partials', 'profile.html');
    const twitterLink = join(angularjsModules, 'partials', 'profile', `twitter-link-${params.cssFramework}.html`);
    await replaceCode(profileTemplate, 'TWITTER_LINK', twitterLink);
  }
}

export default generateTwitterAuthenticationExpress;
