(function () {
    "use strict";

    angular
        .module('achilles')
        .factory('CurrentFocus', CurrentFocus);

    function CurrentFocus() {
        var currentFocus,
            newFocus,
            service = {
                // save the currently focused element
                setCurrentFocus: setCurrentFocus,
                // get the currently focused element
                getCurrentFocus: getCurrentFocus,
                // set the focus on the specified element
                setNewFocus: setNewFocus,
                // get the new element to focus
                getNewFocus: getNewFocus,
            };

        return service;

        function getCurrentFocus(){
            return currentFocus;
        }

        function getNewFocus(){
            return newFocus;
        }

        function setCurrentFocus(element){
            currentFocus = element;
        }

        function setNewFocus(element){
            newFocus = element;
        }
    }
})();