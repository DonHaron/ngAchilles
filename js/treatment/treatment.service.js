(function () {
    "use strict";

    angular
        .module('achilles')
        .factory('Treatment', Treatment);


    Treatment.$inject = ['$http', '$q', '$modal', 'urls', 'User'];
    function Treatment($http, $q, $modal, urls, User) {
        var next,
            allCount = 0,
            nextCaption = '',
            treatments = [];

        var service = {
            addEntry: addEntry,
            addPreset: addPreset,
            addTreatment: addTreatment,
            all: all,
            copyTreatment: copyTreatment,
            changeStatus: changeStatus,
            changeSubject: changeSubject,
            count: count,
            deleteTreatment: deleteTreatment,
            getNextCaption: getNextCaption,
            load: load,
            loadNext: loadNext,
            openReport: openReport,
            removeCase: removeCase,
            removeEntry: removeEntry,
            update: update
        };

        return service;

        // add an entry to a treatment, and add it to the list of entries or replace
        // the existing one with the same type id
        function addEntry(treatmentId, type, entries) {
            //entry: {treatmentId: <id>, type: <type object>}
            return $http.post(urls.treatmentEntry(), {
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
                User.get().then(function (user) {
                    if (user.hiddenEntryTypes && user.hiddenEntryTypes.indexOf(entry.type.id) > -1) {
                        User.changeVisibility(type, user);
                    }
                });
            });
        }

        // add a preset to the current treatment, and replace the treatment
        function addPreset(treatmentId, preset, treatments) {
            //entry: {treatmentId: <id>, type: <type object>}
            $http.post(urls.treatmentPreset(), {
                treatmentId: treatmentId,
                preset: preset
            }).then(function (response) {
                var treatment = response.data;
                for (var i = 0; i < treatments.length; i++) {
                    if (treatments[i].id == treatmentId) {
                        treatments[i] = treatment;
                        break;
                    }
                }
            });
        }

        function addTreatment(treatment, isMandatorTreatment, isMainTreatment, treatments) {
            $http.post(urls.treatment(), {
                patient: achillesConfig.patient,
                //process: achillesConfig.process,
                treatment: {
                    id: treatment.id,
                    isMandatorTreatment: isMandatorTreatment,
                    isMainTreatment: isMainTreatment
                }
            }).then(function (response) {
                treatments.push(response.data);
                allCount++;
            });
        }

        function all(){
            return treatments;
        }

        function copyTreatment(treatment, treatments) {
            $http.post(urls.copyTreatment(), {
                //process: achillesConfig.process,
                treatment: {
                    id: treatment.id
                }
            }).then(function (response) {
                treatments.push(response.data);
                allCount++;
            });
        }

        function count(){
            return allCount;
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
                            allCount--;
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

        function getNextCaption(){
            return nextCaption;
        }

        function load(all) {
            console.time('load');
            return $http
                .get(urls.treatmentList(achillesConfig.patient, all), {
                    spinner: true
                })
                .then(function (response) {
                    next = response.data.urlnext;
                    nextCaption = response.data.buttonCaption;
                    allCount = response.data.count;
                    treatments = response.data.treatments;
                    console.timeEnd('load');
                    return treatments;
                });
        }

        function loadNext(){
            console.time('loadNext');

            if(!angular.isDefined(next)){
                var deferred = $q.defer();
                deferred.reject();
                nextCaption = '';
                return deferred.promise;
            }
            return $http.get(urls.baseUrl() + next,{
                spinner: true
            })
                .then(function(response){
                    next = response.data.urlnext;
                    nextCaption = response.data.buttonCaption;
                    allCount = response.data.count;
                    treatments = treatments.concat(response.data.treatments);
                    console.timeEnd('loadNext');
                    return treatments;
                });
        }

        function openReport(treatments) {
            var payload = [];
            treatments.forEach(function (treatment) {
                //console.log(treatment);
                var payloadEntry = {
                    id: treatment.id,
                    rows: []
                };
                // add each row's id of every entry to the current payload entry
                treatment.entries.forEach(function (entry) {
                    entry.rows.forEach(function (row) {
                        payloadEntry.rows.push(row.id);
                    });
                });
                payload.push(payloadEntry);
            });
            $http.post(urls.treatmentReport(), payload);
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

        function removeEntry(entry, entries) {
            //var entries = $scope.treatment.entries;
            for (var i = 0; i < entries.length; i++) {
                if (entry.type.id == entries[i].type.id) {
                    entries.splice(i, 1);
                    break;
                }
            }
        }

        function update(treatment, treatments) {
            for (var i = 0; i < treatments.length; i++) {
                if (treatment.id == treatments[i].id) {
                    treatments[i] = treatment;
                    return;
                }
            }
            treatments.push(treatment);
        }
    }
})();