(function () {
    "use strict";

    angular
        .module('achilles')
        .factory('CatalogEntry', CatalogEntry);

    CatalogEntry.$inject = ['$filter', '$q', '$timeout', '$http', 'urls'];
    function CatalogEntry($filter, $q, $timeout, $http, urls) {
//        var catalogEntries = [
//            {
//                cols: [
//                    {
//                        content: 'something',
//                        width: 12
//                    }
//                ]
//            },
//            {
//                cols: [
//                    {
//                        content: 'something',
//                        width: 6
//                    },
//                    {
//                        content: 'else',
//                        width: 6
//                    }
//                ]
//            }
//        ];

        var service = {
            lookup: lookup
        };

        return service;

        function lookup(term, row, column) {
            return $http.get(urls.catalogEntries(term, row, column)).then(function(response){
                return response.data;
            });
//            var deferred = $q.defer();
//
//            $timeout(function(){
//                deferred.resolve($filter('filter')(catalogEntries, {$: term}));
//            }, 75);
//
//            return deferred.promise;
        }
    }
})();