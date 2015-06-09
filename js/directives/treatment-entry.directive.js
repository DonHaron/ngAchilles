/* jshint -W040 */
(function () {
    "use strict";

    angular
        .module('achilles')
        .directive('treatmentEntry', treatmentEntry);

    function treatmentEntry() {
        var directive = {
            scope: {
                entry: '=',
                editable: '@',
                treatment: '=',
                permissionToEdit: '&',
                warning: '='
            },
            restrict: 'E',
            templateUrl: '../js/templates/treatment-entry.tpl.html',
            require: '^treatment',
            controller: TreatmentEntryController,
            controllerAs: 'dc',
            link: link
        };

        return directive;

        function link(scope, element, attrs, treatmentCtrl) {

            //scope.removeEntry = treatmentCtrl.removeEntry;

//            function keyup(e){
//
//                //console.log('keyup');
//            }
        }
    }

    TreatmentEntryController.$inject = ['$scope', '$timeout', 'CatalogEntry', 'User', 'TextBlockWidget', 'TreatmentEntry', 'TreatmentRow'];
    function TreatmentEntryController($scope, $timeout, CatalogEntry, User, TextBlockWidget, TreatmentEntry, TreatmentRow) {
        var dc = this;

        var currentLookupPromise;

        dc.chooseCatalogEntry = chooseCatalogEntry;
        dc.isHidden = isHidden;
        dc.lookupCatalogEntries = lookupCatalogEntries;;
        dc.makePristine = makePristine;
        dc.removeRow = TreatmentEntry.removeRow;
        dc.setCatalog = setCatalog;
        dc.setEntryFocus = setEntryFocus;
        dc.showTextBlockWidget = TextBlockWidget.show;

        dc.user = {};
        //dc.catalog = {};
        dc.showCatalog = true;

        setCatalog();
        loadUser();

        function chooseCatalogEntry(catalogEntry, row){
            TreatmentRow.cancelSave();
            console.log('choosing entry');
            CatalogEntry.choose(catalogEntry, row).then(function(newRow){
                console.log('replacing row');
                // using timeout to update scope
                $timeout(function(){
                    TreatmentRow.replace(row, newRow);
                });
            });
            // todo: send the chosen entry to the server and wait for an answer, then replace the current row with the
            //  one from the response
        }

        function isHidden(type){
            return dc.user.hiddenEntryTypes &&
                dc.user.hiddenEntryTypes.indexOf(type.id)>-1;
        }

        function loadUser(){
            User.get(achillesConfig.process).then(function (user) {
                dc.user = user;
            });
        }

        function lookupCatalogEntries(term, row, column){
            $timeout.cancel(currentLookupPromise);

            currentLookupPromise = $timeout(function(){
                console.log('looking up now');
                CatalogEntry.lookup(term, row, column)
                    .then(function(catalogEntries){
                        setCatalog(row, catalogEntries);
                    });
            }, 350);
        }

        function setCatalog(row, entries){
            var catalog = {};
            if(angular.isDefined(row)){
                catalog.id = row.id;
            }
            if(angular.isDefined(entries)){
                catalog.entries = entries;
            }
            dc.catalog = catalog;
        }

        function setEntryFocus(focused) {
            $scope.entry.focused = focused;
        }

        function makePristine() {
            $scope.entryform.$setPristine();
        }

//        function removeRow(row) {
//            var rows = $scope.entry.rows;
//        }
    }
})();