(function(){
    "use strict";

    angular
        .module('achilles')
        .directive('keyEvent', keyEvent);

    function keyEvent(){
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, element, attrs){
            element.on('keydown', focusTypeAndPreset);


            function focusTypeAndPreset(e) {
                //console.log(e.which);
                //F9
                if (e.which == 120) {
                    console.log('focusing');
                    element.find('.type-and-preset-search:visible').focus();
                }
            }
        }
    }
})();