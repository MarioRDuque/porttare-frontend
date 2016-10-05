(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('WishlistsService', WishlistsService);

  function WishlistsService() {

    var service = {
      getWishlists: getWishlists
    };

    return service;

    function getWishlists() {
      return [{
        'id': 1,
        'nombre': 'Parrillada del sábado',
        'items':[],
        'compartir_con': [],
        'fecha_entrega': '2016-10-02T10:44:18.609-05:00'
      },
      {
        'id': 2,
        'nombre': 'Fiesta',
        'items':[],
        'compartir_con': [],
        'fecha_entrega': '2016-10-02T10:44:18.609-05:00'
      }];
    }

  }
})();
