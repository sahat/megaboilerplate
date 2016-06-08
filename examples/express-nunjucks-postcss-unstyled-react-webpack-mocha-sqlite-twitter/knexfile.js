var dotenv = require('dotenv');

dotenv.load({ path: '.env.example' });

module.exports = {
  client: 'sqlite',
  connection: {
    filename: './dev.sqlite3'
  },
  useNullAsDefault: true
};
