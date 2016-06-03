import { set } from 'lodash';
import { getModule, addNpmScriptMemory, addNpmPackageMemory } from '../utils';

export default async function generateTestingJasmine(params) {
  switch (params.framework) {
    case 'express':
      await addNpmPackageMemory('jasmine', params, true);

      // Server-side tests
      set(params.build, ['spec', 'server.spec.js'], await getModule('testing/jasmine/server.spec.js'));
      set(params.build, ['spec', 'support', 'jasmine.json'], await getModule('testing/jasmine/jasmine.json'));

      if (params.jsFramework) {
        await addNpmPackageMemory('karma', params, true);
        await addNpmPackageMemory('karma-coverage', params, true);
        await addNpmPackageMemory('karma-jasmine', params, true);
        await addNpmPackageMemory('karma-phantomjs-launcher', params, true);
        await addNpmPackageMemory('phantomjs-prebuilt', params, true);

        // Client-side tests
        switch (params.jsFramework) {
          case 'angularjs':
            set(params.build, ['app', 'karma.conf.js'], await getModule('testing/jasmine/angularjs/karma.conf.js'));
            set(params.build, ['app', 'test', 'unit', 'controllers', 'contact.spec.js'], await getModule('testing/jasmine/angularjs/unit/contact.spec.js'));
            break;
          default:
            break;
        }

        // NPM scripts for both server and client tests
        await addNpmScriptMemory('test', 'npm run test:server && npm run test:client', params);
        await addNpmScriptMemory('test:server', 'jasmine', params);
        await addNpmScriptMemory('test:client', 'karma start app/karma.conf.js --single-run', params);
      } else {
        // NPM script only for server tests
        await addNpmScriptMemory('test', 'jasmine', params);
      }
      break;
    case 'meteor':
      break;
    default:
  }
}
