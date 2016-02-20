import { join } from 'path';
import { cpy, copy, replaceCode, addNpmPackage } from '../utils';

async function generateJadeTemplateEngine(params) {
  let app;
  let viewEngineSetup;
  let baseRoute;
  const viewsDir = join(__base, 'build', params.uuid, 'views');

  switch (params.framework) {
    case 'express':
      app = join(__base, 'build', params.uuid, 'app.js');
      viewEngineSetup = join(__base, 'modules', 'template-engine', 'jade', 'jade-express.js');
      baseRoute = join(__base, 'modules', 'template-engine', 'routes', 'express-route.js');

      // Set "views dir" and "view engine"
      await replaceCode(app, 'TEMPLATE_ENGINE', viewEngineSetup, { leadingBlankLine: true });

      // Set base route "/"
      if (!params.jsFramework || params.jsFramework === 'none') {
        await replaceCode(app, 'BASE_ROUTE', baseRoute, { leadingBlankLine: true });
      }
      break;
    case 'hapi':
      app = join(__base, 'build', params.uuid, 'app.js');
      viewEngineSetup = join(__base, 'modules', 'template-engine', 'jade', 'jade-hapi.js');

      // Register view engine
      await replaceCode(app, 'TEMPLATE_ENGINE', viewEngineSetup, { leadingBlankLine: true });

      // Add dependencies
      await addNpmPackage('vision', params);

      break;
    case 'meteor':
      break;
    default:
  }


  // Copy initial Jade templates to "views" directory
  await copy(
    join(__base, 'modules', 'template-engine', 'jade', 'views', 'layout.jade'),
    join(viewsDir, 'layout.jade')
  );
  await copy(
    join(__base, 'modules', 'template-engine', 'jade', 'views', 'home.jade'),
    join(viewsDir, 'home.jade')
  );

  switch (params.cssFramework) {
    case 'none':
      break;
    case 'bootstrap':
      // Copy header
      await copy(
        join(__base, 'modules', 'template-engine', 'jade', 'views', 'header-bootstrap.jade'),
        join(viewsDir, 'header.jade')
      );
      // Copy footer
      await copy(
        join(__base, 'modules', 'template-engine', 'jade', 'views', 'footer-bootstrap.jade'),
        join(viewsDir, 'footer.jade')
      );
      break;
    default:
      break;
  }

  const layout = join(__base, 'build', params.uuid, 'views', 'layout.jade');
  const appContainerJade = join(__base, 'modules', 'template-engine', 'jade', 'app-container.jade');
  const blockContentJade = join(__base, 'modules', 'template-engine', 'jade', 'block-content.jade');
  const socketioImport = join(__base, 'modules', 'template-engine', 'jade', 'socketio-import.jade');

  if (!params.jsFramework || params.jsFramework === 'none') {
    await replaceCode(layout, 'APP_CONTAINER_OR_BLOCK_CONTENT', blockContentJade, { indentLevel: 2 });
  } else {
    await replaceCode(layout, 'APP_CONTAINER_OR_BLOCK_CONTENT', appContainerJade, { indentLevel: 2 });
  }

  // Socket.IO?
  if (params.frameworkOptions.includes('socketio')) {
    await replaceCode(layout, 'SOCKETIO_IMPORT', socketioImport, { indentLevel: 2, leadingBlankLine: true });
  }

  // Add Jade to package.json
  await addNpmPackage('jade', params);
}

export default generateJadeTemplateEngine;
