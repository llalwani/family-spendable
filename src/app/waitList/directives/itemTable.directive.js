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
			var list = ['type', 'scope'];
			var stats = {};
			list.forEach(function (target) {
				stats[target] = new getCount(target);
			})

			console.log(stats);
			return stats;
		}

		function getCount(target) {
			var count = 0,
				total = 0;
			vm.list.forEach(function (item) {
				var attr = item[target];
				console.log(attr);
				if (target === 'scope') {
					if (!isNaN(attr)) {
						count += attr;
						total += 1;
					}
				} else {
					if (target === 'type' && attr) {
						count = {},
							total = {};
						count[attr] += 1;
						total[attr] += 1;
					}
				}
			});
			//			var avg = count / total;
			//			return {
			this.count = count || 0;
			this.total = total || 0;
			this.avg = count / total || 0;
			//			}
		}

	}

})();