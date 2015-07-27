(function(){
    "use strict";

    angular
        .module('achilles')
        .directive('medicationWidget', medicationWidget);

    function medicationWidget(){
        var directive = {
            templateUrl: '../js/templates/medication-widget.tpl.html'
        };

        return directive;
    }
})();