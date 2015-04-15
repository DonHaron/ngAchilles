(function(){
    "use strict";

    angular
        .module('achilles')
        .config(ProviderConfig)
        .factory('SpinnerHttpInterceptor', SpinnerHttpInterceptor);

    ProviderConfig.$inject = ['$httpProvider'];
    function ProviderConfig($httpProvider){
        $httpProvider.responseInterceptors.push('SpinnerHttpInterceptor');

        function spinnerFunction(data, headersGetter){
            $('#loading-overlay').css('display', 'flex');
            return data;
        }

        $httpProvider.defaults.transformRequest.push(spinnerFunction);
    }

    SpinnerHttpInterceptor.$inject = ['$q', '$window'];
    function SpinnerHttpInterceptor($q, $window){
        function SpinnerHttpInterceptor(promise) {
            return promise.then(function(response){
                $('#loading-overlay').css('display', 'none');
                return response;
            }, function(response){
                $('#loading-overlay').css('display', 'none');
                return $q.reject(response);
            });
        }

        return SpinnerHttpInterceptor;
    }
})();