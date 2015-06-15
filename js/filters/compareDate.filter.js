(function () {
    "use strict";

    angular
        .module('achilles')
        .filter('compareDate', compareDate);

    function compareDate() {
        return filter;

        function filter(treatments, date, comparator) {
            var filtered = [];
            if (!angular.isDefined(treatments)) {
                return filtered;
            }
            // expect date or string in in format dd.mm.yy or dd.mm.yyyy
            if(!angular.isDate(date) && !/^\d{2}\.\d{2}\.(\d{2}|\d{4})$/.test(date)){
                return treatments;
            }
            if(!angular.isDate(date)){
                var dateArr = date.split('.'),
                    day = dateArr[0],
                    month = dateArr[1],
                    year = dateArr[2];
                
                    date = new Date(year, month-1, day);
            }

            treatments.forEach(function (treatment) {
                    if(
                        comparator == 'after' && treatment.date >= date.getTime() ||
                            comparator == 'before' && treatment.date <= date.getTime()
                        ){
                        filtered.push(treatment);
                    }
            });
            return filtered;
        }
    }
})();