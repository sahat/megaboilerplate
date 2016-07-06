var dotenv = require('dotenv');

dotenv.load();

module.exports = {
  client: '<%= dialect %>',
  //= KNEX_CONNECTION_INDENT1
};
