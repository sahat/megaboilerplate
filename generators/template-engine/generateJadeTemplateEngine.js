import { join } from 'path';
import { mkdirs, copy, replaceCode, addNpmPackage } from '../utils';

// helper function
async function updateLayoutTemplate(params) {
  const layout = join(__base, 'build', params.uuid, 'views', 'layout.jade');

  const appContainer = join(__dirname, 'modules', 'jade', 'app-container.jade');
  const blockContent = join(__dirname, 'modules', 'jade', 'block-content.jade');
  const socketIoImport = join(__dirname, 'modules', 'jade', 'socketio-import.jade');

  if (params.jsFramework) {
    // Use "#app-container" div element (single page app)
    await replaceCode(layout, 'APP_CONTAINER_OR_BLOCK_CONTENT', appContainer, { indentLevel: 2 });
  } else {
    // Use "block content" (traditional web app)
    await replaceCode(layout, 'APP_CONTAINER_OR_BLOCK_CONTENT', blockContent, { indentLevel: 2 });
  }

  // Add Socket.IO <script> tag (optional)
  if (params.frameworkOptions.includes('socketio')) {
    await replaceCode(layout, 'SOCKETIO_IMPORT', socketIoImport, { indentLevel: 2 });
  }
}

// helper function
async function copyTemplates(params) {
  const views = join(__base, 'build', params.uuid, 'views');
  const layout = join(__dirname, 'modules', 'jade', 'views', 'layout.jade');

  await copy(layout, join(views, 'layout.jade'));

  if (!params.jsFramework) {
    const footer = join(__dirname, 'modules', 'jade', 'views', 'footer.jade');
    const header = join(__dirname, 'modules', 'jade', 'views', `header-${params.cssFramework}.jade`);
    const headerAuth = join(__dirname, 'modules', 'jade', 'views', `header-auth-${params.cssFramework}.jade`);
    const home = join(__dirname, 'modules', 'jade', 'views', `home-${params.cssFramework}.jade`);
    const contact = join(__dirname, 'modules', 'jade', 'views', `contact-${params.cssFramework}.jade`);
    
    await copy(footer, join(views, 'includes', 'footer.jade'));
    await copy(header, join(views, 'includes', 'header.jade'));
    await copy(home, join(views, 'home.jade'));
    await copy(contact, join(views, 'contact.jade'));

    // Is authentication checked? Then add log in, sign up, logout links to the header
    if (params.authentication.length) {
      const headerAuthIndent = {
        none: 2,
        bootstrap: 2,
        foundation: 3
      };
      await replaceCode(join(views, 'includes', 'header.jade'), 'HEADER_AUTH', headerAuth, { indentLevel: headerAuthIndent[params.cssFramework] });
    }
  }
}

async function generateJadeTemplateEngine(params) {
  switch (params.framework) {
    case 'express':
      const server = join(__base, 'build', params.uuid, 'server.js');
      const expressViewEngine = join(__dirname, 'modules', 'jade', 'jade-express.js');
      const expressHomeRoute = join(__dirname, 'modules', 'routes', 'home-route-express.js');
      const homeControllerRequire = join(__dirname, 'modules', 'controllers', 'home-require.js');
      const expressHomeController = join(__dirname, 'modules', 'controllers', 'home-controller-express.js');

      // Set "views dir" and "view engine" Express settings
      await replaceCode(server, 'TEMPLATE_ENGINE', expressViewEngine);
      
      if (!params.jsFramework) {
        // Require home controller and add "/" route
        await replaceCode(server, 'HOME_ROUTE', expressHomeRoute);
        await replaceCode(server, 'HOME_CONTROLLER', homeControllerRequire);
        // Copy home controller
        await copy(expressHomeController, join(__base, 'build', params.uuid, 'controllers', 'home.js'));
      }

      
      // Copy Jade templates
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
