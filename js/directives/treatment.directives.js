(function () {
    "use strict";

    angular
        .module('achilles')
        .directive('treatment', treatment)
        .directive('treatmentEntry', treatmentEntry)
        .directive('treatmentRow', treatmentRow)
        .directive('treatmentColumn', treatmentColumn);
//        .directive('treatmentType', treatmentType);

    function treatment() {
        var directive = {
            scope: {
                treatment: '=',
                treatments: '=treatmentlist'
            },
            restrict: 'A',
            controller: controller,
            controllerAs: 'dc',
            templateUrl: '../js/templates/treatment.tpl.html',
            //link: link
        };

        return directive;

        controller.$inject = ['$scope', '$http', 'urls', 'EntryType', 'TreatmentContext'];
        function controller($scope, $http, urls, EntryType, TreatmentContext) {
            var dc = this;

            dc.newEntry = {
                type: null
            }

            EntryType.all().then(function (types) {
                dc.types = types;
            });

            //rather ugly code, doesn't do anything anymore anyway
//            dc.setEntry = function (entry) {
//                dc.removeEntry(entry);
////
//                for (var i = 0, entries = $scope.treatment.entries; i < entries.length; i++) {
//                    if (entry.type.id == entries[i].type.id) {
//                        entries[i] = entry;
//                        return;
//                    }
//                }
//                entries.push(entry);
//                //cannot just set the entry to be the new entry, otherwise we lose the association to the parent element
//                //TODO: look for an entry with the same type ID and replace it
//                //TODO: handle an empty entry or one with invalid data
////                $scope.entry.treatmentId = entry.treatmentId;
////                $scope.entry.id = entry.id;
////                $scope.entry.type = entry.type;
////                $scope.entry.columns = entry.columns;
//                //TODO: make this work on the child
//                // $scope.entryform.$setPristine();
//            }
            dc.addTreatment = TreatmentContext.addTreatment;
            dc.copyTreatment = TreatmentContext.copyTreatment;
            dc.deleteTreatment = TreatmentContext.deleteTreatment;

//            $scope.addAttribute = function (treatment, position) {
//                console.log('called');
//                if (!treatment.entries) treatment.entries = [];
//                var entry = {
//                    treatmentId: treatment.id
//                };
//                if (position == 'first') {
//                    treatment.entries.unshift(entry);
//                } else {
//                    treatment.entries.push(entry);
//                }
//            };

            dc.removeEntry = function (entry) {
                var entries = $scope.treatment.entries;
                for (var i = 0; i < entries.length; i++) {
                    if (entry.type.id == entries[i].type.id) {
                        entries.splice(i, 1);
                        break;
                    }
                }
            }

            // add an entry to a treatment, and add it to the list of entries or replace
            // the existing one with the same type id
            dc.addEntry = function(treatmentId, type, entries) {
                //entry: {treatmentId: <id>, type: <type object>}
                $http.post(urls.treatmentEntry(), {
                    treatmentId: treatmentId,
                    type: type
                }).then(function(response){
                    var entry = response.data,
                        replaced = false;
                    for(var i=0;i<entries.length;i++){
                        if(entry.type.id == entries[i].type.id){
                            console.log('already in list');
                            entries[i] = entry;
                            replaced = true;
                            break;
                        }
                    }
                    if(!replaced){
                        entries.push(entry);
                    }
                    dc.newEntry = {};
                });
            }

        }
    }

    function treatmentEntry() {
        var directive = {
            scope: {
                entry: '='
            },
            restrict: 'E',
            templateUrl: '../js/templates/treatment-entry.tpl.html',
            require: '^treatment',
            controller: controller,
            link: link
        };

        return directive;

        controller.$inject = ['$scope', '$http', 'urls'];
        function controller($scope, $http, urls) {
            var dc = this;

            dc.makePristine = function () {
                $scope.entryform.$setPristine();
            }

            dc.removeRow = function (row) {
                var rows = $scope.entry.rows;
                //$http.delete(urls.treatmentEntryRow() + row.id)
                //PUT/DELETE-workaround
                $http.post(urls.treatmentEntryRow('delete') + row.id)
                    .then(function () {
                        for (var i = 0; i < rows.length; i++) {
                            if (rows[i].id == row.id) {
                                rows.splice(i, 1);
                                break;
                            }
                        }
                        if (rows.length == 0) {
                            //There are now more rows left, delete the entry now
                            $scope.removeEntry($scope.entry)
                        }
                    });
            }
        }

        function link(scope, element, attrs, treatmentCtrl) {
            scope.removeEntry = treatmentCtrl.removeEntry;
        }
    }

    treatmentRow.$inject = ['$timeout'];
    function treatmentRow($timeout) {
        var directive = {
            link: link
        };

        return directive;

        function link(scope, element) {
            if (scope.row.new == true) {
                $timeout(function () {
                    var input = element.find('input').eq(0);
                    input.focus();
                }, 50);
            }
        }
    }

    treatmentColumn.$inject = ['$http', 'urls', '$timeout'];

    function treatmentColumn($http, urls, $timeout) {
        //TODO: include rows for the entries, there can be multiple
        var directive = {
            restrict: 'E',
            scope: {
                width: '@',
                content: '=',
                readonly: '@',
                parent: '=',
                row: '='
            },
            require: ['^treatment', '^treatmentEntry'],
            template: '<div ng-class="columnClass"><div class="form-group"><input class="form-control" ng-model="content" ng-disabled="{{readonly}}"></div></div>',
            link: link
        };

        return directive;

        function link(scope, element, attrs, ctrls) {
            var treatmentCtrl = ctrls[0];
            var entryCtrl = ctrls[1];
            scope.columnClass = 'col-xs-' + attrs.width;

            var input = element.find('input');
            input.on('blur', function (e) {
                if (input.hasClass('ng-dirty')) {
                    console.log(scope.row);
                    //$http.put(urls.treatmentEntryRow(), scope.row).then(function (response) {
                    //PUT/POST-workaround
                    $http.post(urls.treatmentEntryRow('put'), scope.row).then(function (response) {
                        //response.data is a row
                        //now, find the row in the rows and replace it
                        var row = response.data,
                            rows = scope.parent.rows;
                        for (var i = 0; i < rows.length; i++) {
                            if (rows[i].id == row.id) {
                                rows[i] = row;
                                break;
                            }
                        }
                        ;
                        //treatmentCtrl.setEntry(response.data);
                    });
                }
            });

            input.on('keydown', function (e) {
                if (e.ctrlKey && e.shiftKey && e.which == 8) {
                    //see if there is a previous input element in the same entry. If there is, focus on it
                    $timeout(function () {
                        var prev = element.parent().prev().find('input');
                        console.log(prev.length);
                        if (prev.length) {
                            prev.eq(0).focus();
                        } else {
                            //if no previous element is found, look for the next one
                            element.parent().next().find('input').eq(0).focus()
                        }

                    }, 150);
                    entryCtrl.removeRow(scope.row);
                }
            });
        }
    }

//    treatmentType.$inject = ['$timeout', '$http', 'urls'];
//
//    function treatmentType($timeout, $http, urls) {
//        var directive = {
//            restrict: 'E',
//            link: link,
//            controller: controller,
//            controllerAs: 'dm',
//            require: '^treatment',
//            scope: {
//                entry: '='
//            },
//            template: '<div class="form-group"><span ng-show="entry.type">{{entry.type.name}}</span><select2 class="form-control" ng-change="store(entry)" ng-hide="entry.type" ng-model="entry.type" ng-options="type as type.name for type in types track by type.id"></select2></div>'
//        };
//
//        return directive;
//
//        function link(scope, element, attrs, treatmentCtrl) {
//            $timeout(function () {
//                if (scope.entry && !scope.entry.type && !scope.entry.id) {
//                    element.find('input').select2('open');
//                }
//            }, 50);
//
//            //user selected a type, send a POST request to the server, then wait for the response with the column data
//            scope.store = function (entry) {
//                $http.post(urls.treatmentEntry(), entry)
//                    .then(function (response) {
//                        treatmentCtrl.setEntry(response.data);
//                    }, function (error) {
//                        console.error(error);
//                    });
//            }
//        }
//
//        controller.$inject = ['$http', '$scope', 'urls', 'getEntryTypes'];
//
//        function controller($http, $scope, urls, getEntryTypes) {
//            var dm = this;
//            $scope.types = getEntryTypes();
//        }
//    }

})();