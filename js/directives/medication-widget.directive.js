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

    MedicationWidgetController.$inject = ['Medication'];
    function MedicationWidgetController(Medication) {
        var vm = this;

        vm.all = all;

        vm.all();

        function all() {
            Medication.all().then(function(data){
                vm.medicationList = data;
            });
        }

        //vm.medicationList = [
        //    { name : 'Aspirin', taking : "0-1-0-1", indication : "Stinken", date : "1.1.15 bis auf weiteres",
        //      history : [ {name : 'Aspirin', taking : "0-0-0-1", indication : "Stinken", date : "1.1.14 bis auf weiteres"},
        //          {name : 'Aspirin', taking : "0-1-0-2", indication : "Stinken", date : "1.5.13 bis auf weiteres"},
        //          {name : 'Aspirin', taking : "0-1-0-4", indication : "Stinken", date : "1.1.11 bis auf weiteres"}
        //      ]
        //    },
        //    { name : 'Viagra', taking : "0-1-0-1", indication : "Stinken", date : "1.1.15 bis auf weiteres",
        //        history : [ {name : 'Viagra', taking : "1-1-0-1", indication : "Stinken", date : "6.9.14 bis auf weiteres"},
        //            {name : 'Viagra', taking : "0-2-0-1", indication : "Stinken", date : "3.1.14 bis auf weiteres"},
        //            {name : 'Viagra', taking : "0-1-0-4", indication : "Stinken", date : "1.1.12 bis auf weiteres"}
        //        ]
        //    }
        //];

    }
})();