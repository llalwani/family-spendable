(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('alertService', alertService);

    alertService.$inject = ['$timeout'];


    function alertService($timeout) {
        var alert = {};

        var service = {
            set: set,
            alert: alert
        };
        return service;

        ////////////

        function set(name, delay) {
            var wait = delay || 1800;
            alert[name] = true;
            $timeout(function () {
                return alert[name] = false;
            }, wait);
        }
    }

})();
