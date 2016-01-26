import { join } from 'path';
import { replaceCode, addNpmPackage } from '../utils';

async function generateMongodbDatabase(params) {
  switch (params.framework) {
    case 'express':
      const app = join(__base, 'build', params.uuid, 'app.js');
      const mongooseRequire = join(__base, 'modules', 'database', 'mongodb', 'mongoose-require.js');
      const mongooseConnect = join(__base, 'modules', 'database', 'mongodb', 'mongoose-connect.js');

      await replaceCode(app, 'DATABASE_REQUIRE', mongooseRequire);
      await replaceCode(app, 'DATABASE_CONNECTION', mongooseConnect, { leadingBlankLine: true });

      await addNpmPackage('mongoose', params);
      break;
    case 'hapi':
      break;
    case 'meteor':
      break;
    default:
  }
}

export default generateMongodbDatabase;
