(function(){
    "use strict";

    angular
        .module('achilles')
        .factory('CatalogEntry', CatalogEntry);

    function CatalogEntry(){
        var service = {
            lookup: lookup
        };

        return service;

        function lookup(term){
            console.log(term);
        }
    }
})();