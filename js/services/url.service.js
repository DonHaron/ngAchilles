(function () {
    "use strict";

    angular
        .module('achilles')
        .factory('urls', urls)

    function urls(){
        var protocol = "http://";
        //var baseUrl = "localhost";
        var baseUrl = "192.168.1.145";
        var port = "37114";
        var routes = {
            treatmentlist: 'patient/:patient/treatmentlist',
            treatmententry: 'treatmententry',
            treatmententryrow: 'treatmententryrow',
            treatmententrytype: 'treatmententrytype',
            treatmentsubject: 'treatmentsubject',
            treatment: 'treatment',
            copyTreatment: 'treatment/copy',
            documentList: 'treatment/:treatment/documentlist',
            laboratoryList: 'treatment/:treatment/laboratorylist',
            biometricList: 'treatment/:treatment/biometriclist',
            disabilityList: 'treatment/:treatment/disabilitylist',
            caseList: 'treatment/:treatment/caselist'
        };

        var factory = {
            treatmentList: treatmentList,
            treatmentEntryTypeList: treatmentEntryTypeList,
            treatmentEntry: treatmentEntry,
            treatmentEntryRow: treatmentEntryRow,
            treatmentSubject: treatmentSubject,
            treatment: treatment,
            copyTreatment: copyTreatment,
            baseUrl: baseUrlComponent,
            documentList: documentList,
            laboratoryList: laboratoryList,
            biometricList: biometricList,
            disabilityList: disabilityList,
            caseList: caseList
        };

        return factory;

        function baseUrlComponent(){
            return protocol+baseUrl+':'+port+'/';
        }

        function treatmentList(patientId){
            //return 'http://localhost/ngachilles/json/demo.treatment.json';
            return baseUrlComponent()+routes.treatmentlist.replace(/:([a-z]\w*)/gi, patientId)+'/';
        }

        function treatmentEntryTypeList(){
            //return 'http://localhost/ngachilles/json/demo.treatmententrytype.json';
            return baseUrlComponent()+routes.treatmententrytype+'/';
        }

        function treatmentEntry(){
            return baseUrlComponent()+routes.treatmententry+'/';
        }

        function treatmentEntryRow(verb){
            var verbComponent = '';
            if(verb){
                verbComponent = verb + '/';
            }
            return baseUrlComponent()+verbComponent+routes.treatmententryrow+'/';
        }

        function treatmentSubject(){
            return baseUrlComponent()+routes.treatmentsubject+'/';
        }

        function treatment(verb){
            var verbComponent = '';
            if(verb){
                verbComponent = verb + '/';
            }
            return baseUrlComponent()+verbComponent+routes.treatment+'/';
        }

        function copyTreatment(){
            return baseUrlComponent()+routes.copyTreatment+'/';
        }

        function documentList(treatmentId){
            return baseUrlComponent()+routes.documentList.replace(/:([a-z]\w*)/gi, treatmentId)+'/';
        }

        function laboratoryList(treatmentId){
            return baseUrlComponent()+routes.laboratoryList.replace(/:([a-z]\w*)/gi, treatmentId)+'/';
        }

        function biometricList(treatmentId){
            return baseUrlComponent()+routes.biometricList.replace(/:([a-z]\w*)/gi, treatmentId)+'/';
        }

        function disabilityList(treatmentId){
            return baseUrlComponent()+routes.disabilityList.replace(/:([a-z]\w*)/gi, treatmentId)+'/';
        }

        function caseList(treatmentId){
            return baseUrlComponent()+routes.caseList.replace(/:([a-z]\w*)/gi, treatmentId)+'/';
        }

    }
})();