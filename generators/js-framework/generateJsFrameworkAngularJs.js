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
        join(servicesDir, 'auth.js'),
        join(servicesDir, 'contact.js'),
        join(servicesDir, 'oauth.js')
      ], join(build, 'app', 'services'));

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
      await cpy([
        join(viewsDir, '404.html'),
        join(viewsDir, 'contact.html'),
        join(viewsDir, 'footer.html'),
        join(viewsDir, 'forgot.html'),
        join(viewsDir, 'header.html'),
        join(viewsDir, 'home.html'),
        join(viewsDir, 'login.html'),
        join(viewsDir, 'profile.html'),
        join(viewsDir, 'reset.html'),
        join(viewsDir, 'signup.html')
      ], join(build, 'app', 'views'));

      // Copy entry file for Angular app
      const appJs = join(__dirname, 'modules', 'angularjs', 'app.js');
      await copy(appJs, join(build, 'app', 'app.js'));
      
      // Add satellizer dependency
      await templateReplace(join(build, 'app', 'app.js'), {
        satellizer: params.authentication.length ? `, 'satellizer'` : null
      });
      break;

    case 'meteor':
      break;

    default:
  }
}

export default generateJsFrameworkAngularJs;
