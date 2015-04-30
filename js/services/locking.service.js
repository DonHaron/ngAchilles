(function(){
    "use strict";

    angular
        .module('achilles')
        .factory('Locking', Locking);

    Locking.$inject = ['$http', 'urls'];
    function Locking($http, urls){
        var service = {
            check: check
        };

        return service;

        function check(row){
            $http.get(urls.checkLock(row, achillesConfig.process)).then(function(response){
                //console.log(response);
                var data = response.data;
                if(data.lock){
                    row.locked = true;
                    row.lockedBy = data.lockedBy;
                }else{
                    row.locked = false;
                }
            });
        }
    }
})();