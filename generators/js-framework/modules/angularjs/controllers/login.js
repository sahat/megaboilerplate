(function() {
angular.module('MyApp')
    .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$rootScope', '$location', '$window', '$auth'];

function LoginCtrl($rootScope, $location, $window, $auth) {
    var ctrl = this;
    ctrl.login = login;
    ctrl.authenticate = authenticate;

    function login(){
      $auth.login(ctrl.user)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/account');
        })
        .catch(function(response) {
          ctrl.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    }

    function authenticate(provider){
      $auth.authenticate(provider)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
        })
        .catch(function(response) {
          if (response.error) {
            ctrl.messages = {
              error: [{ msg: response.error }]
            };
          } else if (response.data) {
            ctrl.messages = {
              error: [response.data]
            };
          }
        });
    }
}
})();
