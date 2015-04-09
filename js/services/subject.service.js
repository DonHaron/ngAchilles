(function () {
    "use strict";

    angular
        .module('achilles')
        .service('Subject', Subject);

    Subject.$inject = ['$http', '$q', 'urls'];
    function Subject($http, $q, urls) {
        var subjects = [];

        var Subject = {
            all: all
        };

        return Subject;

        function all(){
            // we don't need to have this updated all the time, the list almost never changes,
            // so we rather save a lot of requests by caching the result
            if (subjects.length) {
                var deferred = $q.defer();
                deferred.resolve(subjects);
                return deferred.promise;
            }

            return $http.get(urls.treatmentSubject()).then(function(response){
                subjects = response.data;

                return subjects;
            });

        }
    }
})();