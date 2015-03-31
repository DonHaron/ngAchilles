(function () {
    "use strict";

    angular
        .module('achilles')
        .controller('MainController', MainController);

    MainController.$inject = ['$http', 'urls'];

    function MainController($http, urls) {
        var vm = this;
        vm.entries = [];
        vm.entryTypes = [];

        $http.get(urls.treatmentEntryTypeList())
            .then(function (response) {
                vm.entryTypes = response.data;
                /*
                 * this is ugly, but need to do this with an open issue in the angular-select2 lib
                 * https://github.com/rubenv/angular-select2/issues/15
                 * TODO: change once the issue is resolved
                 * */
                for (var i = 0; i < vm.entryTypes.length; i++) {
                    vm.entryTypes[i].toString = function () {
                        return this.id;
                    }
                }
            });


        vm.addAttribute = function (treatment) {
            console.log(treatment);
            if (!treatment.entries) treatment.entries = [];
            treatment.entries.push({
                treatmentId: treatment.id
            });
            console.log(treatment);
        }

        vm.loadEntries = function () {
            $http.get(urls.treatmentList(70220))
                .then(function (response) {
                    vm.treatments = response.data;
                });
        }

        vm.loadEntries();

        vm.addTreatment = function (treatments) {
            $http.post('');
            treatments.push({});
        }
    }
})();