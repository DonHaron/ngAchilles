(function () {
    "use strict";

    angular
        .module('achilles')
        .factory('CurrentFocus', CurrentFocus);

    function CurrentFocus() {
        var currentlyFocusedRow,
            currentlyFocusedColumn,
            currentlyFocusedEntry,
            newlyFocusedRow,
            service = {
                // get the currently focused content
                getCurrentlyFocusedColumn: getCurrentlyFocusedColumn,
                // get the currently focused entry
                getCurrentlyFocusedEntry: getCurrentlyFocusedEntry,
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

        function setCurrentFocus(column, row, entry){
            currentlyFocusedColumn = column;
            currentlyFocusedRow = row;
            currentlyFocusedEntry = entry;
        }

        function setNewFocus(row){
            newlyFocusedRow = row;
        }
    }
})();