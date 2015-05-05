(function () {
    "use strict";

    angular
        .module('achilles')
        .config(textAngularConfig);

    textAngularConfig.$inject = ['$provide'];
    function textAngularConfig($provide) {
        $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function (taRegisterTool, taOptions) {
            // $delegate is the taOptions we are decorating
            taRegisterTool('colorRed', {
                iconclass: 'fa fa-square red-text',
                action: function(){
                    this.$editor().wrapSelection('forecolor', 'red');
                }
            });
            taRegisterTool('colorBlue', {
                iconclass: 'fa fa-square blue-text',
                action: function(){
                    this.$editor().wrapSelection('forecolor', 'blue');
                }
            });
            taRegisterTool('colorOrange', {
                iconclass: 'fa fa-square orange-text',
                action: function(){
                    this.$editor().wrapSelection('forecolor', 'orange');
                }
            });
            taRegisterTool('colorGreen', {
                iconclass: 'fa fa-square green-text',
                action: function(){
                    this.$editor().wrapSelection('forecolor', 'green');
                }
            });
            taRegisterTool('colorBlack', {
                iconclass: 'fa fa-square',
                action: function(){
                    this.$editor().wrapSelection('forecolor', 'black');
                }
            });
            // here we override the default toolbars and classes specified in taOptions.
            taOptions.toolbar = [
                ['bold', 'italics', 'underline', 'colorRed', 'colorOrange', 'colorGreen', 'colorBlue', 'colorBlack', 'ul', 'ol', 'redo', 'undo', 'clear']
            ];
            return taOptions; // whatever you return will be the taOptions
        }]);
    }
})();