/* jshint -W040 */
(function () {
    "use strict";

    angular
        .module('achilles')
        .directive('treatmentColumn', treatmentColumn);

    treatmentColumn.$inject = ['$timeout', '$compile', 'CurrentFocus', 'Locking', 'Treatment', 'TreatmentRow'];

    function treatmentColumn($timeout, $compile, CurrentFocus, Locking, Treatment, TreatmentRow) {
        var templates = {
            wysiwyg: '<div ng-class="::columnClass" class="treatment-column" catalog-prompt>' +
                '<div class="form-group">' +
                '<div ng-model="column.content" placeholder="{{::column.placeholder}}" ta-disabled="readonly()" text-angular ta-target-toolbars="toolbar-{{::treatment.id}}-{{::type.id}}"></div>' +
                '</div>' +
                '</div>',
            input: '<div ng-class="::columnClass" class="treatment-column" catalog-prompt>' +
                '<div class="form-group">' +
                '<textarea rows="1" msd-elastic ng-model="column.content" placeholder="{{::column.placeholder}}" class="form-control"></textarea>' +
                '</div>' +
                '</div>',
            dropdown: '<div ng-class="::columnClass" class="treatment-column">' +
                '<div class="form-group">' +
                '<select class="form-control" ng-model="column.content" ng-options="option as option for option in column.options"></select>' +
                '</div>' +
                '</div>',
            readonly: '<div ng-class="::columnClass" class="treatment-column">' +
                '<div class="form-group">' +
                '<div ng-bind-html="::readonlyContent" class="read-only-content form-control"></div>' +
                '</div>' +
                '</div>'
        };

        var directive = {
            restrict: 'E',
            scope: {
                width: '@',
                column: '=',
                //content: '=',
                readonly: '&',
                //parent: '=',
                row: '=',
                uniqueId: '@',
                treatment: '=',
                warning: '=',
                type: '=',
                entry: '='
            },
            require: ['^treatment', '^treatmentEntry'],
            controller: TreatmentColumnController,
            link: link
        };

        var promise;

        return directive;

        function getTemplate(editable, column) {
            if (editable !== 'true') {
                return templates.readonly;
            } else {
                // if there is an options array, the input should become a dropdown
                if (angular.isDefined(column.options)) {
                    return templates.dropdown;
                }
                if (column.wysiwyg) {
                    return templates.wysiwyg;
                }
                return  templates.input;
            }
        }

        function link(scope, element, attrs, ctrls) {
            var treatmentCtrl = ctrls[0];
            var entryCtrl = ctrls[1];
            scope.columnClass = 'col-xs-' + attrs.width;

            element.on('blur', '.ta-bind, .form-control', blur);
            element.on('change', 'select.form-control', blur);
            element.on('keydown', '.ta-bind, .form-control', keydown);
            element.on('focus', '.ta-bind, .form-control', focus);
            element.on('click', '.ta-bind, .form-control', click);
            element.on('keyup', '.ta-bind, .form-control', keyup);
            element.on('focusout', focusout);
            attrs.$observe("editable", function (value) {
                setTemplate(value, scope.column);
            });

            // change the template if the 'editable' attribute changes
            setTemplate(attrs.editable, scope.column);

            scope.$watch(CurrentFocus.getNewlyFocusedRow, function (val) {
                if (val && scope.row.id == val.id) {
                    // TODO: make editable if not already so
//                    if(attrs.editable!='true'){
//                        console.log('not true');
//                        attrs.editable = true;
//                        //setTemplate(true);
//                        //scope.$apply();
//                    }

                    //todo: maybe add .form-control here
                    var input = element.find('.ta-bind:not(.ta-readonly)');
                    input.eq(0).focus();
                    var node = getAsteriskNode(input);
                    var currentCursor = CurrentFocus.getCurrentCursor();
                    var nextAsteriskPosition = findNextAsteriskPosition(input, currentCursor);
                    if (nextAsteriskPosition >= 0) {
                        var range = document.createRange();
                        range.setStart(node, nextAsteriskPosition);
                        range.setEnd(node, nextAsteriskPosition + 1);
                        var selection = window.getSelection();
                        selection.removeAllRanges();
                        selection.addRange(range);
                        CurrentFocus.setCurrentCursor();
                    }
                }
            });

            function setTemplate(editable, column) {
                element.html(getTemplate(editable, column)).show();
                $compile(element.contents())(scope);
            }

            function blur(e) {
                if (angular.element(this).hasClass('ng-dirty') && !scope.row.locked) {
                    //$http.put(urls.treatmentEntryRow(), scope.row).then(function (response) {
                    //PUT/POST-workaround
                    TreatmentRow.save(scope.row, scope.entry);
                }

                $timeout(function () {
                    scope.entry.focused = false;
                }, 150);

                $timeout.cancel(promise);
            }

            function keydown(e) {
                // if the row is locked, prevent the action of every key except for some key combinations
                if (scope.row.locked &&
                    isModifyingInput(e)
                    ) {
                    e.preventDefault();
                } else
                // Ctrl + Shift + Backspace
                if (e.ctrlKey && e.shiftKey && e.which == 8) {
                    //see if there is a previous textarea element in the same entry. If there is, focus on it
                    var prevRow = element.parents('.row').prev().find('.ta-bind:not(:disabled), .form-control:not(:disabled)');
                    var nextRow = element.parents('.row').next().find('.ta-bind:not(:disabled), .form-control:not(:disabled)');
                    var prevEntry = element.parents('treatment-entry').prev().find('.ta-bind:not(:disabled), .form-control:not(:disabled)');
                    var nextEntry = element.parents('treatment-entry').next().find('.ta-bind:not(:disabled), .form-control:not(:disabled)');
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
                    entryCtrl.removeRow(scope.row, scope.entry, scope.treatment.entries);
                    // Escape
                } else if (e.keyCode == 27) {
                    entryCtrl.showCatalog = false;
                } else
                // Ctrl + Enter
                if (e.ctrlKey && e.which == 13) {
                    // save the current row
                    TreatmentRow.save(scope.row, scope.entry);
                    // also, add a row of the same type as the currently focused one
                    Treatment.addEntry(scope.treatment.id, scope.entry.type, scope.treatment.entries);
                } else {
                    if (!scope.row.hasOwnLock && isModifyingInput(e)) {
                        Locking.lock(scope.row);
                    }
                }
            }

            // hide the catalog when losing focus
            function focusout() {
                $timeout(function () {
                    entryCtrl.showCatalog = false;
                }, 150);
            }

            function keyup(e) {
                if (isModifyingInput(e) && e.which != 13) { // exclude enter key
                    entryCtrl.lookupCatalogEntries(scope.column.content.replace(/<[^>]*>/gm, ''), scope.row, scope.column);
                }
                CurrentFocus.setCurrentCursor();
            }

            function focus() {
                entryCtrl.showCatalog = true;
                entryCtrl.setCatalog(scope.row);

                TreatmentRow.cancelSave(scope.row);

                CurrentFocus.setCurrentFocus(scope.column, scope.row, scope.entry);
                CurrentFocus.clearNewFocus();
                if (scope.warning && !scope.warning.displayed) {
                    toastr.warning(scope.warning.message);
                    scope.warning.displayed = true;
                }
                // todo: save focus position and try to apply it after the row is reloaded due to an updated row
                promise = $timeout(function () {
                    Locking.check(scope.row);
                }, 450);


                $timeout(function () {
                    scope.entry.focused = true;
                    if(scope.column.wysiwyg){
                        scope.entry.showToolbar = true;
                    }else{
                        scope.entry.showToolbar = false;
                    }
                }, 250);

            }

            function click(e) {
                //console.log(scope.readonly);
                if (scope.readonly() && scope.warning && !scope.warning.displayed) {
                    toastr.error(scope.warning.message);
                    scope.warning.displayed = true;
                }

                $timeout(function () {
                    CurrentFocus.setCurrentCursor();
                }, 50);
            }

            function findNextAsteriskPosition(jElement, currentCursor) {
                if (!jElement.length) {
                    return null;
                }
                var htmlElement = jElement[0];
                var chars = htmlElement.innerHTML.replace(/<[^>]*>/, '').split('');
                for (var i = currentCursor; i < chars.length; i++) {
                    if (chars[i] === '*') {
                        return i;
                    }
                }
                return -1;
            }

            function getAsteriskNode(jElement) {
                if (!jElement.length) {
                    return null;
                }
                var htmlElement = jElement[0];
                return recursiveGetAsteriskNode(htmlElement);
            }

            function recursiveGetAsteriskNode(node) {
                for (var i = 0; i < node.childNodes.length; i++) {
                    var currentNode = node.childNodes[i];
                    if (currentNode.nodeType == 3) {
                        if (currentNode.nodeValue.indexOf('*') >= 0) {
                            return currentNode;
                        }
                    } else {
                        var subResult = recursiveGetAsteriskNode(currentNode);
                        if (subResult) {
                            return subResult;
                        }
                    }
                }
                return null;
            }

            function recursiveGetAsteriskNodes(node, nodes) {
                for (var i = 0; i < node.childNodes.length; i++) {
                    var currentNode = node.childNodes[i];
                    if (currentNode.nodeType == 3) {
                        if (currentNode.nodeValue.indexOf('*') >= 0) {
                            nodes.push(currentNode);
                        }
                    } else {
                        var subResult = recursiveGetAsteriskNodes(currentNode, nodes);
                        if (subResult) {
                            nodes.push(subResult);
                        }
                    }
                }
                return;
            }

            // detect whether the pressed key modifies the input field
            function isModifyingInput(e) {
                return (
                    // tab key
                    e.which != 9 &&
                        // cursor keys
                        !(e.which >= 37 && e.which <= 40) &&
                        // Ctrl + A
                        !(e.ctrlKey && e.which == 65 ) &&
                        // Ctrl + C
                        !(e.ctrlKey && e.which == 67 )
                    );
            }

        }

    }

    TreatmentColumnController.$inject = ['$scope', '$sce'];
    function TreatmentColumnController($scope, $sce) {
        // we have to sanitize the content if we just want to display it with html tags
        $scope.readonlyContent = $sce.trustAsHtml($scope.column.content);
    }
})();