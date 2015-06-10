(function(){
    "use strict";

    angular
        .module('achilles')
        .factory('WidgetVisibility', WidgetVisibility);

    function WidgetVisibility(){
        var isTitleSettingsWidgetVisible = false;

        var service = {
            getTitleSettingsWidgetVisibility: getTitleSettingsWidgetVisibility,
            showTitleSettingsWidget: showTitleSettingsWidget
        };

        return service;

        function getTitleSettingsWidgetVisibility(){
            return isTitleSettingsWidgetVisible;
        }

        function showTitleSettingsWidget(visible){
            isTitleSettingsWidgetVisible = visible;
        }
    }
})();