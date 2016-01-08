import generateJadeTemplateEngine from '../../generators/template-engine/generateJadeTemplateEngine';

async function generateTemplateEngine(params) {
  switch (params.templateEngine) {
    case 'jade':
      await generateJadeTemplateEngine(params);
      break;
    case 'handlebars':
      break;
    case 'nunjucks':
      break;
    case 'none':
      break;
    default:
  }
}

export default generateTemplateEngine;
