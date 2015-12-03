(function () {
	'use strict';

	angular
		.module('app', [
      // Angular modules.
      'ngRoute',
			'ngAnimate',

      // Third List modules.
      'firebase',
			'dndLists',
			'ui.bootstrap',
			'd3',

      // Custom modules.
      'app.auth',
      'app.core',
      'app.landing',
      'app.layout',
      'app.mainList'
    ])
		.config(configFunction)
		.run(runFunction);

	//	configFunction.$inject = ['$routeProvider'];

	function configFunction($routeProvider, $logProvider) {
		//		Turn on/off debug mode
		$logProvider.debugEnabled(true);
		$routeProvider.otherwise({
			redirectTo: '/'
		});
	}

	runFunction.$inject = ['$rootScope', '$location'];

	function runFunction($rootScope, $location) {
		$rootScope.$on('$routeChangeError', function (event, next, previous, error) {
			if (error === "AUTH_REQUIRED") {
				console.log('not authorized');
				$location.path('/');
			}
		});
	}

})();