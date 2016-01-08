import { join } from 'path';
import { copy, replaceCode } from '../utils';

async function generateJadeTemplateEngine(params) {
  switch (params.framework) {
    case 'express':
      let app = join(__base, 'build', params.uuid, 'app.js');
      let viewEngineSetup = join(__base, 'modules', 'template-engine', 'jade', 'jade-express.js');

      // Set "views dir" and "view engine"
      await replaceCode(app, 'TEMPLATE_ENGINE', viewEngineSetup, { leadingBlankLine: true });

      // Copy initial Jade templates to "views" directory
      await copy(
        join(__base, 'modules', 'template-engine', 'jade', 'views'),
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

export default generateJadeTemplateEngine;
