(function () {
    "use strict";

    angular
        .module('achilles')
        .config(ProviderConfig)
        .factory('SpinnerHttpInterceptor', SpinnerHttpInterceptor);

    ProviderConfig.$inject = ['$httpProvider'];
    function ProviderConfig($httpProvider) {
        $httpProvider.interceptors.push('SpinnerHttpInterceptor');
    }

    SpinnerHttpInterceptor.$inject = ['$q', '$timeout'];
    function SpinnerHttpInterceptor($q, $timeout) {
        var SpinnerHttpInterceptor = {
            'response': function (response) {
                //do this with a delay, otherwise it just flashes too quickly if the request is too quick
                if(response.config.spinner){
                    $timeout(function () {
                        $('#loading-overlay').css('display', 'none');
                    }, 150);
                }
                return response;
            },
            'responseError': function (response) {
                //do this with a delay, otherweise it just flashes too quickly if the request is too quick
                if(response.config.spinner){
                    $timeout(function () {
                        $('#loading-overlay').css('display', 'none');
                    }, 150);
                }
                return $q.reject(response);
            },
            'request': function(config){
                if(config.method == 'GET' && config.spinner){
                    $('#loading-overlay').css('display', 'block');
                }
                return config;
            }
        }

        return SpinnerHttpInterceptor;
    }
})();