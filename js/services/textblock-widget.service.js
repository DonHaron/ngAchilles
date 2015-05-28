(function () {
    "use strict";

    angular
        .module('achilles')
        .factory('TextBlockWidget', TextBlockWidget);

    function TextBlockWidget() {
        var blockVisible = false,
            blockType,
            typeObserverCallbacks = [];

        var service = {
            addObserverCallback: addObserverCallback,
            isVisible: isVisible,
            getType: getType,
            show: show
        };

        return service;

        function addObserverCallback(callback){
            typeObserverCallbacks.push(callback);
        }

        function getType() {
            return blockType;
        }

        function isVisible() {
            return blockVisible;
        }

        function notifyCallbacks() {
            typeObserverCallbacks.forEach(function (callback) {
                callback(blockType);
            });
        }


        function show(visible, type) {
            blockType = visible ? type : undefined;
            blockVisible = visible;
            notifyCallbacks();
        }
    }
})();