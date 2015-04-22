(function(){
    "use strict";

    angular
        .module('achilles')
        .directive('wysihtml', wysihtml);

    wysihtml.$inject = ['$timeout'];
    function wysihtml($timeout){
        var directive = {
            link: link
        };

        return directive;

        function link(scope, element, attrs){
            console.log('working it');
            console.log(attrs.id);
            $timeout(function(){
                var editor = new wysihtml5.Editor(attrs.id, {
                    toolbar: attrs.toolbar,
                    parserRules:  wysihtml5ParserRules
                });
            }, 4500);
        }
    }
})();