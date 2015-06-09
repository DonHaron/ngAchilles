(function(){
    "use strict";

    angular
        .module('achilles')
        .factory('TreatmentRow', TreatmentRow);

    TreatmentRow.$inject = ['$http', '$timeout', 'urls'];
    function TreatmentRow($http, $timeout, urls){
        var saving;

        var service = {
            cancelSave: cancelSave,
            replace: replace,
            save: save
        };

        return service;

        function cancelSave(){
            console.log('canceling');
            $timeout.cancel(saving);
        }

        function replace(row, newRow){
            row.columns = newRow.columns;
            row.new = newRow.new;
            row.changed = true;
            row.lastChange = newRow.lastChange;
        }

        function save(row, entry){
            saving = $timeout(function(){
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
            }, 150);
        }
    }
})();