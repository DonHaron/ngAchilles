(function(){
    "use strict";

    angular
        .module('achilles')
        .factory('Medication', Medication);

    Medication.$inject = ['$http', 'urls'];
    function Medication($http, urls){
        var service = {
            all: all
        };

        return service;

        /* list by treatment */
        function all(){
            return $http.get(urls.disabilityList()).then(function(response){
                return response.data;
            });
        }
    }
})();