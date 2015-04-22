(function () {
    "use strict";

    angular
        .module('achilles')
        .service('Treatment', Treatment);


    Treatment.$inject = ['$http', '$modal', 'urls'];
    function Treatment($http, $modal, urls) {
        var Treatment = {
            addTreatment: addTreatment,
            copyTreatment: copyTreatment,
            deleteTreatment: deleteTreatment,
            changeStatus: changeStatus,
            changeSubject: changeSubject
        };

        return Treatment;

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
    }
})();