(function () {
    "use strict";

    angular
        .module('achilles')
        .service('TreatmentContext', TreatmentContext);


    TreatmentContext.$inject = ['$http', 'urls'];
    function TreatmentContext($http, urls) {
        TreatmentContext = {
            addTreatment: addTreatment,
            copyTreatment: copyTreatment,
            deleteTreatment: deleteTreatment
        };

        return TreatmentContext;

        function addTreatment(treatment, isMandatorTreatment, isMainTreatment, treatments) {
            console.log('here');
            var date = new Date();
            $http.post(urls.treatment(), {
                patient: achillesConfig.patient,
                process: achillesConfig.process,
                treatment: {
                    id: treatment.id,
                    isMandatorTreatment: isMandatorTreatment,
                    isMainTreatment: isMainTreatment
                }
            }).then(function (response) {
                treatments.push(response.data);
            });
        }

        function copyTreatment(treatment, treatments) {
            $http.post(urls.copyTreatment(), {
                process: achillesConfig.process,
                treatment: {
                    id: treatment.id
                }
            }).then(function (response) {
                treatments.push(response.data);
            });
        }

        function deleteTreatment(treatment, treatments) {
            //TODO: insert prompt here, then uncomment lines below
            //$http.delete(urls.treatment, treatment).then(function(response){
            // TODO: remove from treatments
            // });
        }
    }
})();