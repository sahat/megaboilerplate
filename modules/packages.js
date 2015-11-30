module.exports = {
  database: {
    mongodb: {
      mongoose: '^4.2.8'
    },
    mysql: {
      knex: '^0.9.0',
      bookshelf: '^0.9.1',
      mysql: '^2.9.0'
    },
    postgresql: {
      knex: '^0.9.0',
      bookshelf: '^0.9.1',
      pg: '^4.4.3'
    }
  },
  authentication: {
    common: {
      passport: '^0.3.2'
    },
    email: {
      'passport-local': '^1.0.0'
    },
    facebook: {
      'passport-facebook': '^2.0.0'
    },
    google: {
      'passport-google-oauth': '^0.2.0'
    },
    twitter: {
      'passport-twitter': '^1.0.3'
    }
  }
};
