(function(){
    "use strict";

    angular
        .module('achilles')
        .directive('presetWidget', presetWidget);

    function presetWidget(){
        var directive = {
            restrict: 'E',
            controller: PresetWidgetController,
            controllerAs: 'dc',
            templateUrl: '../js/templates/preset-widget.tpl.html'

        };

        return directive;
    }

    PresetWidgetController.$inject = ['PresetWidget'];
    function PresetWidgetController(PresetWidget){
        var dc = this;

        dc.isVisible = PresetWidget.isVisible;
    }
})();