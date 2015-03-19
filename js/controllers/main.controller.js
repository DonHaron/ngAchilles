(function(){
    "use strict";

    angular
        .module('achilles')
        .controller('MainController', MainController);

    //MainController.$inject = ['$scope'];

    function MainController(){
        var vm = this;

        vm.test = "Hello World";
    }
})();