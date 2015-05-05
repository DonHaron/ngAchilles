(function(){
    "use strict";

    angular
        .module('achilles')
        .factory('TreatmentPermission', TreatmentPermission);

    function TreatmentPermission(){
        var now = Date.now();

        var TreatmentPermission = {
            checkEditPermission: checkEditPermission,
            shouldBeWarned: shouldBeWarned
        };

        return TreatmentPermission;

        function checkEditPermission(user, treatment){
            // if user is forbidden to edit treatments outside of a given time frame and the mode is not on 'warn', this will return false
            return (user.permission.modifyRange.mode=='warn' || (now - user.permission.modifyRange.pastDays*24*60*60*1000 < treatment.date
                && now + user.permission.modifyRange.futureDays*24*60*60*1000 > treatment.date)) &&
                (
                    // user is not a mandator, and the treatment is not a mandator treatment
                    (!treatment.isMandatorTreatment && !user.isMandator)
                    // user can edit mandator treatments, and is the owner of the treatment, or is not a mandator
                        || (user.permission.editMandatorEntry && (!user.isMandator || treatment.mandator == user.mandator.id))
                    );
        }

        function shouldBeWarned(user, treatment){
            return (user.permission.modifyRange.mode=='warn' && (now - user.permission.modifyRange.pastDays*24*60*60*1000 > treatment.date
                || now + user.permission.modifyRange.futureDays*24*60*60*1000 < treatment.date))
        }
    }
})();