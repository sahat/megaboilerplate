(function() {
angular.module('MyApp')
    .factory('Contact', Contact);

Contact.$inject = ['$http'];

function Contact($http) {
    return {
      send: function(data) {
        return $http.post('/contact', data);
      }
    };
}
})();
