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
            templateUrl: '../js/templates/title-settings-widget.tpl.html',
            //link: link
        };

        return directive;

    }

    TitleSettingsWidgetController.$inject = ['$filter', 'EntryType', 'User'];
    function TitleSettingsWidgetController($filter, EntryType, User){
        var dc = this;
        dc.changeTypeStatus = changeTypeStatus;
        dc.changeAll = changeAll;

        loadEntryTypes();

        function changeAll(types, visible){
            types.forEach(function(type){
                //changeTypeStatus(type, visible);
                User.changeVisibility(type, dc.user, visible);
            });
        }

        function changeTypeStatus(type, visible, $event){
            // if the alt key is pressed while clicking, do the task for everything but this one, and make this one
            // visible
            if($event.altKey){
                // check if there are visible types except the current one, and if so, hide all the hidden ones. If not,
                // show all the other ones
                var areThereVisibleTypes = $filter('filter')(dc.entryTypes, function(filterType){
                    return filterType !== type && !filterType.hidden;
                }).length>0;
                dc.entryTypes.forEach(function(loopType){
                    if(type !== loopType){
                        User.changeVisibility(loopType, dc.user, !areThereVisibleTypes);
                    }
                });
                User.changeVisibility(type, dc.user, true);
            }else{
                User.changeVisibility(type, dc.user, visible);
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