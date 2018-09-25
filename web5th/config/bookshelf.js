var config = require('../knexfile');
var knex = require('knex')(config);
var bookshelf = require('bookshelf')(knex);

bookshelf.plugin('virtuals');
bookshelf.plugin('visibility');

knex.migrate.latest();

module.exports = bookshelf;
