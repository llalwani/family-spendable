//todo: move logic out of controller

(function () {
	'use strict';

	angular
		.module('app.mainList')
		.controller('MainListController', MainListController);

	MainListController.$inject = ['$rootScope', '$scope', 'itemService', 'alertService', 'user', '_'];

	function MainListController($rootScope, $scope, itemService, alertService, user, _) {
		var vm = this;

		vm.user = user;
		vm.shared = itemService.allUsers(user.uid);
		vm.listCount = 0;
		itemService.getListByUser(user.uid).then(function (data) {
			vm.list = data;
			_.each(vm.list, function (item) {
				item.hover = false;
				//				fixing data
				if (item.type === 'travelling') {
					item.type = 'traveling';
				}
				delete item['phone'];
				delete item['notified'];
				delete item['test'];
				delete item['showDelete'];
				vm.list.$save(item);
				$scope.$watch("vm.list.length", function () {
					vm.listCount = vm.list.length;
				});
			});
		});
		vm.profile = itemService.getProfileByUser(user.uid);

		vm.updateProfile = updateProfile;
		vm.stats = stats;
		vm.formatScope = itemService.formatScope;
		vm.rank ={};

		vm.alert = alertService.alert;
		vm.alertSet = alertService.set;

		//todo: move out d3
		vm.d3Data = _.memoize(d3Data, function (input) {
			return JSON.stringify(input);
		});

		function d3Data() {
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
		};




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
			//todo: make this a service
			vm.rank.class = 'C';
			vm.rank.speed = '';
			vm.rank.xp = 10;
			if (vm.listCount < 2) {
				vm.rank.title = 'Wanderer';
			}
			else if (vm.listCount < 4) {
				vm.rank.title = 'Hobbyist';
			}
			else {
				vm.rank.title = 'Pencil';
				if (stats.scope.avg >= 1 && stats.scope.avg < 7) {
					vm.rank.speed = 'Sprinting';
				}
				if (stats.scope.avg > 13 && stats.scope.avg < 150) {
					vm.rank.speed = 'Prestigious';
				}
				if (stats.scope.avg > 150) {
					vm.rank.speed = 'Grand';
				}
				if (stats.activity.avg > 40) {
					vm.rank.title = 'Adventurer';
				}
				if (stats.accomplishment.avg > 40) {
					vm.rank.title = 'Achiever';
				}
				if (stats.traveling.avg > 40) {
					vm.rank.title = 'Traveler';
				}
				if (stats.activity.avgInt === 33) {
					vm.rank.title = 'Jack of All Trades';
				}
			}

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
			this.avgInt = Math.floor(avg) || 0;
			//			}
		}
	}

})();
