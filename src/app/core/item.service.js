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
			this.phone = '';
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

		function syncProfile(uid, data) {
			var profile = this.getProfileByUser(uid);
			$.extend(profile, data);
			profile.$save();
		}
	}

})();