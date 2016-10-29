(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('WishlistsController', WishlistsController);

  function WishlistsController( ModalService,
                                $ionicLoading,
                                $ionicScrollDelegate,
                                $scope,
                                data,
                                CategoriesService,
                                CategoryService,
                                SlideViewsService,
                                APP) {
    var wishlistsVm = this;
    wishlistsVm.query = '';
    wishlistsVm.wishlists = data.customer_wishlists; //jshint ignore:line
    wishlistsVm.wishlist = {};
    wishlistsVm.closeModal = closeModal;
    wishlistsVm.showEditModal = showEditModal;
    wishlistsVm.showModal = showModal;
    wishlistsVm.getCategories = getCategories;
    wishlistsVm.getCategoryProviders = getCategoryProviders;
    wishlistsVm.getProductsFromProvider = getProductsFromProvider;
    wishlistsVm.back = back;
    wishlistsVm.showBackButton = false;
    wishlistsVm.slickConfig = APP.defaultSlickConfig;
    wishlistsVm.modalData = {
      categories: [],
      category: {},
      providers: [],
      provider: {},
      products: []
    };
    wishlistsVm.modalSettings = {
      main: {
        id: 'main',
        parentScope: $scope,
        fromTemplateUrl: 'templates/wishlist/new-edit.html'
      },
      items: {
        id: 'items',
        parentScope: $scope,
        fromTemplateUrl: 'templates/wishlist/select-items.html'
      }
    };

    function showModal(type) {
      ModalService.showModal(wishlistsVm.modalSettings[type]);
    }

    function closeModal(id) {
      ModalService.closeModal(id);
      wishlistsVm.query = '';
      wishlistsVm.wishlist = null;
      wishlistsVm.messages = {};
    }

    function showEditModal(wlist) {
      wishlistsVm.wishlist = wlist;
      wishlistsVm.showModal('main');
    }

    function getCategories() {
      $ionicLoading.show({
        template: '{{::("globals.loading"|translate)}}'
      });
      CategoriesService.getCategories()
        .then(function success(res) {
          wishlistsVm.showBackButton = false;
          wishlistsVm.modalData.categories = res.data.provider_categories // jshint ignore:line
          $ionicLoading.hide();
        }, function error() {
          $ionicLoading.hide();
        });
    }

    function getCategoryProviders(categoryId) {
      $ionicLoading.show({
        template: '{{::("globals.loading"|translate)}}'
      });
      CategoryService.getCategoryProviders(categoryId)
        .then(function success(res) {
          SlideViewsService.next();
          wishlistsVm.showBackButton = true;
          $ionicScrollDelegate.scrollTop();
          wishlistsVm.modalData.category = res.data.provider_category;//jshint ignore:line
          wishlistsVm.modalData.providers = res.data.provider_category.provider_profiles;//jshint ignore:line
          $ionicLoading.hide();
        }, function error() {
          $ionicLoading.hide();
        });
    }

    function getProductsFromProvider(providerSelected) {
      wishlistsVm.modalData.provider = providerSelected;
      SlideViewsService.next();
      $ionicScrollDelegate.scrollTop();

      //Fixtures
      wishlistsVm.modalData.products = [
        {
          id: 1,
          image: '../images/bg.png',
          price: '$2,00',
          description: 'Cerveza 750ml'
        }, {
          id: 2,
          image: '../images/bg.png',
          price: '$2,00',
          description: 'Cerveza 750ml'
        }, {
          id: 3,
          image: '../images/bg.png',
          price: '$2,00',
          description: 'Cerveza 750ml'
        }, {
          id: 4,
          image: '../images/bg.png',
          price: '$2,00',
          description: 'Cerveza 750ml'
        }
      ];
    }

    function back() {
      SlideViewsService.back();
    }
  }
})();
