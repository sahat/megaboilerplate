module.exports = {
  templateEngine: {
    jade: '^1.9.2',
    vision: '^4.0.1',
    handlebars: '^4.0.5'
  },
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
  },
  cssBuildOptions: {
    sass: {
      middleware: {
        'node-sass-middleware': '^0.9.7'
      },
      gulp: {

      },
      grunt: {

      },
      webpack: {

      }
    },
    less: {
      middleware: {
        'less-middleware': 'latest'
      },
      gulp: {

      },
      grunt: {

      },
      webpack: {

      }
    },
    postcss: {
      middleware: {

      },
      gulp: {

      },
      grunt: {

      },
      webpack: {

      }
    }
  },
  jsFramework: {
    react: {
      'react': '^0.14.3',
      'react-dom': '^0.14.3'
    }
  }
};
