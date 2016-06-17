angular.module('MyApp')
  .factory('Account', function($http, $location) {
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
        const resetUrl = $location.path();
        return $http.post(resetUrl, data);
      }
    };
  });
