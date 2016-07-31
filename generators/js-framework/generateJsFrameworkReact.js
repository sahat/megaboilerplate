import { set } from 'lodash';
import { getModule, replaceCodeMemory, addNpmPackageMemory } from '../utils';

async function generateJsFrameworkReact(params) {
  switch (params.framework) {
    case 'express':
      // .babelrc
      if (params.testing && params.testing !== 'none') {
        set(params, ['build', '.babelrc'], await getModule('js-framework/react/.babelrc-rewire'));
      } else {
        set(params, ['build', '.babelrc'], await getModule('js-framework/react/.babelrc'));
      }

      // Add entry file and React routes
      set(params.build, ['app', 'main.js'], await getModule('js-framework/react/main.js'));
      set(params.build, ['app', 'routes.js'], await getModule('js-framework/react/routes.js'));

      // Require react, react-router, react-dom packages
      await replaceCodeMemory(params, 'server.js', 'REACT_REQUIRE', await getModule('js-framework/react/react-require.js'));
      await replaceCodeMemory(params, 'server.js', 'REACT_ROUTES_REQUIRE', await getModule('js-framework/react/react-routes-require.js'));

      // Add ES6 transpiler
      await replaceCodeMemory(params, 'server.js', 'ES6_TRANSPILER', await getModule('js-framework/react/es6-transpiler.js'));

      // Add server-rendering  middleware
      await replaceCodeMemory(params, 'server.js', 'REACT_SERVER_RENDERING', await getModule('js-framework/react/server-rendering-with-routing.js'));
      if (params.authentication.length) {
        await replaceCodeMemory(params, 'server.js', 'REDUX_INITIAL_STATE', await getModule('js-framework/react/initial-state-auth.js'));
      } else {
        await replaceCodeMemory(params, 'server.js', 'REDUX_INITIAL_STATE', await getModule('js-framework/react/initial-state.js'));
      }

      // React components
      set(params.build, ['app', 'components', 'App.js'], await getModule('js-framework/react/components/App.js'));
      set(params.build, ['app', 'components', 'Contact.js'], await getModule('js-framework/react/components/Contact.js'));
      set(params.build, ['app', 'components', 'Footer.js'], await getModule('js-framework/react/components/Footer.js'));
      set(params.build, ['app', 'components', 'Header.js'], await getModule('js-framework/react/components/Header.js'));
      set(params.build, ['app', 'components', 'Home.js'], await getModule('js-framework/react/components/Home.js'));
      set(params.build, ['app', 'components', 'Messages.js'], await getModule('js-framework/react/components/Messages.js'));
      set(params.build, ['app', 'components', 'NotFound.js'], await getModule('js-framework/react/components/NotFound.js'));

      await replaceCodeMemory(params, 'app/components/Contact.js', 'CONTACT_RENDER', await getModule(`js-framework/react/components/Contact-${params.cssFramework}.js`));
      await replaceCodeMemory(params, 'app/components/Home.js', 'HOME_RENDER', await getModule(`js-framework/react/components/Home-${params.cssFramework}.js`));
      await replaceCodeMemory(params, 'app/components/Messages.js', 'MESSAGES_RENDER', await getModule(`js-framework/react/components/Messages-${params.cssFramework}.js`));
      await replaceCodeMemory(params, 'app/components/Header.js', 'HEADER_RENDER', await getModule(`js-framework/react/components/Header-${params.cssFramework}.js`));

      if (params.authentication.length) {
        set(params.build, ['app', 'components', 'Account', 'Forgot.js'], await getModule('js-framework/react/components/Account/Forgot.js'));
        set(params.build, ['app', 'components', 'Account', 'Login.js'], await getModule('js-framework/react/components/Account/Login.js'));
        set(params.build, ['app', 'components', 'Account', 'Profile.js'], await getModule('js-framework/react/components/Account/Profile.js'));
        set(params.build, ['app', 'components', 'Account', 'Reset.js'], await getModule('js-framework/react/components/Account/Reset.js'));
        set(params.build, ['app', 'components', 'Account', 'Signup.js'], await getModule('js-framework/react/components/Account/Signup.js'));

        await replaceCodeMemory(params, 'app/components/Account/Forgot.js', 'FORGOT_RENDER', await getModule(`js-framework/react/components/Account/Forgot-${params.cssFramework}.js`), { indentLevel: 3 });
        await replaceCodeMemory(params, 'app/components/Account/Login.js', 'LOGIN_RENDER', await getModule(`js-framework/react/components/Account/Login-${params.cssFramework}.js`));
        await replaceCodeMemory(params, 'app/components/Account/Profile.js', 'PROFILE_RENDER', await getModule(`js-framework/react/components/Account/Profile-${params.cssFramework}.js`));
        await replaceCodeMemory(params, 'app/components/Account/Reset.js', 'RESET_RENDER', await getModule(`js-framework/react/components/Account/Reset-${params.cssFramework}.js`));
        await replaceCodeMemory(params, 'app/components/Account/Signup.js', 'SIGNUP_RENDER', await getModule(`js-framework/react/components/Account/Signup-${params.cssFramework}.js`));
        await replaceCodeMemory(params, 'app/components/Header.js', 'HEADER_AUTH', await getModule(`js-framework/react/components/Header-auth-${params.cssFramework}.js`));
        await replaceCodeMemory(params, 'app/components/Header.js', 'HEADER_AUTH_REFERENCE', await getModule('js-framework/react/components/Header-auth-reference.js'));
      }

      // Initialize Foundation JS components
      if (params.cssFramework === 'foundation') {
        await replaceCodeMemory(params, 'app/components/Header.js', 'FOUNDATION_INIT', await getModule('css-framework/foundation/foundation-init-react.js'), {
          trailingBlankLine: true
        });
      }

      // Copy Redux actions, reducers, store
      set(params.build, ['app', 'actions', 'contact.js'], await getModule('js-framework/react/actions/contact.js'));

      if (params.authentication.length) {
        // Add react-redux things and logout component method
        await replaceCodeMemory(params, 'app/components/Header.js', 'HEADER_EXPORT', await getModule('js-framework/react/components/Header-export-redux.js'));
        await replaceCodeMemory(params, 'app/components/Header.js', 'HEADER_LOGOUT', await getModule('js-framework/react/components/Header-logout.js'), { trailingBlankLine: true });
        await replaceCodeMemory(params, 'app/components/Header.js', 'HEADER_LOGOUT_REFERENCE', await getModule('js-framework/react/components/Header-logout-reference.js'));
        await replaceCodeMemory(params, 'app/components/Header.js', 'HEADER_REACT_REDUX_REFERENCE', await getModule('js-framework/react/components/Header-react-redux-reference.js'));

        // Redux reducers
        set(params.build, ['app', 'reducers', 'index.js'], await getModule('js-framework/react/reducers/index-with-auth.js'));
        set(params.build, ['app', 'reducers', 'messages.js'], await getModule('js-framework/react/reducers/messages-with-auth.js'));
        set(params.build, ['app', 'reducers', 'auth.js'], await getModule('js-framework/react/reducers/auth.js'));

        // Redux actions
        set(params.build, ['app', 'actions', 'auth.js'], await getModule('js-framework/react/actions/auth.js'));
        set(params.build, ['app', 'actions', 'oauth.js'], await getModule('js-framework/react/actions/oauth.js'));

        // Auth routes
        await replaceCodeMemory(params, 'app/routes.js', 'AUTH_ROUTES_IMPORT', await getModule('js-framework/react/routes-auth-import.js'));
        await replaceCodeMemory(params, 'app/routes.js', 'AUTH_MIDDLEWARE', await getModule('js-framework/react/routes-auth-middleware.js'));
        await replaceCodeMemory(params, 'app/routes.js', 'AUTH_ROUTES', await getModule('js-framework/react/routes-auth.js'));
      } else {
        // Add standard module export
        await replaceCodeMemory(params, 'app/components/Header.js', 'HEADER_EXPORT', await getModule('js-framework/react/components/Header-export.js'));

        // Redux reducers (without auth)
        set(params.build, ['app', 'reducers', 'index.js'], await getModule('js-framework/react/reducers/index.js'));
        set(params.build, ['app', 'reducers', 'messages.js'], await getModule('js-framework/react/reducers/messages.js'));
      }

      // Add store
      set(params.build, ['app', 'store', 'configureStore.js'], await getModule('js-framework/react/store/configureStore.js'));

      // Optional: Redux Dev Tools
      if (params.reactOptions.includes('reduxDevTools')) {
        await replaceCodeMemory(params, 'app/store/configureStore.js', 'REDUX_STORE_ENHANCER', await getModule('js-framework/react/store/thunkAndDevTools.js'));
      } else {
        await replaceCodeMemory(params, 'app/store/configureStore.js', 'REDUX_STORE_ENHANCER', await getModule('js-framework/react/store/thunk.js'));
      }

      switch (params.templateEngine) {
        case 'jade':
          await replaceCodeMemory(params, 'server.js', 'RENDER_TEMPLATE', await getModule('js-framework/react/render-template-jade.js'));
          await replaceCodeMemory(params, 'views/layout.jade', 'JS_FRAMEWORK_MAIN_IMPORT', await getModule('js-framework/react/react-jade-import.jade'));
          break;
        case 'handlebars':
          await replaceCodeMemory(params, 'server.js', 'RENDER_TEMPLATE', await getModule('js-framework/react/render-template-handlebars.js'));
          await replaceCodeMemory(params, 'views/layouts/main.handlebars', 'JS_FRAMEWORK_MAIN_IMPORT', await getModule('js-framework/react/react-html-import.html'));
          break;
        case 'nunjucks':
          await replaceCodeMemory(params, 'server.js', 'RENDER_TEMPLATE', await getModule('js-framework/react/render-template-nunjucks.js'));
          await replaceCodeMemory(params, 'views/layout.html', 'JS_FRAMEWORK_MAIN_IMPORT', await getModule('js-framework/react/react-html-import.html'));
          break;
        default:
          break;
      }
      break;
    case 'meteor':
      break;
    default:
  }

  await addNpmPackageMemory('babel-core', params);
  await addNpmPackageMemory('babel-polyfill', params);
  await addNpmPackageMemory('react', params);
  await addNpmPackageMemory('react-dom', params);
  await addNpmPackageMemory('react-router', params);
  await addNpmPackageMemory('redux', params);
  await addNpmPackageMemory('react-redux', params);
  await addNpmPackageMemory('redux-thunk', params);
  await addNpmPackageMemory('redux-logger', params);
  await addNpmPackageMemory('redux-promise', params);
  await addNpmPackageMemory('whatwg-fetch', params);
  if (params.authentication.length) {
    await addNpmPackageMemory('react-cookie', params);
  }
}

export default generateJsFrameworkReact;
