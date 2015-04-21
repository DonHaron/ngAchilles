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
        vm.marginOptions = [
            {class: 'large-margins', label: 'Grosse Abstände'},
            {class: 'small-margins', label: 'Kleine Abstände'}
        ];
        vm.fontSizes = [
            {class: 'large-fonts', label: 'Gross'},
            {class: 'medium-fonts', label: 'Mittel'},
            {class: 'small-fonts', label: 'Klein'},
        ];


        vm.loadEntries();

        function loadEntries() {
            $http.get(urls.treatmentList(achillesConfig.patient))
                .then(function (response) {
                    vm.treatments = response.data;
                });
        };
    }
})();