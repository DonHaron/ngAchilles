(function(){
    "use strict";

    angular
        .module('achilles')
        .factory('TreatmentRow', TreatmentRow);

    TreatmentRow.$inject = ['$http', 'urls'];
    function TreatmentRow($http, urls){
        var service = {
            save: save
        };

        return service;

        function save(row, entry){
            console.log(entry);
            $http.post(urls.treatmentEntryRow('put'), row).then(function (response) {
                //response.data is a row
                //now, find the row in the rows and replace it
                var row = response.data,
                    rows = entry.rows;
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].id == row.id) {
                        rows[i] = row;
                        break;
                    }
                }

                row.locked = false;
                row.hasOwnLock = false;
            });
        }
    }
})();