(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('ModalService', ModalService);

  function ModalService($ionicModal) {

    var service = {
      showModal: showModal,
      closeModal: closeModal,
      getModal: getModal
    };

    var modalInstance = {
      scope: null
    };

    return service;

    function showModal(options) {

      var myOptions = {
        animation: 'slide-in-up'
      };

      angular.extend(myOptions, options);

      modalInstance.scope = myOptions.parentScope;

      $ionicModal.fromTemplateUrl(myOptions.fromTemplateUrl, {
        scope: modalInstance.scope,
        animation: myOptions.animation,
        backdropClickToClose: false,
        hardwareBackButtonClose: false,
        focusFirstInput: true
      }).then(function (modal) {
        if (!myOptions.id) {
          throw new ModalException('The option \'id\' is requeried');
        } else {
          createModal(modal, modalInstance, myOptions);
        }
      });
    }

    function closeModal(id) {
      validateAndContinue(id, modalInstance.scope, function() {
        modalInstance.scope.modal[id].remove();
        delete modalInstance.scope.modal[id];
      });
    }

    function ModalException(message) {
      this.message = message;
      this.name = 'ModalException';
    }

    function createModal(modal, modalInstance, options) {
      if (!modalInstance.scope.modal) {
        modalInstance.scope.modal = {};
      }else if (modalInstance.scope.modal[options.id]) {
        throw new ModalException('The id \'' + options.id + '\' is already in use');
      }
      modalInstance.scope.modal[options.id] = modal;
      modalInstance.scope.modal[options.id].show();
    }

    function getModal(id) {
      validateAndContinue(id, modalInstance.scope, function() {
        return modalInstance.scope.modal[id];
      });
    }

    function validateAndContinue(id, scope, next) {
      if (!id) {
        throw new ModalException('The modal \'id\' is requeried');
      } else if (!scope.modal[id]) {
        throw new ModalException('The modal \'id\' is invalid');
      } else {
        next();
      }
    }
  }
})();
