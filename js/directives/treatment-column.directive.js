(function () {
    "use strict";

    angular
        .module('achilles')
        .directive('treatmentColumn', treatmentColumn);

    treatmentColumn.$inject = ['$http', 'urls', '$timeout', '$compile', 'CurrentFocus'];

    function treatmentColumn($http, urls, $timeout, $compile, CurrentFocus) {
        var templates = {
            editable: '<div ng-class="columnClass">' +
                '<div class="form-group">' +
//                '<div id="wysihtml-toolbar-{{uniqueId}}" class="wysihtml-toolbar" style="display: none;">' +
//                '<a data-wysihtml5-command="bold">bold</a>' +
//                '<a data-wysihtml5-command="italic">italic</a>' +
//                '</div>' +
                '<div ng-model="content" ta-disabled="{{readonly}}" text-angular ta-target-toolbars="toolbar-{{treatmentId}}"></div>'+
//                '<textarea rows="1" class="form-control wysihtml-textarea" text-angular toolbar="wysihtml-toolbar-{{uniqueId}}" ng-model="content" amsd-elastic id="wysihtml-{{uniqueId}}" ng-disabled="{{readonly}}"></textarea>' +
                '</div>' +
                '</div>',
            readonly: '<div ng-class="columnClass"><p ng-bind-html="readonlyContent"></p></div>'
        };

        var directive = {
            restrict: 'E',
            scope: {
                width: '@',
                content: '=',
                readonly: '@',
                parent: '=',
                row: '=',
                uniqueId: '@',
                treatmentId: '@'
            },
            require: ['^treatment', '^treatmentEntry'],
            controller: controller,
            link: link
        };

        return directive;

        function getTemplate(editable){
            return editable == 'true' ? templates.editable : templates.readonly;
        }

        cntroller.$inject = ['$scope', '$sce'];
        function controller($scope, $sce){
            // we have to sanitize the content if we just want to display it with html tags
            $scope.readonlyContent = $sce.trustAsHtml($scope.content);
        }

        function link(scope, element, attrs, ctrls) {
            var treatmentCtrl = ctrls[0];
            var entryCtrl = ctrls[1];
            scope.columnClass = 'col-xs-' + attrs.width;

            element.on('blur', '.ta-bind', blur);
            element.on('keydown', '.ta-bind', keydown);
            element.on('focus', '.ta-bind', focus);
            attrs.$observe("editable", setTemplate);
            // change the template if the 'editable' attribute changes
            setTemplate(attrs.editable);

            scope.$watch(CurrentFocus.getNewFocus, function(val){
                if(val && scope.row.id == val.id){
                    //console.log('yes!', val);
                    // TODO: make editable if not already so
//                    if(attrs.editable!='true'){
//                        console.log('not true');
//                        attrs.editable = true;
//                        //setTemplate(true);
//                        //scope.$apply();
//                    }
                    var input = element.find('.ta-bind');
                    input.focus();
                    // TODO: make a selection, select the asterisk
//                    console.log(input.setSelectionRange);
//                    console.log(input.createTextRange);
//                    if(input.setSelectionRange){
//                        console.log('setSelectionRange');
//                        input.focus();
//                        input.setSelectionRange(0,1);
//                    }else if(input.createTextRange){
//                        console.log('createTextRange');
//                        var range = input.createTextRange();
//                        range.collapse(true);
//                        range.moveEnd('character', 1);
//                        range.moveStart('character', 0);
//                        range.select();
//                    }
                }
            });

            function setTemplate(editable){
                element.html(getTemplate(editable)).show();
                $compile(element.contents())(scope);
            }

            function blur(e){
                if (angular.element(this).hasClass('ng-dirty')) {
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
                    });
                }
            }

            function keydown(e){
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
                        } else if (prevEntry.length) {
                            prevEntry.eq(0).focus();
                        } else if (nextRow.length) {
                            nextRow.eq(0).focus();
                        } else {
                            nextEntry.eq(0).focus();
                        }
                    }, 150);
                    entryCtrl.removeRow(scope.row);
                }
            }

            function focus(e){
                CurrentFocus.setCurrentFocus(scope.row);
            }
        }

    }
})();