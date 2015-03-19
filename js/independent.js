//here everything is global, for a reason

var something = 0;

function callMe(){
    something++;
    //broadcast an event to angular from outside
    angular.element('html').scope().$broadcast('somethingChanged');
}