import { join } from 'path';
import { copy, replaceCode, addNpmPackage } from '../utils';

async function generateNunjucksTemplateEngine(params) {
  let server;
  let viewEngineSetup;
  let viewEngineRequire;
  let baseRoute;

  switch (params.framework) {
    case 'express':
      server = join(__base, 'build', params.uuid, 'server.js');
      viewEngineSetup = join(__base, 'modules', 'template-engine', 'nunjucks', 'nunjucks-express.js');
      viewEngineRequire = join(__base, 'modules', 'template-engine', 'nunjucks', 'nunjucks-require-express.js');
      baseRoute = join(__base, 'modules', 'template-engine', 'nunjucks', 'express-route.js');

      // Set "views dir" and "view engine" and require nunjucks
      await replaceCode(server, 'TEMPLATE_ENGINE_REQUIRE', viewEngineRequire);
      await replaceCode(server, 'TEMPLATE_ENGINE', viewEngineSetup, { leadingBlankLine: true });

      // Set base route "/"
      if (!params.jsFramework) {
        await replaceCode(server, 'BASE_ROUTE', baseRoute, { leadingBlankLine: true });
      }

      // Add Nunjucks to package.json
      await addNpmPackage('nunjucks', params);

      // Copy initial Nunjucks templates to "views" directory
      if (params.jsFramework) {
        await copy(
          join(__base, 'modules', 'template-engine', 'nunjucks', 'layout-spa.html'),
          join(__base, 'build', params.uuid, 'views', 'layout.html')
        );
      } else {
        await copy(
          join(__base, 'modules', 'template-engine', 'nunjucks', 'views'),
          join(__base, 'build', params.uuid, 'views')
        );
      }
      break;
    case 'hapi':
      break;
    case 'meteor':
      break;
    default:
  }
}

export default generateNunjucksTemplateEngine;
