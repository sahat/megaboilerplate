(function() {
angular.module('MyApp')
    .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$scope', '$rootScope', '$location', '$window', '$auth'];

function LoginCtrl($scope, $rootScope, $location, $window, $auth) {
    var ctrl = this;
    ctrl.login = login;
    ctrl.authenticate = authenticate;

    function login() {
        $auth.login($scope.user)
          .then(function(response) {
            $rootScope.currentUser = response.data.user;
            $window.localStorage.user = JSON.stringify(response.data.user);
            $location.path('/account');
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
