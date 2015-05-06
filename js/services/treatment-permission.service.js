(function(){
    "use strict";

    angular
        .module('achilles')
        .factory('TreatmentPermission', TreatmentPermission);

    function TreatmentPermission(){
        var now = Date.now();

        var service = {
            checkEditPermission: checkEditPermission,
            shouldBeWarned: shouldBeWarned
        };

        return service;

        function checkEditPermission(user, treatment){
            // if user is forbidden to edit treatments outside of a given time frame and the mode is not on 'warn', this will return false
            return (user.permission.modifyRange.mode=='warn' || (now - user.permission.modifyRange.pastDays*24*60*60*1000 < treatment.date &&
                now + user.permission.modifyRange.futureDays*24*60*60*1000 > treatment.date)) &&
                (
                    // user is not a mandator, and the treatment is not a mandator treatment
                    (!treatment.isMandatorTreatment && !user.isMandator) ||
                    // user can edit mandator treatments, and is the owner of the treatment, or is not a mandator
                        (user.permission.editMandatorEntry && (!user.isMandator || treatment.mandator == user.mandator.id))
                    );
        }

        function shouldBeWarned(user, treatment){
            if(!checkEditPermission(user, treatment)){
                if(!user.permission.editMandatorEntry){
                    return {
                        displayed: false,
                        message: 'Sie verfügen nicht über die notwendigen Benutzerrechte um diese Aktion auszuführen'
                    };
                }else if(treatment.mandator != user.mandator.id){
                    return {
                        displayed: false,
                        message: 'Nur der verantwortliche Mandant darf den Text ändern'
                    };
                }
            } else if (user.permission.modifyRange.mode=='warn' && (now - user.permission.modifyRange.pastDays*24*60*60*1000 > treatment.date ||
                now + user.permission.modifyRange.futureDays*24*60*60*1000 < treatment.date)){
                return {
                    displayed: false,
                    message: 'Behandlungseintrag liegt ausserhalb des änderbaren Bereichs'
                };
            }else{
                return false;
            }
        }
    }
})();