import { join } from 'path';
import { copy, replaceCode, addNpmPackage } from '../utils';

async function generateHandlebarsTemplateEngine(params) {
  let app;
  let viewEngineRequire;
  let viewEngineSetup;
  let baseRoute;
  console.log('generating handlebars', params.framework);

  switch (params.framework) {
    case 'express':
      app = join(__base, 'build', params.uuid, 'app.js');
      viewEngineRequire = join(__base, 'modules', 'template-engine', 'handlebars', 'handlebars-require-express.js');
      viewEngineSetup = join(__base, 'modules', 'template-engine', 'handlebars', 'handlebars-express.js');
      baseRoute = join(__base, 'modules', 'template-engine', 'routes', 'express-route.js');

      await replaceCode(app, 'TEMPLATE_ENGINE_REQUIRE', viewEngineRequire);
      await replaceCode(app, 'TEMPLATE_ENGINE', viewEngineSetup, { leadingBlankLine: true });

      // Set base route "/"
      await replaceCode(app, 'BASE_ROUTE', baseRoute, { leadingBlankLine: true });

      // Add to package.json
      await addNpmPackage('express-handlebars', params);

      // Copy Handlebars templates to "views" directory
      await copy(
        join(__base, 'modules', 'template-engine', 'handlebars', 'views'),
        join(__base, 'build', params.uuid, 'views')
      );
      break;
    case 'hapi':

      break;
    case 'meteor':
      break;
    default:
  }
}

export default generateHandlebarsTemplateEngine;
