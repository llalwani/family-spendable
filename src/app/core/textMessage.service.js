(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('textMessageService', textMessageService);

  textMessageService.$inject = ['firebaseDataService'];

  function textMessageService(firebaseDataService) {
    var service = {
      sendTextMessage: sendTextMessage
    };

    return service;

    ////////////

    function sendTextMessage(List, Lists) {
      var newTextMessage = {
        phoneNumber: List.phone,
        size: List.size,
        name: List.name
      };
      firebaseDataService.textMessages.push(newTextMessage);
      List.notified = true;
      Lists.$save(List);
    }
  }

})();