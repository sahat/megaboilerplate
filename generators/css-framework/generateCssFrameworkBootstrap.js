import { set } from 'lodash';
import { getModule, replaceCodeMemory } from '../utils';

export default async function generateCssFrameworkBootstrap(params) {
  switch (params.cssPreprocessor) {
    case 'css':
      set(params.build, ['public', 'css', 'main.css'], await getModule('css-framework/bootstrap/main.css'));
      if (params.cssPreprocessorOptions.includes('minifiedCss')) {
        set(params.build, ['public', 'css', 'vendor', 'bootstrap.min.css'], await getModule('css-framework/bootstrap/css/bootstrap.min.css'));
      } else {
        set(params.build, ['public', 'css', 'vendor', 'bootstrap.css'], await getModule('css-framework/bootstrap/css/bootstrap.css'));
      }
      break;
    case 'less':
      set(params.build, ['public', 'css', 'main.less'], await getModule('css-framework/bootstrap/main.less'));
      params.build.public.css.vendor = {
        bootstrap: {
          mixins: {
            'alerts.less': await getModule('css-framework/bootstrap/less/mixins/alerts.less'),
            'background-variant.less': await getModule('css-framework/bootstrap/less/mixins/background-variant.less'),
            'border-radius.less': await getModule('css-framework/bootstrap/less/mixins/border-radius.less'),
            'buttons.less': await getModule('css-framework/bootstrap/less/mixins/buttons.less'),
            'center-block.less': await getModule('css-framework/bootstrap/less/mixins/center-block.less'),
            'clearfix.less': await getModule('css-framework/bootstrap/less/mixins/clearfix.less'),
            'forms.less': await getModule('css-framework/bootstrap/less/mixins/forms.less'),
            'gradients.less': await getModule('css-framework/bootstrap/less/mixins/gradients.less'),
            'grid.less': await getModule('css-framework/bootstrap/less/mixins/grid.less'),
            'grid-framework.less': await getModule('css-framework/bootstrap/less/mixins/grid-framework.less'),
            'hide-text.less': await getModule('css-framework/bootstrap/less/mixins/hide-text.less'),
            'image.less': await getModule('css-framework/bootstrap/less/mixins/image.less'),
            'labels.less': await getModule('css-framework/bootstrap/less/mixins/labels.less'),
            'list-group.less': await getModule('css-framework/bootstrap/less/mixins/list-group.less'),
            'nav-divider.less': await getModule('css-framework/bootstrap/less/mixins/nav-divider.less'),
            'nav-vertical-align.less': await getModule('css-framework/bootstrap/less/mixins/nav-vertical-align.less'),
            'opacity.less': await getModule('css-framework/bootstrap/less/mixins/opacity.less'),
            'pagination.less': await getModule('css-framework/bootstrap/less/mixins/pagination.less'),
            'panels.less': await getModule('css-framework/bootstrap/less/mixins/panels.less'),
            'progress-bar.less': await getModule('css-framework/bootstrap/less/mixins/progress-bar.less'),
            'reset-filter.less': await getModule('css-framework/bootstrap/less/mixins/reset-filter.less'),
            'reset-text.less': await getModule('css-framework/bootstrap/less/mixins/reset-text.less'),
            'resize.less': await getModule('css-framework/bootstrap/less/mixins/resize.less'),
            'responsive-visibility.less': await getModule('css-framework/bootstrap/less/mixins/responsive-visibility.less'),
            'size.less': await getModule('css-framework/bootstrap/less/mixins/size.less'),
            'tab-focus.less': await getModule('css-framework/bootstrap/less/mixins/tab-focus.less'),
            'table-row.less': await getModule('css-framework/bootstrap/less/mixins/table-row.less'),
            'text-emphasis.less': await getModule('css-framework/bootstrap/less/mixins/text-emphasis.less'),
            'text-overflow.less': await getModule('css-framework/bootstrap/less/mixins/text-overflow.less'),
            'vendor-prefixes.less': await getModule('css-framework/bootstrap/less/mixins/vendor-prefixes.less')
          },
          'alerts.less': await getModule('css-framework/bootstrap/less/alerts.less'),
          'badges.less': await getModule('css-framework/bootstrap/less/badges.less'),
          'bootstrap.less': await getModule('css-framework/bootstrap/less/bootstrap.less'),
          'breadcrumbs.less': await getModule('css-framework/bootstrap/less/breadcrumbs.less'),
          'button-groups.less': await getModule('css-framework/bootstrap/less/button-groups.less'),
          'buttons.less': await getModule('css-framework/bootstrap/less/buttons.less'),
          'carousel.less': await getModule('css-framework/bootstrap/less/carousel.less'),
          'close.less': await getModule('css-framework/bootstrap/less/close.less'),
          'code.less': await getModule('css-framework/bootstrap/less/code.less'),
          'component-animations.less': await getModule('css-framework/bootstrap/less/component-animations.less'),
          'dropdowns.less': await getModule('css-framework/bootstrap/less/dropdowns.less'),
          'forms.less': await getModule('css-framework/bootstrap/less/forms.less'),
          'glyphicons.less': await getModule('css-framework/bootstrap/less/glyphicons.less'),
          'grid.less': await getModule('css-framework/bootstrap/less/grid.less'),
          'input-groups.less': await getModule('css-framework/bootstrap/less/input-groups.less'),
          'jumbotron.less': await getModule('css-framework/bootstrap/less/jumbotron.less'),
          'labels.less': await getModule('css-framework/bootstrap/less/labels.less'),
          'list-group.less': await getModule('css-framework/bootstrap/less/list-group.less'),
          'media.less': await getModule('css-framework/bootstrap/less/media.less'),
          'mixins.less': await getModule('css-framework/bootstrap/less/mixins.less'),
          'modals.less': await getModule('css-framework/bootstrap/less/modals.less'),
          'navbar.less': await getModule('css-framework/bootstrap/less/navbar.less'),
          'navs.less': await getModule('css-framework/bootstrap/less/navs.less'),
          'normalize.less': await getModule('css-framework/bootstrap/less/normalize.less'),
          'pager.less': await getModule('css-framework/bootstrap/less/pager.less'),
          'pagination.less': await getModule('css-framework/bootstrap/less/pagination.less'),
          'panels.less': await getModule('css-framework/bootstrap/less/panels.less'),
          'popovers.less': await getModule('css-framework/bootstrap/less/popovers.less'),
          'print.less': await getModule('css-framework/bootstrap/less/print.less'),
          'progress-bars.less': await getModule('css-framework/bootstrap/less/progress-bars.less'),
          'responsive-embed.less': await getModule('css-framework/bootstrap/less/responsive-embed.less'),
          'responsive-utilities.less': await getModule('css-framework/bootstrap/less/responsive-utilities.less'),
          'scaffolding.less': await getModule('css-framework/bootstrap/less/scaffolding.less'),
          'tables.less': await getModule('css-framework/bootstrap/less/tables.less'),
          'theme.less': await getModule('css-framework/bootstrap/less/theme.less'),
          'thumbnails.less': await getModule('css-framework/bootstrap/less/thumbnails.less'),
          'tooltip.less': await getModule('css-framework/bootstrap/less/tooltip.less'),
          'type.less': await getModule('css-framework/bootstrap/less/type.less'),
          'utilities.less': await getModule('css-framework/bootstrap/less/utilities.less'),
          'variables.less': await getModule('css-framework/bootstrap/less/variables.less'),
          'wells.less': await getModule('css-framework/bootstrap/less/wells.less')
        }
      };
      break;
    case 'sass':
      set(params.build, ['public', 'css', 'main.scss'], await getModule('css-framework/bootstrap/main.scss'));
      set(params.build, ['public', 'css', 'vendor', '_bootstrap.scss'], await getModule('css-framework/bootstrap/sass/_bootstrap.scss'));
      params.build.public.css.vendor.bootstrap = {
        mixins: {
          '_alerts.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_alerts.scss'),
          '_background-variant.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_background-variant.scss'),
          '_border-radius.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_border-radius.scss'),
          '_buttons.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_buttons.scss'),
          '_center-block.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_center-block.scss'),
          '_clearfix.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_clearfix.scss'),
          '_forms.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_forms.scss'),
          '_gradients.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_gradients.scss'),
          '_grid.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_grid.scss'),
          '_grid-framework.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_grid-framework.scss'),
          '_hide-text.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_hide-text.scss'),
          '_image.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_image.scss'),
          '_labels.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_labels.scss'),
          '_list-group.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_list-group.scss'),
          '_nav-divider.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_nav-divider.scss'),
          '_nav-vertical-align.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_nav-vertical-align.scss'),
          '_opacity.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_opacity.scss'),
          '_pagination.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_pagination.scss'),
          '_panels.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_panels.scss'),
          '_progress-bar.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_progress-bar.scss'),
          '_reset-filter.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_reset-filter.scss'),
          '_reset-text.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_reset-text.scss'),
          '_resize.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_resize.scss'),
          '_responsive-visibility.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_responsive-visibility.scss'),
          '_size.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_size.scss'),
          '_tab-focus.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_tab-focus.scss'),
          '_table-row.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_table-row.scss'),
          '_text-emphasis.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_text-emphasis.scss'),
          '_text-overflow.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_text-overflow.scss'),
          '_vendor-prefixes.scss': await getModule('css-framework/bootstrap/sass/bootstrap/mixins/_vendor-prefixes.scss')
        },
        '_alerts.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_alerts.scss'),
        '_badges.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_badges.scss'),
        '_breadcrumbs.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_breadcrumbs.scss'),
        '_button-groups.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_button-groups.scss'),
        '_buttons.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_buttons.scss'),
        '_carousel.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_carousel.scss'),
        '_close.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_close.scss'),
        '_code.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_code.scss'),
        '_component-animations.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_component-animations.scss'),
        '_dropdowns.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_dropdowns.scss'),
        '_forms.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_forms.scss'),
        '_glyphicons.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_glyphicons.scss'),
        '_grid.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_grid.scss'),
        '_input-groups.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_input-groups.scss'),
        '_jumbotron.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_jumbotron.scss'),
        '_labels.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_labels.scss'),
        '_list-group.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_list-group.scss'),
        '_media.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_media.scss'),
        '_mixins.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_mixins.scss'),
        '_modals.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_modals.scss'),
        '_navbar.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_navbar.scss'),
        '_navs.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_navs.scss'),
        '_normalize.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_normalize.scss'),
        '_pager.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_pager.scss'),
        '_pagination.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_pagination.scss'),
        '_panels.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_panels.scss'),
        '_popovers.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_popovers.scss'),
        '_print.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_print.scss'),
        '_progress-bars.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_progress-bars.scss'),
        '_responsive-embed.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_responsive-embed.scss'),
        '_responsive-utilities.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_responsive-utilities.scss'),
        '_scaffolding.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_scaffolding.scss'),
        '_tables.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_tables.scss'),
        '_theme.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_theme.scss'),
        '_thumbnails.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_thumbnails.scss'),
        '_tooltip.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_tooltip.scss'),
        '_type.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_type.scss'),
        '_utilities.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_utilities.scss'),
        '_variables.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_variables.scss'),
        '_wells.scss': await getModule('css-framework/bootstrap/sass/bootstrap/_wells.scss')
      };
      break;
    default:
      break;
  }

  if (params.cssPreprocessorOptions.includes('minifiedJs')) {
    set(params.build, ['public', 'js', 'lib', 'bootstrap.min.js'], await getModule('css-framework/bootstrap/js/bootstrap.min.js'));
    set(params.build, ['public', 'js', 'lib', 'jquery.min.js'], await getModule('css-framework/jquery/jquery.min.js'));
  } else {
    set(params.build, ['public', 'js', 'lib', 'bootstrap.js'], await getModule('css-framework/bootstrap/js/bootstrap.js'));
    set(params.build, ['public', 'js', 'lib', 'jquery.js'], await getModule('css-framework/jquery/jquery.js'));
  }

  set(params.build, ['public', 'fonts', 'glyphicons-halflings-regular.eot'], await getModule('css-framework/bootstrap/fonts//glyphicons-halflings-regular.eot'));
  set(params.build, ['public', 'fonts', 'glyphicons-halflings-regular.svg'], await getModule('css-framework/bootstrap/fonts//glyphicons-halflings-regular.svg'));
  set(params.build, ['public', 'fonts', 'glyphicons-halflings-regular.ttf'], await getModule('css-framework/bootstrap/fonts//glyphicons-halflings-regular.ttf'));
  set(params.build, ['public', 'fonts', 'glyphicons-halflings-regular.woff'], await getModule('css-framework/bootstrap/fonts//glyphicons-halflings-regular.woff'));
  set(params.build, ['public', 'fonts', 'glyphicons-halflings-regular.woff2'], await getModule('css-framework/bootstrap/fonts//glyphicons-halflings-regular.woff2'));

  const htmlJsImport = params.cssPreprocessorOptions.includes('minifiedCss') ?
    await getModule('css-framework/bootstrap/html-js-min-import.html') :
    await getModule('css-framework/bootstrap/html-js-import.html');
  const htmlCssImport = params.cssPreprocessorOptions.includes('minifiedCss') ?
    await getModule('css-framework/bootstrap/html-css-min-import.html') :
    await getModule('css-framework/bootstrap/html-css-import.html');

  const jadeJsImport = params.cssPreprocessorOptions.includes('minifiedCss') ?
    await getModule('css-framework/bootstrap/jade-js-min-import.jade') :
    await getModule('css-framework/bootstrap/jade-js-import.jade');
  const jadeCssImport = params.cssPreprocessorOptions.includes('minifiedCss') ?
    await getModule('css-framework/bootstrap/jade-css-min-import.jade') :
    await getModule('css-framework/bootstrap/jade-css-import.jade');

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
