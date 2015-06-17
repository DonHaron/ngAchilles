(function(){
    "use strict";

    angular
        .module('achilles')
        .factory('InvoiceCase', InvoiceCase);

    InvoiceCase.$inject = ['$http', 'urls'];
    function InvoiceCase($http, urls){
        var service = {
            all: all
        };

        return service;

        function all(){
            return $http.get(urls.cases(achillesConfig.patient)).then(function(response){
                return response.data;
            });
        }
    }
})();