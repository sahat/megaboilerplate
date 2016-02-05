import { join } from 'path';
import { copy, replaceCode, addNpmPackage } from '../utils';

async function generateJadeTemplateEngine(params) {
  let app;
  let viewEngineSetup;
  let baseRoute;

  switch (params.framework) {
    case 'express':
      app = join(__base, 'build', params.uuid, 'app.js');
      viewEngineSetup = join(__base, 'modules', 'template-engine', 'jade', 'jade-express.js');
      baseRoute = join(__base, 'modules', 'template-engine', 'routes', 'express-route.js');

      // Set "views dir" and "view engine"
      await replaceCode(app, 'TEMPLATE_ENGINE', viewEngineSetup, { leadingBlankLine: true });

      // Set base route "/"
      if (params.jsFramework === 'none') {
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
  if (params.jsFramework === 'none') {
    await copy(
      join(__base, 'modules', 'template-engine', 'jade', 'views'),
      join(__base, 'build', params.uuid, 'views')
    );
  } else {
    await copy(
      join(__base, 'modules', 'template-engine', 'jade', 'layout-spa.jade'),
      join(__base, 'build', params.uuid, 'views', 'layout.jade')
    );
  }

  // Add Jade to package.json
  await addNpmPackage('jade', params);

}

export default generateJadeTemplateEngine;
