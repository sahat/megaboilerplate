import { join } from 'path';
import { copy, addNpmPackage, replaceCode, removeCode } from '../utils';

async function generateJsFrameworkReact(params) {
  const build = join(__base, 'build', params.uuid);
  const mainJs = join(__base, 'modules', 'js-framework', 'react', 'main.js');
  const mainJsBrowser = join(__base, 'modules', 'js-framework', 'react', 'main-browser.js');
  const react = join(__base, 'modules', 'js-framework', 'react', 'react.js');
  const reactDom = join(__base, 'modules', 'js-framework', 'react', 'react-dom.js');

  switch (params.framework) {
    case 'express':
      let indexTemplate;
      let layoutTemplate;
      let reactImport;
      let reactBrowserImport;

      if (params.templateEngine === 'jade') {
        reactImport = join(__base, 'modules', 'js-framework', 'react', 'react-jade-import.jade');
        reactBrowserImport = join(__base, 'modules', 'js-framework', 'react', 'react-browser-jade-import.jade');
        indexTemplate = join(__base, 'modules', 'js-framework', 'react', 'index.jade');
        layoutTemplate = join(__base, 'build', params.uuid, 'views', 'layout.jade');

        // Browser support
        if (params.buildTool === 'none') {

          // Includes Babel, React, ReactDOM, main.jsx script tags
          await replaceCode(layoutTemplate, 'JS_FRAMEWORK_LIB_IMPORT', reactBrowserImport, { indentLevel: 2 });
        } else {
          // When build tool is selected, use bundle.js, which includes all vendor files as well as
          // main.js file. In addition, server-side rendering is enabled.
          await replaceCode(layoutTemplate, 'JS_FRAMEWORK_MAIN_IMPORT', reactImport, { indentLevel: 2 });
        }

        // Replace index.jade
        // Includes #app div that React uses to render the app.
        await copy(indexTemplate, join(build, 'views', 'index.jade'));
      } else if (params.templateEngine === 'handlebars') {

      } else if (params.templateEngine === 'nunjucks') {

      }

      if (params.buildTool === 'none') {
        // Basic app
        await copy(react, join(build, 'public', 'javascripts', 'vendor', 'react.js'));
        await copy(reactDom, join(build, 'public', 'javascripts', 'vendor', 'react-dom.js'));
        await copy(mainJsBrowser, join(build, 'public', 'javascripts', 'main.jsx'));
      } else {
        // CommonJS app
        await copy(mainJs, join(build, 'public', 'javascripts', 'main.jsx'));
        await addNpmPackage('react', params);
        await addNpmPackage('react-dom', params);
      }

      break;

    case 'hapi':
      break;

    case 'meteor':
      break;

    default:
  }
}

export default generateJsFrameworkReact;
