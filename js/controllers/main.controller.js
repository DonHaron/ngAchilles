(function(){
    "use strict";

    angular
        .module('achilles')
        .controller('MainController', MainController);

    MainController.$inject = ['$http'];

    function MainController($http){
        var vm = this;



        vm.test = function(){
            $http.get('http://date.jsontest.com/');
        }
    }
})();