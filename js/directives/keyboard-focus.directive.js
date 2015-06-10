(function(){
    "use strict";

    angular
        .module('achilles')
        .directive('keyboardFocus', keyboardFocus);

    function keyboardFocus(){
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, element, attrs){
            var descriptor = attrs.focusable,
                focused = '.focused',
                visible = ':visible',
                 active = false;

            attrs.$observe('active', function(value){
                if(value==="true"){
                    active = true;
                }else{
                    active = false;
                }
            });
            element.on('keydown', keydown);

            function keydown(e){
                if((e.which == 38 || e.which == 40 || e.which == 13) && active){ // up or down cursor or enter, and only react if the dropdown is active
                    e.preventDefault();
                    var focusableItems = element.find(descriptor),
                        focusedElement = element.find(descriptor+focused),
                        index = findFocusedIndex(focusableItems),
                        count = focusableItems.length;

                    if(e.which == 38){ // cursor up
                        focusableItems.removeClass('focused');
                        if(index>0){
                            focusedElement = focusableItems.eq((index-1)).addClass('focused');
                        }else{
                            focusedElement = focusableItems.eq(count-1).addClass('focused');
                        }
                        scrollToElement(focusedElement);
                    }else if(e.which == 40){ // cursor down
                        focusableItems.removeClass('focused');
                        if(index>=0){
                            focusedElement = focusableItems.eq((index+1)%count).addClass('focused');
                        }else{
                            focusedElement = focusableItems.eq(0).addClass('focused');
                        }
                        scrollToElement(focusedElement);
                    } else if(e.which == 13){ // enter key
                        focusedElement.click();
                        focusedElement.removeClass('focused');
                        element.blur();
                    }
                }

                function findFocusedIndex(items){
                    for(var i = 0;i<items.length;i++){
                        if(items.eq(i).hasClass('focused')){
                            return i;
                        }
                    }

                    return -1;
                }

                function scrollToElement(el){
                    var listGroup = element.find('.list-group');
                    var newPosition = listGroup.scrollTop() + el.position().top - (listGroup.height() - 50);
                    listGroup.animate({
                        scrollTop:  newPosition
                    }, 0);
                }
            }
        }
    }
})();