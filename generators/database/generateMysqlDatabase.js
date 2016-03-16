import { join } from 'path';
import { copy, templateReplace, mkdirs, appendFile, replaceCode, addNpmPackage } from '../utils';

async function generateMysqlDatabase(params) {
  const build = join(__base, 'build', params.uuid);

  switch (params.framework) {
    case 'express':
      const knexfile = join(__dirname, 'modules', 'sql-common', 'knexfile.js');
      const bookshelf = join(__dirname, 'modules', 'sql-common', 'bookshelf.js');

      // Copy knexfile.js (config for migrations and db connection)
      await copy(knexfile, join(build, 'knexfile.js'));
      templateReplace(join(build, 'knexfile.js'), { dialect: 'mysql' });

      // Copy bookshelf.js config
      await mkdirs(join(build, 'config'));
      await copy(bookshelf, join(build, 'config', 'bookshelf.js'));

      // Add SQL connection environment variables
      const env = join(build, '.env');
      await appendFile(env, '\nDB_HOST=localhost\n');
      await appendFile(env, '\nDB_USER=root\n');
      await appendFile(env, '\nDB_PASSWORD=\n');
      await appendFile(env, '\nDB_NAME=megaboilerplate\n');

      // Add packages to package.json
      await addNpmPackage('pg', params);
      await addNpmPackage('knex', params);
      await addNpmPackage('bookshelf', params);

      // Create "models" directory
      await mkdirs(join(build, 'models'));
      break;
    case 'hapi':
      break;
    case 'meteor':
      break;
    default:
  }
}

export default generateMysqlDatabase;
