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

    TreatmentToolbarController.$inject = [ '$filter', 'Treatment', 'Biometric', 'GDT', 'LaboratoryReport', 'AsteriskSearch', 'WidgetVisibility'];
    function TreatmentToolbarController( $filter, Treatment, Biometric, GDT, LaboratoryReport, AsteriskSearch, WidgetVisibility) {
        var dc = this;

        dc.addTreatment = addTreatment;
        dc.asteriskSearch = AsteriskSearch.search;
        dc.openBiometricReport = Biometric.open;
        dc.openLaboratoryReport = LaboratoryReport.open;
        dc.openTreatmentReport = Treatment.openReport;
        dc.executeGDT = GDT.execute;
        dc.showTitleSettingsWidget = WidgetVisibility.showTitleSettingsWidget;

        GDT.load(dc);

        function addTreatment(treatments) {
            var firstTreatment = treatments.length ? $filter('orderBy')(treatments, ['-date', 'id'])[0] : {id: 0};
            Treatment.addTreatment(firstTreatment, true, true, treatments);
        }
    }
})();