(function(){
    "use strict";

    angular
        .module('achilles')
        .directive('medicationWidget', medicationWidget);

    function medicationWidget(){
        var directive = {
            templateUrl: '../js/templates/medication-widget.tpl.html',
            controller: MedicationWidgetController,
            controllerAs: 'vm',
            scope: {}
        };

        return directive;
    }

    MedicationWidgetController.$inject = ['Medication', 'User'];
    function MedicationWidgetController(Medication, User) {
        var vm = this;

        all();

        loadUser();

        function all() {
            Medication.all().then(function(data){
                vm.medicationList = data;
            });
        }

        function loadUser() {
            User.get().then(function (user) {
                vm.user = user;
            });
        }

    }
})();