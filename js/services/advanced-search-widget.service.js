(function(){
    "use strict";

    angular
        .module('achilles')
        .factory('AdvancedSearchWidget', AdvancedSearchWidget);

    function AdvancedSearchWidget(){
        var visible = false;

        var service = {
            isVisible: isVisible,
            show: show
        };

        return service;

        function isVisible(){
            return visible;
        }

        function show(visibility){
            visible = visibility;
        }
    }
})();