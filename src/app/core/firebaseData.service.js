(function () {
	'use strict';

	angular
		.module('app.core')
		.factory('firebaseDataService', firebaseDataService);

	firebaseDataService.$inject = ['FIREBASE_URL'];

	function firebaseDataService(FIREBASE_URL) {
		var root = new Firebase(FIREBASE_URL);

		var service = {
			root: root,
			cacheList: root.child('cacheList'),			
			users: root.child('users'),
			amOnline: root.child('.info'),
			presence: root.child('presence'),
			emails: root.child('emails'),
			textMessages: root.child('textMessages')
		};
		return service;
	}

})();