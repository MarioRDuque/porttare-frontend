(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('SlideViewsService', SlideViewsService);

  function SlideViewsService() {

    var service = {
      next: next,
      goTo: goTo,
      back: back,
      subscribe: subscribe,
      SlideViewsException: SlideViewsException
    };
    var listeners = {
      clear: null,
      next: null,
      goTo: null,
      back: null
    };
    return service;

    function subscribe(actions) {
      listeners = actions;
    }

    function next() {
      listeners.next();
    }

    function goTo(val) {
      listeners.goTo(val);
    }

    function back() {
      listeners.back();
    }

    function SlideViewsException(message) {
      this.message = message;
      this.name = 'SlideViewsException';
    }
  }
})();
