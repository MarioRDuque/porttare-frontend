(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('WishlistsService', WishlistsService);

  function WishlistsService($http, $q, ENV) {

    var service = {
      getWishlists: getWishlists
    };
    return service;

    function getWishlists() {
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/customer/wishlists'
      }).then(function success(res) {
        return res.data;
      }, function error(res) {
        return $q.reject(res.data);
      });
    }
  }
})();
