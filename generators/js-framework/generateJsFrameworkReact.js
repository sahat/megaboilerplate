import { join } from 'path';
import { copy, cpy, addNpmPackage, replaceCode, templateReplace } from '../utils';

async function generateJsFrameworkReact(params) {
  const build = join(__base, 'build', params.uuid);
  const server = join(build, 'server.js');
  const es6Transpiler = join(__dirname, 'modules', 'react', 'es6-transpiler.js');
  const mainJs = join(__dirname, 'modules', 'react', 'main.js');
  const reactRequire = join(__dirname, 'modules', 'react', 'react-require.js');
  const reactRoutesRequire = join(__dirname, 'modules', 'react', 'react-routes-require.js');
  const reactRoutes = join(__dirname, 'modules', 'react', 'routes.js');
  const serverRenderingWithRouting = join(__dirname, 'modules', 'react', 'server-rendering-with-routing.js');
  const initialState = join(__dirname, 'modules', 'react', 'initial-state.js');
  const initialStateAuth = join(__dirname, 'modules', 'react', 'initial-state-auth.js');
  const babelrc = join(__dirname, 'modules', 'react', '.babelrc');

  switch (params.framework) {
    case 'express':

      // Copy .babelrc
      await cpy([babelrc], build);

      // Require react, react-router, react-dom packages
      await replaceCode(server, 'REACT_REQUIRE', reactRequire);
      await replaceCode(server, 'REACT_ROUTES_REQUIRE', reactRoutesRequire);

      // Add ES6 transpiler
      await replaceCode(server, 'ES6_TRANSPILER', es6Transpiler);

      // Add server-rendering  middleware
      await replaceCode(join(build, 'server.js'), 'REACT_SERVER_RENDERING', serverRenderingWithRouting);
      if (params.authentication.length) {
        await replaceCode(join(build, 'server.js'), 'REDUX_INITIAL_STATE', initialStateAuth);
      } else {
        await replaceCode(join(build, 'server.js'), 'REDUX_INITIAL_STATE', initialState);
      }

      // Copy React components
      const components = join(__dirname, 'modules', 'react', 'components');

      await cpy([
        join(components, 'App.js'),
        join(components, 'Contact.js'),
        join(components, 'Footer.js'),
        join(components, 'Header.js'),
        join(components, 'Home.js'),
        join(components, 'Messages.js'),
        join(components, 'NotFound.js')
      ], join(build, 'app', 'components'));

      const CONTACT = join(build, 'app', 'components', 'Contact.js');
      const CONTACT_RENDER = join(__dirname, 'modules', 'react', 'components', `Contact-${params.cssFramework}.js`);
      await replaceCode(CONTACT, 'CONTACT_RENDER', CONTACT_RENDER, { indentLevel: 3 });

      const HOME = join(build, 'app', 'components', 'Home.js');
      const HOME_RENDER = join(__dirname, 'modules', 'react', 'components', `Home-${params.cssFramework}.js`);
      await replaceCode(HOME, 'HOME_RENDER', HOME_RENDER, { indentLevel: 3 });

      const MESSAGES = join(build, 'app', 'components', 'Messages.js');
      const MESSAGES_RENDER = join(__dirname, 'modules', 'react', 'components', `Messages-${params.cssFramework}.js`);
      await replaceCode(MESSAGES, 'MESSAGES_RENDER', MESSAGES_RENDER, { indentLevel: 3 });

      const HEADER = join(build, 'app', 'components', 'Header.js');
      const HEADER_RENDER = join(__dirname, 'modules', 'react', 'components', `Header-${params.cssFramework}.js`);
      await replaceCode(HEADER, 'HEADER_RENDER', HEADER_RENDER);

      if (params.authentication.length) {
        await cpy([
          join(components, 'Account', 'Forgot.js'),
          join(components, 'Account', 'Login.js'),
          join(components, 'Account', 'Profile.js'),
          join(components, 'Account', 'Reset.js'),
          join(components, 'Account', 'Signup.js')
        ], join(build, 'app', 'components', 'Account'));

        const FORGOT = join(build, 'app', 'components', 'Account', 'Forgot.js');
        const FORGOT_RENDER = join(__dirname, 'modules', 'react', 'components', 'Account', `Forgot-${params.cssFramework}.js`);
        await replaceCode(FORGOT, 'FORGOT_RENDER', FORGOT_RENDER, { indentLevel: 3 });

        const LOGIN = join(build, 'app', 'components', 'Account', 'Login.js');
        const LOGIN_RENDER = join(__dirname, 'modules', 'react', 'components', 'Account', `Login-${params.cssFramework}.js`);
        await replaceCode(LOGIN, 'LOGIN_RENDER', LOGIN_RENDER, { indentLevel: 3 });

        const PROFILE = join(build, 'app', 'components', 'Account', 'Profile.js');
        const PROFILE_RENDER = join(__dirname, 'modules', 'react', 'components', 'Account', `Profile-${params.cssFramework}.js`);
        await replaceCode(PROFILE, 'PROFILE_RENDER', PROFILE_RENDER);

        const RESET = join(build, 'app', 'components', 'Account', 'Reset.js');
        const RESET_RENDER = join(__dirname, 'modules', 'react', 'components', 'Account', `Reset-${params.cssFramework}.js`);
        await replaceCode(RESET, 'RESET_RENDER', RESET_RENDER, { indentLevel: 3 });

        const SIGNUP = join(build, 'app', 'components', 'Account', 'Signup.js');
        const SIGNUP_RENDER = join(__dirname, 'modules', 'react', 'components', 'Account', `Signup-${params.cssFramework}.js`);
        await replaceCode(SIGNUP, 'SIGNUP_RENDER', SIGNUP_RENDER, { indentLevel: 3 });

        // Add log in, sign up, logout links to the header
        const headerAuth = join(components, `Header-auth-${params.cssFramework}.js`);
        const headerAuthRef = join(components, 'Header-auth-reference.js');
        await replaceCode(join(build, 'app', 'components', 'Header.js'), 'HEADER_AUTH', headerAuth);
        await replaceCode(join(build, 'app', 'components', 'Header.js'), 'HEADER_AUTH_REFERENCE', headerAuthRef);
      }

      // Copy Redux actions, reducers, store
      const actions = join(__dirname, 'modules', 'react', 'actions');
      await cpy([join(actions, 'contact.js')], join(build, 'app', 'actions'));

      if (params.authentication.length) {
        // Add react-redux things and logout component method
        const headerLogout = join(components, 'Header-logout.js');
        const headerLogoutReference = join(components, 'Header-logout-reference.js');
        const headerReactReduxReference = join(components, 'Header-react-redux-reference.js');
        const headerExportRedux = join(components, 'Header-export-redux.js');

        // Add logout and redux export
        await replaceCode(join(build, 'app', 'components', 'Header.js'), 'HEADER_EXPORT', headerExportRedux);
        await replaceCode(join(build, 'app', 'components', 'Header.js'), 'HEADER_LOGOUT', headerLogout, { trailingBlankLine: true });
        await replaceCode(join(build, 'app', 'components', 'Header.js'), 'HEADER_LOGOUT_REFERENCE', headerLogoutReference);
        await replaceCode(join(build, 'app', 'components', 'Header.js'), 'HEADER_REACT_REDUX_REFERENCE', headerReactReduxReference);

        // Copy oauth and auth redux actions
        await cpy([join(actions, 'auth.js'), join(actions, 'oauth.js')], join(build, 'app', 'actions'));
      } else {
        // Add normal export
        const headerExport = join(components, 'Header-export.js');
        await replaceCode(join(build, 'app', 'components', 'Header.js'), 'HEADER_EXPORT', headerExport);
      }

      const reducers = join(__dirname, 'modules', 'react', 'reducers');
      await cpy([
        join(reducers, 'index.js'),
        join(reducers, 'messages.js')
      ], join(build, 'app', 'reducers'));

      if (params.authentication.length) {
        await copy(join(reducers, 'index-with-auth.js'), join(build, 'app', 'reducers', 'index.js'));
        await copy(join(reducers, 'messages-with-auth.js'), join(build, 'app', 'reducers', 'messages.js'));
        await copy(join(reducers, 'auth.js'), join(build, 'app', 'reducers', 'auth.js'));
      }

      const store = join(__dirname, 'modules', 'react', 'store');
      await cpy([join(store, 'configureStore.js')], join(build, 'app', 'store'));
      const configureStore = join(build, 'app', 'store', 'configureStore.js');
      const thunkAndDevTools = join(store, 'thunkAndDevTools.js');
      const thunk = join(store, 'thunk.js');

      // Optional: Redux Dev Tools
      if (params.reactOptions.includes('reduxDevTools')) {
        await replaceCode(configureStore, 'REDUX_STORE_ENHANCER', thunkAndDevTools, { indentLevel: 2 });
      } else {
        await replaceCode(configureStore, 'REDUX_STORE_ENHANCER', thunk, { indentLevel: 2 });
      }

      // Copy entry file and React routes
      await copy(mainJs, join(build, 'app', 'main.js'));
      await copy(reactRoutes, join(build, 'app', 'routes.js'));

      // Add React auth routes
      if (params.authentication.length) {
        const routes = join(build, 'app', 'routes.js');
        await replaceCode(routes, 'AUTH_ROUTES_IMPORT', join(__dirname, 'modules', 'react', 'routes-auth-import.js'));
        await replaceCode(routes, 'AUTH_MIDDLEWARE', join(__dirname, 'modules', 'react', 'routes-auth-middleware.js'));
        await replaceCode(routes, 'AUTH_ROUTES', join(__dirname, 'modules', 'react', 'routes-auth.js'));
      }

      switch (params.templateEngine) {
        case 'jade':
          const layoutJade = join(build, 'views', 'layout.jade');
          const bundleJsJadeImport = join(__dirname, 'modules', 'react', 'react-jade-import.jade');
          const renderFileJade = join(__dirname, 'modules', 'react', 'render-template-jade.js');
          await replaceCode(server, 'RENDER_TEMPLATE', renderFileJade, { indentLevel: 3 });

          await replaceCode(layoutJade, 'JS_FRAMEWORK_MAIN_IMPORT', bundleJsJadeImport, { indentLevel: 2 });
          break;

        case 'handlebars':
          const layoutHandlebars = join(build, 'views', 'layouts', 'main.handlebars');
          const bundleJsHandlebarsImport = join(__dirname, 'modules', 'react', 'react-html-import.html');
          const renderFileHandlebars = join(__dirname, 'modules', 'react', 'render-template-handlebars.js');
          await replaceCode(server, 'RENDER_TEMPLATE', renderFileHandlebars);
          await replaceCode(layoutHandlebars, 'JS_FRAMEWORK_MAIN_IMPORT', bundleJsHandlebarsImport);
          break;

        case 'nunjucks':
          const layoutNunjucks = join(build, 'views', 'layout.html');
          const bundleNunjucksImport = join(__dirname, 'modules', 'react', 'react-html-import.html');
          const renderFileNunjucks = join(__dirname, 'modules', 'react', 'render-template-nunjucks.js');

          await replaceCode(layoutNunjucks, 'JS_FRAMEWORK_MAIN_IMPORT', bundleNunjucksImport, { indentLevel: 1 });
          await replaceCode(server, 'RENDER_TEMPLATE', renderFileNunjucks);
          break;

        default:
          break;
      }
      break;

    case 'meteor':
      break;

    default:
  }

  await addNpmPackage('babel-core', params);
  await addNpmPackage('babel-polyfill', params);
  await addNpmPackage('react', params);
  await addNpmPackage('react-dom', params);
  await addNpmPackage('react-router', params);
  await addNpmPackage('redux', params);
  await addNpmPackage('react-redux', params);
  await addNpmPackage('redux-thunk', params);
  await addNpmPackage('whatwg-fetch', params);

  if (params.authentication.length) {
    await addNpmPackage('react-cookie', params);
  }
}

export default generateJsFrameworkReact;
