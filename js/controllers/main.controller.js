(function () {
    "use strict";

    angular
        .module('achilles')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', 'urls', 'User', 'Treatment', 'TreatmentPermission', 'EntryType', 'Preset'];

    function MainController($scope, urls, User, Treatment, TreatmentPermission, EntryType, Preset) {
        var vm = this;

        vm.baseUrl = urls.baseUrl();
        vm.loadEntries = loadEntries;
        vm.loadNext = loadNext;
        vm.treatmentCount = Treatment.count;
        vm.patient = achillesConfig.patient;
        vm.getNextCaption = getNextCaption;

        vm.checkEditPermission = TreatmentPermission.checkEditPermission;
        vm.reverse = false;

        vm.limit = 5;

        vm.search = {};
        vm.entries = [];
        vm.marginOptions = [
            {class: 'large-margins', label: 'Grosse Abstände'},
            {class: 'small-margins', label: 'Kleine Abstände'}
        ];
        vm.fontSizes = [
            {class: 'large-fonts', label: 'Gross'},
            {class: 'medium-fonts', label: 'Mittel'},
            {class: 'small-fonts', label: 'Klein'}
        ];

        vm.loadEntries(false);

        EntryType.all()
            .then(function (types) {
                vm.types = types;
            });
        Preset.all()
            .then(function (presets) {
                vm.presets = presets;
            });

        loadUser();
        //loadEntryTypes();

        console.log('maincontroller line 42');

        // for if we wanna use the Math functions, not really all that clean tbh. A filter would be much cleaner
        $scope.Math = window.Math;
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
            vm.limit = vm.limit+5;
        }

        function getNextCaption(){
            if(!vm.treatments){
                return '';
            }
            return '+' +  (vm.treatments.length - vm.limit > 5 ? 5 : vm.treatments.length-vm.limit);
        }

        function loadUser() {
            User.get().then(function (user) {
                vm.user = user;
            });
        }
    }
})();