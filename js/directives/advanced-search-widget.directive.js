(function () {
    "use strict";

    angular
        .module('achilles')
        .directive('advancedSearchWidget', advancedSearchWidget);

    function advancedSearchWidget() {
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

    AdvancedSearchWidgetController.$inject = ['$scope', 'AdvancedSearchWidget', 'Subject', 'InvoiceCase', 'Treatment'];
    function AdvancedSearchWidgetController($scope, AdvancedSearchWidget, Subject, InvoiceCase, Treatment) {
        var dc = this;

        dc.clearSearch = clearSearch;
        dc.fromOpened = false;
        dc.isVisible = AdvancedSearchWidget.isVisible;
        dc.openFromDatepicker = openFromDatepicker;
        dc.openToDatepicker = openToDatepicker;
        dc.showWidget = AdvancedSearchWidget.show;
        dc.toOpened = false;
        dc.users = [];

        Subject.all().then(function (subjects) {
            dc.subjects = subjects;
        });

        InvoiceCase.all().then(function (cases) {
            dc.cases = cases;
            console.log(cases);
        });


        /*
         Reduce all the treatments in the list to their user tokens, so the list of tokens can be used in the search
         */
        $scope.$watch(Treatment.all, getUserTokens);

        function clearSearch(search) {
            //console.log('should work');
            angular.copy({}, search);
//            search.text = '';
//            search.attachments = {};
//            delete search.dateFrom;
//            delete search.dateTo;
//            delete search.subject;
//            delete search.case;
        }

        function getUserTokens(treatments) {
            //console.log('changed', treatments);
            if (treatments.length) {
                dc.users = treatments
                    // get the user tokens
                    .map(function (treatment) {
                        return treatment.userToken;
                    })
                    // check for uniqueness
                    .reduce(function (p, c) {
                        if (p.indexOf(c) < 0) {
                            p.push(c);
                        }
                        return p;
                    }, []);
            }
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