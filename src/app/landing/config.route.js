(function () {
  'use strict';

  angular
    .module('app.landing')
    .config(configFunction)
    .run(runFunction);

  configFunction.$inject = ['$routeProvider'];

  function configFunction($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'app/landing/landing.html'
    });
  }

<<<<<<< HEAD
  function runFunction($rootScope, $location, TITLE) {
    $rootScope.title = TITLE;
=======
  function runFunction($rootScope, $location, authService) {
		if (authService.isLoggedIn) {
			$location.path('/mainlist');
		}
>>>>>>> origin/master
  }

})();
