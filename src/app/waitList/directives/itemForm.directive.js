(function () {
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

	ItemFormController.$inject = ['itemService', '$timeout'];

	function ItemFormController(itemService, $timeout) {
		var vm = this;

		vm.newItem = new itemService.Item();
		vm.addItem = addItem;
		vm.hoverForm = hoverForm;

		function addItem() {
			vm.list.$add(vm.newItem);
			vm.newItem = new itemService.Item();
		}

		function hoverForm(wait) {
			wait = wait || 0;
			$timeout(function () {
				return vm.showForm = !vm.showForm;
			}, wait);

		}
	}

})();