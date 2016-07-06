(function () {
    'use strict';

    angular
        .module('Viddy')
        .directive('follow', navbar);

    function navbar() {
        return {
            // scope:{
            //     'data': '=',
            //     'follwing':'='
            // },
            // controller: function () {
            //
            // }
            restrict: 'E',
            templateUrl: './templates/follow.html'
        };
    }

})();