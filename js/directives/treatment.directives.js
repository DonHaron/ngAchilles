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
            controller: controller,
            controllerAs: 'dm',
            scope: {
                entry: '=',
                types: '='
            },
            template: '<div class="form-group"><span ng-show="entry.type">{{entry.type.name}}</span><select2 class="form-control" ng-change="dm.store(entry)" ng-hide="entry.type" ng-model="entry.type" ng-options="type as type.name for type in types track by type.id"></select2></div>'
        };

        return directive;

        function link(scope, element, attrs){
            $timeout(function(){
                if(scope.entry && !scope.entry.type && scope.entry.new){
                    element.find('input').select2('open');
                }
            },50);
        }

        controller.$inject = ['$http', '$scope'];

        function controller($http, $scope){
            var dm = this;

            //user selected a type, send a POST request to the server, then wait for the response with the column data
            dm.store = function(entry){
                //TODO: maybe replace the url?
                $http.post('http://http://192.168.1.145:37115/treatmententry/', entry)
                    .then(function(response){
                        $scope.entry = response.data;
                    }, function(error){
                        console.error(error);
                        $scope.entry = {};
                    });
            }
        }
    }

})();