(function(){
    "use strict";

    angular
        .module('achilles')
        .factory('AsteriskSearch', AsteriskSearch);

    AsteriskSearch.$inject = ['$filter', 'CurrentFocus'];
    function AsteriskSearch($filter, CurrentFocus){
        var service = {
            search: search
        };

        return service;

        function search(treatments){
            //TODO: look for the next entry with an asterisk, starting from the current focus
            var currentlyFocusedRow,
                next,
                partialRows,
                rows = [],
                rowsWithAsterisk;
            currentlyFocusedRow = CurrentFocus.getCurrentlyFocusedRow();
            console.log('currentlyFocusedRow', currentlyFocusedRow);
            // put all the rows in all the entries in all the treatments in this array
            treatments.forEach(function (treatment) {
                if(treatment.editable === 'true' || treatment.editable === true){
                    var entries = $filter('orderBy')(treatment.entries, 'type.name');
                    entries.forEach(function (entry) {
                        entry.rows.forEach(function (row) {
                            rows.push(row);
                        });
                    });
                }
            });
            // exclude all rows up to and including the currently focused one, as we want the next asterisk input
            if(currentlyFocusedRow){
                // todo: check if the current row has an asterisk after the current cursor position. if so, focus on it
                // if not, focus on the next one
                var column = CurrentFocus.getCurrentlyFocusedColumn(),
                    columnArray = column.content.replace(/<[^>]>/, '').split(''),
                    lastAsterisk = 0;
                console.log('columnArray', columnArray);
                for(var i = 0; i<columnArray.length; i++){
                    if(columnArray[i] == '*'){
                        lastAsterisk = i;
                    }
                }
                console.log('Current Cursor', CurrentFocus.getCurrentCursor());

                if(lastAsterisk>CurrentFocus.getCurrentCursor()){
                    partialRows = rows.slice(rows.indexOf(currentlyFocusedRow));
                }else{
                    partialRows = rows.slice(rows.indexOf(currentlyFocusedRow) + 1);
                    // set current cursor to 0, because it won't matter anymore
                    CurrentFocus.setCurrentCursor(0);
                }
            }else{
                partialRows = rows;
            }

            rowsWithAsterisk = $filter('filter')(partialRows, {$: '*'});

            if (rowsWithAsterisk.length === 0) {
                // with an empty result, we try again at the beginning, as we're probably at the end of the list
                rowsWithAsterisk = $filter('filter')(rows, {$: '*'});
            }

            next = rowsWithAsterisk.shift();
            if(next){
                console.log(next);
                CurrentFocus.setNewFocus(next);
            }
        }
    }
})();