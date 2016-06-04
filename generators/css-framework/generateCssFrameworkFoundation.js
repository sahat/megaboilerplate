import { set } from 'lodash';
import { getModule, replaceCodeMemory } from '../utils';

export default async function generateCssFrameworkFoundation(params) {
  switch (params.cssPreprocessor) {
    case 'css':
      set(params.build, ['public', 'css', 'main.css'], await getModule('css-framework/foundation/main.css'));
      if (params.cssPreprocessorOptions.includes('minifiedCss')) {
        set(params.build, ['public', 'css', 'vendor', 'foundation.min.css'], await getModule('css-framework/foundation/css/foundation.min.css'));
      } else {
        set(params.build, ['public', 'css', 'vendor', 'foundation.css'], await getModule('css-framework/foundation/css/foundation.css'));
      }
      break;
    case 'sass':
      set(params.build, ['public', 'css', 'main.scss'], await getModule('css-framework/foundation/main.scss'));
      set(params.build, ['public', 'css', '_settings.scss'], await getModule('css-framework/foundation/_settings.scss'));
      params.build.public.css.vendor = {
        foundation: {
          components: {
            '_accordion.scss': await getModule('css-framework/foundation/scss/components/_accordion.scss'),
            '_accordion-menu.scss': await getModule('css-framework/foundation/scss/components/_accordion-menu.scss'),
            '_badge.scss': await getModule('css-framework/foundation/scss/components/_badge.scss'),
            '_breadcrumbs.scss': await getModule('css-framework/foundation/scss/components/_breadcrumbs.scss'),
            '_button.scss': await getModule('css-framework/foundation/scss/components/_button.scss'),
            '_button-group.scss': await getModule('css-framework/foundation/scss/components/_button-group.scss'),
            '_callout.scss': await getModule('css-framework/foundation/scss/components/_callout.scss'),
            '_close-button.scss': await getModule('css-framework/foundation/scss/components/_close-button.scss'),
            '_drilldown.scss': await getModule('css-framework/foundation/scss/components/_drilldown.scss'),
            '_dropdown.scss': await getModule('css-framework/foundation/scss/components/_dropdown.scss'),
            '_dropdown-menu.scss': await getModule('css-framework/foundation/scss/components/_dropdown-menu.scss'),
            '_flex.scss': await getModule('css-framework/foundation/scss/components/_flex.scss'),
            '_flex-video.scss': await getModule('css-framework/foundation/scss/components/_flex-video.scss'),
            '_float.scss': await getModule('css-framework/foundation/scss/components/_float.scss'),
            '_label.scss': await getModule('css-framework/foundation/scss/components/_label.scss'),
            '_media-object.scss': await getModule('css-framework/foundation/scss/components/_media-object.scss'),
            '_menu.scss': await getModule('css-framework/foundation/scss/components/_menu.scss'),
            '_menu-icon.scss': await getModule('css-framework/foundation/scss/components/_menu-icon.scss'),
            '_off-canvas.scss': await getModule('css-framework/foundation/scss/components/_off-canvas.scss'),
            '_orbit.scss': await getModule('css-framework/foundation/scss/components/_orbit.scss'),
            '_pagination.scss': await getModule('css-framework/foundation/scss/components/_pagination.scss'),
            '_progress-bar.scss': await getModule('css-framework/foundation/scss/components/_progress-bar.scss'),
            '_reveal.scss': await getModule('css-framework/foundation/scss/components/_reveal.scss'),
            '_slider.scss': await getModule('css-framework/foundation/scss/components/_slider.scss'),
            '_sticky.scss': await getModule('css-framework/foundation/scss/components/_sticky.scss'),
            '_switch.scss': await getModule('css-framework/foundation/scss/components/_switch.scss'),
            '_table.scss': await getModule('css-framework/foundation/scss/components/_table.scss'),
            '_tabs.scss': await getModule('css-framework/foundation/scss/components/_tabs.scss'),
            '_thumbnail.scss': await getModule('css-framework/foundation/scss/components/_thumbnail.scss'),
            '_title-bar.scss': await getModule('css-framework/foundation/scss/components/_title-bar.scss'),
            '_tooltip.scss': await getModule('css-framework/foundation/scss/components/_tooltip.scss'),
            '_top-bar.scss': await getModule('css-framework/foundation/scss/components/_top-bar.scss'),
            '_visibility.scss': await getModule('css-framework/foundation/scss/components/_visibility.scss')
          },
          forms: {
            '_checkbox.scss': await getModule('css-framework/foundation/scss/forms/_checkbox.scss'),
            '_error.scss': await getModule('css-framework/foundation/scss/forms/_error.scss'),
            '_fieldset.scss': await getModule('css-framework/foundation/scss/forms/_fieldset.scss'),
            '_forms.scss': await getModule('css-framework/foundation/scss/forms/_forms.scss'),
            '_help-text.scss': await getModule('css-framework/foundation/scss/forms/_help-text.scss'),
            '_input-group.scss': await getModule('css-framework/foundation/scss/forms/_input-group.scss'),
            '_label.scss': await getModule('css-framework/foundation/scss/forms/_label.scss'),
            '_meter.scss': await getModule('css-framework/foundation/scss/forms/_meter.scss'),
            '_progress.scss': await getModule('css-framework/foundation/scss/forms/_progress.scss'),
            '_range.scss': await getModule('css-framework/foundation/scss/forms/_range.scss'),
            '_select.scss': await getModule('css-framework/foundation/scss/forms/_select.scss'),
            '_text.scss': await getModule('css-framework/foundation/scss/forms/_text.scss')
          },
          grid: {
            '_classes.scss': await getModule('css-framework/foundation/scss/grid/_classes.scss'),
            '_column.scss': await getModule('css-framework/foundation/scss/grid/_column.scss'),
            '_flex-grid.scss': await getModule('css-framework/foundation/scss/grid/_flex-grid.scss'),
            '_grid.scss': await getModule('css-framework/foundation/scss/grid/_grid.scss'),
            '_gutter.scss': await getModule('css-framework/foundation/scss/grid/_gutter.scss'),
            '_layout.scss': await getModule('css-framework/foundation/scss/grid/_layout.scss'),
            '_position.scss': await getModule('css-framework/foundation/scss/grid/_position.scss'),
            '_row.scss': await getModule('css-framework/foundation/scss/grid/_row.scss'),
            '_size.scss': await getModule('css-framework/foundation/scss/grid/_size.scss')
          },
          settings: {
            '_settings.scss': await getModule('css-framework/foundation/scss/settings/_settings.scss')
          },
          typography: {
            '_alignment.scss': await getModule('css-framework/foundation/scss/typography/_alignment.scss'),
            '_base.scss': await getModule('css-framework/foundation/scss/typography/_base.scss'),
            '_helpers.scss': await getModule('css-framework/foundation/scss/typography/_helpers.scss'),
            '_print.scss': await getModule('css-framework/foundation/scss/typography/_print.scss'),
            '_typography.scss': await getModule('css-framework/foundation/scss/typography/_typography.scss')
          },
          util: {
            '_breakpoint.scss': await getModule('css-framework/foundation/scss/util/_breakpoint.scss'),
            '_color.scss': await getModule('css-framework/foundation/scss/util/_color.scss'),
            '_flex.scss': await getModule('css-framework/foundation/scss/util/_flex.scss'),
            '_mixins.scss': await getModule('css-framework/foundation/scss/util/_mixins.scss'),
            '_selector.scss': await getModule('css-framework/foundation/scss/util/_selector.scss'),
            '_unit.scss': await getModule('css-framework/foundation/scss/util/_unit.scss'),
            '_util.scss': await getModule('css-framework/foundation/scss/util/_util.scss'),
            '_value.scss': await getModule('css-framework/foundation/scss/util/_value.scss')
          },
          '_global.scss': await getModule('css-framework/foundation/scss/_global.scss'),
          'foundation.scss': await getModule('css-framework/foundation/scss/foundation.scss')
        }
      };
      break;
    default:
      break;
  }

  if (params.cssPreprocessorOptions.includes('minifiedJs')) {
    set(params.build, ['public', 'js', 'lib', 'foundation.min.js'], await getModule('css-framework/foundation/js/foundation.min.js'));
    set(params.build, ['public', 'js', 'lib', 'jquery.min.js'], await getModule('css-framework/jquery/jquery.min.js'));
  } else {
    set(params.build, ['public', 'js', 'lib', 'foundation.js'], await getModule('css-framework/foundation/js/foundation.js'));
    set(params.build, ['public', 'js', 'lib', 'jquery.js'], await getModule('css-framework/jquery/jquery.js'));
  }

  const htmlJsImport = params.cssPreprocessorOptions.includes('minifiedCss') ?
    await getModule('css-framework/foundation/html-js-min-import.html') :
    await getModule('css-framework/foundation/html-js-import.html');
  const htmlCssImport = params.cssPreprocessorOptions.includes('minifiedCss') ?
    await getModule('css-framework/foundation/html-css-min-import.html') :
    await getModule('css-framework/foundation/html-css-import.html');

  const jadeJsImport = params.cssPreprocessorOptions.includes('minifiedCss') ?
    await getModule('css-framework/foundation/jade-js-min-import.jade') :
    await getModule('css-framework/foundation/jade-js-import.jade');
  const jadeCssImport = params.cssPreprocessorOptions.includes('minifiedCss') ?
    await getModule('css-framework/foundation/jade-css-min-import.jade') :
    await getModule('css-framework/foundation/jade-css-import.jade');

  if (params.jsFramework === 'angularjs') {
    await replaceCodeMemory(params, 'app/index.html', 'JS_FRAMEWORK_LIB_IMPORT', htmlJsImport, { indentLevel: 1 });
    if (params.cssPreprocessor === 'css') {
      await replaceCodeMemory(params, 'app/index.html', 'CSS_FRAMEWORK_IMPORT', htmlCssImport, { indentLevel: 1 });
    }
  } else {
    switch (params.templateEngine) {
      case 'jade':
        await replaceCodeMemory(params, 'views/layout.jade', 'JS_FRAMEWORK_LIB_IMPORT', jadeJsImport, { indentLevel: 2 });
        if (params.cssPreprocessor === 'css') {
          await replaceCodeMemory(params, 'views/layout.jade', 'CSS_FRAMEWORK_IMPORT', jadeCssImport, { indentLevel: 2 });
        }
        break;
      case 'handlebars':
        await replaceCodeMemory(params, 'views/layouts/main.handlebars', 'JS_FRAMEWORK_LIB_IMPORT', htmlJsImport);
        if (params.cssPreprocessor === 'css') {
          await replaceCodeMemory(params, 'views/layouts/main.handlebars', 'CSS_FRAMEWORK_IMPORT', htmlCssImport);
        }
        break;
      case 'nunjucks':
        await replaceCodeMemory(params, 'views/layout.html', 'JS_FRAMEWORK_LIB_IMPORT', htmlJsImport);
        if (params.cssPreprocessor === 'css') {
          await replaceCodeMemory(params, 'views/layout.html', 'CSS_FRAMEWORK_IMPORT', htmlCssImport);
        }
        break;
      default:
        break;
    }
  }
}
