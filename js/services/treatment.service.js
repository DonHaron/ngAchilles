(function () {
    "use strict";

    angular
        .module('achilles')
        .factory('Treatment', Treatment);


    Treatment.$inject = ['$http', '$modal', 'urls', 'User'];
    function Treatment($http, $modal, urls, User) {
        var service = {
            addTreatment: addTreatment,
            copyTreatment: copyTreatment,
            deleteTreatment: deleteTreatment,
            changeStatus: changeStatus,
            changeSubject: changeSubject,
            addEntry: addEntry,
            removeCase: removeCase
        };

        return service;

        // add an entry to a treatment, and add it to the list of entries or replace
        // the existing one with the same type id
        function addEntry(treatmentId, type, entries) {
            //entry: {treatmentId: <id>, type: <type object>}
            $http.post(urls.treatmentEntry(), {
                treatmentId: treatmentId,
                type: type
            }).then(function (response) {
                var entry = response.data,
                    replaced = false;
                for (var i = 0; i < entries.length; i++) {
                    if (entry.type.id == entries[i].type.id) {
                        entries[i] = entry;
                        replaced = true;
                        break;
                    }
                }
                if (!replaced) {
                    entries.push(entry);
                }
                // if the entry type is hidden, change that, to see the newly added entry type
                User.get().then(function(user){
                    if(user.hiddenEntryTypes && user.hiddenEntryTypes.indexOf(entry.type.id)>-1){
                        User.changeVisibility(type, user);
                    }
                });
            });
        }

        function addTreatment(treatment, isMandatorTreatment, isMainTreatment, treatments) {
            var date = new Date();
            $http.post(urls.treatment(), {
                patient: achillesConfig.patient,
                process: achillesConfig.process,
                treatment: {
                    id: treatment.id,
                    isMandatorTreatment: isMandatorTreatment,
                    isMainTreatment: isMainTreatment
                }
            }).then(function (response) {
                treatments.push(response.data);
            });
        }

        function copyTreatment(treatment, treatments) {
            $http.post(urls.copyTreatment(), {
                process: achillesConfig.process,
                treatment: {
                    id: treatment.id
                }
            }).then(function (response) {
                treatments.push(response.data);
            });
        }

        function deleteTreatment(treatment, treatments) {
            var modalInstance = $modal.open({
                templateUrl: '../js/templates/delete-modal.tpl.html',
                controller: 'DeleteModalController',
                controllerAs: 'mc',
                size: 'sm'
            });

            modalInstance.result.then(function () {
                $http.post(urls.treatment('delete'), treatment).then(function (response) {
                    for (var i = 0; i < treatments.length; i++) {
                        if (treatments[i].id == treatment.id) {
                            treatments.splice(i, 1);
                            break;
                        }
                    }
                });
            });
        }

        function changeStatus(treatment) {
            treatment.closed = !treatment.closed;
            $http.post(urls.treatment('put'), treatment).then(function (response) {
                treatment.closed = response.data.closed;
                console.log('treatment status changed');
            }, function (error) {
                //did not work, reverse again
                treatment.closed = !treatment.closed;
            });
        }

        function changeSubject(treatment, subject) {
            var oldSubject = treatment.subject;
            treatment.subject = subject;
            $http.post(urls.treatment('put'), treatment).then(function (response) {
                treatment.subject = response.data.subject;
            }, function (error) {
                treatment.subject = oldSubject;
            });
        }

        function removeCase(treatment) {
            var oldCase = treatment.invoiceCase;
            treatment.invoiceCase = {id: 0, name: ''};
            $http.post(urls.treatment('put'), treatment)
                .then(function (response) {
                    treatment.invoiceCase = response.data.invoiceCase;
                }, function () {
                    treatment.invoiceCase = oldCase;
                });
        }
    }
})();