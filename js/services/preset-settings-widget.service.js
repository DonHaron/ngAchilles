(function(){
    "use strict";

    angular
        .module('achilles')
        .factory('PresetSettingsWidget', PresetSettingsWidget);

    function PresetSettingsWidget(){
        var visible = false;

        var service = {
            show: show
        };

        return service;

        function show(visibility){
            visible = visibility;
        }
    }
})();