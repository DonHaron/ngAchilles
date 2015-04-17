(function () {
    "use strict";

    angular
        .module('achilles')
        .controller('MainController', MainController);

    MainController.$inject = ['$http',  '$filter', 'urls'];

    function MainController($http, $filter, urls) {
        var vm = this;
        vm.baseUrl = urls.baseUrl();
        vm.entries = [];
        vm.loadEntries = loadEntries;
        vm.process = achillesConfig.process;
        vm.reverse = false;

        vm.loadEntries();

        function loadEntries() {
            $http.get(urls.treatmentList(achillesConfig.patient))
                .then(function (response) {
                    vm.treatments = response.data;
                });
        };
    }
})();