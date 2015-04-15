(function(){
    "use strict";

    angular
        .module('achilles')
        .service('Document', Document);

    Document.$inject = ['$http', 'urls'];
    function Document($http, urls){
        var Document = {
            list: list
        };

        return Document;

        /* list by treatment */
        function list(treatmentId){
            return $http.get(urls.documentList(treatmentId)).then(function(response){
                return response.data;
            });
        }
    }
})();