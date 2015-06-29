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
        $scope.$watch(Treatment.all, function (treatments) {
            getTitles(treatments);
            getUserTokens(treatments);
        });

        function clearSearch(search) {
            angular.copy({}, search);
        }

        function getTitles(treatments) {
            if (treatments.length) {
                dc.titles = treatments.reduce(function (t, treatment) {
                    //titles.concat(
                    console.log(t);
                    return t.concat(treatment.entries.map(function (entry) {
                        return entry.type;
                    }));
                    //console.log(someArray);
                }, []).reduce(function(p, c){
                    if(indexOfType(c, p)<0){
                        p.push(c);
                    }
                    return p;
                }, []);
            }
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
                    .reduce(makeUnique, []);
            }
        }

        function makeUnique(p, c){
            if (p.indexOf(c) < 0) {
                p.push(c);
            }
            return p;
        }

        function indexOfType(type, types){
            for(var i=0;i<types.length;i++){
                if(type.id === types[i].id){
                    return i;
                }
            }
            return -1;
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