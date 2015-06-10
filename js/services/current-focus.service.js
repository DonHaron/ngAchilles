(function () {
    "use strict";

    angular
        .module('achilles')
        .factory('CurrentFocus', CurrentFocus);

    function CurrentFocus() {
        var currentlyFocusedRow,
            currentlyFocusedColumn,
            currentlyFocusedEntry,
            currentCursorPosition,
            newlyFocusedRow,
            service = {
                clearNewFocus: clearNewFocus,
                getCurrentCursor: getCurrentCursor,
                // get the currently focused content
                getCurrentlyFocusedColumn: getCurrentlyFocusedColumn,
                // get the currently focused entry
                getCurrentlyFocusedEntry: getCurrentlyFocusedEntry,
                setCurrentCursor: setCurrentCursor,
                // save the currently focused element
                setCurrentFocus: setCurrentFocus,
                // get the currently focused element
                getCurrentlyFocusedRow: getCurrentlyFocusedRow,
                // set the focus on the specified element
                setNewFocus: setNewFocus,
                // get the new element to focus
                getNewlyFocusedRow: getNewlyFocusedRow
            };

        return service;

        function getCurrentCursor(){
            return currentCursorPosition;
        }

        function getCurrentlyFocusedColumn(){
            return currentlyFocusedColumn;
        }

        function getCurrentlyFocusedEntry(){
            return currentlyFocusedEntry;
        }

        function getCurrentlyFocusedRow(){
            return currentlyFocusedRow;
        }

        function getNewlyFocusedRow(){
            return newlyFocusedRow;
        }

        function setCurrentCursor(position){
            if(angular.isDefined(position)){
                currentCursorPosition = position;
            }else{
                // get the current selection and get the end of the selection (which equals the cursor if
                // no selection was made)
                var selection = window.getSelection();
                currentCursorPosition = selection.focusOffset;
            }
        }

        function setCurrentFocus(column, row, entry){
            currentlyFocusedColumn = column;
            currentlyFocusedRow = row;
            currentlyFocusedEntry = entry;
        }

        function clearNewFocus(){
            newlyFocusedRow = null;
        }

        function setNewFocus(row){
            newlyFocusedRow = row;
        }
    }
})();