(function () {
    "use strict";

    angular
        .module('achilles')
        .config(textAngularConfig);

    textAngularConfig.$inject = ['$provide'];
    function textAngularConfig($provide) {
        $provide.decorator('taOptions', ['$delegate', function (taOptions) {
            // $delegate is the taOptions we are decorating
            // here we override the default toolbars and classes specified in taOptions.
            taOptions.toolbar = [
                ['bold', 'italics', 'underline', 'ul', 'ol', 'redo', 'undo', 'clear'],
                ['insertImage', 'insertLink']
            ];
            return taOptions; // whatever you return will be the taOptions
        }]);
    }
})();