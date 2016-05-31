module.exports = function(config) {
  config.set({
    files: [
      'public/js/lib/angular.js',
      'public/js/lib/angular-mocks.js',
      'app/app.js',
      'app/controllers/*.js',
      'app/services/*.js',
      'test/client/**/*.spec.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['PhantomJS'],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-coverage'
    ],

    reporters: ['progress', 'coverage'],

    // preprocessors: {
    //   'satellizer.js': ['coverage']
    // },

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage',
      subdir: '.'
    }
  });
};
