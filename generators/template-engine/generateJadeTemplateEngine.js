var fs = require('fs-extra');
var path = require('path');
var Promise = require('bluebird');

var copy = Promise.promisify(fs.copy);

let replaceCode = require('../../utils/replaceCode');

async function generateJadeTemplateEngine(params) {
  switch (params.framework) {
    case 'express':
      let root = path.dirname(require.main.filename);
      let viewEngine = path.join(root, 'modules', 'template-engine', 'jade', 'jade-express.js');
      let app = path.join(root, 'build', params.uuid, 'app.js');

      // Set "views dir" and "view engine"
      await replaceCode(app, 'EXPRESS_TEMPLATE_ENGINE_CONFIG', viewEngine, { leadingBlankLine: true });

      // Copy initial Jade templates
      await copy(
        path.join(root, 'modules', 'template-engine', 'jade', 'views'),
        path.join(root, 'build', params.uuid, 'views')
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
