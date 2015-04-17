(function(){
    "use strict";

    angular
        .module('achilles')
        .directive('treatmentToolbar', treatmentToolbar);

    function treatmentToolbar(){
        var directive = {
            controller: controller,
            controllerAs: 'dc'
        };

        return directive;

        controller.$inject = ['$http', 'urls'];
        function controller($http, urls){
            var dc = this;

            dc.openBiometricReport = openBiometricReport;
            dc.openLaboratoryReport = openLaboratoryReport;
            dc.openTreatmentReport = openTreatmentReport;

            function openBiometricReport(process){
                $http.get(urls.biometricReport(process));
            }

            function openLaboratoryReport(process){
                $http.get(urls.laboratoryReport(process));
            }

            function openTreatmentReport(process, treatments){
                var payload = [];
                    treatments.forEach(function(treatment){
                        console.log(treatment);
                        var payloadEntry = {
                            id: treatment.id,
                            rows: []
                        }
                        // add each row's id of every entry to the current payload entry
                        treatment.entries.forEach(function(entry){
                            entry.rows.forEach(function(row){
                                payloadEntry.rows.push(row.id);
                            });
                        });
                        payload.push(payloadEntry);
                    });
                $http.post(urls.treatmentReport(process), payload);
            }
        }
    }
})();