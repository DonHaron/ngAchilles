(function () {
    "use strict";

    angular
        .module('achilles')
        .config(ProviderConfig)
        .factory('SpinnerHttpInterceptor', SpinnerHttpInterceptor);

    ProviderConfig.$inject = ['$httpProvider'];
    function ProviderConfig($httpProvider) {
        $httpProvider.interceptors.push('SpinnerHttpInterceptor');

        function spinnerFunction(data, headersGetter, status) {
            if(data == undefined){
                //only do this on non-payload data
                //TODO: find a way to restrict this to only GET-requests
                $('#loading-overlay').css('display', 'flex');
            }
            return data;
        }

        $httpProvider.defaults.transformRequest.push(spinnerFunction);
    }

    SpinnerHttpInterceptor.$inject = ['$q', '$timeout'];
    function SpinnerHttpInterceptor($q, $timeout) {
        var SpinnerHttpInterceptor = {
            'response': function (response) {
                //do this with a delay, otherwise it just flashes too quickly if the request is too quick
                $timeout(function () {
                    $('#loading-overlay').css('display', 'none');
                }, 150);
                return response;
            },
            'responseError': function (response) {
                //do this with a delay, otherweise it just flashes too quickly if the request is too quick
                $timeout(function () {
                    $('#loading-overlay').css('display', 'none');
                }, 150);
                return $q.reject(response);
            }
        }

        return SpinnerHttpInterceptor;
    }
})();