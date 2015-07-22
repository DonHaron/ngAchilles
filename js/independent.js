//this file is not used anymore, but it's a demonstration of how to $broadcast to angular if needed
//here everything is global, for a reason

var something = 0,
    treatment;

    treatment = {};
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


//var log = console.log;
//function onPaste(e){
//    var text, url;
//
//    console.log('paste');
//    if(e === undefined){
//        return;
//    }
//    if (e.clipboardData) {
//        console.log('event.clipboardData');
//        if (e.clipboardData.types) {
//            console.log('event.clipboardData.types');
//
//            // Look for a types property that is undefined
//            if (!isArray(e.clipboardData.types)) {
//                console.log('event.clipboardData.types is undefined');
//            }
//
//            // Loop the data store in type and display it
//            var i = 0;
//            while (i < e.clipboardData.types.length) {
//                var key = e.clipboardData.types[i];
//                var val = e.clipboardData.getData(key);
//                alert((i + 1) + ': ' + key + ' - ' + val);
//                i++;
//            }
//
//        } else {
//            // Look for access to data if types array is missing
//            text = e.clipboardData.getData('text/plain');
//            url = e.clipboardData.getData('text/uri-list');
//            var html = e.clipboardData.getData('text/html');
//            alert('text/plain - ' + text);
//            if (url !== undefined) {
//                alert('text/uri-list - ' + url);
//            }
//            if (html !== undefined) {
//                alert('text/html - ' + html);
//            }
//        }
//    }
//
//    // IE event is attached to the window object
//    if (window.clipboardData) {
//        console.log('window.clipboardData');
//        // The schema is fixed
//        text = window.clipboardData.getData('Text');
//        url = window.clipboardData.getData('URL');
//        console.log('Text - ' + text);
//        if (url !== null) {
//            console.log('URL - ' + url);
//        }
//    }
//
//
//}
//
//function isArray(obj) {
//    return obj && !(obj.propertyIsEnumerable('length')) &&
//        typeof obj === 'object' && typeof obj.length === 'number';
//}