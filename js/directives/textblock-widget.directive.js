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

    TextBlockWidgetController.$inject = ['$scope', '$filter', 'CurrentFocus', 'WidgetVisibility', 'TreatmentRow', 'TextBlock'];
    function TextBlockWidgetController($scope, $filter, CurrentFocus, WidgetVisibility, TreatmentRow, TextBlock) {
        var dc = this;
        var blocks;

        dc.insertSelection = insertSelection;
        dc.isVisible = WidgetVisibility.getTextBlockWidgetVisibility;
        dc.showWidget = WidgetVisibility.showTextBlockWidget;

        WidgetVisibility.addTypeObserverCallback(updateType);

        TextBlock.all().then(function (textBlocks) {
            dc.textGroups = blocks = textBlocks;
        });


//        dc.textGroups = [
//            {
//                "name": "Nachtessen",
//                "sortPosition": 3,
//                "complexContent": [
//                    {
//                        "checked": true,
//                        "text": "Hamburger"
//                    },
//                    {
//                        "checked": false,
//                        "text": "Steak"
//                    },
//                    {
//                        "checked": false,
//                        "text": "Pommes Frites"
//                    },
//                    {
//                        "checked": true,
//                        "fixed": true,
//                        "list": [
//                            "Ketchup",
//                            "Mayo"
//                        ]
//                    }
//                ]
//            },
//            {
//                "name": "Mittagessen",
//                "sortPosition": 1,
//                "complexContent": [
//                    {
//                        "checked": true,
//                        "fixed": true,
//                        "text": "Vegetarisch"
//                    },
//                    {
//                        "checked": true,
//                        "fixed": true,
//                        "text": "Salatteller"
//                    },
//                    {
//                        "checked": true,
//                        "fixed": true,
//                        "text": "Buffet"
//                    }
//                ]
//            },
//            {
//                "name": "Morgenessen",
//                "sortPosition": 2,
//                "complexContent": [
//                    {
//                        "checked": true,
//                        "fixed": true,
//                        "text": "Viel"
//                    },
//                    {
//                        "checked": true,
//                        "fixed": true,
//                        "text": "Wenig"
//                    },
//                    {
//                        "checked": true,
//                        "fixed": true,
//                        "text": "Mittelmässig"
//                    }
//                ]
//            },
//            {
//                "name": "Simple text",
//                "sortPosition": 4,
//                "text": "Simple text"
//            }
//        ];

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