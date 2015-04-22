(function () {
    "use strict";

    angular
        .module('achilles')
        .directive('modalSelect2', modalSelect2);

    modalSelect2.$inject = ['$timeout'];
    function modalSelect2($timeout){
        var directive = {
            link: link
        };

        return directive;

        function link(scope, element, attributes){
            console.log(document.activeElement);
            var input = element.find('textarea');
            $timeout(function(){
                console.log(document.activeElement);

                input.focus();
                console.log('trying');
                console.log(document.activeElement);

//                $timeout(function(){
//                    input.select2('open');
//                }, 500);
            }, 5000);

            element.find('a').on('click', function(){
                console.log('focus');
                input.select2('open');
            });
        }
    }
})();