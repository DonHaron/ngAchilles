/* jshint -W040 */
(function () {
    "use strict";

    angular
        .module('achilles')
        .directive('treatmentToolbar', treatmentToolbar);

    function treatmentToolbar() {
        var directive = {
            restrict: 'E',
            controller: TreatmentToolbarController,
            controllerAs: 'toolbar',
            templateUrl: '../js/templates/treatment-toolbar.tpl.html'
        };

        return directive;
    }

    TreatmentToolbarController.$inject = ['$http', '$filter', 'urls', 'Treatment', 'AsteriskSearch', 'WidgetVisibility'];
    function TreatmentToolbarController($http, $filter, urls, Treatment, AsteriskSearch, WidgetVisibility) {
        var dc = this;

        dc.addTreatment = addTreatment;
        dc.asteriskSearch = AsteriskSearch.search;
        dc.openBiometricReport = openBiometricReport;
        dc.openLaboratoryReport = openLaboratoryReport;
        dc.openTreatmentReport = openTreatmentReport;
        dc.executeGDT = executeGDT;
        dc.showTitleSettingsWidget = WidgetVisibility.showTitleSettingsWidget;

        loadGDT();

        function addTreatment(treatments) {
            var firstTreatment = treatments.length ? $filter('orderBy')(treatments, ['-date', 'id'])[0] : {id: 0};
            Treatment.addTreatment(firstTreatment, true, true, treatments);
        }

        function asteriskSearch(treatments) {

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