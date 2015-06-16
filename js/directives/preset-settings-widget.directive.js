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
            templateUrl: '../js/templates/preset-settings-widget.tpl.html'
        };

        return directive;
    }

    function PresetSettingsWidgetController(){
        var dc = this;

    }
})();