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
		vm.stats = function () {
			var count = ['scope', 'activity', 'accomplishment', 'travel'],
				total = ['scope'];
			vm.list.forEach(function (item) {
				count.scope = !isNaN(item.scope) ? count.scope += item.scope : count.scope;
				total.scope = !isNaN(item.scope) ? total.scope += 1 : total.scope;

				count.activity = !isNaN(item.scope) ? count.activity += item.scope : count.activity;
				total.activity = !isNaN(item.scope) ? total.activity += 1 : total.activity;

			});
			var avgScope = total.scope ? count.scope / total.scope : 0;
			return {
				avgScope: avgScope
			};
		};

		function removeItem(item) {
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
			return item.showDelete = !item.showDelete;
		}
	}

})();
