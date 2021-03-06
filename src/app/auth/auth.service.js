(function () {
	'use strict';

	angular
		.module('app.auth')
		.factory('authService', authService);

	authService.$inject = ['$rootScope', '$firebaseAuth', 'firebaseDataService'];

	function authService($rootScope, $firebaseAuth, firebaseDataService) {
		var firebaseAuthObject = $firebaseAuth(firebaseDataService.root);

		var currentUser;

		firebaseAuthObject.$onAuth(function (auth) {
			currentUser = auth;
		});

		var service = {
			firebaseAuthObject: firebaseAuthObject,
			register: register,
			login: login,
			logout: logout,
			isLoggedIn: isLoggedIn,
			sendWelcomeEmail: sendWelcomeEmail
		};

		return service;

		////////////

		function register(user) {
			return firebaseAuthObject.$createUser(user);
		}

		function login(provider) {
			return firebaseAuthObject.$authWithOAuthPopup(provider, function (error, authData) {
				if (error) {
					console.log("Login Failed!", error);
				} else {
					console.log("Authenticated successfully with payload:", authData);
				}

			}, {
				scope: "public_profile,email,user_friends"
			});
		}

		function logout() {
			$rootScope.$broadcast('logout');
			firebaseAuthObject.$unauth();
		}

		function isLoggedIn() {
			return currentUser;
		}

		function sendWelcomeEmail(emailAddress) {
			firebaseDataService.emails.push({
				emailAddress: emailAddress
			});
		}

	}

})();
