(function() {
angular.module('MyApp')
    .controller('ForgotCtrl', ForgotCtrl);

ForgotCtrl.$inject = ['$scope', 'Account'];

function ForgotCtrl($scope, Account) {
    var ctrl = this;
    ctrl.forgotPassword = forgotPassword;

    function forgotPassword() {
        Account.forgotPassword($scope.user)
          .then(function(response) {
            $scope.messages = {
              success: [response.data]
            };
          })
          .catch(function(response) {
            $scope.messages = {
              error: Array.isArray(response.data) ? response.data : [response.data]
            };
          });
    }
}
})();
