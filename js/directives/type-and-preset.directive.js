(function(){
    "use strict";

    angular
        .module('achilles')
        .directive('typeAndPreset', typeAndPreset);

    typeAndPreset.$inject = ['$timeout'];
    function typeAndPreset($timeout){
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, element, attrs){
            element.on('focusin', setActive);
            element.on('blur', setInactive);

            element.find('.type-and-preset-search').on('blur',setInactive);

            element.find('.type-and-preset-search').on('keyup', setListFocus);

            function setActive(){
                console.log('focusin');
                $timeout(function(){
                    scope.active = true;
                });
                //scope.$apply();
            }

            function setInactive(){
                console.log('blurred');
                $timeout(function(){
                    scope.active = false;
                },150);
                //scope.$apply();
            }

            function setListFocus(e){
                //console.log(e.which);
                var focused = element.find('a.list-group-item.focused');

                if(e.which == 8 || e.which > 40){ // backspace or character key
                    $timeout(function(){
                        focused.removeClass('focused');
                        if(scope.search.term > ''){
                            focusFirstItem();
                        }
                    }, 50);
                }else if(e.which == 40){ // cursor down
                    e.preventDefault();
                    if(focused.length){
                        var next = focused.nextAll('a.list-group-item:visible').first();
                        focused.removeClass('focused');
                        next.addClass('focused');
                    }else{
                        focusFirstItem();
                    }
                }else if(e.which == 38){ // cursor up
                    e.preventDefault();

                    if(focused.length){
                        var prev = focused.prevAll('a.list-group-item:visible').first();
                        focused.removeClass('focused');
                        prev.addClass('focused');
                    }else{
                        focusLastItem();
                    }
                }else if(e.which == 13){ // enter
                    focused.click();
                }else if(e.keyCode == 27){ // Escape
                    setInactive();
                }

                function focusFirstItem(){
                    element.find('a.list-group-item:visible').first().addClass('focused');
                }
                function focusLastItem(){
                    element.find('a.list-group-item:visible').last().addClass('focused');
                }

            }
        }
    }
})();