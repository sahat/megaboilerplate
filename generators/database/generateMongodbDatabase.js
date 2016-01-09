import { join } from 'path';
import { replaceCode, addDependencies } from '../utils';

let dependencies = require('../../modules/dependencies');

async function generateMongodbDatabase(params) {
  switch (params.framework) {
    case 'express':
      let app = join(__base, 'build', params.uuid, 'app.js');
      let mongooseRequire = join(__base, 'modules', 'database', 'mongodb', 'mongoose-require.js');
      let mongooseConnect = join(__base, 'modules', 'database', 'mongodb', 'mongoose-connect.js');

      await replaceCode(app, 'DATABASE_REQUIRE', mongooseRequire);
      await replaceCode(app, 'DATABASE_CONNECTION', mongooseConnect, { leadingBlankLine: true });
      await addDependencies(dependencies.database.mongodb, params);
      break;
    case 'hapi':
      break;
    case 'meteor':
      break;
    default:
  }
}

export default generateMongodbDatabase;
