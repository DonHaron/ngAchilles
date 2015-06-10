(function(){
    "use strict";

    angular
        .module('achilles')
        .factory('GDT', GDT);

    GDT.$inject = ['$http', 'urls'];
    function GDT($http, urls){
        var service = {
            execute: execute,
            load: load
        };

        return service;

        function execute(device, patient, test) {
            $http.post(urls.executeGDT(device, patient, test))
                .then(function () {
                    console.log('that worked');
                })
                .catch(function () {
                    console.log("that didn't");
                });
        }

        function load(directiveController) {
            $http.get(urls.gdtList())
                .then(function (response) {
                    directiveController.gdtDevices = response.data;
                });
        }
    }
})();