(function () {
	'use strict';

	angular
		.module('app.mainList')
		.controller('MainListController', MainListController);

	MainListController.$inject = ['$rootScope', '$scope', 'itemService', 'user'];

	function MainListController($rootScope, $scope, itemService, user) {
		var vm = this;

		vm.user = user;
		vm.shared = itemService.allUsers(user.uid);
		vm.list = itemService.getListByUser(user.uid);
		console.log("Current User", vm.user);
		console.log("User List", vm.list);
		itemService.syncProfile(user.uid, vm.user[vm.user.provider]);

		$rootScope.$on('logout', function () {
			vm.list.$destroy();
		});
	}

})();
