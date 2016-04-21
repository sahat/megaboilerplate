import { join } from 'path';
import { copy, cpy, mkdirs, addNpmPackage, replaceCode, templateReplace } from '../utils';

async function generateJsFrameworkAngularJs(params) {
  const build = join(__base, 'build', params.uuid);
  const server = join(build, 'server.js');
  const angularJsRoutes = join(__dirname, 'modules', 'angularjs', 'angularjs-routes.js');

  switch (params.framework) {
    case 'express':
      // Add AngularJS routes + html5 push state redirect
      await replaceCode(server, 'ANGULARJS_ROUTES', angularJsRoutes);

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
      const viewsDir = join(__dirname, 'modules', 'angularjs', 'views');

      await copy(join(viewsDir, '404.html'), join(build, 'app', 'views', '404.html'));
      await copy(join(viewsDir, `contact-${params.cssFramework}.html`), join(build, 'app', 'views', 'contact.html'));
      await copy(join(viewsDir, `header-${params.cssFramework}.html`), join(build, 'app', 'views', 'header.html'));
      await copy(join(viewsDir, 'footer.html'), join(build, 'app', 'views', 'footer.html'));

      if (params.authentication.length) {
        await copy(join(viewsDir, `forgot-${params.cssFramework}.html`), join(build, 'app', 'views', 'forgot.html'));
        await copy(join(viewsDir, `home-${params.cssFramework}.html`), join(build, 'app', 'views', 'home.html'));
        await copy(join(viewsDir, `login-${params.cssFramework}.html`), join(build, 'app', 'views', 'login.html'));
        await copy(join(viewsDir, `profile-${params.cssFramework}.html`), join(build, 'app', 'views', 'profile.html'));
        await copy(join(viewsDir, `reset-${params.cssFramework}.html`), join(build, 'app', 'views', 'reset.html'));
        await copy(join(viewsDir, `signup-${params.cssFramework}.html`), join(build, 'app', 'views', 'signup.html'));

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
        const headerAuth = join(viewsDir, `header-auth-${params.cssFramework}.html`);
        await replaceCode(join(build, 'app', 'views', 'header.html'), 'HEADER_AUTH', headerAuth, { indentLevel: headerAuthIndent[params.cssFramework], debug: true });
      }


      break;

    case 'meteor':
      break;

    default:
  }
}

export default generateJsFrameworkAngularJs;
