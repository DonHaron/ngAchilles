(function(){
    "use strict";

    angular
        .module('achilles')
        .factory('TreatmentEntry', TreatmentEntry);

    TreatmentEntry.$inject = ['$http', 'urls', 'Treatment'];
    function TreatmentEntry($http, urls, Treatment){
        var service = {
            removeRow: removeRow
        };

        return service;

        function removeRow(row, entry, entries){
            //$http.delete(urls.treatmentEntryRow() + row.id)
            //PUT/DELETE-workaround
            var rows = entry.rows;
            $http.post(urls.treatmentEntryRow('delete') + row.id)
                .then(function () {
                    for (var i = 0; i < rows.length; i++) {
                        if (rows[i].id == row.id) {
                            rows.splice(i, 1);
                            break;
                        }
                    }
                    if (rows.length === 0) {
                        //There are now more rows left, delete the entry now
                        Treatment.removeEntry(entry, entries);
                    }
                });
        }
    }
})();