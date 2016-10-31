(function () {
  'use strict';

  describe('WishlistsController', function () {
    var ctrl,
      dependencies,
      $controller,
      $scope,
      $ionicLoading,
      $ionicScrollDelegate,
      deferGetCategories,
      deferGetCategoryProviders,
      ModalServiceMock;

    beforeEach(module('porttare.controllers'));
    beforeEach(angular.mock.module(function ($provide) {
      $provide.value('data', {});
      $provide.value('APP', {
        defaultSlickConfig: {}
      });
      $provide.factory('ModalService', function () {
        return {
          showModal: sinon.stub(),
          closeModal: sinon.stub()
        };
      });
      $provide.factory('CategoriesService', function ($q) {
        return {
          getCategoryProviders: function () {
            deferGetCategoryProviders = $q.defer();
            return deferGetCategoryProviders.promise;
          },
          getCategories: function () {
            deferGetCategories = $q.defer();
            return deferGetCategories.promise;
          }
        };
      });
      $provide.factory('CategoryService', function ($q) {
        return {};
      });
      $provide.factory('SlideViewsService', function () {
        return {
          next: function () {},
          back: function () {},
          goTo: function () {}
        };
      });
      $provide.factory('WishlistsService', function () {
        return {};
      });
    }));

    beforeEach(inject(function (_$rootScope_,
      _$controller_,
      data,
      APP,
      ModalService,
      CategoriesService,
      CategoryService,
      SlideViewsService,
      WishlistsService) {
      $ionicLoading = {
        show: sinon.stub(),
        hide: sinon.stub()
      };
      $ionicScrollDelegate = {
        scrollTop: sinon.stub()
      };
      ModalServiceMock = ModalService;
      $scope = _$rootScope_.$new();
      $controller = _$controller_;
      dependencies = {
        data: data,
        APP: APP,
        ModalService: ModalServiceMock,
        CategoriesService: CategoriesService,
        CategoryService: CategoryService,
        SlideViewsService: SlideViewsService,
        $ionicLoading: $ionicLoading,
        $ionicScrollDelegate: $ionicScrollDelegate,
        $scope: $scope,
        WishlistsService: WishlistsService
      };
      ctrl = $controller('WishlistsController', dependencies);
    }));

    describe('Modal events', function () {
      it('Should send the right params', function () {
        var main = {
          id: 'main',
          parentScope: $scope,
          fromTemplateUrl: 'templates/wishlist/new-edit.html'
        };
        var items = {
          id: 'items',
          parentScope: $scope,
          fromTemplateUrl: 'templates/wishlist/select-items.html'
        };
        ctrl.showModal('main');
        sinon.assert.calledWith(ModalServiceMock.showModal, main);
        ctrl.showModal('items');
        sinon.assert.calledWith(ModalServiceMock.showModal, items);
      });

      it('Should send a ID', function () {
        ctrl.closeModal('customId');
        sinon.assert.calledWith(ModalServiceMock.closeModal, 'customId');
      });

      it('Should clear info', function () {
        ctrl.closeModal('customId');
        expect(ctrl.query).to.equal('');
        expect(ctrl.wishlist).to.equal(null);
        expect(ctrl.messages).to.be.empty;
      });

      it('Should show the main modal', function () {
        var wlist = {
          'id': 1,
          'nombre': 'Parrillada del sábado',
          'items': [],
          'compartir_con': [],
          'fecha_entrega': '2016-10-02T10:44:18.609-05:00'
        };
        sinon.stub(ctrl, 'showModal');
        ctrl.showEditModal(wlist);
        expect(ctrl.wishlist.id).to.deep.equal(wlist.id);
        sinon.assert.calledWith(ctrl.showModal, 'main');
      });

      describe('Add products to wishlist', function () {
        it('Should show the loading', function () {
          ctrl.getCategories();
          sinon.assert.calledOnce($ionicLoading.show);
        });
        it('getCategories: Success', function () {
          var res = {
            data: {
              provider_categories: []
            }
          };
          ctrl.getCategories();
          deferGetCategories.resolve(res);
          $scope.$apply();
          expect(ctrl.showBackButton).to.equal(false);
          expect(ctrl.modalData.categories).to.equal(res.data.provider_categories);
          sinon.assert.calledOnce($ionicLoading.hide);
        });
        it('getCategories: Error', function () {
          ctrl.getCategories();
          deferGetCategories.reject();
          $scope.$apply();
          sinon.assert.calledOnce($ionicLoading.hide);
        });

      });

    });

  });
})();
