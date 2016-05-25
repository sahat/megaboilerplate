import { set } from 'lodash';
import { getModule, replaceCodeMemory, addNpmPackageMemory } from '../utils';

export default async function generateHandlebarsTemplateEngine(params) {
  switch (params.framework) {
    case 'express':
      // Require express-handlebars and set "views dir" and "view engine" Express settings
      await replaceCodeMemory(params, 'server.js', 'TEMPLATE_ENGINE_REQUIRE', await getModule('template-engine/handlebars/handlebars-require-express.js'));
      await replaceCodeMemory(params, 'server.js', 'TEMPLATE_ENGINE', await getModule('template-engine/handlebars/handlebars-express.js'));

      // Add layout template
      set(params, ['build', 'views', 'layouts', 'main.handlebars'], await getModule('template-engine/handlebars/views//layouts/main.handlebars'));
      
      if (params.jsFramework) {
        // Use <div id="app"> container element for single page app
        await replaceCodeMemory(params, 'views/layouts/main.handlebars', 'APP_CONTAINER_OR_BLOCK_CONTENT', await getModule('template-engine/handlebars/app-container.handlebars'));

      } else {
        // Require HomeController, add "/" route
        set(params, ['build', 'controllers', 'home.js'], await getModule('template-engine/controllers/home-controller-express.js'));
        await replaceCodeMemory(params, 'server.js', 'HOME_ROUTE', await getModule('template-engine/routes/home-route-express.js'));
        await replaceCodeMemory(params, 'server.js', 'HOME_CONTROLLER', await getModule('template-engine/controllers/home-require.js'));

        // Use "block content" for traditional web app
        await replaceCodeMemory(params, 'views/layouts/main.handlebars', 'APP_CONTAINER_OR_BLOCK_CONTENT', await getModule('template-engine/handlebars/block-content.handlebars'));
        
        // Add initial page templates
        set(params, ['build', 'views', 'home.handlebars'], await getModule(`template-engine/handlebars/views/home-${params.cssFramework}.handlebars`));
        set(params, ['build', 'views', 'contact.handlebars'], await getModule(`template-engine/handlebars/views/contact-${params.cssFramework}.handlebars`));
        set(params, ['build', 'views', 'partials', 'footer.handlebars'], await getModule('template-engine/handlebars/views/partials/footer.handlebars'));
        set(params, ['build', 'views', 'partials', 'header.handlebars'], await getModule(`template-engine/handlebars/views/partials/header-${params.cssFramework}.handlebars`));

        // If authentication is checked: add log in, sign up, logout links to the header
        if (params.authentication.length) {
          const headerAuthIndent = { none: 2, bootstrap: 2, foundation: 3 };
          await replaceCodeMemory(params, 'views/partials/header.handlebars', 'HEADER_AUTH', await getModule(`template-engine/handlebars/views/partials/header-auth-${params.cssFramework}.handlebars`), {
            indentLevel: headerAuthIndent[params.cssFramework]
          });
        }
      }

      // OPTIONAL: Add Socket.IO <script> import
      if (params.frameworkOptions.includes('socketio')) {
        await replaceCodeMemory(params, 'views/layouts/main.handlebars', 'SOCKETIO_IMPORT', await getModule('template-engine/handlebars/socketio-import.handlebars'));
      }
      break;
    case 'meteor':
      break;
    default:
  }

  // Add express-handlebars to package.json
  await addNpmPackageMemory('express-handlebars', params);
}
