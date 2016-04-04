import generateJadeTemplateEngine from '../../generators/template-engine/generateJadeTemplateEngine';
import generateHandlebarsTemplateEngine from '../../generators/template-engine/generateHandlebarsTemplateEngine';
import generateNunjucksTemplateEngine from '../../generators/template-engine/generateNunjucksTemplateEngine';

async function generateTemplateEngine(params) {
  if (params.jsFramework === 'angularjs') {
    return;
  }
  switch (params.templateEngine) {
    case 'jade':
      await generateJadeTemplateEngine(params);
      break;
    case 'handlebars':
      await generateHandlebarsTemplateEngine(params);
      break;
    case 'nunjucks':
      await generateNunjucksTemplateEngine(params);
      break;
    case 'none':
      break;
    default:
  }
}

export default generateTemplateEngine;
