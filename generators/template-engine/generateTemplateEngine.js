let generateJadeTemplateEngine = require('../../generators/template-engine/generateJadeTemplateEngine');
let cleanupTemplateEngineString = require('../../generators/template-engine/cleanupTemplateEngineString');

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

module.exports = generateTemplateEngine;
