import { join } from 'path';
import { copy, cpy, replaceCode, templateReplace } from '../utils';

async function generateJsFrameworkAngularJs(params) {
  const build = join(__base, 'build', params.uuid);
  const server = join(build, 'server.js');
  const angularJsRoutes = join(__dirname, 'modules', 'angularjs', 'angularjs-routes.js');
  const angularJsRoutesNoBuild = join(__dirname, 'modules', 'angularjs', 'angularjs-routes-no-build.js');

  switch (params.framework) {
    case 'express':
      if (params.buildTool === 'none') {
        // Add html5 push state redirect
        // File index.html will be loaded implicitly by Express from "public" directory
        await replaceCode(server, 'ANGULARJS_ROUTES', angularJsRoutesNoBuild);
      } else {
        // Add AngularJS routes + html5 push state redirect
        await replaceCode(server, 'ANGULARJS_ROUTES', angularJsRoutes);
      }

      // Copy app.js (entry file)
      await copy(join(__dirname, 'modules', 'angularjs', 'app.js'), join(build, 'app', 'app.js'));

      // Copy controllers
      const controllersDir = join(__dirname, 'modules', 'angularjs', 'controllers');
      await cpy([
        join(controllersDir, 'contact.js'),
        join(controllersDir, 'forgot.js'),
        join(controllersDir, 'header.js'),
        join(controllersDir, 'login.js'),
        join(controllersDir, 'profile.js'),
        join(controllersDir, 'reset.js'),
        join(controllersDir, 'signup.js')
      ], join(build, 'app', 'controllers'));

      // Copy services
      const servicesDir = join(__dirname, 'modules', 'angularjs', 'services');
      await cpy([
        join(servicesDir, 'account.js'),
        join(servicesDir, 'contact.js')], join(build, 'app', 'services'));

      // Copy vendor files
      const libDir = join(__dirname, 'modules', 'angularjs', 'lib');
      await cpy([
        join(libDir, 'angular.js'),
        join(libDir, 'angular-mocks.js'),
        join(libDir, 'angular-route.js'),
        join(libDir, 'satellizer.js')
      ], join(build, 'public', 'js', 'lib'));

      // Copy templates
      await cpy([join(__dirname, 'modules', 'angularjs', 'index.html')], join(build, 'app'));

      // Copy account and authentication templates
      const partialsDir = join(__dirname, 'modules', 'angularjs', 'partials');

      await copy(join(partialsDir, '404.html'), join(build, 'app', 'partials', '404.html'));
      await copy(join(partialsDir, `contact-${params.cssFramework}.html`), join(build, 'app', 'partials', 'contact.html'));
      await copy(join(partialsDir, `header-${params.cssFramework}.html`), join(build, 'app', 'partials', 'header.html'));
      await copy(join(partialsDir, 'footer.html'), join(build, 'app', 'partials', 'footer.html'));

      if (params.authentication.length) {
        await copy(join(partialsDir, `forgot-${params.cssFramework}.html`), join(build, 'app', 'partials', 'forgot.html'));
        await copy(join(partialsDir, `home-${params.cssFramework}.html`), join(build, 'app', 'partials', 'home.html'));
        await copy(join(partialsDir, `login-${params.cssFramework}.html`), join(build, 'app', 'partials', 'login.html'));
        await copy(join(partialsDir, `profile-${params.cssFramework}.html`), join(build, 'app', 'partials', 'profile.html'));
        await copy(join(partialsDir, `reset-${params.cssFramework}.html`), join(build, 'app', 'partials', 'reset.html'));
        await copy(join(partialsDir, `signup-${params.cssFramework}.html`), join(build, 'app', 'partials', 'signup.html'));

        // Add satellizer dependency
        await templateReplace(join(build, 'app', 'app.js'), {
          satellizer: params.authentication.length ? `, 'satellizer'` : null
        });

        // Add log in, sign up, logout links to the header
        const headerAuthIndent = {
          none: 2,
          bootstrap: 3,
          foundation: 2
        };
        const headerAuth = join(partialsDir, `header-auth-${params.cssFramework}.html`);
        await replaceCode(join(build, 'app', 'partials', 'header.html'), 'HEADER_AUTH', headerAuth, { indentLevel: headerAuthIndent[params.cssFramework] });
      }


      break;

    case 'meteor':
      break;

    default:
  }
}

export default generateJsFrameworkAngularJs;
