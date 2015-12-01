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

  function runFunction($rootScope, $location, authService, TITLE) {
    $rootScope.title = TITLE;
    if (authService.isLoggedIn) {
      $location.path('/mainlist');
    }
  }

})();
