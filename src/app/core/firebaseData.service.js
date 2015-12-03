(function () {
	'use strict';

	angular
		.module('app.core')
		.factory('firebaseDataService', firebaseDataService);

//	firebaseDataService.$inject = ['FIREBASE_URL', '$firebaseArray', '$q'];

	function firebaseDataService(FIREBASE_URL, $firebaseArray, $q) {
		var root = new Firebase(FIREBASE_URL);

		var service = {
			root: root,
			cacheList: root.child('cacheList'),
			users: root.child('users'),
			amOnline: root.child('.info'),
			presence: root.child('presence'),
			emails: root.child('emails'),
			textMessages: root.child('textMessages'),
			getData: getData,
			getDataByRoot: getDataByRoot,
			getDataByUser: getDataByUser
		};
		return service;

		////////////

		function getData(target) {
			var defered = $q.defer();
			var arr = $firebaseArray(target).$loaded().then(function (response) {
				defered.resolve(response);
			});

			return defered.promise;
		}
		
		function getDataByRoot(target, uid) {
			return getData(service[target]);
		}
		function getDataByUser(target, uid) {
			return getData(service.users.child(uid).child(target));
		}
	}

})();