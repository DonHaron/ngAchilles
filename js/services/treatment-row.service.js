(function(){
    "use strict";

    angular
        .module('achilles')
        .factory('TreatmentRow', TreatmentRow);

    TreatmentRow.$inject = ['$http', '$timeout', 'urls'];
    function TreatmentRow($http, $timeout, urls){
        var saving,
            savingRow;

        var service = {
            cancelSave: cancelSave,
            replace: replace,
            save: save
        };

        return service;

        function cancelSave(row){
            //console.log('canceling');
            if(angular.isDefined(row) && angular.isDefined(savingRow) && row.id !== savingRow.id){
                return;
            }
            $timeout.cancel(saving);
            savingRow = undefined;
        }

        function replace(row, newRow){
            row.columns = newRow.columns;
            row.new = newRow.new;
            row.changed = true;
            row.lastChange = newRow.lastChange;
        }

        function save(row, entry){
            savingRow = row;
            saving = $timeout(function(){
                //console.log('saving');
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

                savingRow = undefined;
            }, 150);
        }
    }
})();