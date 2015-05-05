(function(){
    "use strict";

    angular
        .module('achilles')
        .service('User', User);

    User.$inject = ['$http', 'urls'];
    function User($http, urls){
        var User = {
            get: get
        };

        return User;

        function get(process){
            return $http.get(urls.user(process))
                .then(function(response){
                    return response.data;
                });
        }
    }
})();