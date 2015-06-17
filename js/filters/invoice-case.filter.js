(function(){
    "use strict";

    angular
        .module('achilles')
        .filter('invoiceCase', invoiceCase);

    function invoiceCase(){
        return filter;

        function filter(treatments, invoiceCase){
            if(!angular.isDefined(invoiceCase)){
                return treatments
            }

            var filtered = [];

            treatments.forEach(function(treatment){
                if(treatment.invoiceCase.id == invoiceCase.id){
                    filtered.push(treatment);
                }
            });

            return filtered;
        }
    }
})();