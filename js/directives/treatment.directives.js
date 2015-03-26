(function () {
    "use strict";

    angular
        .module('achilles')
        .directive('treatmentColumn', treatmentColumn)
        .directive('treatmentType', treatmentType);

    treatmentColumn.$inject = ['$http'];

    function treatmentColumn($http){
        var directive = {
            restrict: 'E',
            scope: {
                width: '@',
                content: '=',
                readonly: '@',
                parent: '='
            },
            template: '<div ng-class="columnClass"><div class="form-group"><input class="form-control" ng-model="content" ng-disabled="{{readonly}}"></div></div>',
            link: link
        };

        return directive;

        function link(scope, element, attrs){
            scope.columnClass = 'col-xs-'+attrs.width;

            element.find('input').on('blur', function(e){
                console.log('blurred');
                $http.put('http://192.168.1.145:37115/treatmententry/'+scope.parent.id, scope.parent);
            });
        }
    }

    treatmentType.$inject = ['$timeout'];

    function treatmentType($timeout){
        var directive = {
            restrict: 'E',
            link: link,
            scope: {
                entry: '=',
                types: '='
            },
            template: '<div class="form-group"><span ng-show="entry.type">{{entry.type.name}}</span><select2 class="form-control" ng-hide="entry.type" ng-model="entry.type" ng-options="type as type.name for type in types track by type.id"></select2></div>'
        };

        return directive;

        function link(scope, element, attrs){
            $timeout(function(){
                if(scope.entry && !scope.entry.type && scope.entry.new){
                    element.find('input').select2('open');
                }
            },50);

            element.find('input').on("select2-select", function (e) { console.log("select2:select", e); });
            element.find('input').on("select2:select", function (e) { console.log("select2:select", e); });
        }
    }

})();