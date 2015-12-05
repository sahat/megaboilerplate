let generateJadeTemplateEngine = require('../../generators/template-engine/jade');
let cleanupTemplateEngineString = require('../../generators/template-engine/cleanup');

async function generateTemplateEngine(params) {
  switch (params.templateEngine) {
    case 'jade':
      await generateJadeTemplateEngine(params);
      break;
    case 'handlebars':
      // TODO: Not implemented
      break;
    case 'swig':
      // TODO: Not implemented
      break;
    case 'none':
      await cleanupTemplateEngineString(params);
      break;
    default:
      // TODO
  }
}

module.exports = generateJadeTemplateEngine;
