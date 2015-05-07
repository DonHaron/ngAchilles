/* jshint -W040 */
(function () {
    "use strict";

    angular
        .module('achilles')
        .directive('treatmentToolbar', treatmentToolbar);

    function treatmentToolbar() {
        var directive = {
            controller: TreatmentToolbarController,
            controllerAs: 'dc'
        };

        return directive;
    }

    TreatmentToolbarController.$inject = ['$http', '$filter', 'urls', 'Treatment', 'CurrentFocus'];
    function TreatmentToolbarController($http, $filter, urls, Treatment, CurrentFocus) {
        var dc = this;

        dc.addTreatment = addTreatment;
        dc.asteriskSearch = asteriskSearch;
        dc.openBiometricReport = openBiometricReport;
        dc.openLaboratoryReport = openLaboratoryReport;
        dc.openTreatmentReport = openTreatmentReport;
        dc.executeGDT = executeGDT;

        loadGDT();


        function addTreatment(treatments) {
            var firstTreatment = treatments.length ? $filter('orderBy')(treatments, ['-date', 'id'])[0] : {id: 0};
            Treatment.addTreatment(firstTreatment, true, true, treatments);
        }

        function asteriskSearch(treatments) {
            //TODO: look for the next entry with an asterisk, starting from the current focus
            var currentlyFocusedRow,
                next,
                partialRows,
                rows = [],
                rowsWithAsterisk;
            currentlyFocusedRow = CurrentFocus.getCurrentFocus();
            // put all the rows in all the entries in all the treatments in this array
            treatments.forEach(function (treatment) {
                if(treatment.editable === 'true' || treatment.editable === true){
                    var entries = $filter('orderBy')(treatment.entries, 'type.name');
                    entries.forEach(function (entry) {
                        entry.rows.forEach(function (row) {
                            rows.push(row);
                        });
                    });
                }
            });
            // exclude all rows up to and including the currently focused one, as we want the next asterisk input
            if(currentlyFocusedRow){
                console.log('here');
                partialRows = rows.slice(rows.indexOf(currentlyFocusedRow) + 1);

            }else{
                partialRows = rows;
            }

            rowsWithAsterisk = $filter('filter')(partialRows, {$: '*'});

            if (rowsWithAsterisk.length === 0) {
                // with an empty result, we try again at the beginning, as we're probably at the end of the list
                rowsWithAsterisk = $filter('filter')(rows, {$: '*'});
            }

            next = rowsWithAsterisk.shift();
            if(next){
                CurrentFocus.setNewFocus(next);
            }
        }

        function openBiometricReport(process) {
            $http.get(urls.biometricReport(process));
        }

        function openLaboratoryReport(process) {
            $http.get(urls.laboratoryReport(process));
        }

        function openTreatmentReport(process, treatments) {
            var payload = [];
            treatments.forEach(function (treatment) {
                console.log(treatment);
                var payloadEntry = {
                    id: treatment.id,
                    rows: []
                };
                // add each row's id of every entry to the current payload entry
                treatment.entries.forEach(function (entry) {
                    entry.rows.forEach(function (row) {
                        payloadEntry.rows.push(row.id);
                    });
                });
                payload.push(payloadEntry);
            });
            $http.post(urls.treatmentReport(process), payload);
        }

        function executeGDT(device, patient, test) {
            $http.post(urls.executeGDT(device, patient, test))
                .then(function () {
                    console.log('that worked');
                })
                .catch(function () {
                    console.log("that didn't");
                });
        }

        function loadGDT() {
            $http.get(urls.gdtList())
                .then(function (response) {
                    dc.gdtDevices = response.data;
                });
        }

    }
})();