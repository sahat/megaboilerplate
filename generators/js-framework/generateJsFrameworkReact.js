import { join } from 'path';
import { cpy, replaceCode, removeCode, addDependencies } from '../utils';

async function generateJsFrameworkReact(params) {
  let build = join(__base, 'build', params.uuid);
  let mainJs = join(__base, 'modules', 'js-framework', 'react', 'main.js');
  let react = join(__base, 'modules', 'js-framework', 'react', 'react.js');
  let reactDom = join(__base, 'modules', 'js-framework', 'react', 'react-dom.js');

  switch (params.framework) {
    case 'express':
      let layout = join(__base, 'build', params.uuid, 'views', 'layout.jade');
      let reactImport = join(__base, 'modules', 'js-framework', 'react', 'express-jade-import.jade');

      // Add HTML references
      await addTemplateImport(params, layout, reactImport);

      // Copy files
      await cpy([mainJs, react, reactDom], join(build, 'public', 'javascripts'));
      break;
    case 'hapi':
      break;
    case 'meteor':
      break;
    default:
  }
}

async function addTemplateImport(params, layout, templateImport) {
  switch (params.templateEngine) {
    case 'jade':
      await replaceCode(layout, 'JS_FRAMEWORK_IMPORT', templateImport, { indentLevel: 2 });
      break;
    case 'handlebars':
      break;
    case 'nunjucks':
      break;
    default:
  }
}

export default generateJsFrameworkReact;
