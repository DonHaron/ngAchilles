(function () {
    "use strict";

    angular
        .module('achilles')
        .directive('toggleFocus', toggleFocus);

    toggleFocus.$inject = ['$timeout'];
    function toggleFocus($timeout) {
        var directive = {
            require: 'dropdown',
            link: link
        }

        return directive;

        function link(scope, element, attrs, dropdownCtrl) {
            element.on('click', function () {
                if (dropdownCtrl.isOpen()) {
                    $timeout(function () {
                        element.find('li a').eq(0).focus();
                    }, 150);
                }
            });

            element.on('keydown', 'li a', function(e){
                //keycode 40: cursor down
                if(e.which == 40) {
                    e.preventDefault();
                    // look for the next sibling that is not a divider, and if you find one, focus that.
                    // if not, focus the first one of the bunch
                    var next = $(this).parent().nextAll(':not(.divider)').first().find('a'),
                        first = $(this).parent().siblings().first().find('a');
                    if(next.length){
                        next.focus();
                    }else{
                        first.focus();
                    }
                }
                //keycode 38: cursor up
                if(e.which == 38) {
                    e.preventDefault();
                    // look for the previous sibling that is not a divider, and focus it if you find one.
                    // if not, focus the last one in the list
                    var prev = $(this).parent().prevAll(':not(.divider)').first().find('a'),
                        last = $(this).parent().siblings().last().find('a');

                    if(prev.length){
                        prev.focus();
                    }else{
                        last.focus();
                    }
                }
            });
        }
    }
})();