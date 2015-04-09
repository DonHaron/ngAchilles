(function () {
    "use strict";

    angular
        .module('achilles')
        .controller('ModalController', ModalController);

    ModalController.$inject = ['$scope', '$modalInstance'];
    function ModalController($scope, $modalInstance){
        $scope.ok = function(){
            $modalInstance.close();
        }

        $scope.cancel = function(){
            $modalInstance.dismiss('canceled');
        }
    }
})();