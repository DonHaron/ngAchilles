(function () {
    "use strict";

    angular
        .module('achilles')
        .directive('textBlockWidget', textBlockWidget);

    function textBlockWidget() {
        var directive = {
            restrict: 'E',
            controller: TextBlockWidgetController,
            controllerAs: 'dc',
            scope: {
            },
            templateUrl: '../js/templates/textblock-widget.tpl.html'
        };

        return directive;
    }

    TextBlockWidgetController.$inject = ['$filter', 'CurrentFocus', 'TextBlockWidget', 'TreatmentRow', 'TextBlock'];
    function TextBlockWidgetController($filter, CurrentFocus, TextBlockWidget, TreatmentRow, TextBlock) {
        var dc = this;
        var blocks;

        dc.insertSelection = insertSelection;
        dc.isVisible = TextBlockWidget.isVisible;
        dc.showWidget = TextBlockWidget.show;

        // when the type changes in the TextBlockWidget service, the filter gets updated to only display the entries
        // with the chosen type
        // todo: maybe this whole observer business is not the angular way to do it, check out $scope.$watch again if possible
        TextBlockWidget.addObserverCallback(updateType);

        TextBlock.all().then(function (textBlocks) {
            dc.textGroups = blocks = textBlocks;
        });

        function updateType(type){
            if(type){
                dc.textGroups = $filter('filter')(blocks, {treatmentEntryType: type.id});
                dc.selectedGroup = {};
            }
        }

        function insertSelection(selectedText) {
            var text = '';
            if (!angular.isDefined(selectedText)) {
                dc.showWidget(false);
                return;
            }
            if (angular.isArray(selectedText)) {
                text = selectedText.map(function (item) {
                    return item.text;
                }).join(' ');
            } else {
                text = selectedText;
            }
            var column = CurrentFocus.getCurrentlyFocusedColumn(),
                row = CurrentFocus.getCurrentlyFocusedRow(),
                entry = CurrentFocus.getCurrentlyFocusedEntry();
            if (column && entry) {
                column.content += text;
                TreatmentRow.save(row, entry);
            }

            dc.showWidget(false);
        }
    }
})();