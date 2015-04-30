(function(){
    "use strict";

    angular
        .module('achilles')
        .factory('Locking', Locking);

    Locking.$inject = ['$http', 'urls'];
    function Locking($http, urls){
        var service = {
            check: check,
            lock: lock
        };

        return service;

        function check(row){
            $http.get(urls.lock(row, achillesConfig.process)).then(function(response){
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

        function lock(row){
            $http.put(urls.lock(row, achillesConfig.process)).then(function(response){
                if(response.status == 204){
                    console.log('lock obtained');
                    row.hasOwnLock = true;
                }else{
                    console.log('no lock for you');
                    row.lock = true;
                    row.lockedBy = response.data.lockedBy;
                }
            });
        }
    }
})();