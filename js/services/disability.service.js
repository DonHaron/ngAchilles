(function(){
    "use strict";

    angular
        .module('achilles')
        .service('Disability', Disability);

    Disability.$inject = ['$http', 'urls'];
    function Disability($http, urls){
        var Disability = {
            list: list
        };

        return Disability;

        /* list by treatment */
        function list(treatmentId){
            return $http.get(urls.disabilityList(treatmentId)).then(function(response){
                return response.data;
            });
        }
    }
})();