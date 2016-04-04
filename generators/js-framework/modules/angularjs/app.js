angular.module('MyApp', ['ngRoute', 'satellizer' <%= ngModuleDependencies])
  .config(function($routeProvider, $locationProvider, $authProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/partials/home.html'
      })
      .when('/contact', {
        templateUrl: 'views/partials/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/login', {
        templateUrl: 'views/partials/login.html',
        controller: 'LoginCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/signup', {
        templateUrl: 'views/partials/signup.html',
        controller: 'SignupCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/account', {
        templateUrl: 'views/partials/profile.html',
        controller: 'ProfileCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/forgot', {
        templateUrl: 'views/partials/forgot.html',
        controller: 'ForgotCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/reset/:token', {
        templateUrl: 'views/partials/reset.html',
        controller: 'ResetCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .otherwise({
        templateUrl: 'views/partials/404.html'
      });

    $authProvider.loginUrl = '/login';
    $authProvider.signupUrl = '/signup';
    $authProvider.facebook({
      url: '/auth/facebook',
      clientId: '980220002068787',
      redirectUri: 'http://localhost:3000/auth/facebok/callback'
    });
    $authProvider.google({
      url: '/auth/google',
      clientId: '631036554609-v5hm2amv4pvico3asfi97f54sc51ji4o.apps.googleusercontent.com'
    });
    $authProvider.twitter({
      url: '/auth/twitter'
    });
    $authProvider.oauth2({
      name: 'vk',
      url: '/auth/vkontakte',
      clientId: 'MTCEJ3NGW2PNNB31WOSBFDSAD4MTHYVAZ1UKIULXZ2CVFC2K',
      redirectUri: 'http://localhost:3000/auth/vkontakte/callback',
      authorizationEndpoint: 'https://oauth.vk.com/authorize',
      scope: 'email',
      popupOptions: { width: 605, height: 429 }
    });

    function skipIfAuthenticated($location, $auth) {
      if ($auth.isAuthenticated()) {
        $location.path('/');
      }
    }

    function loginRequired($location, $auth) {
      if (!$auth.isAuthenticated()) {
        $location.path('/login');
      }
    }
  })
  .run(function($rootScope, $window) {
    if ($window.localStorage.user) {
      $rootScope.currentUser = JSON.parse($window.localStorage.user);
    }
  });
