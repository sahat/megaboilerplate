import { join } from 'path';
import { replaceCode, templateReplace, addNpmPackage } from '../utils';

async function generateGoogleAuthenticationExpress(params) {
  const build = join(__base, 'build', params.uuid);
  const server = join(build, 'server.js');
  const env = join(build, '.env');
  const config = join(build, 'config', 'passport.js');
  const userController = join(build, 'controllers', 'user.js');
  const strategyRequire = join(__dirname, 'modules', 'google', 'passport-require.js');
  const passportRoutes = join(__dirname, 'modules', 'google', 'passport-routes.js');
  const jwtRoutes = join(__dirname, 'modules', 'google', 'jwt-routes.js');

  if (params.jsFramework) {
    await replaceCode(server, 'GOOGLE_ROUTES', jwtRoutes);
    await replaceCode(userController, 'AUTH_GOOGLE_JWT', join(__dirname, 'modules', 'google', 'google-jwt.js'));

  } else {
    await replaceCode(server, 'GOOGLE_ROUTES', passportRoutes);
    await replaceCode(config, 'PASSPORT_GOOGLE_REQUIRE', strategyRequire);

    await addNpmPackage('passport-google-oauth', params);
  }


  switch (params.database) {
    case 'mongodb':
      if (params.jsFramework) {
        await replaceCode(userController, 'AUTH_GOOGLE_JWT_DB', join(__dirname, 'modules', 'google', 'google-jwt-mongodb.js'), { indentLevel: 3 });
      } else {
        const mongodbStrategy = join(__dirname, 'modules', 'google', 'google-strategy-mongodb.js');
        await replaceCode(config, 'PASSPORT_GOOGLE_STRATEGY', mongodbStrategy);
      }
   
      break;

    case 'mysql':
    case 'sqlite':
    case 'postgresql':
      if (params.jsFramework) {
        await replaceCode(userController, 'AUTH_GOOGLE_JWT_DB', join(__dirname, 'modules', 'google', 'google-jwt-sql.js'), { indentLevel: 3 });
      } else {
        const sqlStrategy = join(__dirname, 'modules', 'google', 'google-strategy-sql.js');
        await replaceCode(config, 'PASSPORT_GOOGLE_STRATEGY', sqlStrategy);
      }

      break;

    default:
      break;
  }

  await appendFile(env, '\nGOOGLE_ID=828110519058.apps.googleusercontent.com');
  await appendFile(env, '\nGOOGLE_SECRET=JdZsIaWhUFIchmC1a_IZzOHb\n');

  let loginPage;
  let signupPage;
  let signInButton;

  if (params.jsFramework && params.jsFramework === 'angularjs') {
    loginPage = join(build, 'app', 'views', 'login.html');
    signupPage = join(build, 'app', 'views', 'signup.html');
    signInButton = join(__dirname, 'modules', 'google', 'views', `sign-in-button-angular-${params.cssFramework}.html`);
    await replaceCode(loginPage, 'SIGN_IN_WITH_GOOGLE', signInButton);
    await replaceCode(signupPage, 'SIGN_IN_WITH_GOOGLE', signInButton);
  } else if (params.jsFramework && params.jsFramework === 'react') {
    loginPage = join(build, 'app', 'components', 'Account', 'Login.js');
    signupPage = join(build, 'app', 'components', 'Account', 'Signup.js');
    signInButton = join(__dirname, 'modules', 'google', 'views', `sign-in-button-react-${params.cssFramework}.js`);
    await replaceCode(loginPage, 'SIGN_IN_WITH_GOOGLE', signInButton);
    await replaceCode(signupPage, 'SIGN_IN_WITH_GOOGLE', signInButton);
  } else {
    switch (params.templateEngine) {
      case 'jade':
        loginPage = join(build, 'views', 'account', 'login.jade');
        signupPage = join(build, 'views', 'account', 'signup.jade');
        signInButton = join(__dirname, 'modules', 'google', 'views', `sign-in-button-${params.cssFramework}.jade`);
        await replaceCode(loginPage, 'SIGN_IN_WITH_GOOGLE', signInButton, { indentLevel: 3 });
        await replaceCode(signupPage, 'SIGN_IN_WITH_GOOGLE', signInButton, { indentLevel: 3 });

        // Add link/unlink button on profile page
        const profileTemplate = join(build, 'views', 'account', 'profile.jade');
        const oauthLink = join(__dirname, 'modules', 'common', 'views', 'profile', `google-link-${params.cssFramework}.jade`);
        await replaceCode(profileTemplate, 'GOOGLE_LINK', oauthLink);
        await templateReplace(profileTemplate, {
          providerPath: 'google',
          providerName: 'Google'
        });
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
    const googleLoginAction = join(reactModules, 'actions', 'oauth', 'google.js');
    const googleLinkAction = join(reactModules, 'actions', 'oauth', 'google-link.js');
    await replaceCode(oauthAction, 'GOOGLE_LOGIN_ACTION', googleLoginAction);
    await replaceCode(oauthAction, 'GOOGLE_LINK_ACTION', googleLinkAction);

    // Add link/unlink button on profile page
    const profileComponent = join(build, 'app', 'components', 'Account', 'Profile.js');
    const googleLinkRender = join(reactModules, 'components', 'Account', 'profile', `google-link-${params.cssFramework}.js`);
    const googleLinkReference = join(reactModules, 'components', 'Account', 'profile', 'google-link-reference.js');
    await replaceCode(profileComponent, 'GOOGLE_LINK', googleLinkRender);
    await replaceCode(profileComponent, 'GOOGLE_LINK_REFERENCE', googleLinkReference);
  }

  if (params.jsFramework === 'angularjs') {
    const angularjsModules = join(__base, 'generators', 'js-framework', 'modules', 'angularjs');

    // Add link/unlink button on profile page
    const profileTemplate = join(build, 'app', 'views', 'profile.html');
    const googleLink = join(angularjsModules, 'views', 'profile', `google-link-${params.cssFramework}.html`);
    await replaceCode(profileTemplate, 'GOOGLE_LINK', googleLink);
  }
}




export default generateGoogleAuthenticationExpress;
