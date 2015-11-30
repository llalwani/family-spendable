(function () {
	'use strict';

	angular
		.module('app.core')
		.factory('itemService', itemService);

	itemService.$inject = ['$firebaseArray', '$firebaseObject', 'firebaseDataService', '_', '$q'];

	function itemService($firebaseArray, $firebaseObject, firebaseDataService, _, $q) {

		var service = {
			getListByUser: getListByUser,
			Item: Item,
			allUsers: allUsers,
			getProfileByUser: getProfileByUser,
			getStatusByUser: getStatusByUser,
			syncProfile: syncProfile,
			updateProfile: updateProfile,
			formatScope: formatScope
		};
		console.log("All Users", service.allUsers());
		return service;

		////////////

		function getListByUser(uid) {
			var defered = $q.defer();

			var arr = $firebaseArray(firebaseDataService.users.child(uid).child('list')).$loaded().then(function (response) {
				console.log('show response', response);
				defered.resolve(response);
			});

			return defered.promise;
		}

		function Item() {
			this.name = '';
			this.scope = '';
			this.type = '';
			this.done = false;
			this.added = new Date();
			this.private = false;
		}

		function allUsers(uid) {
			return $firebaseArray(firebaseDataService.users);
		}

		function getProfileByUser(uid) {
			return $firebaseObject(firebaseDataService.users.child(uid).child('profile'));
		}

		function getStatusByUser(uid) {
			return $firebaseObject(firebaseDataService.users.child(uid).child('status'));
		}

		function syncProfile(uid, data) {
			var profileRef = this.getProfileByUser(uid);
			//			var myConnectionsRef = this.getStatusByUser(uid);
			//			var lastOnlineRef = function () {
			//				return $firebaseObject(firebaseDataService.users.child(uid).child('lastOnline'));
			//			};
			//			var connectedRef = function () {
			//				return $firebaseObject(firebaseDataService.amOnline);
			//			};
			//			connectedRef().on('value', function (snap) {
			//				if (snap.val() === true) {
			//					// We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
			//					// add this device to my connections list
			//					// this value could contain info about the device or a timestamp too
			//					var con = myConnectionsRef().push(true);
			//					// when I disconnect, remove this device
			//					con.onDisconnect().remove();
			//					// when I disconnect, update the last time I was seen online
			//					lastOnlineRef().onDisconnect().set(Firebase.ServerValue.TIMESTAMP);
			//				}
			//			});

			_.extend(profileRef, data);
			profileRef.$save();
		}

		function updateProfile(uid, key, data) {
			var profileRef = this.getProfileByUser(uid);
			$firebaseObject(firebaseDataService.users.child(uid).child('profile').child('listCount')).$set(3);
			profileRef.$save();
		}

		function formatScope(scope, month, year) {
			//add a "plus sign" to indicate 50 or more years
			year = scope === 600 ? year + '+' : year;
			return scope >= 12 ? Math.floor(scope / 12) + year :  Math.floor(scope) + month;
		}
	}

})();