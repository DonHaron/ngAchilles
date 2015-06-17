(function(){
    "use strict";

    angular
        .module('achilles')
        .config(httpHeader);

    httpHeader.$inject = ['$httpProvider'];
    function httpHeader($httpProvider){
        $httpProvider.defaults.headers.common['Achilles-Session'] = achillesConfig.process;
    }
})();