(function(){
    "use strict";

    angular
        .module('achilles')
        .directive('titleSettingsWidget', titleSettingsWidget);

    function titleSettingsWidget(){
        var directive = {
            restrict: 'A',
            controller: TitleSettingsWidgetController,
            controllerAs: 'dc'
        };

        return directive;
    }

    TitleSettingsWidgetController.$inject = ['EntryType'];
    function TitleSettingsWidgetController(EntryType){
        var dc = this;

        loadEntryTypes();

        function loadEntryTypes(){
            EntryType.all()
                .then(function (types) {
                    dc.entryTypes = types;
                });
        }
    }
})();