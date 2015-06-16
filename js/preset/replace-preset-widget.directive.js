(function(){
    "use strict";

    angular
        .module('achilles')
        .directive('replacePresetWidget', replacePresetWidget);

    function replacePresetWidget(){
        var directive = {
            restrict: 'E',
            scope: {},
            controller: ReplacePresetWidgetController,
            controllerAs: 'dc',
            templateUrl: '../js/preset/replace-preset-widget.tpl.html'
        };

        return directive;
    }

    ReplacePresetWidgetController.$inject = ['$scope', 'Preset', 'ReplacePresetWidget'];
    function ReplacePresetWidgetController($scope, Preset, ReplacePresetWidget){
        var dc = this;

        dc.cancel = ReplacePresetWidget.cancel;
        dc.isVisible = ReplacePresetWidget.isVisible;
        dc.select = ReplacePresetWidget.setPreset;

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
    }
})();