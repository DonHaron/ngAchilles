(function () {
    "use strict";

    angular
        .module('achilles')
        .factory('EntryType', EntryType);

    EntryType.$inject = ['$http', '$q', 'urls'];
    function EntryType($http, $q, urls) {

        var EntryType = {
            all: all
        };

        var entryTypes = [],
            loading = false,
            waiting = [];

        return EntryType;

        function all(){
            var deferred = $q.defer();
            // we don't need to have this updated all the time, the list almost never changes,
            // so we rather save a lot of requests by caching the result
            if (entryTypes.length) {
                // if the entryTypes array already was filled, all is good and we resolve
                deferred.resolve(entryTypes);
            }else if(!loading){
                // if there isn't already a request running, start one
                loading = true;

                $http.get(urls.treatmentEntryTypeList()).then(function(response){
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

                    // loading is done
                    loading = false;
                    //r esolve the current promise
                    deferred.resolve(entryTypes);
                    // also resolve all the waiting promises
                   waiting.forEach(function(promise){
                       promise.resolve(entryTypes);
                   });
                });
            }else{
                // else wait with the other requests
                waiting.push(deferred);
            }

            return deferred.promise;
        }
    }
})();