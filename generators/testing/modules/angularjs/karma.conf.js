module.exports = function(config) {
  config.set({
    files: [
      // Third-party vendor files
      'vendor/angular.js',
      'vendor/angular-route.js',
      'vendor/angular-mocks.js',
      'vendor/satellizer.js',
      // App entry point
      'app.js',
      // App services, controllers, directives, filters, etc.
      'controllers/*.js',
      'services/*.js',
      // Unit tests
      //= KARMA_TESTS_INDENT3
    ],

    autoWatch: true,

    //= KARMA_FRAMEWORKS_INDENT2

    browsers: ['PhantomJS'],

    //= KARMA_PLUGINS_INDENT2

    reporters: ['progress', 'coverage'],

    preprocessors: {
      'app.js': ['coverage'],
      'controllers/*.js': ['coverage'],
      'services/*.js': ['coverage']
    },

    coverageReporter: {
      type: 'lcov',
      dir: 'test',
      subdir: 'coverage'
    }
  });
};
