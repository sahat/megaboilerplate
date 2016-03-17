import generateMongodbDatabase from './generateMongodbDatabase';
import generateSqlDatabase from './generateSqlDatabase';

async function generateDatabase(params) {
  switch (params.database) {
    case 'mongodb':
      await generateMongodbDatabase(params);
      break;
    case 'mysql':
    case 'postgresql':
    case 'sqlite':
      await generateSqlDatabase(params);
      break;
    case 'none':
      break;
    default:
  }
}

export default generateDatabase;
