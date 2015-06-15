(function(){
    "use strict";

    angular
        .module('achilles')
        .directive('advancedSearchWidget', advancedSearchWidget);

    function advancedSearchWidget(){
        var directive = {
            controller: AdvancedSearchWidgetController,
            controllerAs: 'dc',
            restrict: 'E',
            scope: {
                search: '='
            },
            templateUrl: '../js/templates/advanced-search-widget.tpl.html'
        };

        return directive;
    }

    AdvancedSearchWidgetController.$inject = ['AdvancedSearchWidget'];
    function AdvancedSearchWidgetController(AdvancedSearchWidget){
        var dc = this;

        dc.clearSearch = clearSearch;
        dc.fromOpened = false;
        dc.isVisible = AdvancedSearchWidget.isVisible;
        dc.openFromDatepicker = openFromDatepicker;
        dc.openToDatepicker = openToDatepicker;
        dc.showWidget = AdvancedSearchWidget.show;
        dc.toOpened = false;

        function clearSearch(search){
            search.text = '';
            search.attachments = {};
            delete search.dateFrom;
            delete search.dateTo;
        }

        function openFromDatepicker($event) {
            $event.preventDefault();
            $event.stopPropagation();

            dc.fromOpened = true;
        }

        function openToDatepicker($event) {
            $event.preventDefault();
            $event.stopPropagation();

            dc.toOpened = true;
        }
    }
})();