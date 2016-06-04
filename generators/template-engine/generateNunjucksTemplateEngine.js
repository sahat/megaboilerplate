import { set } from 'lodash';
import { getModule, replaceCodeMemory, addNpmPackageMemory } from '../utils';

export default async function generateNunjucksTemplateEngine(params) {
  switch (params.framework) {
    case 'express':
      // Require nunjucks and set "views dir" and "view engine" Express settings
      await replaceCodeMemory(params, 'server.js', 'TEMPLATE_ENGINE_REQUIRE', await getModule('template-engine/nunjucks/nunjucks-require-express.js'));
      await replaceCodeMemory(params, 'server.js', 'TEMPLATE_ENGINE', await getModule('template-engine/nunjucks/nunjucks-express.js'));

      // Add layout template
      set(params, ['build', 'views', 'layout.html'], await getModule('template-engine/nunjucks/views/layout.html'));

      if (params.jsFramework) {
        // Use <div id="app"> container element for single page app
        await replaceCodeMemory(params, 'views/layout.html', 'APP_CONTAINER_OR_BLOCK_CONTENT', await getModule('template-engine/nunjucks/app-container.html'));
      } else {
        // Require home controller and add "/" route
        set(params, ['build', 'controllers', 'home.js'], await getModule('template-engine/controllers/home-controller-express.js'));
        await replaceCodeMemory(params, 'server.js', 'HOME_ROUTE', await getModule('template-engine/routes/home-route-express.js'));
        await replaceCodeMemory(params, 'server.js', 'HOME_CONTROLLER', await getModule('template-engine/controllers/home-require.js'));

        // Use "block content" for traditional web app
        await replaceCodeMemory(params, 'views/layout.html', 'APP_CONTAINER_OR_BLOCK_CONTENT', await getModule('template-engine/nunjucks/block-container.html'));

        // Add initial page templates
        set(params, ['build', 'views', 'home.html'], await getModule(`template-engine/nunjucks/views/home-${params.cssFramework}.html`));
        set(params, ['build', 'views', 'contact.html'], await getModule(`template-engine/nunjucks/views/contact-${params.cssFramework}.html`));
        set(params, ['build', 'views', 'partials', 'footer.html'], await getModule('template-engine/nunjucks/views/partials/footer.html'));
        set(params, ['build', 'views', 'partials', 'header.html'], await getModule(`template-engine/nunjucks/views/partials/header-${params.cssFramework}.html`));

        // If authentication is checked: add log in, sign up, logout links to the header
        if (params.authentication.length) {
          const headerAuthIndent = { none: 2, bootstrap: 2, foundation: 3 };
          await replaceCodeMemory(params, 'views/partials/header.html', 'HEADER_AUTH', await getModule(`template-engine/nunjucks/views/partials/header-auth-${params.cssFramework}.html`), {
            indentLevel: headerAuthIndent[params.cssFramework]
          });
        }
      }

      // OPTIONAL: Add Socket.IO <script> import
      if (params.frameworkOptions.includes('socketio')) {
        await replaceCodeMemory(params, 'views/layout.html', 'SOCKETIO_IMPORT', await getModule('template-engine/nunjucks/socketio-import.html'));
      }
      break;
    case 'meteor':
      break;
    default:
  }

  await addNpmPackageMemory('nunjucks', params);
}
