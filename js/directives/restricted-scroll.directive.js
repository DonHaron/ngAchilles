(function(){
    "use strict";

    angular
        .module('achilles')
        .directive('restrictedScroll', restrictedScroll);

    /*
        Prevents the scrolling of the parent element when the upper or lower bound of the current element is reached

        Directive needs to be set on the same element as the css attribute "overflow-y: auto"
     */
    function restrictedScroll(){
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, element, attrs){
            element.on('mousewheel', function(e, d){
                var height = element.height() + 1,// add 1, to counteract any rounding errors due to %-values in the css
                    scrollHeight = element.get(0).scrollHeight;
                if((this.scrollTop >= (scrollHeight - height) && d < 0) || (this.scrollTop === 0 && d > 0)) {
                    e.preventDefault();
                }
            });
        }
    }
})();