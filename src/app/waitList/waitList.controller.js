(function () {
	'use strict';

	angular
		.module('app.waitList')
		.controller('WaitListController', WaitListController);

	WaitListController.$inject = ['$rootScope', '$scope', 'itemService', 'user'];

	function WaitListController($rootScope, $scope, itemService, user) {
		var vm = this;

		vm.user = user;
		vm.shared = itemService.allUsers(user.uid);
		vm.list = itemService.getListByUser(user.uid);

		console.log(vm.list);
		itemService.syncProfile(user.uid, vm.user.facebook);

		$rootScope.$on('logout', function () {
			vm.list.$destroy();
		});
	}

})();
