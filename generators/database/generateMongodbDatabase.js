import { set } from 'lodash';
import { getModule, replaceCodeMemory, addEnvMemory, addNpmPackageMemory } from '../utils';

export default async function generateMongodbDatabase(params) {
  switch (params.framework) {
    case 'express':
      await replaceCodeMemory(params, 'server.js', 'DATABASE_REQUIRE', await getModule('database/mongodb/mongoose-require.js'));
      await replaceCodeMemory(params, 'server.js', 'DATABASE_CONNECTION', await getModule('database/mongodb/mongoose-connect.js'));
      addEnvMemory(params, { MONGODB: 'localhost' });
      addNpmPackageMemory('mongoose', params);
      break;
    case 'meteor':
      break;
    default:
  }
}
