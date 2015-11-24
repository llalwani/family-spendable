(function() {
  'use strict';

  angular
    .module('app.waitList')
    .directive('gzItemForm', gzItemForm);

  function gzItemForm() {
    return {
      templateUrl: 'app/waitList/directives/itemForm.html',
      restrict: 'E',
      controller: ItemFormController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        list: '='
      }
    }
  }

  ItemFormController.$inject = ['itemService'];

  function ItemFormController(itemService) {
    var vm = this;

    vm.newItem = new itemService.Item();
		vm.addItem = addItem;

		function addItem() {
      vm.list.$add(vm.newItem);
			vm.newItem = new itemService.Item();
    }
  }

})();
