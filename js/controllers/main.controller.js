(function(){
    "use strict";

    angular
        .module('achilles')
        .controller('MainController', MainController);

    MainController.$inject = ['$http', '$scope'];

    function MainController($http, $scope){
        var vm = this;

        $scope.$on('somethingChanged', function(){
            console.log('event caught', 'something', something);
        });

        vm.test = function(){
            $http.get('http://date.jsontest.com/');
        }
    }
})();