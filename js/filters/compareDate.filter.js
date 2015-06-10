(function () {
    "use strict";

    angular
        .module('achilles')
        .filter('compareDate', compareDate);

    function compareDate() {
        return function (treatments, date, comparator) {
            var filtered = [];
            if (!angular.isDefined(treatments)) {
                return filtered;
            }
            // expect date in format dd.mm.yy or dd.mm.yyyy
            if(!/^\d{2}\.\d{2}\.(\d{2}|\d{4})$/.test(date)){
                return treatments;
            }
            var dateArr = date.split('.'),
                day = dateArr[0],
                month = dateArr[1],
                year = dateArr[2],
                dateObj = new Date(year, month-1, day);

            treatments.forEach(function (treatment) {
                    if(
                        comparator == 'after' && treatment.date >= dateObj.getTime() ||
                            comparator == 'before' && treatment.date <= dateObj.getTime()
                        ){
                        filtered.push(treatment);
                    }
            });
            return filtered;
        };
    }
})();