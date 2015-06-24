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
        var service = {
            'response': function (response) {
                //do this with a delay, otherwise it just flashes too quickly if the request is too quick
                if (response.config.spinner) {
                    console.timeEnd('request');
                    $('#loading-overlay').hide();
                }
                return response;
            },
            'responseError': function (response) {
                //do this with a delay, otherweise it just flashes too quickly if the request is too quick
                if (response.config.spinner) {
                    $('#loading-overlay').hide();
                }
                return $q.reject(response);
            },
            'request': function (config) {
                if (config.method == 'GET' && config.spinner) {
                    console.time('request');
                    $('#loading-overlay').show();
                }
                return config;
            }
        };

        return service;
    }
})();