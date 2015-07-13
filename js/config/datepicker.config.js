(function(){
    "use strict";

    angular
        .module('achilles')
        .config(datepickerConfigFn);

    datepickerConfigFn.$inject = ['datepickerConfig', 'datepickerPopupConfig'];
    function datepickerConfigFn(datepickerConfig, datepickerPopupConfig){
        datepickerConfig.startingDay = 1;

        datepickerPopupConfig.currentText = "Heute";
    }
})();