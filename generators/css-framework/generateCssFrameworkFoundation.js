import { join } from 'path';
import { copy, replaceCode } from '../utils';

async function generateCssFrameworkFoundation(params) {
  const foundationDir = join(__base, 'modules', 'css-framework', 'foundation');
  const jqueryDir = join(__base, 'modules', 'css-framework', 'jquery');
  const publicDir = join(__base, 'build', params.uuid, 'public');

  switch (params.cssPreprocessor) {
    case 'css':
      await copy(join(foundationDir, 'main.css'), join(publicDir, 'css', 'main.css'));
      await copy(join(foundationDir, 'css', 'foundation.css'), join(publicDir, 'css', 'vendor', 'foundation.css'));
      break;
    case 'sass':
      await copy(join(foundationDir, 'main.scss'), join(publicDir, 'css', 'main.scss'));
      await copy(join(foundationDir, 'scss'), join(publicDir, 'css', 'vendor', 'foundation'));
      break;
    default:
      break;
  }

  // Import Foundation CSS/JS files
  await addCssFrameworkImports(params);

  // Copy additional Foundation files
  await copy(join(foundationDir, 'js', 'foundation.js'), join(publicDir, 'js', 'lib', 'foundation.js'));
  await copy(join(jqueryDir, 'jquery.js'), join(publicDir, 'js', 'lib', 'jquery.js'));
}

export default generateCssFrameworkFoundation;

async function addCssFrameworkImports(params) {
  const build = join(__base, 'build', params.uuid);

  // AngularJS has its "layout" file in a separate directory
  if (params.jsFramework === 'angularjs') {
    const indexHtml = join(build, 'app', 'index.html');
    const cssImport = join(__dirname, 'modules', 'foundation', 'html-css-import.html');
    const jsImport = join(__dirname, 'modules', 'bootstrap', 'html-js-import.html');

    if (params.cssPreprocessor === 'css') {
      await replaceCode(indexHtml, 'CSS_FRAMEWORK_IMPORT', cssImport, { indentLevel: 1 });
    }

    await replaceCode(indexHtml, 'JS_FRAMEWORK_LIB_IMPORT', jsImport, { indentLevel: 1 });
  } else {
    switch (params.templateEngine) {
      case 'jade':
        const jadeLayout = join(build, 'views', 'layout.jade');
        const jadeBootstrapCssImport = join(__dirname, 'modules', 'bootstrap', 'jade-css-import.jade');
        const jadeBootstrapJsImport = join(__dirname, 'modules', 'bootstrap', 'jade-js-import.jade');

        if (params.cssPreprocessor === 'css') {
          await replaceCode(jadeLayout, 'CSS_FRAMEWORK_IMPORT', jadeBootstrapCssImport, { indentLevel: 2 });
        }

        await replaceCode(jadeLayout, 'JS_FRAMEWORK_LIB_IMPORT', jadeBootstrapJsImport, { indentLevel: 2 });
        break;

      case 'handlebars':
        const handlebarsLayout = join(build, 'views', 'layout.html');
        const handlebarsBootstrapCssImport = join(__dirname, 'modules', 'bootstrap', 'html-css-import.html');
        const handlebarsBootstrapJsImport = join(__dirname, 'modules', 'bootstrap', 'html-js-import.html');

        if (params.cssPreprocessor === 'css') {
          await replaceCode(handlebarsLayout, 'CSS_FRAMEWORK_IMPORT', handlebarsBootstrapCssImport, { indentLevel: 1 });
        }

        await replaceCode(handlebarsLayout, 'JS_FRAMEWORK_LIB_IMPORT', handlebarsBootstrapJsImport, { indentLevel: 1 });
        break;

      case 'nunjucks':
        const nunjucksLayout = join(build, 'views', 'layout.html');
        const nunjucksBootstrapCssImport = join(__dirname, 'modules', 'bootstrap', 'html-import.html');
        const nunjucksBootstrapJsImport = join(__dirname, 'modules', 'bootstrap', 'html-js-import.html');

        await replaceCode(nunjucksLayout, 'CSS_FRAMEWORK_IMPORT', nunjucksBootstrapCssImport, { indentLevel: 1 });
        break;

      default:
        break;
    }
  }
}
