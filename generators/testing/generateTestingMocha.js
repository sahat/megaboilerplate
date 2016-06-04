import { set } from 'lodash';
import { getModule, addNpmScriptMemory, addNpmPackageMemory } from '../utils';

export default async function generateTestingMocha(params) {
  switch (params.framework) {
    case 'express':
      await addNpmPackageMemory('chai', params, true);
      await addNpmPackageMemory('mocha', params, true);
      await addNpmPackageMemory('sinon', params, true);
      await addNpmPackageMemory('sinon-chai', params, true);
      await addNpmPackageMemory('supertest', params, true);

      if (params.jsFramework) {
        // Server-side tests
        set(params, ['build', 'test', 'server', 'app.test.js'], await getModule('testing/mocha/app.test-json.js'));

        // Client-side tests
        switch (params.jsFramework) {
          case 'react':
            set(params, ['build', 'test', 'client', 'components', 'Home.test.js'], await getModule('testing/mocha/react/components/Home.test.js'));
            set(params, ['build', 'test', 'client', 'actions', 'contact.test.js'], await getModule('testing/mocha/react/actions/contact.test.js'));

            if (params.authentication.length) {
              set(params, ['build', 'test', 'client', 'actions', 'auth.test.js'], await getModule('testing/mocha/react/actions/auth.test.js'));
            }

            addNpmPackageMemory('babel-register', params, true);
            addNpmPackageMemory('babel-plugin-rewire', params, true);
            addNpmPackageMemory('redux-mock-store', params, true);
            addNpmPackageMemory('fetch-mock', params, true);
            addNpmPackageMemory('enzyme', params, true);
            addNpmPackageMemory('react-addons-test-utils', params, true);

            await addNpmScriptMemory('test', 'npm run test:client && npm run test:server', params);
            await addNpmScriptMemory('test:client', 'mocha test/client --recursive --compilers js:babel-register', params);
            await addNpmScriptMemory('test:server', 'mocha test/server --recursive', params);
            break;
          case 'angularjs':
            await addNpmPackageMemory('karma', params, true);
            await addNpmPackageMemory('karma-chai', params, true);
            await addNpmPackageMemory('karma-coverage', params, true);
            await addNpmPackageMemory('karma-mocha', params, true);
            break;
          default:
            break;
        }
      } else {
        // Server-side tests
        set(params, ['build', 'test', 'app.test.js'], await getModule('testing/mocha/app.test.js'));
        await addNpmScriptMemory('test', 'mocha', params);
      }
      break;
    case 'meteor':
      break;
    default:
  }
}
