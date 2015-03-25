(function () {
    "use strict";

    angular
        .module('achilles')
        .directive('treatmentColumn', treatmentColumn);

    function treatmentColumn(){
        var directive = {
            restrict: 'E',
            scope: {
                width: '@',
                content: '=',
                readonly: '@'
            },
            template: '<div ng-class="columnClass"><div class="form-group"><input class="form-control" ng-model="content" ng-disabled="{{readonly}}"></div></div>',
            link: link
        };

        return directive;

        function link(scope, element, attrs){
            scope.columnClass = 'col-xs-'+attrs.width;
        }
    }

})();