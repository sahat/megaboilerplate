import generateMongodbDatabase from './generateMongodbDatabase';

async function generateDatabase(params) {
  switch (params.database) {
    case 'mongodb':
      await generateMongodbDatabase(params);
      break;
    case 'mysql':
      // TODO
      break;
    case 'postgresql':
      // TODO
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
