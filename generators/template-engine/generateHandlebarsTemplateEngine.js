import { join } from 'path';
import { copy, replaceCode, addNpmPackage } from '../utils';

export default async function generateHandlebarsTemplateEngine(params) {
  switch (params.framework) {
    case 'express':
      const server = join(__base, 'build', params.uuid, 'server.js');
      const expressViewEngineRequire = join(__dirname, 'modules', 'handlebars', 'handlebars-require-express.js');
      const expressViewEngine = join(__dirname, 'modules', 'handlebars', 'handlebars-express.js');
      const expressHomeRoute = join(__dirname, 'modules', 'routes', 'home-route-express.js');
      const homeControllerRequire = join(__dirname, 'modules', 'controllers', 'home-require.js');
      const expressHomeController = join(__dirname, 'modules', 'controllers', 'home-controller-express.js');

      // Require express-handlebars and set "views dir" and "view engine" Express settings
      await replaceCode(server, 'TEMPLATE_ENGINE_REQUIRE', expressViewEngineRequire);
      await replaceCode(server, 'TEMPLATE_ENGINE', expressViewEngine);

      if (!params.jsFramework) {
        // Require home controller and add "/" route
        await replaceCode(server, 'HOME_ROUTE', expressHomeRoute);
        await replaceCode(server, 'HOME_CONTROLLER', homeControllerRequire);
        // Copy home controller
        await copy(expressHomeController, join(__base, 'build', params.uuid, 'controllers', 'home.js'));
      }

      // Copy Handlebars templates
      await copyTemplates(params);

      // Add/remove features to the newly generated layout file above
      await updateLayoutTemplate(params);
      break;

    case 'meteor':
      break;

    default:
  }

  // Add express-handlebars to package.json
  await addNpmPackage('express-handlebars', params);
}

async function updateLayoutTemplate(params) {
  const layout = join(__base, 'build', params.uuid, 'views', 'layouts', 'main.handlebars');

  const appContainer = join(__dirname, 'modules', 'handlebars', 'app-container.handlebars');
  const blockContent = join(__dirname, 'modules', 'handlebars', 'block-content.handlebars');
  const socketIoImport = join(__dirname, 'modules', 'handlebars', 'socketio-import.handlebars');

  if (params.jsFramework) {
    await replaceCode(layout, 'APP_CONTAINER_OR_BLOCK_CONTENT', appContainer);
  } else {
    await replaceCode(layout, 'APP_CONTAINER_OR_BLOCK_CONTENT', blockContent);
  }

  // Add Socket.IO <script> tag (optional)
  if (params.frameworkOptions.includes('socketio')) {
    await replaceCode(layout, 'SOCKETIO_IMPORT', socketIoImport, { indentLevel: 1 });
  }
}

async function copyTemplates(params) {
  const views = join(__base, 'build', params.uuid, 'views');
  const layout = join(__dirname, 'modules', 'handlebars', 'views', 'layouts', 'main.handlebars');

  await copy(layout, join(views, 'layouts', 'main.handlebars'));

  if (!params.jsFramework) {
    const footer = join(__dirname, 'modules', 'handlebars', 'views', 'partials', 'footer.handlebars');
    const header = join(__dirname, 'modules', 'handlebars', 'views', 'partials', `header-${params.cssFramework}.handlebars`);
    const headerAuth = join(__dirname, 'modules', 'handlebars', 'views', 'partials', `header-auth-${params.cssFramework}.handlebars`);
    const home = join(__dirname, 'modules', 'handlebars', 'views', `home-${params.cssFramework}.handlebars`);
    const contact = join(__dirname, 'modules', 'handlebars', 'views', `contact-${params.cssFramework}.handlebars`);

    await copy(footer, join(views, 'partials', 'footer.handlebars'));
    await copy(header, join(views, 'partials', 'header.handlebars'));
    await copy(home, join(views, 'home.handlebars'));
    await copy(contact, join(views, 'contact.handlebars'));

    // Is authentication checked? Then add log in, sign up, logout links to the header
    if (params.authentication.length) {
      const headerAuthIndent = {
        none: 2,
        bootstrap: 2,
        foundation: 3
      };
      await replaceCode(join(views, 'partials', 'header.handlebars'), 'HEADER_AUTH', headerAuth, { indentLevel: headerAuthIndent[params.cssFramework] });
    }
  }
}
