(function () {
  'use strict';

  angular
    .module('app.waitList')
    .controller('WaitListController', WaitListController);

  WaitListController.$inject = ['$rootScope', 'itemService', 'user'];

  function WaitListController($rootScope, itemService, user) {
    var vm = this;

    vm.user = user;
    vm.shared = itemService.allUsers(user.uid);
    vm.list = itemService.getListByUser(user.uid);

    $rootScope.$on('logout', function () {
      vm.list.$destroy();
    });
  }

})();
