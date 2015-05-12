(function(){
    "use strict";

    angular
        .module('achilles')
        .factory('WidgetVisibility', WidgetVisibility);

    function WidgetVisibility(){
        var isFixtextWidgetVisible = false,
            isTitleSettingsWidgetVisible = false;

        var service = {
            getFixtextWidgetVisibility: getFixtextWidgetVisibility,
            getTitleSettingsWidgetVisibility: getTitleSettingsWidgetVisibility,
            showFixtextWidget: showFixtextWidget,
            showTitleSettingsWidget: showTitleSettingsWidget
        };

        return service;

        function getFixtextWidgetVisibility(){
            return isFixtextWidgetVisible;
        }

        function getTitleSettingsWidgetVisibility(){
            return isTitleSettingsWidgetVisible;
        }

        function showFixtextWidget(visible){
            isFixtextWidgetVisible = visible;
        }

        function showTitleSettingsWidget(visible){
            isTitleSettingsWidgetVisible = visible;
        }
    }
})();