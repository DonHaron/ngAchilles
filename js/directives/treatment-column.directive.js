(function () {
    "use strict";

    angular
        .module('achilles')
        .directive('treatmentColumn', treatmentColumn);

    treatmentColumn.$inject = ['$http', 'urls', '$timeout', '$rootScope'];

    function treatmentColumn($http, urls, $timeout, $rootScope) {
        var directive = {
            restrict: 'E',
            scope: {
                width: '@',
                content: '=',
                readonly: '@',
                parent: '=',
                row: '=',
                uniqueId: '@'
            },
            require: ['^treatment', '^treatmentEntry'],
            templateUrl: '../js/templates/treatment-column.tpl.html',
//            template: '<div ng-class="columnClass"><div class="form-group"><input class="form-control" ng-model="content" ng-disabled="{{readonly}}"></div></div>',
            link: link
        };

        return directive;

        function link(scope, element, attrs, ctrls) {
            var treatmentCtrl = ctrls[0];
            var entryCtrl = ctrls[1];
            scope.columnClass = 'col-xs-' + attrs.width;

            var textarea = element.find('textarea');
            textarea.on('blur', function (e) {
                if (textarea.hasClass('ng-dirty')) {
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
                        //hacky solution, there has to be a better way
//                        $timeout(function(){
//                            console.log('adjusting...');
//                            $rootScope.$broadcast('elastic:adjust');
//
//                        },1500);
                        //treatmentCtrl.setEntry(response.data);
                    });
                }
            });

            textarea.on('keydown', function (e) {
                // Ctrl + Shirt + Backspace
                if (e.ctrlKey && e.shiftKey && e.which == 8) {
                    //see if there is a previous textarea element in the same entry. If there is, focus on it
                    var prevRow = element.parents('.row').prev().find('textarea:not(:disabled)');
                    var nextRow = element.parents('.row').next().find('textarea:not(:disabled)');
                    var prevEntry = element.parents('treatment-entry').prev().find('textarea:not(:disabled)');
                    var nextEntry = element.parents('treatment-entry').next().find('textarea:not(:disabled)');
                    $timeout(function () {
                        if (prevRow.length) {
                            prevRow.eq(0).focus();
                        } else if(prevEntry.length){
                            prevEntry.eq(0).focus();
                        }else if(nextRow.length){
                            nextRow.eq(0).focus();
                        }else{
                            nextEntry.eq(0).focus();
                        }
                    }, 150);
                    entryCtrl.removeRow(scope.row);
                }
            });
        }
    }
})();