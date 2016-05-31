var dotenv = require('dotenv');

dotenv.load();

module.exports = {
  client: '<%= dialect %>',
  connection: {
    filename: './dev.sqlite3'
  },
  useNullAsDefault: true
};
