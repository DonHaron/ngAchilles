(function () {
    "use strict";

    angular
        .module('achilles')
        //.directive('treatment', treatment)
        .directive('treatmentEntry', treatmentEntry)
        .directive('treatmentColumn', treatmentColumn)
        .directive('treatmentType', treatmentType);

//    function treatment(){
//        var directive = {
//            scope:{
//                treatment: '='
//            },
//            restrict: 'E',
//            template: ''
//        };
//
//        return directive;
//    }

    function treatmentEntry() {
        var directive = {
            scope: {
                entry: '=',
                types: '='
            },
            restrict: 'E',
            template: '<li class="list-group-item">' +
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
                //cannot just set the entry to be the new entry, otherwise we lose the association to the parent element
                $scope.entry.treatmentId = entry.treatmentId;
                $scope.entry.id = entry.id;
                $scope.entry.type = entry.type;
                $scope.entry.columns = entry.columns;
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
                    $http.put(urls.treatmentEntry() + scope.parent.id, scope.parent).then(function (response) {
                        entryCtrl.setEntry(response.data);
                    });
                }
            });
        }
    }

    treatmentType.$inject = ['$timeout', '$http', 'urls'];

    function treatmentType($timeout, $http, urls) {
        var directive = {
            restrict: 'E',
            link: link,
            controller: controller,
            controllerAs: 'dm',
            require: '^treatmentEntry',
            scope: {
                entry: '=',
                types: '='
            },
            template: '<div class="form-group"><span ng-show="entry.type">{{entry.type.name}}</span><select2 class="form-control" ng-change="store(entry)" ng-hide="entry.type" ng-model="entry.type" ng-options="type as type.name for type in types track by type.id"></select2></div>'
        };

        return directive;

        function link(scope, element, attrs, entryCtrl) {
            $timeout(function () {
                if (scope.entry && !scope.entry.type && !scope.entry.id) {
                    element.find('input').select2('open');
                }
            }, 50);

            scope.store = function(entry){
                $http.post(urls.treatmentEntry(), entry)
                    .then(function (response) {
                        entryCtrl.setEntry(response.data);
                    }, function (error) {
                        console.error(error);
                        entryCtrl.setEntry({});
                    });
            }
        }

        controller.$inject = ['$http', '$scope', 'urls'];

        function controller($http, $scope, urls) {
            var dm = this;

            //user selected a type, send a POST request to the server, then wait for the response with the column data
            dm.store = function (entry) {
                //TODO: maybe replace the url?
                //$http.post('http://192.168.1.145:37114/treatmententry/', entry)

            }
        }
    }

})();