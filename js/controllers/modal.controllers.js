(function () {
    "use strict";

    angular
        .module('achilles')
        .controller('DeleteModalController', DeleteModalController);

    DeleteModalController.$inject = ['$scope', '$modalInstance'];
    function DeleteModalController($scope, $modalInstance){
        $scope.ok = function(){
            $modalInstance.close();
        };

        $scope.cancel = function(){
            $modalInstance.dismiss('canceled');
        };
    }
})();