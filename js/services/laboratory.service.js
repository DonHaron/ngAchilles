(function(){
    "use strict";

    angular
        .module('achilles')
        .service('LaboratoryReport', LaboratoryReport);

    LaboratoryReport.$inject = ['$http', 'urls'];
    function LaboratoryReport($http, urls){
        var service = {
            list: list,
            open: open
        };

        return service;

        /* list by treatment */
        function list(treatmentId){
            return $http.get(urls.laboratoryList(treatmentId), { spinner: true }).then(function(response){
                return response.data;
            });
        }

        function open(process) {
            $http.get(urls.laboratoryReport(process));
        }

    }
})();