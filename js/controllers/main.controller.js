(function () {
    "use strict";

    angular
        .module('achilles')
        .controller('MainController', MainController);

    MainController.$inject = ['$http', 'urls'];

    function MainController($http, urls) {
        var vm = this;
        vm.baseUrl = urls.baseUrl();
        vm.entries = [];
        vm.loadEntries = loadEntries;

        vm.loadEntries();

        function loadEntries() {
            $http.get(urls.treatmentList(achillesConfig.patient))
                .then(function (response) {
                    vm.treatments = response.data;
                });
        };
    }
})();