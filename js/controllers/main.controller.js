(function () {
    "use strict";

    angular
        .module('achilles')
        .controller('MainController', MainController);

    MainController.$inject = ['$http', 'urls'];

    function MainController($http, urls) {
        var vm = this;
        vm.entries = [];

        vm.loadEntries = function () {
            $http.get(urls.treatmentList(70220))
                .then(function (response) {
                    vm.treatments = response.data;
                });
        };

        vm.loadEntries();

    }
})();