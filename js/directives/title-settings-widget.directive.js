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

    TitleSettingsWidgetController.$inject = ['EntryType', 'User'];
    function TitleSettingsWidgetController(EntryType, User){
        var dc = this;
        dc.changeTypeStatus = changeTypeStatus;

        loadEntryTypes();

        function changeTypeStatus(type){
            if(!dc.user.hiddenEntryTypes){
                dc.user.hiddenEntryTypes = [];
            }
            var hiddenEntryTypes = dc.user.hiddenEntryTypes,
                index = hiddenEntryTypes.indexOf(type.id);
            if(index>-1){
                hiddenEntryTypes.splice(index, 1);
                type.hidden = false;
            }else{
                hiddenEntryTypes.push(type.id);
                type.hidden = true;
            }
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