(function () {
	'use strict';

	angular
		.module('app.mainList')
		.controller('MainListController', MainListController);

	MainListController.$inject = ['$rootScope', '$scope', 'itemService', 'user', '_'];

	function MainListController($rootScope, $scope, itemService, user, _) {
		var vm = this;

		vm.user = user;
		vm.shared = itemService.allUsers(user.uid);
		itemService.getListByUser(user.uid).then(function (data) {
			vm.list = data;
			_.each(vm.list, function (item) {
				item.hover = false;
				delete item['phone'];
				delete item['notified'];
				delete item['test'];
				delete item['showDelete'];
				vm.list.$save(item);
			});
		});
		vm.profile = itemService.getProfileByUser(user.uid);
		vm.updateProfile = updateProfile;

		console.log("Current User", vm.user);
		console.log("User List", vm.list);
		itemService.syncProfile(user.uid, vm.user[vm.user.provider]);

		$rootScope.$on('logout', function () {
			vm.list.$destroy();
		});

		function updateProfile() {
			vm.profile.$save({
				'listCount': 3
			});
		}
	}

})();