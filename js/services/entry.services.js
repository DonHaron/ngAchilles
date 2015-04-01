(function () {
    "use strict";

    angular
        .module('achilles')
        .factory('getEntryTypes', getEntryTypes);

    getEntryTypes.$inject = ['$http', 'urls'];
    function getEntryTypes($http, urls) {
        var entryTypes = [];

        $http.get(urls.treatmentEntryTypeList())
            .then(function (response) {
                entryTypes = response.data;
                /*
                 * this is ugly, but need to do this with an open issue in the angular-select2 lib
                 * https://github.com/rubenv/angular-select2/issues/15
                 * TODO: change once the issue is resolved
                 * */
                for (var i = 0; i < entryTypes.length; i++) {
                    entryTypes[i].toString = function () {
                        return this.id;
                    }
                }
            });

        return function(){
            return entryTypes;
        };
    }
})();