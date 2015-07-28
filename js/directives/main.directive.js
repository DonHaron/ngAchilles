(function(){
    "use strict";

    angular
        .module('achilles')
        .directive('main', main);

    main.$inject = ['$timeout'];
    function main($timeout){
        var directive = {
            restrict: 'E',
            link: link,
            controller: MainController,
            controllerAs: 'vm',
            templateUrl: '../js/templates/main.tpl.html',
            replace: true
        };

        return directive;

        function link(scope, element, attrs, ctrl){
            element.on('keydown', focusTypeAndPreset);

            function focusTypeAndPreset(e) {
                //console.log(e.which);
                //F9
                if (e.which == 120) {
                    //console.log('focusing');
                    ctrl.temporarilyShowTypeAndPresetWidget = true;
                    scope.$apply();
                    $timeout(function(){
                        element.find('.type-and-preset-search:visible').focus();
                    }, 300);
                }
            }
        }
    }

    MainController.$inject = ['$scope', 'urls', 'User', 'Treatment', 'TreatmentPermission'];
    function MainController($scope, urls, User, Treatment, TreatmentPermission) {
        var vm = this;

        vm.baseUrl = urls.baseUrl();
        vm.loadEntries = loadEntries;
        vm.loadNext = loadNext;
        vm.treatmentCount = Treatment.count;
        vm.patient = achillesConfig.patient;
        vm.getNextCaption = getNextCaption;

        vm.checkEditPermission = TreatmentPermission.checkEditPermission;
        vm.reverse = false;
        vm.showTypeAndPresetWidget = false;

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

        loadUser();
        //loadEntryTypes();

        // for if we wanna use the Math functions, not really all that clean tbh. A filter would be much cleaner.
        // But who has time for that? ;)
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