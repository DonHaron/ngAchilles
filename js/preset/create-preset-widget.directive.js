(function () {
    "use strict";

    angular
        .module('achilles')
        .directive('createPresetWidget', createPresetWidget);

    createPresetWidget.$inject = ['$timeout'];
    function createPresetWidget($timeout) {
        var directive = {
            restrict: 'E',
            controller: CreatePresetWidgetController,
            controllerAs: 'dc',
            link: link,
            scope: {},
            require: 'createPresetWidget',
            templateUrl: '../js/preset/create-preset-widget.tpl.html'
        };

        return directive;

        function link(scope, element, attrs, controller) {

            scope.$watch(controller.isVisible, function (newVal) {
                if (newVal === true) {
                    scope.name = '';
                    $timeout(function () {
                        element.find('input[type="text"]').focus();
                    }, 150);
                }
            });

        }
    }

    CreatePresetWidgetController.$inject = ['CreatePresetWidget'];
    function CreatePresetWidgetController(CreatePresetWidget) {
        var dc = this;

        dc.isVisible = CreatePresetWidget.isVisible;
        dc.cancel = CreatePresetWidget.cancel;
        dc.confirm = CreatePresetWidget.setName;
    }
})();