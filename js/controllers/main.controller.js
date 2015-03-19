(function () {
    "use strict";

    angular
        .module('achilles')
        .controller('MainController', MainController);

    MainController.$inject = ['$http', '$scope', '$timeout', '$q'];

    function MainController($http, $scope, $timeout, $q) {
        var vm = this;
        $scope.somethingElse = 0;

        $scope.$on('somethingChanged', function () {
            console.log('event caught', 'something', something);
            $scope.somethingElse++;
        });

        vm.test = function () {
            $http.get('http://date.jsontest.com/');
        }

    }
})();