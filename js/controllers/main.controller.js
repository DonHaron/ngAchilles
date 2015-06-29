(function () {
    "use strict";

    angular
        .module('achilles')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', 'urls', 'User', 'Treatment', 'TreatmentPermission'];

    function MainController($scope, urls, User, Treatment, TreatmentPermission) {
        var vm = this;

        vm.baseUrl = urls.baseUrl();
        vm.loadEntries = loadEntries;
        vm.loadNext = loadNext;
        vm.treatmentCount = Treatment.count;
        vm.patient = achillesConfig.patient;
        vm.getNextCaption = Treatment.getNextCaption;

        vm.checkEditPermission = TreatmentPermission.checkEditPermission;
        vm.reverse = false;

        vm.search = {};
        vm.entries = [];
        vm.marginOptions = [
            {class: 'large-margins', label: 'Grosse Abstände'},
            {class: 'small-margins', label: 'Kleine Abstände'}
        ];
        vm.fontSizes = [
            {class: 'large-fonts', label: 'Gross'},
            {class: 'medium-fonts', label: 'Mittel'},
            {class: 'small-fonts', label: 'Klein'},
        ];

        vm.loadEntries(false);
        loadUser();
        //loadEntryTypes();

        console.log('maincontroller line 34');

        $scope.$on('updateTreatment', function(event, treatment){
            Treatment.update(treatment, vm.treatments);
            $scope.$apply();
        });

        function loadEntries(all) {
            Treatment.load(all).then(function(treatments){
                vm.treatments = treatments;
            });
        }

        function loadNext(){
            Treatment.loadNext()
                .then(function(treatments){
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