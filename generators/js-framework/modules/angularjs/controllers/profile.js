(function() {
angular.module('MyApp')
    .controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['$rootScope', '$location', '$window', '$auth', 'Account'];

function ProfileCtrl($rootScope, $location, $window, $auth, Account) {
    var ctrl = this;
    ctrl.updateProfile = updateProfile;
    ctrl.changePassword = changePassword;
    ctrl.link = link;
    ctrl.unlink = unlink;
    ctrl.deleteAccount = deleteAccount;
    ctrl.unlink = unlink;
    ctrl.profile = $rootScope.currentUser;

    function updateProfile() {
        Account.updateProfile(ctrl.profile)
          .then(function(response) {
            $rootScope.currentUser = response.data.user;
            $window.localStorage.user = JSON.stringify(response.data.user);
            ctrl.messages = {
              success: [response.data]
            };
          })
          .catch(function(response) {
            ctrl.messages = {
              error: Array.isArray(response.data) ? response.data : [response.data]
            };
          });
    }

    function changePassword() {
        Account.changePassword(ctrl.profile)
          .then(function(response) {
            ctrl.messages = {
              success: [response.data]
            };
          })
          .catch(function(response) {
            ctrl.messages = {
              error: Array.isArray(response.data) ? response.data : [response.data]
            };
          });
    }

    function link(provider) {
        $auth.link(provider)
          .then(function(response) {
            ctrl.messages = {
              success: [response.data]
            };
          })
          .catch(function(response) {
            $window.scrollTo(0, 0);
            ctrl.messages = {
              error: [response.data]
            };
          });
    }

    function unlink(provider) {
        $auth.unlink(provider)
          .then(function() {
            ctrl.messages = {
              success: [response.data]
            };
          })
          .catch(function(response) {
            ctrl.messages = {
              error: [response.data]
            };
          });
    }

    function deleteAccount() {
        ctrl.deleteAccount = function() {
          Account.deleteAccount()
            .then(function() {
              $auth.logout();
              delete $window.localStorage.user;
              $location.path('/');
            })
            .catch(function(response) {
              ctrl.messages = {
                error: [response.data]
              };
            });
        };
    }
}
})();
