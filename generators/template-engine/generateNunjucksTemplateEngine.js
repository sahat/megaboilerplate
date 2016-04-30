import { join } from 'path';
import { copy, replaceCode, addNpmPackage } from '../utils';

export default async function generateNunjucksTemplateEngine(params) {
  switch (params.framework) {
    case 'express':
      const server = join(__base, 'build', params.uuid, 'server.js');
      const expressViewEngineRequire = join(__dirname, 'modules', 'nunjucks', 'nunjucks-require-express.js');
      const expressViewEngine = join(__dirname, 'modules', 'nunjucks', 'nunjucks-express.js');
      const expressHomeRoute = join(__dirname, 'modules', 'routes', 'home-route-express.js');
      const homeControllerRequire = join(__dirname, 'modules', 'controllers', 'home-require.js');
      const expressHomeController = join(__dirname, 'modules', 'controllers', 'home-controller-express.js');

      // Require nunjucks and set "views dir" and "view engine" Express settings
      await replaceCode(server, 'TEMPLATE_ENGINE_REQUIRE', expressViewEngineRequire);
      await replaceCode(server, 'TEMPLATE_ENGINE', expressViewEngine);

      if (!params.jsFramework) {
        // Require home controller and add "/" route
        await replaceCode(server, 'HOME_ROUTE', expressHomeRoute);
        await replaceCode(server, 'HOME_CONTROLLER', homeControllerRequire);
        // Copy home controller
        await copy(expressHomeController, join(__base, 'build', params.uuid, 'controllers', 'home.js'));
      }

      // Copy nunjucks templates
      await copyTemplates(params);

      // Add/remove features to the newly generated layout file above
      await updateLayoutTemplate(params);
      break;

    case 'meteor':
      break;

    default:
  }

  // Add nunjucks to package.json
  await addNpmPackage('nunjucks', params);
}

async function updateLayoutTemplate(params) {
  const layout = join(__base, 'build', params.uuid, 'views', 'layout.html');

  const appContainer = join(__dirname, 'modules', 'nunjucks', 'app-container.html');
  const blockContent = join(__dirname, 'modules', 'nunjucks', 'block-container.html');
  const socketIoImport = join(__dirname, 'modules', 'nunjucks', 'socketio-import.html');

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
  const layout = join(__dirname, 'modules', 'nunjucks', 'views', 'layout.html');

  await copy(layout, join(views, 'layout.html'));

  if (!params.jsFramework) {
    const footer = join(__dirname, 'modules', 'nunjucks', 'views', 'partials', 'footer.html');
    const header = join(__dirname, 'modules', 'nunjucks', 'views', 'partials', `header-${params.cssFramework}.html`);
    const headerAuth = join(__dirname, 'modules', 'nunjucks', 'views', 'partials', `header-auth-${params.cssFramework}.html`);
    const home = join(__dirname, 'modules', 'nunjucks', 'views', `home-${params.cssFramework}.html`);
    const contact = join(__dirname, 'modules', 'nunjucks', 'views', `contact-${params.cssFramework}.html`);

    await copy(footer, join(views, 'partials', 'footer.html'));
    await copy(header, join(views, 'partials', 'header.html'));
    await copy(home, join(views, 'home.html'));
    await copy(contact, join(views, 'contact.html'));

    // Is authentication checked? Then add log in, sign up, logout links to the header
    if (params.authentication.length) {
      const headerAuthIndent = {
        none: 2,
        bootstrap: 2,
        foundation: 3
      };
      await replaceCode(join(views, 'partials', 'header.html'), 'HEADER_AUTH', headerAuth, { indentLevel: headerAuthIndent[params.cssFramework] });
    }
  }
}
