import { join } from 'path';
import { cpy, copy, replaceCode, removeCode, addNpmPackage } from '../utils';

async function generateJsFrameworkAngular(params) {
  const build = join(__base, 'build', params.uuid);
  const mainJs = join(__dirname, 'modules', 'react', 'main.js');
  const react = join(__dirname, 'modules', 'react', 'react.js');
  const reactDom = join(__dirname, 'modules', 'react', 'react-dom.js');

  switch (params.framework) {
    case 'express':
      const layout = join(__base, 'build', params.uuid, 'views', 'layout.jade');
      const reactImport = join(__dirname, 'modules', 'react', 'express-jade-import.jade');

      // Add HTML references
      await addTemplateImport(params, layout, reactImport);

      await cpy([mainJs, angular], join(build, 'public', 'javascripts'));
      await copy(mainJs, join(build, 'public', 'javascripts', 'main.js'));
      await copy(react, join(build, 'public', 'javascripts', 'react.js'));
      await copy(reactDom, join(build, 'public', 'javascripts', 'react-dom.js'));
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

export default generateJsFrameworkAngular;
