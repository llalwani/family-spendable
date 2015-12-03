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
			vm.sharedFormatted = _.each(vm.shared, function(friend){
				friend.rank = friend.rank || {};
				friend.rank.xp = friend.rank.xp || 0;
				friend.rank.title = friend.rank.title || "Wanderer";
				friend.rank.class = friend.rank.class || "C";
			});
			$scope.$watch("vm.list.length", function () {
				vm.listCount = vm.list.length;

			});
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
				vm.rank.xp += 2;
				vm.alertSet('xpLog');
				
				
				
				
			});
		});
		vm.profile = itemService.getProfileByUser(user.uid);
		vm.profile.stats = vm.stats;
		vm.updateProfile = updateProfile;
		vm.stats = stats;
		
		vm.formatScope = itemService.formatScope;
		vm.rank = itemService.getRankByUser(user.uid);
		vm.rank.xp =  vm.rank.xp || 0;
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
		console.log("Rank", vm.rank);
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
			vm.rank.class = vm.rank.xp >= 100 ? 'B' : 'C';
			vm.rank.speed = '';
			if (vm.listCount < 2) {
				vm.rank.title = 'Clueless';
			}
			else if (vm.listCount < 4) {
				vm.rank.title = 'Wanderer';
			}
			else {
				vm.rank.title = 'Princess of Indecision';
				if (stats.scope.avg >= 1 && stats.scope.avg < 7) {
					vm.rank.speed = 'Sprinting';
				}
				if (stats.scope.avg > 13 && stats.scope.avg < 37) {
					vm.rank.speed = 'Prestigious';
				}
				if (stats.scope.avg >= 37) {
					vm.rank.speed = 'Grand';
				}
				if (stats.activity.avg > 35) {
					vm.rank.title = 'Voluptuary';
				}
				if (stats.accomplishment.avg > 35) {
					vm.rank.title = 'Achiever';
				}
				if (stats.traveling.avg > 35) {
					vm.rank.title = 'Voyager';
				}
				if (stats.accomplishment.avg > 33 && stats.activity.avg > 33 || stats.accomplishment.avg > 33 && stats.travel.avg > 33) {
					vm.rank.title = 'Visionary of Adventure';
				}					
				if (stats.activity.avgInt === 33 && stats.traveling.avgInt === 33 && stats.accomplishment.avgInt === 33) {
					vm.rank.title = 'Jack of All Trades';
				}
				vm.rank.stats = stats;
				if(stats.scope.avg !== 0) {vm.rank.$save()};
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
			this.avgInt = _.round(avg) || 0;
			//			}
		}
	}

})();
