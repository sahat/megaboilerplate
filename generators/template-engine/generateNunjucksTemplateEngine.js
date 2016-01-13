import { join } from 'path';
import { copy, replaceCode, addDependencies } from '../utils';
import dependencies from '../../modules/dependencies';

async function generateNunjucksTemplateEngine(params) {
  let app;
  let viewEngineSetup;

  switch (params.framework) {
    case 'express':
      app = join(__base, 'build', params.uuid, 'app.js');
      viewEngineSetup = join(__base, 'modules', 'template-engine', 'nunjucks', 'nunjucks-express.js');

      // Set "views dir" and "view engine"
      await replaceCode(app, 'TEMPLATE_ENGINE', viewEngineSetup, { leadingBlankLine: true });

      // Add Nunjucks to package.json
      await addDependencies(dependencies.templateEngine.expressNunjucks, params);

      // Copy initial Nunjucks templates to "views" directory
      await copy(
        join(__base, 'modules', 'template-engine', 'nunjucks', 'views'),
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

export default generateNunjucksTemplateEngine;
