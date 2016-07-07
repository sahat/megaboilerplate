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

      // Set knex.js SQL dialect
      let dialect;
      if (params.database === 'postgresql') {
        dialect = 'pg';
      } else {
        dialect = params.database;
      }
      templateReplaceMemory(params, 'knexfile.js', { dialect: dialect });

      addEnvMemory(params, {
        DB_HOST: 'localhost',
        DB_USER: 'root',
        DB_PASSWORD: '',
        DB_NAME: 'megaboilerplate'
      });

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

