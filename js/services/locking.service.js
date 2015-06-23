(function(){
    "use strict";

    angular
        .module('achilles')
        .factory('Locking', Locking);

    Locking.$inject = ['$http', 'urls', 'TreatmentRow'];
    function Locking($http, urls, TreatmentRow){
        var service = {
            check: check,
            lock: lock
        };

        return service;

        function check(row){
            $http.get(urls.lock(row)).then(function(response){
                //console.log(response);
                var data = response.data;
                if(data.lock){
                    row.locked = true;
                    row.lockedBy = data.lockedBy;
                }else{
                    row.locked = false;
                    if(data.row.lastChange > row.lastChange){
                        // replace all the attributes of the current row with the ones from the new row
                        TreatmentRow.replace(row, data.row);
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
                url: urls.lock(row, 'put'),
                headers: {
                    'Content-Type': 'text/plain'  // avoid pre-flight request, request-body is empty anyway
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