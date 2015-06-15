//this file is not used anymore, but it's a demonstration of how to $broadcast to angular if needed
//here everything is global, for a reason

var something = 0,
    treatment;

    treatment = {
        "id":20259,
        "type":0,
        "date":"1401795000000",
        "subject":"",
        "mandator":2,
        "userToken":"ass",
        "isMandatorTreatment":true,
        "isMainTreatment":true,
        "hasMedication":false,
        "hasLaboratory":false,
        "hasDocument":false,
        "hasDisability":false,
        "hasBiometric":false,
        "hasService":false,
        "closed":false,
        "billed":false,
        "invoiceCase":{
            "name":"Deine Mutter",
            "id":0
        },
        "entries":[
            {
                "treatmentId":20259,
                "type":{
                    "id":149,
                    "name":"Arbeitsunf\u00E4higkeit:"
                },
                "rows":[
                    {
                        "new":false,
                        "id":94441,
                        "lastChange":"1433843222000",
                        "columns":[
                            {
                                "content":"<p>koma asd<\/p>",
                                "type":63,
                                "id":97266,
                                "validation":"none",
                                "position":1,
                                "width":12,
                                "readonly":false,
                                "wysiwyg":false
                            }
                        ]
                    }
                ]
            },
            {
                "treatmentId":20259,
                "type":{
                    "id":171,
                    "name":"Therapie:"
                },
                "rows":[
                    {
                        "new":false,
                        "id":94442,
                        "lastChange":"1433843222000",
                        "columns":[
                            {
                                "content":"666",
                                "type":64,
                                "id":97267,
                                "validation":"none",
                                "position":1,
                                "width":2,
                                "readonly":true,
                                "wysiwyg":false
                            },
                            {
                                "content":"<b>Number of the Beast<\/b>",
                                "type":65,
                                "id":97268,
                                "validation":"none",
                                "position":2,
                                "width":10,
                                "readonly":false,
                                "wysiwyg":false
                            }
                        ]
                    }
                ]
            },
            {
                "treatmentId":20259,
                "type":{
                    "id":168,
                    "name":"Status:"
                },
                "rows":[
                    {
                        "new":false,
                        "id":94443,
                        "lastChange":"1433843222000",
                        "columns":[
                            {
                                "content":"<b>La la la, la la la<\/b>",
                                "type":63,
                                "id":97269,
                                "validation":"none",
                                "position":1,
                                "width":12,
                                "readonly":false,
                                "wysiwyg":false
                            }
                        ]
                    }
                ]
            },
            {
                "treatmentId":20259,
                "type":{
                    "id":143,
                    "name":"Abkl\u00E4rungen:"
                },
                "rows":[
                    {
                        "new":false,
                        "id":95799,
                        "lastChange":"0",
                        "columns":[
                            {
                                "content":"<p>D56\u00A0<\/p>",
                                "type":63,
                                "id":98955,
                                "validation":"none",
                                "position":1,
                                "width":12,
                                "readonly":false,
                                "wysiwyg":false
                            }
                        ]
                    }
                ]
            }
        ]
    };

function callMe(){
    something++;
    //broadcast an event to angular from outside
    angular.element('html').scope().$broadcast('updateTreatment', treatment);
}

function updateTreatment(treatment){
    angular.element('html').scope().$broadcast('updateTreatment', treatment);
}

toastr.options = {
    "positionClass": "toast-top-full-width"
};

//var backupLog = console.log;
//var logMessages = [];
//var logErrors = [];
//
//console.log = function(message){
//    logMessages.push(message);
//};
//
//console.error = function(error){
//    logErrors.push(error);
//};
