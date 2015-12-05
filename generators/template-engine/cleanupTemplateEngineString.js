let path = require('path');
let removeCode = require('../../utils/removeCode');

async function cleanupTemplateEngineString(params) {
  switch (params.framework) {
    case 'express':
      let app = path.join(__base, 'build', params.uuid, 'app.js');
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
