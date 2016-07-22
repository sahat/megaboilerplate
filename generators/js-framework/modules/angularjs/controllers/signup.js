(function() {
angular.module('MyApp')
    .controller('SignupCtrl', SignupCtrl);

SignupCtrl.$inject = ['$scope', '$rootScope', '$location', '$window', '$auth'];

function SignupCtrl($scope, $rootScope, $location, $window, $auth) {
    var ctrl = this;
    ctrl.signup = signup;
    ctrl.authenticate = authenticate;

    function signup() {
        $auth.signup($scope.user)
          .then(function(response) {
            $auth.setToken(response);
            $rootScope.currentUser = response.data.user;
            $window.localStorage.user = JSON.stringify(response.data.user);
            $location.path('/');
          })
          .catch(function(response) {
            $scope.messages = {
              error: Array.isArray(response.data) ? response.data : [response.data]
            };
          });
    }

    function authenticate(provider) {
        $auth.authenticate(provider)
          .then(function(response) {
            $rootScope.currentUser = response.data.user;
            $window.localStorage.user = JSON.stringify(response.data.user);
            $location.path('/');
          })
          .catch(function(response) {
            if (response.error) {
              $scope.messages = {
                error: [{ msg: response.error }]
              };
            } else if (response.data) {
              $scope.messages = {
                error: [response.data]
              };
            }
          });
    }

}
})();
