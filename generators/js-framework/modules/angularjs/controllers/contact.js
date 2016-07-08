(function() {
angular.module('MyApp')
    .controller('ContactCtrl', ContactCtrl);

ContactCtrl.$inject = ['$scope', 'Contact'];

function ContactCtrl($scope, Contact) {
    var ctrl = this;
    ctrl.sendContactForm = sendContactForm;

    function sendContactForm() {
        Contact.send($scope.contact)
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
