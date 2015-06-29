(function () {
    "use strict";

    angular
        .module('achilles')
        .filter('title', title);

    function title() {
        return filter;

        function filter(treatments, title) {
            if (!angular.isDefined(title)) {
                return treatments;
            }

            var filtered;

            filtered = treatments.filter(function (treatment) {
                return treatment.entries.filter(function (entry) {
                    return entry.type.id === title.id;
                }).length > 0;
            });

            return filtered;
        }
    }
})();