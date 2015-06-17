(function(){
    "use strict";

    angular
        .module('achilles')
        .directive('draggable', draggable);

    function draggable(){
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, element, attrs){
            var options = {
                containment: "window"
            };
            if(attrs.draggableHandle){
                options.handle = attrs.draggableHandle;
            }
            element.draggable(options);
        }
    }
})();