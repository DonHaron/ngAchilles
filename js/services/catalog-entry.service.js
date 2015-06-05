(function () {
    "use strict";

    angular
        .module('achilles')
        .factory('CatalogEntry', CatalogEntry);

    CatalogEntry.$inject = ['$filter'];
    function CatalogEntry($filter) {
        var catalogEntries = [
            {
                cols: [
                    {
                        content: 'something',
                        width: 12
                    }
                ]
            },
            {
                cols: [
                    {
                        content: 'something',
                        width: 6
                    }, {
                        content: 'else',
                        width: 6
                    }
                ]
            }
        ];

        var service = {
            lookup: lookup
        };

        return service;

        function lookup(term) {
            return $filter('filter')(catalogEntries, {$:term});
            //console.log(term);
        }
    }
})();