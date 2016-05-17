import { join } from 'path';
import { cpy, copy, addNpmPackage, addNpmScript } from '../utils';

async function generateTestingMocha(params) {
  const build = join(__base, 'build', params.uuid);

  switch (params.framework) {
    case 'express':
      await addNpmPackage('chai', params, true);
      await addNpmPackage('mocha', params, true);
      await addNpmPackage('sinon', params, true);
      await addNpmPackage('sinon-chai', params, true);
      await addNpmPackage('supertest', params, true);

      if (params.jsFramework) {
        // Server-side tests
        await copy(join(__dirname, 'modules', 'mocha', 'app.test-json.js'), join(build, 'test', 'server', 'app.test.js'));

        // Client-side tests
        switch (params.jsFramework) {
          case 'react':
            const reactTests = join(__dirname, 'modules', 'mocha', 'react');

            // Tests for Redux actions
            await cpy([
              join(reactTests, 'actions', 'contact.test.js')
            ], join(build, 'test', 'client', 'actions'));

            if (params.authentication.length) {
              await cpy([
                join(reactTests, 'actions', 'auth.test.js')
              ], join(build, 'test', 'client', 'actions'));
            }

            // Tests for React components
            await cpy([
              join(reactTests, 'components', 'Home.test.js')
            ], join(build, 'test', 'client', 'components'));

            // Add dependencies
            addNpmPackage('babel-register', params, true);
            addNpmPackage('babel-plugin-rewire', params, true);
            addNpmPackage('redux-mock-store', params, true);
            addNpmPackage('fetch-mock', params, true);
            addNpmPackage('enzyme', params, true);
            addNpmPackage('react-addons-test-utils', params, true);

            await addNpmScript('test', 'npm-run-all test:*', params);
            await addNpmScript('test:client', 'mocha test/client --recursive --compilers js:babel-register', params);
            await addNpmScript('test:server', 'mocha test/server --recursive', params);
            break;
          case 'angularjs':
            await addNpmPackage('karma', params, true);
            await addNpmPackage('karma-chai', params, true);
            await addNpmPackage('karma-coverage', params, true);
            await addNpmPackage('karma-mocha', params, true);
            break;
          default:
            break;
        }

      } else {
        await copy(join(__dirname, 'modules', 'mocha', 'app.test.js'), join(build, 'test', 'app.test.js'));

        await addNpmScript('test', 'mocha', params);
      }
      break;
    case 'meteor':
      break;
    default:
  }
}

export default generateTestingMocha;
