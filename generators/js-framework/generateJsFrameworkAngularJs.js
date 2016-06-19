import { get, set } from 'lodash';
import { getModule, replaceCodeMemory, templateReplaceMemory } from '../utils';

export default async function generateJsFrameworkAngularJs(params) {
  switch (params.framework) {
    case 'express':
      if (params.buildTool === 'none') {
        await replaceCodeMemory(params, 'server.js', 'ANGULARJS_ROUTES', await getModule('js-framework/angularjs/angularjs-routes-no-build.js'));
      } else {
        await replaceCodeMemory(params, 'server.js', 'ANGULARJS_ROUTES', await getModule('js-framework/angularjs/angularjs-routes.js'));
      }

      set(params.build, ['app', 'app.js'], await getModule('js-framework/angularjs/app.js'));
      set(params.build, ['app', 'controllers', 'contact.js'], await getModule('js-framework/angularjs/controllers/contact.js'));
      set(params.build, ['app', 'controllers', 'forgot.js'], await getModule('js-framework/angularjs/controllers/forgot.js'));
      set(params.build, ['app', 'controllers', 'header.js'], await getModule('js-framework/angularjs/controllers/header.js'));
      set(params.build, ['app', 'controllers', 'login.js'], await getModule('js-framework/angularjs/controllers/login.js'));
      set(params.build, ['app', 'controllers', 'profile.js'], await getModule('js-framework/angularjs/controllers/profile.js'));
      set(params.build, ['app', 'controllers', 'reset.js'], await getModule('js-framework/angularjs/controllers/reset.js'));
      set(params.build, ['app', 'controllers', 'signup.js'], await getModule('js-framework/angularjs/controllers/signup.js'));

      set(params.build, ['app', 'services', 'account.js'], await getModule('js-framework/angularjs/services/account.js'));
      set(params.build, ['app', 'services', 'contact.js'], await getModule('js-framework/angularjs/services/contact.js'));

      set(params.build, ['public', 'js', 'lib', 'angular.js'], await getModule('js-framework/angularjs/lib/angular.js'));
      set(params.build, ['public', 'js', 'lib', 'angular-mocks.js'], await getModule('js-framework/angularjs/lib/angular-mocks.js'));
      set(params.build, ['public', 'js', 'lib', 'angular-route.js'], await getModule('js-framework/angularjs/lib/angular-route.js'));
      set(params.build, ['public', 'js', 'lib', 'satellizer.js'], await getModule('js-framework/angularjs/lib/satellizer.js'));

      // Move all third-party libs to "app/vendor"
      if (params.buildTool === 'gulp') {
        set(params.build, ['app', 'vendor'], get(params.build, ['public', 'js', 'lib']));
        set(params.build, ['public', 'js'], undefined);
      }

      set(params.build, ['app', 'partials', '404.html'], await getModule('js-framework/angularjs/partials/404.html'));
      set(params.build, ['app', 'partials', 'home.html'], await getModule(`js-framework/angularjs/partials/home-${params.cssFramework}.html`));
      set(params.build, ['app', 'partials', 'contact.html'], await getModule(`js-framework/angularjs/partials/contact-${params.cssFramework}.html`));
      set(params.build, ['app', 'partials', 'header.html'], await getModule(`js-framework/angularjs/partials/header-${params.cssFramework}.html`));
      set(params.build, ['app', 'partials', 'footer.html'], await getModule('js-framework/angularjs/partials/footer.html'));

      if (params.authentication.length) {
        set(params.build, ['app', 'partials', 'forgot.html'], await getModule(`js-framework/angularjs/partials/forgot-${params.cssFramework}.html`));
        set(params.build, ['app', 'partials', 'login.html'], await getModule(`js-framework/angularjs/partials/login-${params.cssFramework}.html`));
        set(params.build, ['app', 'partials', 'profile.html'], await getModule(`js-framework/angularjs/partials/profile-${params.cssFramework}.html`));
        set(params.build, ['app', 'partials', 'reset.html'], await getModule(`js-framework/angularjs/partials/reset-${params.cssFramework}.html`));
        set(params.build, ['app', 'partials', 'signup.html'], await getModule(`js-framework/angularjs/partials/signup-${params.cssFramework}.html`));

        const headerAuthIndent = { none: 2, bootstrap: 3, foundation: 2 };
        await replaceCodeMemory(params, 'app/partials/header.html', 'HEADER_AUTH', await getModule(`js-framework/angularjs/partials/header-auth-${params.cssFramework}.html`), {
          indentLevel: headerAuthIndent[params.cssFramework]
        });
        
        // Initialize Foundation JS components
        if (params.cssFramework === 'foundation') {
          await replaceCodeMemory(params, 'app/controllers/header.js', 'FOUNDATION_INIT', await getModule('css-framework/foundation/foundation-init.js'));
        }
      }

      // Optionally add satellizer module dependency
      templateReplaceMemory(params, 'app/app.js', {
        satellizer: params.authentication.length ? `, 'satellizer'` : ''
      });
      break;
    case 'meteor':
      break;
    default:
  }
}
