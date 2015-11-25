(function () {
	'use strict';

	angular
		.module('app.core')
		.factory('itemService', itemService);

	itemService.$inject = ['$firebaseArray', '$firebaseObject', 'firebaseDataService'];

	function itemService($firebaseArray, $firebaseObject, firebaseDataService) {

		var service = {
			getListByUser: getListByUser,
			Item: Item,
			allUsers: allUsers,
			getProfileByUser: getProfileByUser,
			getStatusByUser: getStatusByUser,
			syncProfile: syncProfile
		};
		console.log(service.allUsers());
		return service;

		////////////

		function getListByUser(uid) {
			return $firebaseArray(firebaseDataService.users.child(uid).child('list'));
		}

		function Item() {
			this.name = '';
			this.scope = '';
			this.size = '';
			this.done = false;
			this.notified = false;
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

			$.extend(profileRef, data);
			profileRef.$save();
		}
	}

})();