(function(){
    "use strict";

    angular
        .module('achilles')
        .factory('WidgetVisibility', WidgetVisibility);

    function WidgetVisibility(){
        var isTitleSettingsWidgetVisible = false,
            typeObserverCallbacks = [];

        var textBlock = {
            visible: false,
            type: undefined
        };

        var service = {
            addTypeObserverCallback: addTypeObserverCallback,
            getTextBlockWidgetVisibility: getTextBlockWidgetVisibility,
            getTextBlockType: getTextBlockType,
            getTitleSettingsWidgetVisibility: getTitleSettingsWidgetVisibility,
            showTextBlockWidget: showTextBlockWidget,
            showTitleSettingsWidget: showTitleSettingsWidget
        };

        return service;

        function addTypeObserverCallback(callback){
            typeObserverCallbacks.push(callback);
        }

        function getTextBlockType(){
            return textBlock.type;
        }

        function getTextBlockWidgetVisibility(){
            return textBlock.visible;
        }

        function getTitleSettingsWidgetVisibility(){
            return isTitleSettingsWidgetVisible;
        }

        function notifyCallbacks(){
            typeObserverCallbacks.forEach(function(callback){
                callback(textBlock.type);
            });
        }

        function showTextBlockWidget(visible, type) {
            textBlock.type = visible ? type : undefined;
            textBlock.visible = visible;
            notifyCallbacks();
        }

        function showTitleSettingsWidget(visible){
            isTitleSettingsWidgetVisible = visible;
        }
    }
})();