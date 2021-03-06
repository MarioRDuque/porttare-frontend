(function () {
  'use strict';

  describe('ItemsController', function () {
    var ctrl,
      $q,
      $controller,
      dependencies,
      ItemsService,
      deferGetItems,
      ModalService,
      $ionicActionSheet,
      $ionicLoading,
      $ionicPopup,
      $scope,
      $rootScope,
      deferNewItem,
      deferEditItem,
      deferDeleteItem;

    beforeEach(module('porttare.controllers'));
    beforeEach(module('porttare.services', function($provide){
      $provide.factory('ItemsService', function($q){
        return {
          getItems: function(){
            deferGetItems = $q.defer();
            return deferGetItems.promise;
          },
          newItem: function(){
            deferNewItem = $q.defer();
            return deferNewItem.promise;
          },
          editItem: function(){
            deferEditItem = $q.defer();
            return deferEditItem.promise;
          },
          deleteItem: function(){
            deferDeleteItem = $q.defer();
            return deferDeleteItem.promise;
          }
        };
      });
      $provide.factory('ModalService', function(){
        return {
          showModal: function(){
            return null;
          },
          closeModal: function(){
            return null;
          }
        };
      });
    }));

    beforeEach(inject(
      function (_$q_,
        _$rootScope_,
        _$controller_,
        _ItemsService_,
        _ModalService_) {
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $q = _$q_;
        deferGetItems = $q.defer();
        ItemsService = _ItemsService_;
        ModalService = _ModalService_;
        $controller = _$controller_;
        $ionicLoading = {
          show: sinon.stub(),
          hide: sinon.stub()
        };
        $ionicPopup = {
          alert: sinon.stub()
        };
      })
    );

    describe('All functions', function () {
      beforeEach(function () {
        dependencies = {
          $scope: $scope,
          ItemsService: ItemsService,
          ModalService: ModalService,
          $ionicLoading: $ionicLoading,
          $ionicPopup: $ionicPopup,
          $ionicActionSheet: $ionicActionSheet
        };

        ctrl = $controller('ItemsController', dependencies);
      });

      describe('Get items list', function () {
        it('Get items list', function () {
          var data = {provider_items: []}; //jshint ignore:line
          deferGetItems.resolve(data);
          $scope.$digest();
          chai.assert.isArray(ctrl.items);
        });

        it('if successful, ionicPopup.alert should be called', function () {
          var data = {provider_items: []}; //jshint ignore:line
          deferGetItems.reject(data);
          $scope.$digest();
          sinon.assert.calledOnce($ionicPopup.alert);
        });
      });

      describe('Create item', function () {

        beforeEach(inject(function () {
          ctrl.submitProcess(null);
        }));

        it('ionicLoading.show should be called', function () {
          sinon.assert.calledOnce($ionicLoading.show);
        });

        it('if successful, ionicLoading.hide should be called', function () {
          ctrl.items = [];
          deferNewItem.resolve({data: 'data'});
          $scope.$digest();
          sinon.assert.calledOnce($ionicLoading.hide);
        });

        it('if successful, response should be added to clients', function () {
          ctrl.items = [];
          deferNewItem.resolve({data: 'data'});
          $scope.$digest();
          expect(ctrl.items).to.not.be.null; //jshint ignore:line
        });

        it('if successful, ionicPopup.alert should be called', function () {
          ctrl.items = [];
          deferNewItem.resolve({data: 'data'});
          $scope.$digest();
          sinon.assert.calledOnce($ionicPopup.alert);
        });

        it('if unsuccessful, ionicLoading.hide should be called', function () {
          ctrl.messages = {};
          var backendErrors = {
            status: 422,
            data: {
              errors: [
                { test: 'message' }
              ]
            }
          };
          deferNewItem.reject(backendErrors);
          $rootScope.$digest();
          expect(ctrl.messages).to.be.not.empty; //jshint ignore:line
        });

        it('if unsuccessful, ionicLoading.hide should be called', function () {
          ctrl.items = [];
          deferNewItem.reject({data: 'data'});
          $scope.$digest();
          sinon.assert.calledOnce($ionicLoading.hide);
        });
      });

      describe('Edit item', function () {

        beforeEach(inject(function () {
          ctrl.submitProcess(1);
        }));

        it('ionicLoading.show should be called', function () {
          sinon.assert.calledOnce($ionicLoading.show);
        });

        it('if successful, ionicLoading.hide should be called', function () {
          ctrl.items = [];
          ctrl.items.findIndex = function (param) {
            var row = {id:0};
            param(row);
          };
          deferEditItem.resolve({id:0});
          deferEditItem.resolve({data: 'data'});
          $scope.$digest();
          sinon.assert.calledOnce($ionicLoading.hide);
        });

        it('if successful, ionicPopup.alert should be called', function () {
          ctrl.items = [];
          ctrl.items.findIndex = function (param) {
            var row = {id:0};
            param(row);
          };
          deferEditItem.resolve({id:0});
          $scope.$digest();
          sinon.assert.calledOnce($ionicPopup.alert);
        });

        it('if unsuccessful, ionicLoading.hide should be called', function () {
          ctrl.messages = {};
          var backendErrors = {
            status: 422,
            data: {
              errors: [
                { test: 'message' }
              ]
            }
          };
          deferEditItem.reject(backendErrors);
          $rootScope.$digest();
          expect(ctrl.messages).to.be.not.empty; //jshint ignore:line
        });

        it('if unsuccessful, ionicLoading.hide should be called', function () {
          ctrl.items = [];
          deferEditItem.reject({data: 'data'});
          $scope.$digest();
          sinon.assert.calledOnce($ionicLoading.hide);
        });
      });

      describe('Delete item', function () {

        beforeEach(inject(function () {
          ctrl.deleteItem(0);
        }));

        it('ionicLoading.show should be called', function () {
          sinon.assert.calledOnce($ionicLoading.show);
        });

        it('if successful, ionicLoading.hide should be called', function () {
          ctrl.items = [];
          ctrl.items.findIndex = function (param) {
            var row = {id:0};
            param(row);
          };
          deferDeleteItem.resolve();
          $scope.$digest();
          sinon.assert.calledOnce($ionicLoading.hide);
        });

        it('if successful, ionicPopup.alert should be called', function () {
          ctrl.items = [];
          ctrl.items.findIndex = function (param) {
            var row = {id:0};
            param(row);
          };
          deferDeleteItem.resolve();
          $scope.$digest();
          sinon.assert.calledOnce($ionicPopup.alert);
        });

        it('if unsuccessful, ionicLoading.hide should be called', function () {
          ctrl.items = [];
          deferDeleteItem.reject();
          $scope.$digest();
          sinon.assert.calledOnce($ionicLoading.hide);
        });
      });

      describe('Modal and ActionSheet', function () {
        beforeEach(function () {
          dependencies = {
            $scope: $scope,
            ItemsService: ItemsService,
            ModalService: ModalService,
            $ionicLoading: $ionicLoading,
            $ionicPopup: $ionicPopup,
            $ionicActionSheet: $ionicActionSheet
          };

          ctrl = $controller('ItemsController', dependencies);
        });

        it('Show modal', function () {
          var spy = sinon.spy(ModalService, 'showModal');
          ctrl.showNewModal();
          chai.expect(spy.called).to.be.equal(true);
        });

        beforeEach(inject(function () {
          ctrl.showEditModal({id:0});
        }));

        it('Show edit modal', function () {
          var spy = sinon.spy(ModalService, 'showModal');
          ctrl.showNewModal();
          chai.expect(spy.called).to.be.equal(true);
        });

        it('Close modal', function () {
          var spy = sinon.spy(ModalService, 'closeModal');
          ctrl.closeModal();
          expect(ctrl.item).to.be.null; //jshint ignore:line
          chai.expect(spy.called).to.be.equal(true);
        });
      });
    });
  });
})();
