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
                    if(data.row.lastChange > row.lastChange){
                        row.columns = data.row.columns;
                        row.new = data.row.new;
                        row.changed = true;
                        row.lastChange = data.row.lastChange;
                    }else if(data.row.id === 0){
                        // TODO: delete this row
                        row.id = 0;
                        row.deleted = true;
                    }
                }
            });
        }

        function lock(row){
            var req = {
                method: 'POST',
                url: urls.lock(row, achillesConfig.process, 'put'),
                headers: {
                    'Content-Type': 'text/plain'  // avoid preflight request, request-body is emtpy anyway
                }
            };
            $http(req).then(function(response){
                if(response.status == 204){
                    //console.log('lock obtained');
                    row.hasOwnLock = true;
                }else{
                    //console.log('no lock for you');
                    row.lock = true;
                    row.lockedBy = response.data.lockedBy;
                }
            });


            //$http.put(urls.lock(row, achillesConfig.process)).then(function(response){
            //    if(response.status == 204){
            //        console.log('lock obtained');
            //        row.hasOwnLock = true;
            //    }else{
            //        console.log('no lock for you');
            //        row.lock = true;
            //        row.lockedBy = response.data.lockedBy;
            //    }
            //});
        }
    }
})();