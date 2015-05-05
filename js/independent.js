//this file is not used anymore, but it's a demonstration of how to $broadcast to angular if needed
//here everything is global, for a reason

var something = 0;

function callMe(){
    something++;
    //broadcast an event to angular from outside
    angular.element('html').scope().$broadcast('somethingChanged');
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
