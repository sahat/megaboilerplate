import { join } from 'path';
import { copy, replaceCode, removeCode, addDependencies } from '../utils';

async function generateJsFrameworkReact(params) {
  let build = join(__base, 'build', params.uuid);
  let mainJs = join(__base, 'modules', 'js-framework', 'react', 'main.js');
  let mainJsBrowser = join(__base, 'modules', 'js-framework', 'react', 'main-browser.js');
  let react = join(__base, 'modules', 'js-framework', 'react', 'react.js');
  let reactDom = join(__base, 'modules', 'js-framework', 'react', 'react-dom.js');

  switch (params.framework) {
    case 'express':

      if (params.templateEngine === 'jade') {
        let mainImport;
        let reactImport = join(__base, 'modules', 'js-framework', 'react', 'react-jade-import.jade');
        let babelBrowserImport = join(__base, 'modules', 'js-framework', 'react', 'babel-browser-jade-import.jade');
        let indexTpl = join(__base, 'modules', 'js-framework', 'react', 'index.jade');
        let layout = join(__base, 'build', params.uuid, 'views', 'layout.jade');

        // Include React + ReactDOM
        await replaceCode(layout, 'JS_FRAMEWORK_LIB_IMPORT', reactImport, { indentLevel: 2 });

        // Include browser JSX transpiler
        if (params.reactBuildSystem === 'none') {
          mainImport = join(__base, 'modules', 'js-framework', 'react', 'main-browser-jade-import.jade');
          await replaceCode(layout, 'JS_FRAMEWORK_BABEL_BROWSER', babelBrowserImport, { indentLevel: 2 });
          await replaceCode(layout, 'JS_FRAMEWORK_MAIN_IMPORT', mainImport, { indentLevel: 2 });
        } else {
          // Common.js app
          mainImport = join(__base, 'modules', 'js-framework', 'react', 'main-jade-import.jade');
          await replaceCode(layout, 'JS_FRAMEWORK_MAIN_IMPORT', mainImport, { indentLevel: 2 });
        }

        // Replace index.jade
        await copy(indexTpl, join(build, 'views', 'index.jade'));
      } else if (params.templateEngine === 'handlebars') {

      } else if (params.templateEngine === 'nunjucks') {

      }

      if (params.reactBuildSystem === 'none') {
        // Basic app
        await copy(mainJsBrowser, join(build, 'public', 'javascripts', 'main.jsx'));
      } else {
        // CommonJS app
        await copy(mainJs, join(build, 'public', 'javascripts', 'main.jsx'));
      }

      // Copy files
      await copy(react, join(build, 'public', 'javascripts', 'vendor', 'react.js'));
      await copy(reactDom, join(build, 'public', 'javascripts', 'vendor', 'react-dom.js'));
      break;

    case 'hapi':
      break;

    case 'meteor':
      break;

    default:
  }
}

export default generateJsFrameworkReact;
