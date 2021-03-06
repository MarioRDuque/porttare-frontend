(function () {
  'use strict';
  /* jshint validthis:true */
  angular
    .module('porttare.directives')
    .directive('productCounter', productCounter);

  function productCounter() {
    var directive = {
      restrict: 'E',
      templateUrl: 'templates/directives/product-counter/product-counter.html',
      scope: {
        options: '='
      },
      controller: productCounterController,
      controllerAs: 'pcVm',
      bindToController: true
    };

    return directive;
  }

  function productCounterController() {
    var pcVm = this,
      options = {},
      centValue = 0.01,
      limit = 0,
      actions = {
        subtract: 'subtract',
        add: 'add'
      };

    pcVm.handleClickMinus = handleClickMinus;
    pcVm.handleClickPlus = handleClickPlus;
    pcVm.itemsCount = 0;
    pcVm.priceTotal = 0;

    init();

    function processData(option) {
      if (isInRange(pcVm.itemsCount)) {
        if (option === actions.subtract) {
          if (pcVm.itemsCount !== limit) {
            changeCounter(option);
          }
        } else {
          changeCounter(option);
        }
      }
    }

    function changeCounter(option) {
      if (option === actions.add) {
        pcVm.itemsCount++;
      } else if (option === actions.subtract) {
        pcVm.itemsCount--;
      }
      pcVm.priceTotal = getTotal();
      if (options.onChangeValue && angular.isFunction(options.onChangeValue)) {
        var data = {
          itemsCount: pcVm.itemsCount,
          priceTotal: pcVm.priceTotal
        };
        options.onChangeValue(data);
      }
    }

    function handleClickMinus() {
      runAction('onClickMinus');
      processData(actions.subtract);
    }

    function handleClickPlus() {
      runAction('onClickPlus');
      processData(actions.add);
    }

    function runAction(name) {
      if (options[name] && angular.isFunction(options[name])) {
        options[name]();
      }
    }

    function init() {
      var defaultOptions = {
        priceCents: 0,
        onClickMinus: null,
        onClickPlus: null,
        onChangeValue: null
      };

      if (!isValidNumber(pcVm.options.priceCents)) {
        throw 'Invalid value for option \'priceCents\'';
      }

      options = angular.merge({}, defaultOptions, pcVm.options);
    }

    function isValidNumber(value) {
      return angular.isNumber(value) && Number.isInteger(value);
    }

    function isInRange(value) {
      return value >= limit;
    }

    function getTotal() {
      return pcVm.itemsCount * (options.priceCents * centValue);
    }
  }
})();
