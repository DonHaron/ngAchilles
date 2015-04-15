(function(){
    "use strict";

    angular
        .module('achilles')
        .service('Case', Case);

    Case.$inject = ['$http', 'urls'];
    function Case($http, urls){
        var Case = {
            list: list
        };

        return Case;

        /* list by treatment */
        function list(treatmentId){
            return $http.get(urls.caseList(treatmentId)).then(function(response){
                return response.data;
            });
        }
    }
})();