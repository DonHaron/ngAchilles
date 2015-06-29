(function () {
    "use strict";

    angular
        .module('achilles')
        .factory('urls', urls);

    function urls() {
        var protocol = "http://";
        //var baseUrl = "localhost";
        var baseUrl = achillesConfig.baseUrl;
        var port = achillesConfig.port;
        var routes = {
            biometricList: 'treatment/:treatment/biometriclist',
            biometricReport: 'biometricreport',
            caseList: 'treatment/:treatment/caselist',
            cases: 'patient/:patient/invoiceCase',
            catalogEntries: 'catalog/treatmententryrow/:row/col/:column/term/:term',
            catalogRow: 'catalog/treatmententryrow/:row',
            copyTreatment: 'treatment/copy',
            createPreset: 'preset/create',
            deletePreset: 'delete/preset',
            disabilityList: 'treatment/:treatment/disabilitylist',
            documentList: 'treatment/:treatment/documentlist',
            laboratoryList: 'treatment/:treatment/laboratorylist',
            laboratoryReport: 'laboratoryreport',
            removeCase: 'treatment/:treatment/case/:case',
            renamePreset: 'preset/rename',
            replacePreset: 'preset/replace',
            treatment: 'treatment',
            treatmententry: 'treatmententry',
            treatmententryrow: 'treatmententryrow',
            treatmententrytype: 'treatmententrytype',
            treatmentpreset: 'put/treatmentpreset',
            treatmentlist: 'patient/:patient/treatmentlist',
            treatmentReport: 'treatmentreport',
            treatmentsubject: 'treatmentsubject',
            gdtList: 'gdt/list',
            executeGDT: 'gdt/:device/patient/:patient',
            executeGDTTest: 'gdt/:device/patient/:patient/code/:test',
            lock: 'treatmententryrow/lock/:row',
            user: 'user',
            textblock: 'textblock',
            presetList: 'treatmentpreset'
        };

        var service = {
            baseUrl: baseUrlComponent,
            biometricList: biometricList,
            biometricReport: biometricReport,
            caseList: caseList,
            cases: cases,
            catalogEntries: catalogEntries,
            catalogRow: catalogRow,
            copyTreatment: copyTreatment,
            createPreset: createPreset,
            deletePreset: deletePreset,
            disabilityList: disabilityList,
            documentList: documentList,
            laboratoryList: laboratoryList,
            laboratoryReport: laboratoryReport,
            removeCase: removeCase,
            renamePreset: renamePreset,
            replacePreset: replacePreset,
            treatmentEntryTypeList: treatmentEntryTypeList,
            treatmentEntry: treatmentEntry,
            treatmentEntryRow: treatmentEntryRow,
            treatmentPreset: treatmentPreset,
            treatmentList: treatmentList,
            treatmentSubject: treatmentSubject,
            treatment: treatment,
            treatmentReport: treatmentReport,
            gdtList: gdtList,
            executeGDT: executeGDT,
            lock: lock,
            user: user,
            textblock: textblock,
            presetList: presetList
        };

        return service;

        function baseUrlComponent() {
            return protocol + baseUrl + ':' + port + '/';
        }

        function caseList(treatmentId) {
            return baseUrlComponent() + routes.caseList.replace(/:([a-z]\w*)/gi, treatmentId) + '/';
        }

        function cases(patient){
            return baseUrlComponent() + routes.cases.replace(/:patient/, patient) + '/';
        }

        function catalogEntries(term, row, column){
            return baseUrlComponent() + routes.catalogEntries
                .replace(/:term/, term)
                .replace(/:row/, row.id)
                .replace(/:column/, column.id) + (term > '' ? '/' : '');
        }

        function catalogRow(row){
            return baseUrlComponent() + routes.catalogRow
                .replace(/:row/, row.id) + '/';
        }

        function createPreset(){
            return baseUrlComponent() + routes.createPreset + '/';
        }

        function deletePreset(){
            return baseUrlComponent() + routes.deletePreset + '/';
        }

        function lock(row, verb){
            var verbComponent = '';
            if (verb) {
                verbComponent = verb + '/';
            }
            return baseUrlComponent() + verbComponent + routes.lock
                .replace(/:row/, row.id) + '/';
        }

        function executeGDT(device, patient, test){
            return baseUrlComponent() + (test ? routes.executeGDTTest : routes.executeGDT)
                .replace(/:device/, device.id)
                .replace(/:patient/, patient)
                .replace(/:test/, test ? test.code : '') + '/';
        }

        function presetList(){
            return baseUrlComponent() + routes.presetList + '/';
        }

        function renamePreset(){
            return baseUrlComponent() + routes.renamePreset + '/';
        }

        function replacePreset(){
            return baseUrlComponent() + routes.replacePreset + '/';
        }

        function textblock(){
            return baseUrlComponent() + routes.textblock + '/';
        }

        function treatmentList(patientId, arg) {    // arg is either true if all should be shown, or the
                                                    // treatment id from the last treatment shown for the paging
            //return 'http://localhost/ngachilles/json/demo.treatment.json';
            var fromPart = '';
            if(angular.isDefined(arg) && arg !== false){
                if(arg===true){
                    fromPart = '/all';
                }else{
                    fromPart = '/from/' + arg;
                }
            }
            return baseUrlComponent() + routes.treatmentlist.replace(/:([a-z]\w*)/gi, patientId) + fromPart + '/';
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

        function treatmentPreset() {
            return baseUrlComponent() + routes.treatmentpreset + '/';
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

        function gdtList() {
            return baseUrlComponent() + routes.gdtList + '/';
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

        function biometricReport() {
            return baseUrlComponent() + routes.biometricReport + '/';
        }

        function laboratoryReport() {
            return baseUrlComponent() + routes.laboratoryReport + '/';
        }

        function treatmentReport() {
            return baseUrlComponent() + routes.treatmentReport + '/';
        }

        function user(method){
            return baseUrlComponent() + (method ? method + '/' : '') + routes.user  + '/';
        }
    }
})();