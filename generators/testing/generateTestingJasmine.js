import { set } from 'lodash';
import { getModule, addNpmScriptMemory, addNpmPackageMemory } from '../utils';

export default async function generateTestingMocha(params) {
  switch (params.framework) {
    case 'express':
      await addNpmPackageMemory('karma', params, true);
      await addNpmPackageMemory('karma-coverage', params, true);
      await addNpmPackageMemory('karma-jasmine', params, true);
      await addNpmPackageMemory('karma-phantomjs-launcher', params, true);

      if (params.jsFramework) {
        // Server-side tests
        set(params, ['build', 'test', 'server', 'app.test.js'], await getModule('testing/jasmine/app.test-json.js'));

        // Client-side tests
        switch (params.jsFramework) {
          case 'angularjs':
            set(params, ['build', 'karma.conf.js'], await getModule('testing/jasmine/angularjs/karma.conf.js'));
            set(params, ['build', 'test', 'client', 'actions', 'contact.test.js'], await getModule('testing/jasmine/angularjs/actions/contact.test.js'));
            break;
          default:
            break;
        }
      } else {
        set(params, ['build', 'test', 'app.test.js'], await getModule('testing/jasmine/app.test.js'));
        await addNpmScriptMemory('test', 'karma start', params);
      }
      break;
    case 'meteor':
      break;
    default:
  }
}
