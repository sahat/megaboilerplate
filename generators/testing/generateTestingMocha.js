import { join } from 'path';
import { mkdirs, cpy, copy, replaceCode, addNpmPackage, addNpmScript } from '../utils';

async function generateTestingMocha(params) {
  const build = join(__base, 'build', params.uuid);

  switch (params.framework) {
    case 'express':
      await addNpmPackage('chai', params, true);
      await addNpmPackage('mocha', params, true);
      await addNpmPackage('karma', params, true);
      await addNpmPackage('karma-chai', params, true);
      await addNpmPackage('karma-coverage', params, true);
      await addNpmPackage('karma-mocha', params, true);
      await addNpmPackage('sinon', params, true);
      await addNpmPackage('sinon-chai', params, true);
      await addNpmPackage('supertest', params, true);

      await addNpmScript('test', 'mocha --reporter spec --timeout 5000', params, true);

      await mkdirs(join(build, 'test'));

      await cpy([
        join(__dirname, 'modules', 'mocha', 'app.test.js')
        ], join(build, 'test'));
      break;
    case 'hapi':
      break;
    case 'meteor':
      break;
    default:
  }
}

export default generateTestingMocha;
