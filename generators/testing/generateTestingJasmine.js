import { join } from 'path';
import { cpy, copy, addNpmPackage, addNpmScript } from '../utils';

async function generateTestingMocha(params) {
  const build = join(__base, 'build', params.uuid);

  switch (params.framework) {
    case 'express':
      await addNpmPackage('karma', params, true);
      await addNpmPackage('karma-coverage', params, true);
      await addNpmPackage('karma-jasmine', params, true);
      await addNpmPackage('karma-phantomjs-launcher', params, true);

      if (params.jsFramework) {
        // Server-side tests
        await copy(join(__dirname, 'modules', 'jasmine', 'app.test-json.js'), join(build, 'test', 'server', 'app.test.js'));

        // Client-side tests
        switch (params.jsFramework) {
          case 'angularjs':
            const angularjsTests = join(__dirname, 'modules', 'jasmine', 'angularjs');

            // Karma config
            await copy(join(angularjsTests, 'karma.conf.js'), join(build, 'karma.conf.js'));
            
            await cpy([
              join(angularjsTests, 'actions', 'contact.test.js')
            ], join(build, 'test', 'client', 'actions'));

            break;
          default:
            break;
        }

      } else {
        await copy(join(__dirname, 'modules', 'jasmine', 'app.test.js'), join(build, 'test', 'app.test.js'));

        await addNpmScript('test', 'karma start', params);
      }
      break;
    case 'meteor':
      break;
    default:
  }
}

export default generateTestingMocha;
