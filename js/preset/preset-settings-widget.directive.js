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

    PresetSettingsWidgetController.$inject = ['$scope', '$timeout', 'PresetSettingsWidget', 'Preset'];
    function PresetSettingsWidgetController($scope, $timeout, PresetSettingsWidget, Preset){
        var dc = this;

        Preset.all().then(function(presets){
            dc.presets = presets;
        });

        $scope.$watch(Preset.hasUpdated, function(newVal){
            if(newVal === true){
                // reload all presets
                Preset.all()
                    .then(function (presets) {
                        dc.presets = presets;
                        Preset.setUpdated(false);
                    });
            }
        });

        dc.isVisible = PresetSettingsWidget.isVisible;
        dc.rename = Preset.rename;
        dc.show = PresetSettingsWidget.show;
    }
})();