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
                                WishlistsService,
                                APP) {
    var wishlistsVm = this;
    var currentIndex = null;
    wishlistsVm.query = '';
    wishlistsVm.wishlists = data.customer_wishlists; //jshint ignore:line
    wishlistsVm.wishlist = {
      provider_items_ids: [] // jshint ignore:line
    };
    wishlistsVm.closeModal = closeModal;
    wishlistsVm.showEditModal = showEditModal;
    wishlistsVm.showModal = showModal;
    wishlistsVm.getCategories = getCategories;
    wishlistsVm.getCategoryProviders = getCategoryProviders;
    wishlistsVm.getProductsFromProvider = getProductsFromProvider;
    wishlistsVm.back = back;
    wishlistsVm.showBackButton = false;
    wishlistsVm.slickConfig = APP.defaultSlickConfig;
    wishlistsVm.removeOrCancel = removeOrCancel;
    wishlistsVm.processWishlist = processWishlist;
    wishlistsVm.messages = {};
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
      currentIndex = null;
    }

    function showEditModal(wlist, index) {
      currentIndex = index;
      wishlistsVm.wishlist = angular.copy(wlist);
      wishlistsVm.wishlist.entregar_en = new Date(wlist.entregar_en) // jshint ignore:line
      wishlistsVm.showModal(wishlistsVm.modalSettings.main.id);
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
          wishlistsVm.modalData.category = res.data.provider_category; //jshint ignore:line
          wishlistsVm.modalData.providers = res.data.provider_category.provider_profiles; //jshint ignore:line
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
      wishlistsVm.modalData.products = [{
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
      }];
    }

    function back() {
      SlideViewsService.back();
    }

    function processWishlist(id) {
      $ionicLoading.show({
        template: '{{::("globals.loading"|translate)}}'
      });
      if (id) {
        updateWishlist();
      } else {
        createWishlist();
      }
    }

    function removeOrCancel(id) {
      $ionicLoading.show({
        template: '{{::("globals.loading"|translate)}}'
      });
      if (id) {
        removeWishlist(id);
      } else {
        $ionicLoading.hide();
        closeModal(wishlistsVm.modalSettings.main.id);
      }
    }

    function removeWishlist(id) {
      WishlistsService.removeWishlist(id)
        .then(function success() {
          wishlistsVm.wishlists.splice(currentIndex, 1);
          $ionicLoading.hide();
          closeModal(wishlistsVm.modalSettings.main.id);
        }, function error(res) {
          wishlistsVm.messages = res.errors;
          $ionicLoading.hide();
        });
    }

    function updateWishlist() {
      WishlistsService.updateWishlist(wishlistsVm.wishlist)
        .then(function success(res) {
          wishlistsVm.wishlists[currentIndex] = res.customer_wishlist; //jshint ignore: line
          $ionicLoading.hide();
          closeModal(wishlistsVm.modalSettings.main.id);
        }, function error(res) {
          wishlistsVm.messages = res.errors;
          $ionicLoading.hide();
        });
    }

    function createWishlist() {
      WishlistsService.createWishlist(wishlistsVm.wishlist)
        .then(function success(res) {
          wishlistsVm.wishlists.push(res.customer_wishlist); //jshint ignore: line
          $ionicLoading.hide();
          closeModal(wishlistsVm.modalSettings.main.id);
        }, function error(res) {
          wishlistsVm.messages = res.errors;
          $ionicLoading.hide();
        });
    }
  }
})();
