(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('itemService', itemService);

  itemService.$inject = ['$firebaseArray', 'firebaseDataService'];

  function itemService($firebaseArray, firebaseDataService) {

    var service = {
      getListByUser: getListByUser,
      Item: Item,
      allUsers: allUsers
    };
    console.log(service.allUsers());
    return service;

    ////////////

    function getListByUser(uid) {
      return $firebaseArray(firebaseDataService.users.child(uid).child('list'));
    }

    function Item() {
      this.name = '';
      this.phone = '';
      this.size = '';
      this.done = false;
      this.notified = false;
    }
    
    function allUsers(uid) {
      return $firebaseArray(firebaseDataService.users);
    }
  }

})();
