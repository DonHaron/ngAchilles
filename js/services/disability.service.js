(function(){
    "use strict";

    angular
        .module('achilles')
        .service('DisabilityCertificate', DisabilityCertificate);

    DisabilityCertificate.$inject = ['$http', 'urls'];
    function DisabilityCertificate($http, urls){
        var DisabilityCertificate = {
            list: list
        };

        return DisabilityCertificate;

        /* list by treatment */
        function list(treatmentId){
            return $http.get(urls.disabilityList(treatmentId), { spinner: true }).then(function(response){
                return response.data;
            });
        }
    }
})();