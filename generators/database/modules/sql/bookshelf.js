var config = require('../knexfile');
var knex = require('knex')(config);
var bookshelf = require('bookshelf')(knex);

bookshelf.plugin('virtuals');

module.exports = bookshelf;
