(function(){
    "use strict";

    angular
        .module('achilles')
        .directive('treatmentRow', treatmentRow);

    treatmentRow.$inject = ['$timeout'];
    function treatmentRow($timeout) {
        var directive = {
            link: link
        };

        return directive;

        function link(scope, element) {
            scope.$watch('row.changed', function(val){
                if(val){
                    focusOnChanged();
                }
            });

            if (scope.row.new === true) {
                focusOnChanged();
            }

            function focusOnChanged(){
                $timeout(function () {
                    //var textarea = element.find('.ta-bind:not(.ta-readonly)').eq(0);
                    var textarea = element.find('.ta-bind:not(.ta-readonly), .form-control:not(.ta-editor)').eq(0);
                    textarea.focus();
                }, 150);
            }
        }
    }
})();