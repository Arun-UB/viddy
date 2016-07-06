(function () {
    'use strict';
    angular
        .module('Viddy')
        .directive('profileCard', profileCard);

    function profileCard() {
        return {
            scope: {
                'user': '=',
                'follow': '&',
                'following': '&',
                'logout': '&'
            },
            restrict: 'E',
            templateUrl: './templates/profile-card.html'
        };
    }
})();