(function () {
    'use strict';

    angular
        .module('app.core')
        .service('PAGE', PAGE);

    function PAGE() {
        var service = {
            title: title
        };

        return service;

        ////////////

        function title() {
            return "Happy"
        }
    }

})();
