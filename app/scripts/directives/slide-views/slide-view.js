(function () {
  'use strict';

  angular
    .module('porttare.directives')
    .directive('slideView', slideViews);

  function slideViews() {
    var directive = {
      restrict: 'E',
      require: '^^slideViews',
      scope: {
        number: '=',
        active: '='
      },
      controllerAs: 'svVm',
      bindToController: true,
      templateUrl: 'templates/directives/slide-views/slide-view.html',
      transclude: true,
      controller: function () { },
      link: function (scope, element, attrs, slidesCtrl) {
        slidesCtrl.loadSlide(scope.svVm);
      }
    };
    return directive;
  }
})();
