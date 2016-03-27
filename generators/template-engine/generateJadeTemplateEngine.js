import { join } from 'path';
import { mkdirs, copy, replaceCode, addNpmPackage } from '../utils';

// helper function
async function updateLayoutTemplate(params) {
  const layout = join(__base, 'build', params.uuid, 'views', 'layout.jade');

  const appContainer = join(__dirname, 'modules', 'jade', 'app-container.jade');
  const blockContent = join(__dirname, 'modules', 'jade', 'block-content.jade');
  const socketIoImport = join(__dirname, 'modules', 'jade', 'socketio-import.jade');

  if (params.jsFramework === 'none') {
    // Use "block content" (traditional web app)
    await replaceCode(layout, 'APP_CONTAINER_OR_BLOCK_CONTENT', blockContent, { indentLevel: 2 });
  } else {
    // Use "#app-container" div element (single page app)
    await replaceCode(layout, 'APP_CONTAINER_OR_BLOCK_CONTENT', appContainer, { indentLevel: 2 });
  }

  // Add Socket.IO <script> tag (optional)
  if (params.frameworkOptions.includes('socketio')) {
    await replaceCode(layout, 'SOCKETIO_IMPORT', socketIoImport, { indentLevel: 2 });
  }
}

// helper function
async function copyTemplates(params) {
  const viewsDir = join(__base, 'build', params.uuid, 'views');
  const layout = join(__dirname, 'modules', 'jade', 'views', 'layout.jade');
  const home = join(__dirname, 'modules', 'jade', 'views', 'home.jade');
  const plainCssHeader = join(__dirname, 'modules', 'jade', 'views', 'header.jade');
  const plainCssFooter = join(__dirname, 'modules', 'jade', 'views', 'footer.jade');
  const bootstrapFooter = join(__dirname, 'modules', 'jade', 'views', 'footer-bootstrap.jade');
  const bootstrapHome = join(__dirname, 'modules', 'jade', 'views', 'home-bootstrap.jade');
  const bootstrapContact = join(__dirname, 'modules', 'jade', 'views', 'contact-bootstrap.jade');

  // Copy initial Jade templates to "views" directory
  await copy(layout, join(viewsDir, 'layout.jade'));
  await copy(home, join(viewsDir, 'home.jade'));
  await mkdirs(join(viewsDir, 'includes'));

  // Copy header and footer partial templates
  switch (params.cssFramework) {
    case 'none':
      await copy(plainCssHeader, join(viewsDir, 'includes', 'header.jade'));
      await copy(plainCssFooter, join(viewsDir, 'includes', 'footer.jade'));
      break;

    case 'bootstrap':
      const bootstrapHeader = join(__dirname, 'modules', 'jade', 'views', 'header-bootstrap.jade');
      const bootstrapHeaderAuthLinks = join(__dirname, 'modules', 'jade', 'views', 'header-auth-bootstrap.jade');

      await copy(bootstrapHeader, join(viewsDir, 'includes', 'header.jade'));

      // Is authentication checked? Add "Log in" / "Sign up"/ "Logout" links to the header
      if (params.authentication && params.authentication.length) {
        await replaceCode(join(viewsDir, 'includes', 'header.jade'), 'HEADER_AUTH_LINKS', bootstrapHeaderAuthLinks, { indentLevel: 3 });
      }

      await copy(bootstrapFooter, join(viewsDir, 'includes', 'footer.jade'));
      await copy(bootstrapHome, join(viewsDir, 'home.jade'));
      await copy(bootstrapContact, join(viewsDir, 'contact.jade'));
      break;

    default:
      break;
  }
}

async function generateJadeTemplateEngine(params) {
  let app;
  let viewEngineSetup;

  switch (params.framework) {
    case 'express':
      const appExpress = join(__base, 'build', params.uuid, 'app.js');
      const expressViewEngine = join(__dirname, 'modules', 'jade', 'jade-express.js');
      const expressHomeRoute = join(__dirname, 'modules', 'routes', 'home-route-express.js');
      const homeControllerRequire = join(__dirname, 'modules', 'controllers', 'home-require.js');
      const expressHomeController = join(__dirname, 'modules', 'controllers', 'home-controller-express.js');

      // Set "views dir" and "view engine"
      await replaceCode(appExpress, 'TEMPLATE_ENGINE', expressViewEngine);
      
      // Require home controller and add home route, i.e. "GET /"
      if (params.jsFramework === 'none') {
        await replaceCode(appExpress, 'HOME_ROUTE', expressHomeRoute);
        await replaceCode(appExpress, 'HOME_CONTROLLER', homeControllerRequire);
      }

      // Copy home controller
      await copy(expressHomeController, join(__base, 'build', params.uuid, 'controllers', 'home.js'));

      // Copy Jade templates, including header/footer partials
      await copyTemplates(params);

      // Add/remove features to the newly generated layout file above
      await updateLayoutTemplate(params);
      break;

    case 'hapi':
      app = join(__base, 'build', params.uuid, 'app.js');
      viewEngineSetup = join(__base, 'modules', 'template-engine', 'jade', 'jade-hapi.js');

      // Register view engine
      await replaceCode(app, 'TEMPLATE_ENGINE', viewEngineSetup, { leadingBlankLine: true });

      // Add dependencies
      await addNpmPackage('vision', params);

      // Copy Jade templates, including header/footer partials
      await copyTemplates(params);

      // Add/remove features to the newly generated layout file above
      await updateLayoutTemplate(params);
      break;

    case 'meteor':
      break;

    default:
  }



  // Add Jade to package.json
  await addNpmPackage('jade', params);
}

export default generateJadeTemplateEngine;
