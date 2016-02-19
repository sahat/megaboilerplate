import { join } from 'path';
import { replaceCode, mkdirs, copy, appendFile, addNpmPackage } from '../utils';

async function generateMongodbDatabase(params) {
  const build = join(__base, 'build', params.uuid);

  switch (params.framework) {
    case 'express':
      const app = join(build, 'app.js');
      const mongooseRequire = join(__base, 'modules', 'database', 'mongodb', 'mongoose-require.js');
      const mongooseConnect = join(__base, 'modules', 'database', 'mongodb', 'mongoose-connect.js');
      const mongooseUserModel = join(__base, 'modules', 'database', 'mongodb', 'mongoose-model.js');

      await replaceCode(app, 'DATABASE_REQUIRE', mongooseRequire);
      await replaceCode(app, 'DATABASE_CONNECTION', mongooseConnect, { leadingBlankLine: true });

      await appendFile(join(build, '.env'), 'MONGODB=mongodb://localhost/test');

      await addNpmPackage('mongoose', params);

      // Create models dir
      await mkdirs(join(__base, 'build', params.uuid, 'models'));
      await copy(mongooseUserModel, join(build, 'models', 'user.js'));

      break;
    case 'hapi':
      break;
    case 'meteor':
      break;
    default:
  }
}

export default generateMongodbDatabase;
