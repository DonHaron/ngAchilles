(function(){
    "use strict";

    angular
        .module('achilles')
        .directive('presetWidget', presetWidget);

    presetWidget.$inject = ['$timeout'];
    function presetWidget($timeout){
        var directive = {
            restrict: 'E',
            controller: PresetWidgetController,
            controllerAs: 'dc',
            link: link,
            require: 'presetWidget',
            templateUrl: '../js/templates/preset-widget.tpl.html'
        };

        return directive;

        function link(scope, element, attrs, controller){
            scope.$watch(controller.isVisible, function(newVal){
                if(newVal===true){
                    scope.name = '';

                    $timeout(function(){
                        element.find('input[type="text"]').focus();
                    },150);
                }
            });
        }
    }

    PresetWidgetController.$inject = ['PresetWidget'];
    function PresetWidgetController(PresetWidget){
        var dc = this;

        dc.isVisible = PresetWidget.isVisible;
        dc.cancel = PresetWidget.cancel;
        dc.confirm = PresetWidget.setName;
    }
})();