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
                '<textarea rows="1" msd-elastic validation="{{::column.validation}}" ng-model="column.content" placeholder="{{::column.placeholder}}" class="form-control"></textarea>' +
                '</div>' +
                '</div>',
            datepicker: '<div ng-class="::columnClass" class="treatment-column">' +
                '<div class="form-group">' +
                '<div class="input-group">' +
                '<input rows="1" ng-model="column.content" is-open="opened" datepicker-popup="dd.MM.yy" placeholder="{{::column.placeholder}}" class="form-control">' +
                '<span class="input-group-btn">' +
                '<button tabindex="-1" type="button" class="btn btn-default" ng-click="openDatepicker($event)"><i ' +
                ' class="glyphicon glyphicon-calendar"></i></button>' +
                '</span>' +
                '</div>' +
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
            //return templates.readonly;
            //console.log(editable);
            if (editable !== 'true') {
                return templates.readonly;
            } else {
                // if there is an options array, the input should become a dropdown
                if (angular.isDefined(column.options)) {
                    return templates.dropdown;
                }
                if (column.validation === 'date') {
                    return templates.datepicker;
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

            element.on('blur', '.form-control', blur);
            element.on('change', 'select.form-control', blur);
            element.on('keydown', '.form-control', keydown);
            element.on('focus', '.form-control', focus);
            element.on('click', '.form-control', click);
            element.on('keyup', '.form-control', keyup);
            element.on('focusout', focusout);
            attrs.$observe("editable", function (value) {
                //console.log(value);
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
                // this replaces too much
//                var html = getTemplate(editable, column);
//                var e = $compile(html)(scope);
//                element.replaceWith(e).show();

                element.html(getTemplate(editable, column)).show();
                $compile(element.contents())(scope);
            }

            function blur(e) {
                if (angular.element(this).parents('form').hasClass('ng-dirty') && angular.element(this).parents('form').hasClass('ng-valid') && !scope.row.locked) {
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
                    var prevRow = element.parents('.treatment-row').prev().find('.ta-bind:not(:disabled), .form-control:not(:disabled):not(.ta-editor)');
                    var nextRow = element.parents('.treatment-row').next().find('.ta-bind:not(:disabled), .form-control:not(:disabled):not(.ta-editor)');
                    var prevEntry = element.parents('treatment-entry').prev().find('.ta-bind:not(:disabled), .form-control:not(:disabled):not(.ta-editor)');
                    var nextEntry = element.parents('treatment-entry').next().find('.ta-bind:not(:disabled), .form-control:not(:disabled):not(.ta-editor)');
                    //debugger;
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
                } else if (e.which == 27) {
                    //console.log('escape');
                    $timeout(function () {
                        entryCtrl.showCatalog = false;
                    });
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
                if (isModifyingInput(e) && e.which != 13 && angular.isDefined(scope.column.content) && !(scope.column.content instanceof Date)) { // exclude enter key & dates
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
                    if (scope.column.wysiwyg) {
                        scope.entry.showToolbar = true;
                    } else {
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
                        !(e.ctrlKey && e.which == 67 ) &&
                        // Escape
                        e.which != 27

                    );
            }

        }

    }

    TreatmentColumnController.$inject = ['$scope', '$sce', '$filter', 'TreatmentRow'];
    function TreatmentColumnController($scope, $sce, $filter, TreatmentRow) {
        // we have to sanitize the content if we just want to display it with html tags
        if($scope.column.validation == 'date'){
            $scope.readonlyContent = $sce.trustAsHtml($filter('date')($scope.column.content));
        }else {
            $scope.readonlyContent = $sce.trustAsHtml($scope.column.content);
        }

        $scope.opened = false;

        $scope.openDatepicker = openDatepicker;

        function openDatepicker($event) {
            $event.preventDefault();
            $event.stopPropagation();
            //$timeout.cancel(promise);
            TreatmentRow.cancelSave($scope.row);
            $scope.opened = true;
        }
    }
})();