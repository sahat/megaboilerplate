let path = require('path');
let replaceCode = require('../../utils/replaceCode');
let addDependencies = require('../../utils/addDependencies');
let packages = require('../../modules/packages');

async function generateMongodbDatabase(params) {
  switch (params.framework) {
    case 'express':
      let app = path.join(__base, 'build', params.uuid, 'app.js');
      let mongooseRequire = path.join(__base, 'modules', 'database', 'mongodb', 'mongoose-require.js');
      let mongooseConnect = path.join(__base, 'modules', 'database', 'mongodb', 'mongoose-connect.js');

      await replaceCode(app, 'DATABASE_REQUIRE', mongooseRequire);
      await replaceCode(app, 'DATABASE_CONNECTION', mongooseConnect, { leadingBlankLine: true });
      await addDependencies(packages.database.mongodb, params);
      break;
    case 'hapi':
      // TODO
      break;
    case 'sails':
      // TODO
      break;
    default:
      // TODO
  }
}

module.exports = generateMongodbDatabase;
