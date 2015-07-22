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

    TreatmentToolbarController.$inject = [ '$filter', 'AdvancedSearchWidget', 'Treatment', 'Biometric', 'GDT', 'LaboratoryReport', 'AsteriskSearch', 'WidgetVisibility', 'PresetSettingsWidget', 'User'];
    function TreatmentToolbarController( $filter, AdvancedSearchWidget, Treatment, Biometric, GDT, LaboratoryReport, AsteriskSearch, WidgetVisibility, PresetSettingsWidget, User) {
        var dc = this;

        dc.addTreatment = addTreatment;
        dc.asteriskSearch = AsteriskSearch.search;
        dc.changeFontSize = User.changeFontSize;
        dc.changeMargins = User.changeMargins;
        dc.openBiometricReport = Biometric.open;
        dc.openLaboratoryReport = LaboratoryReport.open;
        dc.openTreatmentReport = Treatment.openReport;
        dc.executeGDT = GDT.execute;
        dc.showAdvancedSearch = AdvancedSearchWidget.show;
        dc.showTitleSettingsWidget = WidgetVisibility.showTitleSettingsWidget;
        dc.showPresetSettingsWidget = PresetSettingsWidget.show;

        GDT.load(dc);

        function addTreatment(treatments) {
            var firstTreatment = treatments.length ? $filter('orderBy')(treatments, ['-date', 'id'])[0] : {id: 0};
            Treatment.addTreatment(firstTreatment, true, true, treatments);
        }
    }
})();