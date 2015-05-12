(function(){
    "use strict";

    angular
        .module('achilles')
        .directive('titleSettingsWidget', titleSettingsWidget);

    titleSettingsWidget.$inject = ['$timeout'];
    function titleSettingsWidget(){
        var directive = {
            restrict: 'E',
            controller: TitleSettingsWidgetController,
            controllerAs: 'dc',
            link: link,
            scope: {
                showWidget: '='
            },
            templateUrl: '../js/templates/title-settings-widget.tpl.html'
        };

        return directive;

        function link(scope, element, attrs){
            attrs.$observe('show', function() {
                console.log('changed', attrs.show);
                scope.showWidget = scope.$eval(attrs.show);
            });
        }
    }

    TitleSettingsWidgetController.$inject = ['$filter', 'EntryType', 'User', 'WidgetVisibility'];
    function TitleSettingsWidgetController($filter, EntryType, User, WidgetVisibility){
        var dc = this;
        dc.changeTypeStatus = changeTypeStatus;
        dc.changeAll = changeAll;
        dc.isVisible = WidgetVisibility.getTitleSettingsWidgetVisibility;
        dc.showWidget = WidgetVisibility.showTitleSettingsWidget;

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