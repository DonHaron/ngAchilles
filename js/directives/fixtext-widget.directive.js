(function () {
    "use strict";

    angular
        .module('achilles')
        .directive('fixtextWidget', fixtextWidget);

    function fixtextWidget() {
        var directive = {
            restrict: 'E',
            controller: FixtextWidgetController,
            controllerAs: 'dc',
            scope: {
            },
            templateUrl: '../js/templates/fixtext-widget.tpl.html'
        };

        return directive;
    }

    FixtextWidgetController.$inject = ['CurrentFocus', 'WidgetVisibility', 'TreatmentRow'];
    function FixtextWidgetController(CurrentFocus, WidgetVisibility, TreatmentRow) {
        var dc = this;

        dc.insertSelection = insertSelection;
        dc.isVisible = WidgetVisibility.getFixtextWidgetVisibility;
        dc.showWidget = WidgetVisibility.showFixtextWidget;

        dc.textGroups = [
            {
                "name": "Nachtessen",
                "sortPosition": 3,
                "complexContent": [
                    {
                        "checked": true,
                        "text": "Hamburger"
                    },
                    {
                        "checked": false,
                        "text": "Steak"
                    },
                    {
                        "checked": false,
                        "text": "Pommes Frites"
                    },
                    {
                        "checked": true,
                        "fixed": true,
                        "list": [
                            "Ketchup",
                            "Mayo"
                        ]
                    }
                ]
            },
            {
                "name": "Mittagessen",
                "sortPosition": 1,
                "complexContent": [
                    {
                        "checked": true,
                        "fixed": true,
                        "text": "Vegetarisch"
                    },
                    {
                        "checked": true,
                        "fixed": true,
                        "text": "Salatteller"
                    },
                    {
                        "checked": true,
                        "fixed": true,
                        "text": "Buffet"
                    }
                ]
            },
            {
                "name": "Morgenessen",
                "sortPosition": 2,
                "complexContent": [
                    {
                        "checked": true,
                        "fixed": true,
                        "text": "Viel"
                    },
                    {
                        "checked": true,
                        "fixed": true,
                        "text": "Wenig"
                    },
                    {
                        "checked": true,
                        "fixed": true,
                        "text": "Mittelmässig"
                    }
                ]
            },
            {
                "name": "Simple text",
                "sortPosition": 4,
                "text": "Simple text"
            }
        ];

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