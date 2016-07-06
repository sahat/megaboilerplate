import { set } from 'lodash';
import { getModule, addEnvMemory, replaceCodeMemory, templateReplaceMemory, addNpmPackageMemory } from '../utils';

export default async function generateSqlDatabase(params) {
  switch (params.framework) {
    case 'express':
      set(params, ['build', 'knexfile.js'], await getModule('database/sql/knexfile.js'));
      set(params, ['build', 'config', 'bookshelf.js'], await getModule('database/sql/bookshelf.js'));

      if (params.database === 'sqlite') {
        set(params, ['build', 'knexfile.js'], await getModule('database/sql/knexfile-sqlite.js'));
        set(params, ['build', 'dev.sqlite3'], await getModule('database/sql/dev.sqlite3'));
      } else {
        set(params, ['build', 'knexfile.js'], await getModule('database/sql/knexfile.js'));
      }

      templateReplaceMemory(params, 'knexfile.js', { dialect: params.database });

      // Use Postgres database connection string if Heroku is checked
      if (params.deployment === 'heroku' && params.database === 'postgresql') {
        addEnvMemory(params, {
          DATABASE_URL: 'postgres://root@localhost:5432/megaboilerplate'
        });
        await replaceCodeMemory(params, 'knexfile.js', 'KNEX_CONNECTION', await getModule('database/sql/knexfile-connection-string.js'));
      } else {
        addEnvMemory(params, {
          DB_HOST: 'localhost',
          DB_USER: 'root',
          DB_PASSWORD: '',
          DB_NAME: 'megaboilerplate'
        });
        await replaceCodeMemory(params, 'knexfile.js', 'KNEX_CONNECTION', await getModule('database/sql/knexfile-connection-options.js'));
      }

      if (params.database === 'mysql') {
        addNpmPackageMemory('mysql', params);
      }
      if (params.database === 'postgresql') {
        addNpmPackageMemory('pg', params);
      }
      if (params.database === 'sqlite') {
        addNpmPackageMemory('sqlite3', params);
      }

      addNpmPackageMemory('knex', params);
      addNpmPackageMemory('bookshelf', params);
      break;
    case 'meteor':
      break;
    default:
  }
}

