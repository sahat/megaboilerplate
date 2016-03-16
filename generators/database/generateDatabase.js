import generateMongodbDatabase from './generateMongodbDatabase';
import generateMysqlDatabase from './generateMysqlDatabase';
import generatePostgresqlDatabase from './generatePostgresqlDatabase';

async function generateDatabase(params) {
  switch (params.database) {
    case 'mongodb':
      await generateMongodbDatabase(params);
      break;
    case 'mysql':
      await generateMysqlDatabase(params);
      break;
    case 'postgresql':
      await generatePostgresqlDatabase(params);
      break;
    case 'rethinkdb':
      // TODO
      break;
    case 'none':
      // TODO
      break;
    default:
    // TODO
  }
}

export default generateDatabase;
