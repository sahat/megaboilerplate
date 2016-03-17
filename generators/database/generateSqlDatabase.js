import { join } from 'path';
import { copy, mkdirs, templateReplace, addEnv, addNpmPackage } from '../utils';

async function generateSqlDatabase(params) {
  const build = join(__base, 'build', params.uuid);
  const knexfile = join(__dirname, 'modules', 'sql-common', 'knexfile.js');
  const bookshelf = join(__dirname, 'modules', 'sql-common', 'bookshelf.js');

  switch (params.framework) {
    case 'express':
      await mkdirs(join(build, 'models'));
      await mkdirs(join(build, 'config'));

      await copy(bookshelf, join(build, 'config', 'bookshelf.js'));
      await copy(knexfile, join(build, 'knexfile.js'));

      await templateReplace(join(build, 'knexfile.js'), { dialect: params.database });

      await addEnv(params, {
        DB_HOST: 'localhost',
        DB_USER: 'root',
        DB_PASSWORD: '',
        DB_NAME: 'megaboilerplate'
      });

      if (params.database === 'mysql') {
        await addNpmPackage('mysql', params);
      }
      if (params.database === 'postgresql') {
        await addNpmPackage('pg', params);
      }
      if (params.database === 'sqlite') {
        await addNpmPackage('sqlite3', params);
      }

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

export default generateSqlDatabase;
