(function () {
    "use strict";

    angular
        .module('achilles')
        .factory('urls', urls)

    function urls() {
        var protocol = "http://";
        //var baseUrl = "localhost";
        var baseUrl = "192.168.1.145";
        var port = "37120";
        var routes = {
            biometricList: 'treatment/:treatment/biometriclist',
            biometricReport: 'biometricreport/process/:process',
            caseList: 'treatment/:treatment/caselist',
            copyTreatment: 'treatment/copy',
            disabilityList: 'treatment/:treatment/disabilitylist',
            documentList: 'treatment/:treatment/documentlist',
            laboratoryList: 'treatment/:treatment/laboratorylist',
            laboratoryReport: 'laboratoryreport/process/:process',
            removeCase: 'treatment/:treatment/case/:case',
            treatmententry: 'treatmententry',
            treatmententryrow: 'treatmententryrow',
            treatmententrytype: 'treatmententrytype',
            treatmentlist: 'patient/:patient/treatmentlist',
            treatmentReport: 'treatmentreport/process/:process',
            treatmentsubject: 'treatmentsubject',
            treatment: 'treatment'
        };

        var factory = {
            baseUrl: baseUrlComponent,
            biometricList: biometricList,
            biometricReport: biometricReport,
            caseList: caseList,
            copyTreatment: copyTreatment,
            disabilityList: disabilityList,
            documentList: documentList,
            laboratoryList: laboratoryList,
            laboratoryReport: laboratoryReport,
            removeCase: removeCase,
            treatmentEntryTypeList: treatmentEntryTypeList,
            treatmentEntry: treatmentEntry,
            treatmentEntryRow: treatmentEntryRow,
            treatmentList: treatmentList,
            treatmentSubject: treatmentSubject,
            treatment: treatment,
            treatmentReport: treatmentReport
        };

        return factory;

        function baseUrlComponent() {
            return protocol + baseUrl + ':' + port + '/';
        }

        function caseList(treatmentId) {
            return baseUrlComponent() + routes.caseList.replace(/:([a-z]\w*)/gi, treatmentId) + '/';
        }

        function treatmentList(patientId) {
            //return 'http://localhost/ngachilles/json/demo.treatment.json';
            return baseUrlComponent() + routes.treatmentlist.replace(/:([a-z]\w*)/gi, patientId) + '/';
        }

        function treatmentEntryTypeList() {
            //return 'http://localhost/ngachilles/json/demo.treatmententrytype.json';
            return baseUrlComponent() + routes.treatmententrytype + '/';
        }

        function treatmentEntry() {
            return baseUrlComponent() + routes.treatmententry + '/';
        }

        function treatmentEntryRow(verb) {
            var verbComponent = '';
            if (verb) {
                verbComponent = verb + '/';
            }
            return baseUrlComponent() + verbComponent + routes.treatmententryrow + '/';
        }

        function treatmentSubject() {
            return baseUrlComponent() + routes.treatmentsubject + '/';
        }

        function treatment(verb) {
            var verbComponent = '';
            if (verb) {
                verbComponent = verb + '/';
            }
            return baseUrlComponent() + verbComponent + routes.treatment + '/';
        }

        function copyTreatment() {
            return baseUrlComponent() + routes.copyTreatment + '/';
        }

        function documentList(treatmentId) {
            return baseUrlComponent() + routes.documentList.replace(/:([a-z]\w*)/gi, treatmentId) + '/';
        }

        function laboratoryList(treatmentId) {
            return baseUrlComponent() + routes.laboratoryList.replace(/:([a-z]\w*)/gi, treatmentId) + '/';
        }

        function biometricList(treatmentId) {
            return baseUrlComponent() + routes.biometricList.replace(/:([a-z]\w*)/gi, treatmentId) + '/';
        }

        function disabilityList(treatmentId) {
            return baseUrlComponent() + routes.disabilityList.replace(/:([a-z]\w*)/gi, treatmentId) + '/';
        }

        function removeCase(treatment) {
            return baseUrlComponent() + routes.removeCase
                .replace(/:treatment/gi, treatment.id)
                .replace(/:case/gi, treatment.invoiceCase.id) + '/';
        }

        function biometricReport(process) {
            return baseUrlComponent() + routes.biometricReport
                .replace(/:process/gi, process)
        }

        function laboratoryReport(process) {
            return baseUrlComponent() + routes.laboratoryReport
                .replace(/:process/gi, process)
        }

        function treatmentReport(process) {
            return baseUrlComponent() + routes.treatmentReport
                .replace(/:process/gi, process)
        }
    }
})();