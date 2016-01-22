import generateMongodbDatabase from './generateMongodbDatabase';
import generatePostgresqlDatabase from './generatePostgresqlDatabase';

async function generateDatabase(params) {
  switch (params.database) {
    case 'mongodb':
      await generateMongodbDatabase(params);
      break;
    case 'mysql':
      // TODO
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
