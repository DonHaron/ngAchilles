(function(){
    "use strict";

    angular
        .module('achilles')
        .directive('validation', validation);

    function validation(){
        var directive = {
            scope: {
                validation: '@'
            },
            restrict: 'A',
            require: 'ngModel',
            link: link
        };

        return directive;

        function link(scope, element, attrs, ctrl){
            var NUMERIC =  /^\d*(\.\d+)*$/;

            if(!scope.validation || scope.validation === 'none'){
                return;
            }

            switch(scope.validation){
                case 'numeric':
                    ctrl.$validators.numeric = function (modelValue, viewValue) {
                        if (NUMERIC.test(viewValue)) {
                            return true;
                        }
                        return false;
                    };
                    break;
                case 'date':
                    //this is handled in the datepicker directive already
                    break;
            }
        }
    }
})();