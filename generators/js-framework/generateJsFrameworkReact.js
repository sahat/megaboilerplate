import { join } from 'path';
import { copy, cpy, mkdirs, addNpmPackage, replaceCode } from '../utils';

async function generateJsFrameworkReact(params) {
  const build = join(__base, 'build', params.uuid);
  const app = join(build, 'app.js');
  const es6Transpiler = join(__dirname, 'modules', 'react', 'es6-transpiler.js');
  const mainJs = join(__dirname, 'modules', 'react', 'main.js');
  const reactRequire = join(__dirname, 'modules', 'react', 'react-require.js');
  const reactRoutesRequire = join(__dirname, 'modules', 'react', 'react-routes-require.js');
  const reactRoutes = join(__dirname, 'modules', 'react', 'routes.js');
  const serverRenderingWithRouting = join(__dirname, 'modules', 'react', 'server-rendering-with-routing.js');

  switch (params.framework) {
    case 'express':

      await mkdirs(join(build, 'app', 'actions'));
      await mkdirs(join(build, 'app', 'containers'));
      await mkdirs(join(build, 'app', 'components'));
      await mkdirs(join(build, 'app', 'reducers'));

      // Require react, react-router, react-dom packages
      await replaceCode(app, 'REACT_REQUIRE', reactRequire);
      await replaceCode(app, 'REACT_ROUTES_REQUIRE', reactRoutesRequire);

      // Add ES6 transpiler
      await replaceCode(app, 'ES6_TRANSPILER', es6Transpiler);

      // Add server-rendering  middleware
      await replaceCode(join(build, 'app.js'), 'REACT_SERVER_RENDERING', serverRenderingWithRouting);

      // Copy React components
      await cpy([
        join(__dirname, 'modules', 'react', 'components', 'App.js'),
        join(__dirname, 'modules', 'react', 'components', 'Home.js'),
        join(__dirname, 'modules', 'react', 'components', 'Contact.js'),
        join(__dirname, 'modules', 'react', 'components', 'Header.js'),
        join(__dirname, 'modules', 'react', 'components', 'Footer.js')
      ], join(build, 'app', 'components'));
      await cpy([
        join(__dirname, 'modules', 'react', 'components', 'Account', 'Login.js'),
        join(__dirname, 'modules', 'react', 'components', 'Account', 'Signup.js'),
        join(__dirname, 'modules', 'react', 'components', 'Account', 'Profile.js'),
        join(__dirname, 'modules', 'react', 'components', 'Account', 'Forgot.js'),
        join(__dirname, 'modules', 'react', 'components', 'Account', 'Reset.js')
      ], join(build, 'app', 'components', 'Account'));

      await copy(mainJs, join(build, 'app', 'main.js'));
      await copy(reactRoutes, join(build, 'app', 'routes.js'));

      switch (params.templateEngine) {
        case 'jade':
          const layoutJade = join(build, 'views', 'layout.jade');
          const bundleJsJadeImport = join(__dirname, 'modules', 'react', 'react-jade-import.jade');
          const renderFileJade = join(__dirname, 'modules', 'react', 'render-template-jade.js');
          await replaceCode(app, 'RENDER_TEMPLATE', renderFileJade, { indentLevel: 3 });

          await replaceCode(layoutJade, 'JS_FRAMEWORK_MAIN_IMPORT', bundleJsJadeImport, { indentLevel: 2 });
          break;

        case 'handlebars':
          break;

        case 'nunjucks':
          const layoutNunjucks = join(build, 'views', 'layout.html');
          const bundleNunjucksImport = join(__dirname, 'modules', 'react', 'react-html-import.html');
          const renderFileNunjucks = join(__dirname, 'modules', 'react', 'render-template-nunjucks.js');

          await replaceCode(layoutNunjucks, 'JS_FRAMEWORK_MAIN_IMPORT', bundleNunjucksImport, { indentLevel: 1 });
          await replaceCode(app, 'RENDER_TEMPLATE', renderFileNunjucks);
          break;

        default:
          break;
      }
      break;

    case 'hapi':
      break;

    case 'meteor':
      break;

    default:
  }

  await addNpmPackage('react', params);
  await addNpmPackage('react-dom', params);
  await addNpmPackage('react-router', params);
  await addNpmPackage('redux', params);
  await addNpmPackage('react-redux', params);
  await addNpmPackage('redux-thunk', params);
  await addNpmPackage('whatwg-fetch', params);
  if (params.authentication.length) {
    await addNpmPackage('react-cookie', params);
    await addNpmPackage('jsonwebtoken', params);
    await addNpmPackage('moment', params);
  }
}

export default generateJsFrameworkReact;
