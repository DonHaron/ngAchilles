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

        function addTreatment(treatments) {
            console.log('here');
            var date = new Date();
            $http.post(urls.treatment(), {
                patient: achillesConfig.patient, //TODO: get the patient id here
                date: date.getTime() //TODO: get the current date in the correct format here
            }).then(function (response) {
                treatments.push(response.data);
            });
        }

        function copyTreatment(treatment, treatments) {
            var copy = angular.copy(treatment);
            $http.post(urls.copyTreatment(), copy).then(function (response) {
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