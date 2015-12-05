let fs = require('fs-extra');
let path = require('path');
let Promise = require('bluebird');

let removeCode = require('../../utils/removeCode');

async function cleanupTemplateEngineString(params) {
  switch (params.framework) {
    case 'express':
      let root = path.dirname(require.main.filename);
      let app = path.join(root, 'build', params.uuid, 'app.js');
      await removeCode(app, 'EXPRESS_TEMPLATE_ENGINE_CONFIG');
      break;
    case 'hapi':
      break;
    case 'sails':
      break;
    default:
      break;
  }
}

module.exports = cleanupTemplateEngineString;
