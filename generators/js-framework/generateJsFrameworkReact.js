import { join } from 'path';
import { copy, mkdirs, addNpmPackage, replaceCode } from '../utils';

async function generateJsFrameworkReact(params) {
  const build = join(__base, 'build', params.uuid);
  const app = join(build, 'app.js');
  const mainJs = join(__dirname, 'modules', 'react', 'main.js');
  const reactRequire = join(__dirname, 'modules', 'react', 'react-require.js');
  const reactRoutesRequire = join(__dirname, 'modules', 'react', 'react-routes-require.js');
  const serverRenderingWithRouting = join(__dirname, 'modules', 'react', 'server-rendering-with-routing.js');

  switch (params.framework) {
    case 'express':
      
      await mkdirs(join(build, 'app', 'components'));

      await addRedux(params);

      // Require react and react-dom packages
      await replaceCode(app, 'REACT_REQUIRE', reactRequire);
      
      // Require react routes
      await replaceCode(app, 'REACT_ROUTES_REQUIRE', reactRoutesRequire);
      
      // Add react server-rendering with react-router middleware
      await replaceCode(join(build, 'app.js'), 'REACT_SERVER_RENDERING', serverRenderingWithRouting);

      await copy(mainJs, join(build, 'app', 'main.js'));

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

      await addNpmPackage('react', params);
      await addNpmPackage('react-dom', params);

      break;

    case 'hapi':
      break;

    case 'meteor':
      break;

    default:
  }
}

async function addRedux(params) {
  const build = join(__base, 'build', params.uuid);
  const app = join(__base, 'build', params.uuid, 'app.js');

  if (params.reactOptions.redux) {
    await mkdirs(join(build, 'actions'));
    await mkdirs(join(build, 'containers'));
    await mkdirs(join(build, 'reducers'));

    // const serverRenderingWithRouting = join(__dirname, 'modules', 'react', 'react-router', 'server-rendering-with-routing.js');
    // await replaceCode(join(build, 'app.js'), 'REACT_SERVER_RENDERING', serverRenderingWithRouting);
  } else {
    // const serverRendering = join(__dirname, 'modules', 'react', 'server-rendering.js');
    // await replaceCode(join(build, 'app.js'), 'REACT_SERVER_RENDERING', serverRendering);
  }
}

export default generateJsFrameworkReact;
