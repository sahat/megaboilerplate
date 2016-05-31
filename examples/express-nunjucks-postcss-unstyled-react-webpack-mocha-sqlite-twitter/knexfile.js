var dotenv = require('dotenv');

dotenv.load();

module.exports = {
  client: 'sqlite',
  connection: {
    filename: './dev.sqlite3'
  },
  useNullAsDefault: true
};
