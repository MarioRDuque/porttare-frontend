(function(){
'use strict';

  angular
    .module('porttare.controllers')
    .controller('RegisterController', RegisterController);

  function RegisterController($ionicLoading, $auth, $ionicPopup, $state, $scope) {
    var registerVm = this;
    registerVm.register = register;
    registerVm.registerForm = {};
    registerVm.loginWithFB = loginWithFB;

    var successState = 'app.playlists';

    function register() {
      $ionicLoading.show({
        template: 'cargando...'
      });
      $auth.submitRegistration(registerVm.registerForm)
        .then(function() {
          $state.go('login').then(function(){
            $ionicPopup.alert({
              title: 'Alerta',
              template: 'Usuario creado satisfactoriamente'
            });
          });
        })
        .finally(function(){
          $ionicLoading.hide();
        });
    }

    $scope.$on('auth:registration-email-error', function(event, response){
      var errors;
      if (responses.errors.full_messages) {
        errors = response.errors.full_messages.join(', ') //jshint ignore:line
      }else{
        errors = response.errors.join(', ');
      }
      $ionicPopup.alert({
        title: 'Error',
        template: errors
      });
    });

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
