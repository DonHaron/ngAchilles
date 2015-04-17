(function () {
    "use strict";

    angular
        .module('achilles')
        .service('Subject', Subject);

    Subject.$inject = ['$http', '$q', 'urls'];
    function Subject($http, $q, urls) {
        var Subject = {
            all: all
        };

        var subjects = [],
            loading = false,
            waiting = [];

        return Subject;

        function all(){
            var deferred = $q.defer();

            // we don't need to have this updated all the time, the list almost never changes,
            // so we rather save a lot of requests by caching the result
            if (subjects.length) {
                deferred.resolve(subjects);
            }else if(!loading){
                //if there is not already a request running, start one
                loading = true;

                $http.get(urls.treatmentSubject()).then(function(response){
                    subjects = response.data;

                    // done loading
                    loading = false;
                    // resolve this request
                    deferred.resolve(subjects);
                    // also resolve all others
                    waiting.forEach(function(promise){
                        promise.resolve(subjects);
                    });
                });
            }else{
                // wait with the others
                waiting.push(deferred);
            }

            return deferred.promise;
        }
    }
})();