(function () {
    "use strict";

    angular
        .module('achilles')
        .service('EntryType', EntryType);

    EntryType.$inject = ['$http', '$q', 'urls'];
    function EntryType($http, $q, urls) {

        var EntryType = {
            all: all
        };

        var entryTypes = [];

        return EntryType;

        function all(){
            // we don't need to have this updated all the time, the list almost never changes,
            // so we rather save a lot of requests
            if (entryTypes.length) {
                var deferred = $q.defer();
                deferred.resolve(entryTypes);
                return deferred.promise;
            }

            return $http.get(urls.treatmentEntryTypeList()).then(function(response){
                entryTypes = response.data;
                /*
                 * this is ugly, but need to do this with an open issue in the angular-select2 lib
                 * https://github.com/rubenv/angular-select2/issues/15
                 * TODO: change once the issue is resolved
                 * */
                for (var i = 0; i < entryTypes.length; i++) {
                    entryTypes[i].toString = function () {
                        return this.id;
                    }
                }
                return entryTypes;
            });

        }
    }
})();