(function () {
    "use strict";

    angular
        .module('achilles')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', 'urls', 'User', 'Treatment', 'TreatmentPermission'];

    function MainController($scope, urls, User, Treatment, TreatmentPermission) {
        var vm = this;
        vm.baseUrl = urls.baseUrl();
        vm.entries = [];
        vm.loadEntries = loadEntries;
        //vm.process = achillesConfig.process;
        vm.patient = achillesConfig.patient;
        vm.reverse = false;
        vm.search = {};
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

        vm.loadEntries();
        loadUser();
        //loadEntryTypes();

        console.log('maincontroller line 34');

        $scope.$on('updateTreatment', function(event, treatment){
            Treatment.update(treatment, vm.treatments);
            $scope.$apply();
        });

        function loadEntries() {
            Treatment.load().then(function(treatments){
                vm.treatments = treatments;
            });
        }

        function loadUser() {
            User.get().then(function (user) {
                vm.user = user;
            });
        }
    }
})();