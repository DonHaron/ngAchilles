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
            { name : 'Aspirin'}, { name : 'Viagra'}
        ];

    }
})();
