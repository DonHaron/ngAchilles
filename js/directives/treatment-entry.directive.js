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

    TreatmentEntryController.$inject = ['$scope', 'CatalogEntry', 'User', 'TextBlockWidget', 'TreatmentEntry'];
    function TreatmentEntryController($scope, CatalogEntry, User, TextBlockWidget, TreatmentEntry) {
        var dc = this;

        dc.isHidden = isHidden;
        dc.lookupCatalogEntries = CatalogEntry.lookup;
        dc.makePristine = makePristine;
        dc.removeRow = TreatmentEntry.removeRow;
        dc.setEntryFocus = setEntryFocus;
        dc.showTextBlockWidget = TextBlockWidget.show;

        dc.user = {};

        loadUser();

        function isHidden(type){
            return dc.user.hiddenEntryTypes &&
                dc.user.hiddenEntryTypes.indexOf(type.id)>-1;
        }

        function loadUser(){
            User.get(achillesConfig.process).then(function (user) {
                dc.user = user;
            });
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