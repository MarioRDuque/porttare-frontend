(function(){
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('LoginController', LoginController);

  function LoginController( $rootScope,
                            $scope,
                            $state,
                            $ionicLoading,
                            $ionicPopup,
                            $auth,
                            $ionicHistory) {
    var loginVm = this;
    loginVm.login = login;
    loginVm.logout = logout;
    loginVm.loginWithFB = loginWithFB;
    loginVm.loginForm = {};
    var successState = 'app.playlists';
    var loginState = 'login';

    $rootScope.$on('auth:validation-success', function () {
      $state.go(successState);
    });

    function login() {
      $ionicLoading.show({
        template: 'cargando...'
      });
      $auth.submitLogin(loginVm.loginForm)
        .then(function () {
          $state.go(successState);
        })
        .catch(function (resp) {
          $ionicPopup.alert({
            title: 'Error',
            template: resp.errors.join(', ')
          });
        })
        .finally(function(){
          $ionicLoading.hide();
        });
    }

    function logout() {
      $ionicLoading.show({
        template: 'Cerrando sesión...'
      });
      $auth.signOut()
        .then(function () {
          $ionicHistory.clearCache().then(function () {
            $state.go(loginState, {}, { location: 'replace' });
          });
        })
        .catch(function () {
          $ionicPopup.alert({
            title: 'Error',
            template: 'Hubo un error, intentalo nuevamente.'
          });
        })
        .finally(function () {
          $ionicLoading.hide();
        });
    }

    function loginWithFB() {
      $auth.authenticate('facebook')
        .then(function () {
          $state.go(successState);
        })
        .catch(function () {
          $ionicPopup.alert({
            title: 'Error',
            template: 'Hubo un error, intentalo nuevamente.'
          });
        });
    }
  }
})();
