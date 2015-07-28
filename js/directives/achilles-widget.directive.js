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

            if(attrs.widgetAlignToElement){
                angular.element(window).on('resize', setPosition);
                setPosition();
            }

            if(attrs.widgetPositionRight){
                element.css('right', attrs.widgetPositionRight + 'px');
            }

            if(attrs.widgetPositionTop){
                element.css('top', attrs.widgetPositionTop + 'px');
            }

            if(attrs.widgetPositionLeft){
                element.css('left', attrs.widgetPositionLeft + 'px');
            }

            if(attrs.widgetPositionBottom){
                element.css('bottom', attrs.widgetPositionBottom + 'px');
            }

            if(attrs.widgetPosition){
                element.css('position', attrs.widgetPosition);
            }

            function setPosition(){
                var position = angular.element(attrs.widgetAlignToElement).offset();
                console.log('setting position');
                element.css('top', position.top);
                element.css('left', position.left-element.width());
                console.log(element.width());
            }

        }
    }
})();