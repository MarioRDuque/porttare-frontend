(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('CommonService', CommonService);

  function CommonService($http, ENV) {

    var service = {
      editObject: editObject,
      getObjects: getObjects
    };

    return service;

    function getObjects(url) {
      return $http({
        method: 'GET',
        url: ENV.apiHost + url
      })
        .then(function success(resp) {
          return resp.data;
        });
    }

    function editObject(data, url) {
      return $http({
        method: 'PUT',
        url: ENV.apiHost + url + data.id,
        data: data
      })
        .then(function success(resp){
          return resp.data;
        });
    }
  }
})();
