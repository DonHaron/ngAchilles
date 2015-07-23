/**
 * Created by Lukas  Zaugg on 22.07.15.
 */
(function () {
    "use strict";

    angular
        .module('achilles')
        .controller('MedicationController', MedicationController);

    MedicationController.$inject = ['Medication'];
    function MedicationController(Medication) {
        var vm = this;

        vm.medicationList = [
            { name : 'Aspirin', taking : "0-1-0-1", indication : "Stinken", date : "1.1.15 bis auf weiteres",
              history : [ {name : 'Aspirin', taking : "0-0-0-1", indication : "Stinken", date : "1.1.14 bis auf weiteres"},
                  {name : 'Aspirin', taking : "0-1-0-2", indication : "Stinken", date : "1.5.13 bis auf weiteres"},
                  {name : 'Aspirin', taking : "0-1-0-4", indication : "Stinken", date : "1.1.11 bis auf weiteres"}
              ]
            },
            { name : 'Viagra', taking : "0-1-0-1", indication : "Stinken", date : "1.1.15 bis auf weiteres",
                history : [ {name : 'Viagra', taking : "1-1-0-1", indication : "Stinken", date : "6.9.14 bis auf weiteres"},
                    {name : 'Viagra', taking : "0-2-0-1", indication : "Stinken", date : "3.1.14 bis auf weiteres"},
                    {name : 'Viagra', taking : "0-1-0-4", indication : "Stinken", date : "1.1.12 bis auf weiteres"}
                ]
            }
        ];

    }
})();
