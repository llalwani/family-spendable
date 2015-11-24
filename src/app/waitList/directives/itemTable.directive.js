(function() {
  'use strict';

  angular
    .module('app.waitList')
    .directive('gzItemTable', gzItemTable);

  function gzItemTable() {
    return {
      templateUrl: 'app/waitList/directives/itemTable.html',
      restrict: 'E',
      controller: ItemTableController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        list: '='
      }
    }
  }

  ItemTableController.$inject = ['textMessageService'];

  function ItemTableController(textMessageService) {
    var vm = this;

    vm.removeItem = removeItem;
    vm.sendTextMessage = sendTextMessage;
    vm.toggleDone = toggleDone;

    function removeItem(item) {
      vm.list.$remove(item);
    }

    function sendTextMessage(item) {
      textMessageService.sendTextMessage(item, vm.list);
    }

    function toggleDone(item) {
      vm.list.$save(item);
    }

  }

})();
