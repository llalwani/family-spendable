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
		vm.stats = stats;

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

		function stats() {
			var list = ['activity', 'accomplishment', 'traveling', 'scope'];
			var stats = {};
			list.forEach(function (target) {
				stats[target] = new getCount(target);
			})

			return stats;
		}

		function getCount(target) {
			var count = 0,
				total = 0;
			vm.list.forEach(function (item) {

				if (target === 'scope') {
					var attr = item[target];
					if (!isNaN(attr)) {
						count += attr;
						total += 1;
					}
				} else {
					var attr = item.type;
					if (attr === target) {
						count += 1;
					}
					total += 1;
				}
			});
			var avg = target === 'scope' ? count / total : count / total * 100;
			//			return {
			this.count = count || 0;
			this.total = total || 0;
			this.avg = avg || 0;
			//			}
		}

	}

})();