import generateJadeTemplateEngine from './generateJadeTemplateEngine';
import generateHandlebarsTemplateEngine from './generateHandlebarsTemplateEngine';
import generateNunjucksTemplateEngine from './generateNunjucksTemplateEngine';
import generateAngularJsTemplate from './generateAngularJsTemplate'

async function generateTemplateEngine(params) {
  if (params.jsFramework === 'angularjs') {
    return generateAngularJsTemplate(params);
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
