(function () {
  'use strict';

  angular
    .module('porttare.directives')
    .directive('slideViews', slideViews);

  function slideViews() {
    var directive = {
      restrict: 'E',
      scope: {
        total: '='
      },
      templateUrl: 'templates/directives/slide-views/slide-views.html',
      controller: slideViewsController,
      controllerAs: 'svsVm',
      bindToController: true,
      transclude: true
    };
    return directive;
  }

  function slideViewsController(SlideViewsService) {
    /*jshint validthis:true */
    var svsVm = this;
    var slides = [],
      slideActive = false,
      slideCurrentIndex = 0,
      count = 0,
      actions = {
        goTo: goTo,
        back: back,
        next: next
      };

    svsVm.loadSlide = function (svVm) {
      if (svVm.active && !slideActive) {
        svVm.selected = true;
        slideActive = true;
        slideCurrentIndex = count;
      } else {
        svVm.selected = false;
      }
      slides.push(svVm);
      count++;
    };

    SlideViewsService.subscribe(actions);

    function goTo(slideNumber) {
      angular.forEach(slides, function (slide, index) {
        var isSlide = (slideNumber === index + 1);
        if (isSlide) {
          slide.selected = true;
          slideCurrentIndex = index;
        } else {
          slide.selected = false;
        }
      });
    }

    function next() {
      var lastIndex = slides.length - 1;
      if (slideCurrentIndex < lastIndex){
        slides[slideCurrentIndex].selected = false;
        slides[slideCurrentIndex + 1].selected = true;
        slideCurrentIndex++;
      }
    }

    function back() {
      if (slideCurrentIndex > 0) {
        slides[slideCurrentIndex].selected = false;
        slides[slideCurrentIndex - 1].selected = true;
        slideCurrentIndex--;
      }
    }
  }

})();
