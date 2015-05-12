(function () {
    "use strict";

    angular
        .module('achilles')
        .factory('CurrentFocus', CurrentFocus);

    function CurrentFocus() {
        var currentlyFocusedRow,
            currentlyFocusedColum,
            newlyFocusedRow,
            service = {
                // get the currently focused content
                getCurrentlyFocusedColumn: getCurrentlyFocusedColumn,
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
            return currentlyFocusedColum;
        }

        function getCurrentlyFocusedRow(){
            return currentFocus;
        }

        function getNewlyFocusedRow(){
            return newlyFocusedRow;
        }

        function setCurrentFocus(row, column){
            currentlyFocusedRow = row;
            currentlyFocusedColum = column;
        }

        function setNewFocus(row){
            newlyFocusedRow = row;
        }
    }
})();