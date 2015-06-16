(function () {
    "use strict";

    angular
        .module('achilles')
        .factory('Preset', Preset);

    Preset.$inject = ['$http', '$q', 'urls'];
    function Preset($http, $q, urls) {

        var service = {
            all: all,
            create: create,
            hasUpdated: hasUpdated,
            rename: rename,
            setUpdated: setUpdated
        };

        var presets = [],
            loading = false,
            waiting = [],
            updated = false;

        return service;

        function all(){
            var deferred = $q.defer();
            // we don't need to have this updated all the time, the list almost never changes,
            // so we rather save a lot of requests by caching the result
            if (presets.length) {
                // if the presets array already was filled, all is good and we resolve
                deferred.resolve(presets);
            }else if(!loading){
                // if there isn't already a request running, start one
                loading = true;

                $http.get(urls.presetList()).then(function(response){
                    presets = response.data;
                    /*
                     * this is ugly, but need to do this with an open issue in the angular-select2 lib
                     * https://github.com/rubenv/angular-select2/issues/15
                     * TODO: change once the issue is resolved
                     * */
                    for (var i = 0; i < presets.length; i++) {
                        presets[i].toString = function () {
                            return this.id;
                        };
                    }

                    // loading is done
                    loading = false;
                    // resolve the current promise
                    deferred.resolve(presets);
                    // also resolve all the waiting promises
                    waiting.forEach(function(promise){
                        promise.resolve(presets);
                    });
                });
            }else{
                // else wait with the other requests
                waiting.push(deferred);
            }

            return deferred.promise;
        }

        function create(treatment, name){
            $http.post(urls.createPreset(), {
                treatment: treatment,
                name: name
            });
        }

        function hasUpdated(){
            return updated;
        }

        function rename(preset){
            $http.post(urls.renamePreset(), preset).then(function(response){
                presets = response.data;
                setUpdated(true);
            });
        }

        function setUpdated(status){
            updated = status;
        }
    }
})();