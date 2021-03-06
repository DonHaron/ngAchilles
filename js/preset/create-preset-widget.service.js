(function(){
    "use strict";

    angular
        .module('achilles')
        .factory('CreatePresetWidget', CreatePresetWidget);

    CreatePresetWidget.$inject = ['$q'];
    function CreatePresetWidget($q){
        var visible = false,
            deferred;


        var service = {
            cancel: cancel,
            getName: getName,
            isVisible: isVisible,
            setName: setName
        };

        return service;

        function cancel(){
            deferred.reject();
            visible = false;
        }

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
            visible = false;
        }
    }
})();