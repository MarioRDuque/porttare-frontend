(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('CategoryController', CategoryController);

  function CategoryController(data, APP) {
    var categoryVm = this;

    categoryVm.category = data.provider_category;//jshint ignore:line
    categoryVm.providers = data.provider_category.provider_profiles;//jshint ignore:line
    categoryVm.slickConfig = APP.defaultSlickConfig;
  }
})();
