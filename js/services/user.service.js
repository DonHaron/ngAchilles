(function () {
    "use strict";

    angular
        .module('achilles')
        .factory('User', User);

    User.$inject = ['$http', '$q', '$timeout', 'urls'];
    function User($http, $q, $timeout, urls) {
        var currentUser,
            loading = false,
            waiting = [],
            //process = achillesConfig.process,
            promise;

        var service = {
            changeFontSize: changeFontSize,
            changeMargins: changeMargins,
            get: get,
            setVisibleEntryTypes: setVisibleEntryTypes,
            changeVisibility: changeVisibility
            //isEntryTypeHidden: isEntryTypeHidden
        };

        return service;

        function changeFontSize(font){
            currentUser.fontSize = font;
            $http.post(urls.user('put'), currentUser).then(function(response){
                console.log(response);
            });
        }

        function changeMargins(margins){
            currentUser.margins = margins;
            $http.post(urls.user('put'), currentUser).then(function(response){
                console.log(response);
            });
        }

        function get() {
            var deferred = $q.defer();
            if (currentUser) {
                deferred.resolve(currentUser);
            } else if (!loading) {
                loading = true;

                $http.get(urls.user())
                    .then(function (response) {
                        currentUser = response.data;

                        // TODO: remove after testing
                        //currentUser.hiddenEntryTypes = [24];

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

        function changeVisibility(type, user, visibility){
            // if the current user has no hidden entry types defined, define an empty array
            if(!user.hiddenEntryTypes){
                user.hiddenEntryTypes = [];
            }

            var hiddenEntryTypes = user.hiddenEntryTypes,
                index = hiddenEntryTypes.indexOf(type.id); // is the current type already in the hidden types?
            // if the visibility is defined, it has precedence, and the type gets this visibility
            if(visibility !== undefined){
                if(visibility && index>-1){
                    hiddenEntryTypes.splice(index, 1);
                }
                if(!visibility && index === -1){
                    hiddenEntryTypes.push(type.id);
                }
                type.hidden = !visibility;
            }else
            // if the visibility is not defined, the current visibility is reversed
            if(index>-1){
                hiddenEntryTypes.splice(index, 1);
                type.hidden = false;
            }else{
                hiddenEntryTypes.push(type.id);
                type.hidden = true;
            }
            // If a request is already starting, cancel it. The last request is always the most current one, and
            // contains all the previous information as well
            if(promise && promise.$$state.status === 0){

                $timeout.cancel(promise);
            }
            // Save the current user object, so the hidden entry types are saved for the next page load.
            // But delay it for a fraction of a second, so multiple actions do not all send a request if in quick
            // succession
            promise = $timeout(function(){
                $http.post(urls.user('put'), user);
            },150);
        }
    }
})();