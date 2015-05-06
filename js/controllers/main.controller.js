(function () {
    "use strict";

    angular
        .module('achilles')
        .controller('MainController', MainController);

    MainController.$inject = ['$http', 'urls', 'User', 'TreatmentPermission'];

    function MainController($http, urls, User, TreatmentPermission) {
        var vm = this;
        vm.baseUrl = urls.baseUrl();
        vm.entries = [];
        vm.loadEntries = loadEntries;
        vm.process = achillesConfig.process;
        vm.patient = achillesConfig.patient;
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
        vm.checkEditPermission = TreatmentPermission.checkEditPermission;
        //vm.shouldBeWarned = TreatmentPermission.shouldBeWarned;

        vm.loadEntries();
        loadUser();
        //vm.browser = window.navigator.userAgent;

        function loadEntries() {
            $http.get(urls.treatmentList(achillesConfig.patient),{
                spinner: true
            })
                .then(function (response) {
                    vm.treatments = response.data;
                });
        };

        function loadUser(){
            User.get(achillesConfig.process).then(function(user){
                vm.user = user;
            });
        }
    }
})();