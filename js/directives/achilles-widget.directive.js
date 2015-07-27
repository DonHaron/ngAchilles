(function(){
    "use strict";

    angular
        .module('achilles')
        .directive('achillesWidget', achillesWidget);

    function achillesWidget(){
        var directive = {
            link: link
        };

        return directive;

        function link(scope, element, attrs){
            element.addClass('achilles-widget');


            if(attrs.widgetWidth){
                if(attrs.widgetWidth.indexOf('%')>-1){
                    console.log('%');
                    element.css('width', attrs.widgetWidth);
                }else{
                    element.css('width', attrs.widgetWidth + 'px');
                }
            }

            if(attrs.widgetAlignElement){
                angular.element(window).on('resize', setPosition);

                setPosition();

            }

            function setPosition(){
                var position = angular.element(attrs.widgetAlignElement).offset();
                console.log('setting position');
                element.css('top', position.top);
                element.css('left', position.left-element.width());
                console.log(element.width());
            }

        }
    }
})();