import { join } from 'path';
import { copy, mkdirs, addNpmPackage, replaceCode, removeCode } from '../utils';

async function generateJsFrameworkReact(params) {
  const build = join(__base, 'build', params.uuid);
  const mainJs = join(__base, 'modules', 'js-framework', 'react', 'main.js');

  switch (params.framework) {
    case 'express':
      switch (params.templateEngine) {
        case 'jade':
          const layoutJade = join(build, 'views', 'layout.jade');
          const bundleJadeImport = join(__base, 'modules', 'js-framework', 'react', 'react-jade-import.jade');
          await replaceCode(layoutJade, 'JS_FRAMEWORK_MAIN_IMPORT', bundleJadeImport, { indentLevel: 2 });
          break;

        case 'handlebars':
          break;

        case 'nunjucks':
          const layoutNunjucks = join(bundle, 'views', 'layout.html');
          const bundleNunjucksImport = join(__base, 'modules', 'js-framework', 'react', 'react-html-import.html');
          await replaceCode(layoutNunjucks, 'JS_FRAMEWORK_MAIN_IMPORT', bundleNunjucksImport, { indentLevel: 1 });
          break;

        default:
          break;
      }

      await addNpmPackage('react', params);
      await addNpmPackage('react-dom', params);

      await mkdirs(join(build, 'app', 'components'));
      await copy(mainJs, join(build, 'app', 'main.js'));

      break;

    case 'hapi':
      break;

    case 'meteor':
      break;

    default:
  }
}

export default generateJsFrameworkReact;
