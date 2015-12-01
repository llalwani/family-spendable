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
		vm.stats = stats;
		vm.formatScope = itemService.formatScope;
		vm.d3Data = _.memoize(function () {
			var arr = [];
			_.each(vm.stats(), function (stat) {
				if (stat.name !== "scope") {
					var obj = {
						title: stat.name,
						avg: Math.floor(stat.avg)
					};
					arr.push(obj);
				}
			});
			return arr;
		});

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

		function stats() {
			var list = ['activity', 'accomplishment', 'traveling', 'scope'];
			var stats = {};
			_.each(list, function (target) {
				stats[target] = new getCount(target);
			});

			return stats;
		}

		function getCount(target) {
			var count = 0,
				total = 0;
			_.each(vm.list, function (item) {

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
			this.name = target;
			this.count = count || 0;
			this.total = total || 0;
			this.avg = avg || 0;
			//			}
		}
	}

})();