(function () {
    "use strict";

    angular
        .module('achilles')
        .controller('MainController', MainController);

    MainController.$inject = ['$http',  '$filter', 'urls', 'TreatmentContext'];

    function MainController($http, $filter, urls, TreatmentContext) {
        var vm = this;
        vm.addTreatment = addTreatment;
        vm.baseUrl = urls.baseUrl();
        vm.entries = [];
        vm.loadEntries = loadEntries;
        vm.process = achillesConfig.process;

        vm.loadEntries();

        function loadEntries() {
            $http.get(urls.treatmentList(achillesConfig.patient))
                .then(function (response) {
                    vm.treatments = response.data;
                });
        };
        function addTreatment(treatments){
            var firstTreatment = treatments.length ? $filter('orderBy')(treatments, ['-date', 'id'])[0] : {id:0};
            TreatmentContext.addTreatment(firstTreatment, true, true, treatments);
        }
    }
})();