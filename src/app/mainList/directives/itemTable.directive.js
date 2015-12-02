(function () {
	'use strict';

	angular
		.module('app.mainList')
		.directive('gzItemTable', gzItemTable);

	function gzItemTable() {
		return {
			templateUrl: 'app/mainList/directives/itemTable.html',
			restrict: 'E',
			controller: ItemTableController,
			controllerAs: 'vm',
			bindToController: true,
			scope: {
				list: '=',
				rank: '='
			}
		};
	}

	ItemTableController.$inject = ['_', 'itemService', 'alertService'];

	function ItemTableController(_, itemService, alertService) {
		var vm = this;

		vm.removeItem = removeItem;
		vm.sendTextMessage = sendTextMessage;
		vm.updateItem = updateItem;
		vm.hover = hover;
		vm.formatScope = itemService.formatScope;
		vm.alert = alertService.alert;
		vm.alertSet = alertService.set;

		function removeItem(item) {
			vm.alertSet('itemRemoved');
			vm.list.$remove(item);
		}

		function sendTextMessage(item) {
			textMessageService.sendTextMessage(item, vm.list);
		}

		function updateItem(item) {
			vm.list.$save(item);
		}

		function hover(item) {
			// Shows/hides the delete button on hover
			return item.hover = !item.hover;
		}

	}

})();
