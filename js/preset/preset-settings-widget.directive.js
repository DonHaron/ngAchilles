(function(){
    "use strict";

    angular
        .module('achilles')
        .directive('presetSettingsWidget', presetSettingsWidget);

    function presetSettingsWidget(){
        var directive = {
            restrict: 'E',
            controller: PresetSettingsWidgetController,
            controllerAs: 'dc',
            scope: {},
            templateUrl: '../js/preset/preset-settings-widget.tpl.html'
        };

        return directive;
    }

    PresetSettingsWidgetController.$inject = ['PresetSettingsWidget', 'Preset'];
    function PresetSettingsWidgetController(PresetSettingsWidget, Preset){
        var dc = this;

        Preset.all().then(function(presets){
            dc.presets = presets;
        });

        dc.isVisible = PresetSettingsWidget.isVisible;
        dc.show = PresetSettingsWidget.show;
    }
})();