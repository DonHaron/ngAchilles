(function () {
    "use strict";

    angular
        .module('achilles')
        .directive('treatmentColumn', treatmentColumn);

    treatmentColumn.$inject = ['$http', 'urls', '$timeout', '$compile', 'CurrentFocus', 'Locking'];

    function treatmentColumn($http, urls, $timeout, $compile, CurrentFocus, Locking) {
        var templates = {
            editable: '<div ng-class="columnClass">' +
                '<div class="form-group">' +
                '<div ng-model="content" ta-disabled="{{readonly}}" text-angular ta-target-toolbars="toolbar-{{treatmentId}}"></div>' +
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

        var promise;

        return directive;

        function getTemplate(editable) {
            return editable == 'true' ? templates.editable : templates.readonly;
        }

        cntroller.$inject = ['$scope', '$sce'];
        function controller($scope, $sce) {
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

            scope.$watch(CurrentFocus.getNewFocus, function (val) {
                if (val && scope.row.id == val.id) {
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
                    //console.log('focusing', input);
                    var node = getAsteriskNode(input);
                    if(node){
                        //console.log(node);
                        var range = document.createRange();
                        var index = node.nodeValue.indexOf('*');
                        range.setStart(node, index);
                        range.setEnd(node, index+1);
                        var selection = window.getSelection();
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                }
            });

            function setTemplate(editable) {
                element.html(getTemplate(editable)).show();
                $compile(element.contents())(scope);
            }

            function blur(e) {
                if (angular.element(this).hasClass('ng-dirty') && !scope.row.locked) {
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

                        scope.row.locked = false;
                        scope.row.hasOwnLock = false;
                    });
                }

                $timeout.cancel(promise);
            }

            function keydown(e) {
                // if the row is locked, prevent the action of every key except for some key combinations
                if (scope.row.locked &&
                    isModifyingInput(e)
                    ) {
                    e.preventDefault();
                } else
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
                }else{
                    if(!scope.row.hasOwnLock && isModifyingInput(e)){
                        Locking.lock(scope.row);
                    }
                }
            }

            function focus(e) {
                CurrentFocus.setCurrentFocus(scope.row);

                promise = $timeout(function () {
                    Locking.check(scope.row);
                }, 450);
            }

            function getAsteriskNode(jElement){
                if(!jElement.length){
                    return null;
                }
                var htmlElement = jElement[0];
                return recursiveGetAsteriskNode(htmlElement);
            }

            function recursiveGetAsteriskNode(node){
                for(var i = 0;i<node.childNodes.length;i++){
                    var currentNode = node.childNodes[i];
                    if(currentNode.nodeType == 3){
                        if(currentNode.nodeValue.indexOf('*')>=0){
                            return currentNode;
                        }
                    }else{
                        var subResult = recursiveGetAsteriskNode(currentNode)
                        if(subResult){
                            return subResult;
                        }
                    }
                }
                return null;
            }

            // detect whether the pressed key modifies the input field
            function isModifyingInput(e){
                return (
                    // tab key
                    e.which != 9
                        &&
                        // cursor keys
                        !(e.which >= 37 && e.which <= 40)
                        &&
                        // Ctrl + A
                        !(e.ctrlKey && e.which == 65 )
                        &&
                        // Ctrl + C
                        !(e.ctrlKey && e.which == 67 )
                    )
            }
        }

    }
})();