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
				list: '=',
				rank: '=',
				alert: '&'
			}
		};
	}

	ItemFormController.$inject = ['itemService', 'alertService', '$timeout', '_'];

	function ItemFormController(itemService, alertService, $timeout, _) {
		var vm = this;
		var timer;

		vm.newItem = new itemService.Item();
		vm.addItem = addItem;
		vm.formHover = formHover;
		vm.formLeave = formLeave;
		vm.alert = alertService.alert;
		vm.alertSet = alertService.set;
		vm.cacheList = [];
		
		itemService.getCacheList().then(function (data) {
			vm.cacheList = _.pluck(data, '$value');
		});

		function addItem() {
			vm.rank.xp += 16;
			vm.list.$add(vm.newItem);
			vm.cacheList.$add(vm.newItem.name);
			vm.newItem = new itemService.Item();
			vm.alertSet('itemAdded');
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
