(function () {
    "use strict";

    angular
        .module('achilles')
        .controller('DeleteModalController', DeleteModalController)
        .controller('PresetModalController', PresetModalController);

    DeleteModalController.$inject = ['$scope', '$modalInstance'];
    function DeleteModalController($scope, $modalInstance){
        $scope.ok = function(){
            $modalInstance.close();
        };

        $scope.cancel = function(){
            $modalInstance.dismiss('canceled');
        };
    }

    PresetModalController.$inject = ['$scope', '$modalInstance'];
    function PresetModalController($scope, $modalInstance){
        $scope.presets = [
            {
                id: 1,
                name: 'SOAP'
            },
            {
                id: 2,
                name: 'Gynäkologische Untersuchung'
            },
            {
                id: 3,
                name: 'Vermicelles'
            },
            {
                id: 4,
                name: 'Schoggischuum'
            }
        ];

        $scope.close = function(preset){
            $modalInstance.close(preset);
        };
    }
})();