module.exports = function(config) {
  config.set({
    files: [
      // Third-party vendor files
      'public/js/lib/angular.js',
      'public/js/lib/angular-route.js',
      'public/js/lib/angular-mocks.js',
      'public/js/lib/satellizer.js',
      // App entry point
      'public/js/app.js',
      // App services, controllers, directives, filters, etc.
      'public/js/controllers/*.js',
      'public/js/services/*.js',
      // Unit tests
      //= KARMA_TESTS_INDENT3
    ],

    autoWatch: true,

    //= KARMA_FRAMEWORKS_INDENT2

    browsers: ['PhantomJS'],

    //= KARMA_PLUGINS_INDENT2

    reporters: ['progress', 'coverage'],

    preprocessors: {
      'public/js/app.js': ['coverage'],
      'public/js/controllers/*.js': ['coverage'],
      'public/js/services/*.js': ['coverage']
    },

    coverageReporter: {
      type: 'lcov',
      dir: 'test',
      subdir: 'coverage'
    }
  });
};
