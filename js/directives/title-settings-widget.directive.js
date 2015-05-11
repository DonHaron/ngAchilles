(function(){
    "use strict";

    angular
        .module('achilles')
        .directive('titleSettingsWidget', titleSettingsWidget);

    function titleSettingsWidget(){
        var directive = {
            restrict: 'E',
            controller: TitleSettingsWidgetController,
            controllerAs: 'dc',
            templateUrl: '../js/templates/title-settings-widget.tpl.html'
        };

        return directive;
    }

    TitleSettingsWidgetController.$inject = ['EntryType', 'User'];
    function TitleSettingsWidgetController(EntryType, User){
        var dc = this;
        dc.changeTypeStatus = changeTypeStatus;

        loadEntryTypes();

        function changeTypeStatus(type){
            User.changeVisibility(type, dc.user);
        }

        function loadEntryTypes(){
            User.get(achillesConfig.process).then(function(user){
                dc.user = user;
                EntryType.all()
                    .then(function (types) {
                        User.setVisibleEntryTypes(types, user);

                        dc.entryTypes = types;
                    });

            });
        }
    }
})();