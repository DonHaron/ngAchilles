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
            get: get,
            setVisibleEntryTypes: setVisibleEntryTypes,
            changeVisibility: changeVisibility
            //isEntryTypeHidden: isEntryTypeHidden
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

                        // TODO: remove after testing
                        currentUser.hiddenEntryTypes = [24];

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

        function setVisibleEntryTypes(types, user){
            types.forEach(function(type){
                if(user.hiddenEntryTypes.indexOf(type.id)>-1){
                    type.hidden = true;
                }
            });
        }

        function changeVisibility(type, user){
            if(!user.hiddenEntryTypes){
                user.hiddenEntryTypes = [];
            }

            var hiddenEntryTypes = user.hiddenEntryTypes,
                index = hiddenEntryTypes.indexOf(type.id);
            if(index>-1){
                hiddenEntryTypes.splice(index, 1);
                type.hidden = false;
            }else{
                hiddenEntryTypes.push(type.id);
                type.hidden = true;
            }
            $http.post(urls.user(process, 'put'), user);
        }
    }
})();