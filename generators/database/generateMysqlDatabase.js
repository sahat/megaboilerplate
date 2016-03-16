import { join } from 'path';
import { copy, mkdirs, templateReplace, addEnv, addNpmPackage } from '../utils';

async function generateMysqlDatabase(params) {
  const build = join(__base, 'build', params.uuid);
  const knexfile = join(__dirname, 'modules', 'sql-common', 'knexfile.js');
  const bookshelf = join(__dirname, 'modules', 'sql-common', 'bookshelf.js');

  switch (params.framework) {
    case 'express':
      await mkdirs(join(build, 'models'));
      await mkdirs(join(build, 'config'));

      await copy(bookshelf, join(build, 'config', 'bookshelf.js'));
      await copy(knexfile, join(build, 'knexfile.js'));

      templateReplace(join(build, 'knexfile.js'), { dialect: 'mysql' });

      await addEnv(params, {
        DB_HOST: 'localhost',
        DB_USER: 'root',
        DB_PASSWORD: '',
        DB_NAME: 'megaboilerplate'
      });

      await addNpmPackage('mysql', params);
      await addNpmPackage('knex', params);
      await addNpmPackage('bookshelf', params);
      break;

    case 'hapi':
      break;

    case 'meteor':
      break;

    default:
  }
}

export default generateMysqlDatabase;
