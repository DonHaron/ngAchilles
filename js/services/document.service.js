(function(){
    "use strict";

    angular
        .module('achilles')
        .service('Document', Document);

    Document.$inject = ['$http', 'urls'];
    function Document($http, urls){
        var service = {
            list: list
        };

        return service;

        /* list by treatment */
        function list(treatmentId){
            return $http.get(urls.documentList(treatmentId), { spinner: true }).then(function(response){
                return response.data;
            });
        }
    }
})();