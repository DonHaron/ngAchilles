(function(){
    "use strict";

    angular
        .module('achilles')
        .service('Biometric', Biometric);

    Biometric.$inject = ['$http', 'urls'];
    function Biometric($http, urls){
        var service = {
            list: list,
            open: open
        };

        return service;

        /* list by treatment */
        function list(treatmentId){
            return $http.get(urls.biometricList(treatmentId), { spinner: true }).then(function(response){
                return response.data;
            });
        }

        function open(process) {
            $http.get(urls.biometricReport(process));
        }
    }
})();