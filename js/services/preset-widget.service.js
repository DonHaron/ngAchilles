(function(){
    "use strict";

    angular
        .module('achilles')
        .factory('PresetWidget', PresetWidget);

    PresetWidget.$inject = ['$q'];
    function PresetWidget($q){
        var visible = false,
            deferred;


        var service = {
            getName: getName,
            isVisible: isVisible,
            setName: setName
        };

        return service;

        function getName(){
            deferred = $q.defer();
            visible = true;

            return deferred.promise;
        }

        function isVisible(){
            return visible;
        }

        function setName(name){
            deferred.resolve(name);
        }
    }
})();