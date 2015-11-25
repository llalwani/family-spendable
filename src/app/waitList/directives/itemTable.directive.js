(function () {
	'use strict';

	angular
		.module('app.waitList')
		.directive('gzItemTable', gzItemTable);

	function gzItemTable() {
		return {
			templateUrl: 'app/waitList/directives/itemTable.html',
			restrict: 'E',
			controller: ItemTableController,
			controllerAs: 'vm',
			bindToController: true,
			scope: {
				list: '='
			}
		};
	}

	ItemTableController.$inject = ['textMessageService'];

	function ItemTableController(textMessageService) {
		var vm = this;

		vm.removeItem = removeItem;
		vm.sendTextMessage = sendTextMessage;
		vm.updateItem = updateItem;
		vm.hover = hover;
		vm.stats = {};
		vm.stats.avgScope = function () {
			var count = 0,
				total = 0;
			vm.list.forEach(function (item) {

				count = !isNaN(item.scope) ? count += item.scope : count;
				total = !isNaN(item.scope) ? total += 1 : total;

			});
			return count/total;
		};

		function removeItem(item) {
			vm.list.$remove(item);
		}

		function sendTextMessage(item) {
			textMessageService.sendTextMessage(item, vm.list);
		}

		function updateItem(item) {
			vm.stats.avgScope();
			vm.list.$save(item);
		}

		function hover(item) {
			// Shows/hides the delete button on hover
			return item.showDelete = !item.showDelete;
		}
	}

})();
