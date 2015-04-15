(function(){
    "use strict";

    angular
        .module('achilles')
        .service('Biometric', Biometric);

    Biometric.$inject = ['$http', 'urls'];
    function Biometric($http, urls){
        var Biometric = {
            list: list
        };

        return Biometric;

        /* list by treatment */
        function list(treatmentId){
            return $http.get(urls.biometricList(treatmentId)).then(function(response){
                return response.data;
            });
        }
    }
})();