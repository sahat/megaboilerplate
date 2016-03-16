var bookshelf = require('../config/bookshelf');

var User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true
});

module.exports = User;
