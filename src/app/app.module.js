(function() {
  'use strict';

  angular
    .module('app', [
      // Angular and third-party modules.
      'ngRoute',
      'firebase',

      // Custom modules.
      'app.auth',
      'app.landing',
      'app.waitList',

      // To be removed.
      'app.services'
    ])
    .run(appRun)
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({
        redirectTo: '/'
      });
    }]);

  appRun.$inject = ['$rootScope', '$location'];

  function appRun($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
      if (error === "AUTH_REQUIRED") {
        $location.path('/');
      }
    });
  }

})();