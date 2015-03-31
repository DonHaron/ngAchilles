(function () {
    "use strict";

    angular
        .module('achilles')
        .factory('urls', urls)

    function urls(){
        var protocol = "http://";
        var baseUrl = "localhost";
        var port = "37114";
        var routes = {
            treatmentlist: 'patient/:patient/treatmentlist',
            treatmententry: 'treatmententry',
            treatmententrytype: 'treatmententrytype',
            treatment: 'treatment'
        };

        var factory = {
            treatmentList: treatmentList,
            treatmentEntryTypeList: treatmentEntryTypeList,
            treatmentEntry: treatmentEntry,
            treatment: treatment
        };

        return factory;

        function baseUrlComponent(){
            return protocol+baseUrl+':'+port+'/';
        }

        function treatmentList(patientId){
            return baseUrlComponent()+routes.treatmentlist.replace(/:([a-z]\w*)/gi, patientId)+'/';
        }

        function treatmentEntryTypeList(){
            return baseUrlComponent()+routes.treatmententrytype+'/';
        }

        function treatmentEntry(){
            return baseUrlComponent()+routes.treatmententry+'/';
        }

        function treatment(){
            return baseUrlComponent()+routes.treatment+'/';
        }
    }
})();