(function(){
    "use strict";

    angular
        .module('achilles')
        .factory('TextBlock', TextBlock);

    TextBlock.$inject = ['$http', '$q', 'urls'];
    function TextBlock($http, $q, urls){
        var service = {
            all: all
        };

        var textBlocks = [],
            loading = false,
            waiting = [];

        return service;

        function all(){
            var deferred = $q.defer();
            // we don't need to have this updated all the time, the list almost never changes,
            // so we rather save a lot of requests by caching the result
            if (textBlocks.length) {
                // if the entryTypes array already was filled, all is good and we resolve
                deferred.resolve(textBlocks);
            }else if(!loading){
                // if there isn't already a request running, start one
                loading = true;

                $http.get(urls.textblock()).then(function(response){
                    textBlocks = response.data;
                    /*
                     * this is ugly, but need to do this with an open issue in the angular-select2 lib
                     * https://github.com/rubenv/angular-select2/issues/15
                     * TODO: change once the issue is resolved
                     * */
                    for (var i = 0; i < textBlocks.length; i++) {
                        textBlocks[i].toString = function () {
                            return this.id;
                        };
                    }

                    // loading is done
                    loading = false;
                    // resolve the current promise
                    deferred.resolve(textBlocks);
                    // also resolve all the waiting promises
                    waiting.forEach(function(promise){
                        promise.resolve(textBlocks);
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