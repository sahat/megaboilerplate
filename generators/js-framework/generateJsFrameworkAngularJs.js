import { join } from 'path';
import { copy, cpy, mkdirs, addNpmPackage, replaceCode, templateReplace } from '../utils';

async function generateJsFrameworkAngularJs(params) {
  const build = join(__base, 'build', params.uuid);
  const app = join(build, 'app.js');
  const angularJsRoutes = join(__dirname, 'modules', 'angularjs', 'angularjs-routes.js');

  switch (params.framework) {
    case 'express':

      // Create initial project structure
      await mkdirs(join(build, 'app', 'controllers'));
      await mkdirs(join(build, 'app', 'views'));
      await mkdirs(join(build, 'app', 'services'));
      await mkdirs(join(build, 'app', 'vendor'));

      // Add AngularJS routes + html5 push state redirect
      await replaceCode(app, 'ANGULARJS_ROUTES', angularJsRoutes);

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
      const vendorDir = join(__dirname, 'modules', 'angularjs', 'vendor');
      await cpy([
        join(vendorDir, 'angular.js'),
        join(vendorDir, 'angular.min.js'),
        join(vendorDir, 'angular-mocks.js'),
        join(vendorDir, 'angular-route.js'),
        join(vendorDir, 'angular-route.min.js'),
        join(vendorDir, 'satellizer.js')
      ], join(build, 'app', 'vendor'));

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
      const mainJs = join(__dirname, 'modules', 'angularjs', 'app.js');
      await copy(mainJs, join(build, 'app', 'app.js'));
      
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
