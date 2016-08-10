(function() {
angular.module('MyApp')
    .controller('SignupCtrl', SignupCtrl);

SignupCtrl.$inject = ['$rootScope', '$location', '$window', '$auth'];

function SignupCtrl($rootScope, $location, $window, $auth) {

    var ctrl = this;
    ctrl.signup = signup;
    ctrl.authenticate = authenticate;

    function signup(){
        $auth.signup(ctrl.user)
          .then(function(response) {
            $auth.setToken(response);
            $rootScope.currentUser = response.data.user;
            $window.localStorage.user = JSON.stringify(response.data.user);
            $location.path('/');
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
