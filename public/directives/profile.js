(function () {
    'use strict';
    angular
        .module('Viddy')
        .directive('profile', profile);

    function profile() {
        return {
            restrict: 'E',
            scope: {
                id: '='
            },
            templateUrl: './templates/profile.html'
        };
    }
})();