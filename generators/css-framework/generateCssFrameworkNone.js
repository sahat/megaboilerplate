import { set } from 'lodash';
import { getModule, replaceCodeMemory } from '../utils';

export default async function generateCssFrameworkNone(params) {
  switch (params.cssPreprocessor) {
    case 'css':
      set(params.build, ['public', 'css', 'normalize.css'], await getModule('css-framework/none/normalize.css'));
      set(params.build, ['public', 'css', 'flexboxgrid.css'], await getModule('css-framework/none/flexboxgrid.css'));
      set(params.build, ['public', 'css', 'main.css'], await getModule('css-framework/none/main.css'));
      break;
    case 'less':
      set(params.build, ['public', 'css', 'normalize.less'], await getModule('css-framework/none/normalize.less'));
      set(params.build, ['public', 'css', 'flexboxgrid.less'], await getModule('css-framework/none/flexboxgrid.less'));
      set(params.build, ['public', 'css', 'main.less'], await getModule('css-framework/none/main.less'));
      break;
    case 'sass':
      set(params.build, ['public', 'css', 'normalize.scss'], await getModule('css-framework/none/normalize.scss'));
      set(params.build, ['public', 'css', 'flexboxgrid.scss'], await getModule('css-framework/none/flexboxgrid.scss'));
      set(params.build, ['public', 'css', 'main.scss'], await getModule('css-framework/none/main.scss'));
      break;
    case 'postcss':
      set(params.build, ['public', 'css', 'normalize.css'], await getModule('css-framework/none/normalize.css'));
      set(params.build, ['public', 'css', 'flexboxgrid.css'], await getModule('css-framework/none/flexboxgrid.css'));
      set(params.build, ['public', 'css', 'main.css'], await getModule('css-framework/none/main-postcss.css'));
      break;
    case 'stylus':
      set(params.build, ['public', 'css', 'normalize.styl'], await getModule('css-framework/none/normalize.styl'));
      set(params.build, ['public', 'css', 'flexboxgrid.styl'], await getModule('css-framework/none/flexboxgrid.styl'));
      set(params.build, ['public', 'css', 'main.styl'], await getModule('css-framework/none/main.styl'));
      break;
    default:
      break;
  }

  if (params.cssPreprocessor === 'css') {
    if (params.jsFramework === 'angularjs') {
      await replaceCodeMemory(params, 'app/index.html', 'CSS_FRAMEWORK_IMPORT', await getModule('css-framework/none/html-css-import.html'), { indentLevel: 1 });
    } else {
      switch (params.templateEngine) {
        case 'jade':
          await replaceCodeMemory(params, 'views/layout.jade', 'CSS_FRAMEWORK_IMPORT', await getModule('css-framework/none/jade-css-import.jade'), { indentLevel: 2 });
          break;
        case 'handlebars':
          await replaceCodeMemory(params, 'views/layouts/main.handlebars', 'CSS_FRAMEWORK_IMPORT', await getModule('css-framework/none/html-css-import.html'));
          break;
        case 'nunjucks':
          await replaceCodeMemory(params, 'views/layout.html', 'CSS_FRAMEWORK_IMPORT', await getModule('css-framework/none/html-css-import.html'));
          break;
        default:
          break;
      }
    }
  }
}
