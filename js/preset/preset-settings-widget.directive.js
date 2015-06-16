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

    PresetSettingsWidgetController.$inject = ['$scope', '$modal', 'PresetSettingsWidget', 'Preset'];
    function PresetSettingsWidgetController($scope, $modal, PresetSettingsWidget, Preset){
        var dc = this;

        dc.isVisible = PresetSettingsWidget.isVisible;
        dc.rename = Preset.rename;
        dc.show = PresetSettingsWidget.show;
        dc.remove = remove;

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

        function remove(preset){
            var modalInstance = $modal.open({
                templateUrl: '../js/preset/delete-preset-modal.tpl.html',
                controller: 'DeleteModalController',
                controllerAs: 'mc',
                size: 'sm'
            });

            modalInstance.result.then(function () {
                Preset.remove(preset);
            });
        }
    }
})();