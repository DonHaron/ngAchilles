(function () {
    "use strict";

    angular
        .module('achilles')
        .factory('User', User);

    User.$inject = ['$http', '$q', 'urls'];
    function User($http, $q, urls) {
        var currentUser,
            loading = false,
            waiting = [],
            process = achillesConfig.process;

        var service = {
            get: get
        };

        return service;

        function get() {
            var deferred = $q.defer();

            if (currentUser) {
                deferred.resolve(currentUser);
            } else if (!loading) {
                loading = true;

                $http.get(urls.user(process))
                    .then(function (response) {
                        currentUser = response.data;

                        loading = false;

                        deferred.resolve(currentUser);

                        waiting.forEach(function (promise) {
                            promise.resolve(currentUser);
                        });
                    });
            } else {
                waiting.push(deferred);
            }

            return deferred.promise;
        }
    }
})();