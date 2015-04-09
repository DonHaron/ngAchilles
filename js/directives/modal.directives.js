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
            $timeout(function(){
                element.find('input').select2('open');
                $timeout(function(){
                    element.find('.select2-input').focus();
                }, 500);
            }, 1500);
        }
    }
})();