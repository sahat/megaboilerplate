(function() {
  angular.module('MyApp')
      .factory('Account', Account);

  Account.$inject = ['$http'];

  function Account($http) {
      return {
        updateProfile: function(data) {
          return $http.put('/account', data);
        },
        changePassword: function(data) {
          return $http.put('/account', data);
        },
        deleteAccount: function() {
          return $http.delete('/account');
        },
        forgotPassword: function(data) {
          return $http.post('/forgot', data);
        },
        resetPassword: function(data) {
          return $http.post('/reset', data);
      }
    };
  }
})();
