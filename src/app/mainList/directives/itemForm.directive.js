(function () {
	'use strict';

	angular
		.module('app.mainList')
		.directive('gzItemForm', gzItemForm);

	function gzItemForm() {
		return {
			templateUrl: 'app/mainList/directives/itemForm.html',
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
		var timer;

		vm.newItem = new itemService.Item();
		vm.addItem = addItem;
		vm.formHover = formHover;
		vm.formLeave = formLeave;

		function addItem() {
			vm.list.$add(vm.newItem);
			vm.newItem = new itemService.Item();
		}

		function formHover() {
			$timeout.cancel(timer);
			return vm.showForm = true;
		}
		
		function formLeave() {
			timer = $timeout(function () {
			return vm.showForm = false;
			}, 1000);
		}

	}

})();