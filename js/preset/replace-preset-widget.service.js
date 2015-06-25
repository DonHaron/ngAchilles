(function(){
    "use strict";

    angular
        .module('achilles')
        .factory('ReplacePresetWidget', ReplacePresetWidget);

    ReplacePresetWidget.$inject = ['$q'];
    function ReplacePresetWidget($q){
        var visible = false,
            deferred;

        var service = {
            cancel: cancel,
            isVisible: isVisible,
            selectPreset: selectPreset,
            setPreset: setPreset
        };

        return service;

        function cancel(){
            deferred.reject();
            visible = false;
        }

        function isVisible(){
            return visible;
        }

        function selectPreset(){
            deferred = $q.defer();
            visible = true;

            return deferred.promise;
        }

        function setPreset(preset){
            deferred.resolve(preset);
            visible = false;

        }
    }
})();