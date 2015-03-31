(function () {
    "use strict";

    angular
        .module('achilles')
        .directive('treatmentEntry', treatmentEntry)
        .directive('treatmentColumn', treatmentColumn)
        .directive('treatmentType', treatmentType);

    function treatmentEntry() {
        var directive = {
            scope: {
                entry: '=',
                types: '='
            },
            template: '<li class="list-group-item">' +
                '<pre>{{entry|json}}</pre>' +
                '<div class="row">' +
                '<div class="col-xs-4 col-sm-3 col-md-2">' +
                '<treatment-type entry="entry" types="types"></treatment-type>' +
                '</div>' +
                '<div class="col-xs-8 col-sm-9 col-md-10">' +
                '<form name="entryform">' +
                '<treatment-column ng-repeat="column in entry.columns" content="column.content" width="{{column.width}}"' +
                'readonly="{{column.readonly}}" parent="entry"></treatment-column>' +
                '</form>' +
                '</div>' +
                '</div>' +
                '</li>',
            controller: controller
        };

        return directive;

        controller.$inject = ['$scope'];
        function controller($scope) {
            var dc = this;

            dc.setEntry = function (entry) {
                $scope.entry = entry;
                $scope.entryform.$setPristine();
            }
        }
    }

    treatmentColumn.$inject = ['$http', 'urls'];

    function treatmentColumn($http, urls) {
        var directive = {
            restrict: 'E',
            scope: {
                width: '@',
                content: '=',
                readonly: '@',
                parent: '='
            },
            require: '^treatmentEntry',
            template: '<div ng-class="columnClass"><div class="form-group"><input class="form-control" ng-model="content" ng-disabled="{{readonly}}"></div></div>',
            link: link
        };

        return directive;

        function link(scope, element, attrs, entryCtrl) {
            scope.columnClass = 'col-xs-' + attrs.width;

            var input = element.find('input');
            input.on('blur', function (e) {
                if (input.hasClass('ng-dirty')) {
                    //$http.put('http://192.168.1.145:37114/treatmententry/' + scope.parent.id, scope.parent).then(function (response) {
                    //$http.put('http://localhost:37114/treatmententry/' + scope.parent.id, scope.parent).then(function (response) {
                    $http.put(urls.treatmentEntry() + scope.parent.id, scope.parent).then(function (response) {
                        console.log(response.data);
                        var entry = response.data;
                        /*entry.columns = [{content: 'aaa', width: '6'}, {content: 'bbb', width: '6', readonly: 'true'}]*/
                        entryCtrl.setEntry(entry);
                    });
                }
            });
        }
    }

    treatmentType.$inject = ['$timeout'];

    function treatmentType($timeout) {
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

        function link(scope, element, attrs) {
            $timeout(function () {
                if (scope.entry && !scope.entry.type && !scope.entry.id) {
                    element.find('input').select2('open');
                }
            }, 50);
        }

        controller.$inject = ['$http', '$scope', 'urls'];

        function controller($http, $scope, urls) {
            var dm = this;

            //user selected a type, send a POST request to the server, then wait for the response with the column data
            dm.store = function (entry) {
                //TODO: maybe replace the url?
                //$http.post('http://192.168.1.145:37114/treatmententry/', entry)
                $http.post(urls.treatmentEntry(), entry)
                    .then(function (response) {
                        $scope.entry = response.data;
                    }, function (error) {
                        console.error(error);
                        $scope.entry = {};
                    });
            }
        }
    }

})();