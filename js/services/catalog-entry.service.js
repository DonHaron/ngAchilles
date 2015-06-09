(function () {
    "use strict";

    angular
        .module('achilles')
        .factory('CatalogEntry', CatalogEntry);

    CatalogEntry.$inject = ['$http', '$sce', 'urls'];
    function CatalogEntry($http, $sce, urls) {
        var service = {
            choose: choose,
            lookup: lookup
        };

        return service;

        function choose(entry, row){
            return $http.post(urls.catalogRow(row), entry).then(function(response){
                return response.data;
            });
        }

        function lookup(term, row, column) {
            return $http.get(urls.catalogEntries(term, row, column)).then(function(response){
                var entries = response.data;
                angular.forEach(entries, function(entry){
                    angular.forEach(entry.cols, function(column){
                        // make the HTML viable for display
                        column.trustedContent = $sce.trustAsHtml(column.content);
                    });
                });
                return entries;
            });
        }
    }
})();