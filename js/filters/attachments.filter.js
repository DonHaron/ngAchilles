(function(){
    "use strict";

    angular
        .module('achilles')
        .filter('attachments', attachments);

    function attachments(){
        return filter;

        function filter(treatments, attachments){
            var filtered = [];

            if(!angular.isDefined(attachments)){
                return treatments;
            }

            treatments.forEach(function(treatment){
                var matches = true;
                // check each requirement from the search and exclude the non-matching treatments
                if(attachments.medication === true && !treatment.hasMedication){
                    matches = false;
                }
                if(attachments.laboratory === true && !treatment.hasLaboratory){
                    matches = false;
                }
                if(attachments.service === true && !treatment.hasService){
                    matches = false;
                }
                if(attachments.disability === true && !treatment.hasDisability){
                    matches = false;
                }
                if(attachments.biometric === true && !treatment.hasBiometric){
                    matches = false;
                }
                if(attachments.document === true && !treatment.hasDocument){
                    matches = false;
                }

                // if all requirements were matched, add this treatment to the filtered list
                if(matches){
                    filtered.push(treatment);
                }
            });

            return filtered;
        }
    }
})();