(function() {
  angular.module('MyApp')
      .controller('ResetCtrl', ResetCtrl);

  ResetCtrl.$inject = ['$scope', 'Account'];

  function ResetCtrl($scope, Account) {
      var ctrl = this;
      ctrl.resetPassword = resetPassword;

      function resetPassword() {
          Account.resetPassword($scope.user)
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
