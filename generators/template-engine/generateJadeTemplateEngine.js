var path = require('path');
var Promise = require('bluebird');
let fs = Promise.promisifyAll(require('fs-extra'));
let replaceCode = require('../../utils/replaceCode');

async function generateJadeTemplateEngine(params) {
  switch (params.framework) {
    case 'express':
      let viewEngine = path.join(__base, 'modules', 'template-engine', 'jade', 'jade-express.js');
      let app = path.join(__base, 'build', params.uuid, 'app.js');

      // Set "views dir" and "view engine"
      await replaceCode(app, 'EXPRESS_TEMPLATE_ENGINE_CONFIG', viewEngine, { leadingBlankLine: true });

      // Copy initial Jade templates
      await copy(
        path.join(__base, 'modules', 'template-engine', 'jade', 'views'),
        path.join(__base, 'build', params.uuid, 'views')
      );
      break;
    case 'hapi':
      // TODO
      break;
    case 'sails':
      // TODO
      break;
    default:
      // TODO
  }
}

module.exports = generateJadeTemplateEngine;
