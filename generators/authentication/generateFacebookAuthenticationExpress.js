import { join } from 'path';
import { replaceCode, appendFile, addNpmPackage, addEnv } from '../utils';

async function generateFacebookAuthenticationExpress(params) {
  const build = join(__base, 'build', params.uuid);
  const server = join(build, 'server.js');
  const env = join(build, '.env');
  const config = join(build, 'config', 'passport.js');
  const userController = join(build, 'controllers', 'user.js');
  const strategyRequire = join(__dirname, 'modules', 'facebook', 'passport-require.js');
  const passportRoutes = join(__dirname, 'modules', 'facebook', 'passport-routes.js');
  const jwtRoutes = join(__dirname, 'modules', 'facebook', 'jwt-routes.js');

  if (params.jsFramework) {
    await replaceCode(server, 'FACEBOOK_ROUTES', jwtRoutes);
    await replaceCode(userController, 'AUTH_FACEBOOK_JWT', join(__dirname, 'modules', 'facebook', 'facebook-jwt.js'));
  } else {
    await replaceCode(server, 'FACEBOOK_ROUTES', passportRoutes);
    await replaceCode(config, 'PASSPORT_FACEBOOK_REQUIRE', strategyRequire);

    await addNpmPackage('passport-facebook', params);
  }

  switch (params.database) {
    case 'mongodb':
      if (params.jsFramework) {
        await replaceCode(userController, 'AUTH_FACEBOOK_JWT_DB', join(__dirname, 'modules', 'facebook', 'facebook-jwt-mongodb.js'), { indentLevel: 3 });
      } else {
        const mongodbStrategy = join(__dirname, 'modules', 'facebook', 'facebook-strategy-mongodb.js');
        await replaceCode(config, 'PASSPORT_FACEBOOK_STRATEGY', mongodbStrategy);
      }
      break;

    case 'mysql':
    case 'sqlite':
    case 'postgresql':
      if (params.jsFramework) {
        await replaceCode(userController, 'AUTH_FACEBOOK_JWT_DB', join(__dirname, 'modules', 'facebook', 'facebook-jwt-sql.js'), { indentLevel: 3 });
      } else {
        const sqlStrategy = join(__dirname, 'modules', 'facebook', 'facebook-strategy-sql.js');
        await replaceCode(config, 'PASSPORT_FACEBOOK_STRATEGY', sqlStrategy);
      }
      break;
    
    default:
      break;
  }

  if (params.jsFramework) {
    await addEnv(params, {
      FACEBOOK_SECRET: 'fb9416c436edd2690c6f6adbd94374d1'
    });
  } else {
    await addEnv(params, {
      FACEBOOK_ID: '980220002068787',
      FACEBOOK_SECRET: 'fb9416c436edd2690c6f6adbd94374d1'
    });
  }

  let loginPage;
  let signupPage;
  let signInButton;
  
  if (params.jsFramework && params.jsFramework === 'angularjs') {
    loginPage = join(build, 'app', 'views', 'login.html');
    signupPage = join(build, 'app', 'views', 'signup.html');
    signInButton = join(__dirname, 'modules', 'facebook', 'views', `sign-in-button-angular-${params.cssFramework}.html`);
    await replaceCode(loginPage, 'SIGN_IN_WITH_FACEBOOK', signInButton);
    await replaceCode(signupPage, 'SIGN_IN_WITH_FACEBOOK', signInButton);
  } else if (params.jsFramework && params.jsFramework === 'react') {
    loginPage = join(build, 'app', 'components', 'Account', 'Login.js');
    signupPage = join(build, 'app', 'components', 'Account', 'Signup.js');
    signInButton = join(__dirname, 'modules', 'facebook', 'views', `sign-in-button-react-${params.cssFramework}.js`);
    await replaceCode(loginPage, 'SIGN_IN_WITH_FACEBOOK', signInButton);
    await replaceCode(signupPage, 'SIGN_IN_WITH_FACEBOOK', signInButton);
  } else {
    switch (params.templateEngine) {
      case 'jade':
        loginPage = join(build, 'views', 'account', 'login.jade');
        signupPage = join(build, 'views', 'account', 'signup.jade');
        signInButton = join(__dirname, 'modules', 'facebook', 'views', `sign-in-button-${params.cssFramework}.jade`);
        await replaceCode(loginPage, 'SIGN_IN_WITH_FACEBOOK', signInButton, { indentLevel: 3 });
        await replaceCode(signupPage, 'SIGN_IN_WITH_FACEBOOK', signInButton, { indentLevel: 3 });
        break;
      case 'handlebars':
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
    const facebookLoginAction = join(reactModules, 'actions', 'oauth', 'facebook.js');
    const facebookLinkAction = join(reactModules, 'actions', 'oauth', 'facebook-link.js');
    await replaceCode(oauthAction, 'FACEBOOK_LOGIN_ACTION', facebookLoginAction);
    await replaceCode(oauthAction, 'FACEBOOK_LINK_ACTION', facebookLinkAction);

    // Add link/unlink button on profile page
    const profileComponent = join(build, 'app', 'components', 'Account', 'Profile.js');
    const facebookLinkRender = join(reactModules, 'components', 'Account', 'profile', `facebook-link-${params.cssFramework}.js`);
    const facebookLinkReference = join(reactModules, 'components', 'Account', 'profile', 'facebook-link-reference.js');
    await replaceCode(profileComponent, 'FACEBOOK_LINK', facebookLinkRender);
    await replaceCode(profileComponent, 'FACEBOOK_LINK_REFERENCE', facebookLinkReference);
  }

  if (params.jsFramework === 'angularjs') {
    const angularjsModules = join(__base, 'generators', 'js-framework', 'modules', 'angularjs');
 
    // Add link/unlink button on profile page
    const profileTemplate = join(build, 'app', 'views', 'profile.html');
    const facebookLink = join(angularjsModules, 'views', 'profile', `facebook-link-${params.cssFramework}.js`);
    await replaceCode(profileTemplate, 'FACEBOOK_LINK', facebookLink);
  }
}

export default generateFacebookAuthenticationExpress;
