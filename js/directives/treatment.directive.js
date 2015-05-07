/* jshint -W040 */
(function () {
    "use strict";

    angular
        .module('achilles')
        .directive('treatment', treatment);
    //.directive('treatmentEntry', treatmentEntry)

    treatment.$inject = ['$timeout'];
    function treatment($timeout) {
        var directive = {
            scope: {
                treatment: '=',
                treatments: '=treatmentlist',
                editable: '@',
                user: '='
            },
            restrict: 'E',
            controller: TreatmentController,
            controllerAs: 'dc',
            templateUrl: '../js/templates/treatment.tpl.html',
            link: link
        };

        return directive;

        function link(scope, element, attrs, ctrl) {
            var promise;

            scope.treatment.editable = scope.editable;

            element.on('keydown', function (e) {
                //console.log(e.which);
                //F9
                if (e.which == 120) {
                    if(ctrl.permissionToEdit){
                        element.find('.type-select input').select2('open');
                    }
                }
                if (e.which == 121) {
                    ctrl.testModal();
                }
            });

            element.on('focusin', function () {
                $timeout(function () {
                    scope.treatment.focused = true;
                    scope.editable = true;
                    scope.treatment.editable = true;
                });

                //scope.$apply();
                $timeout.cancel(promise);
            });
            element.on('focusout', function () {
                promise = $timeout(function () {
                    scope.treatment.focused = false;
                }, 300);
            });
            // Prevent the element losing focus when the select2 is opened. Technically it DOES lose focus,
            // but in the actual use case the select2 still counts as belonging to the treatment
            element.on('select2-open', function () {
                scope.select2Open = true;
            });
            element.on('select2-blur', function () {
                scope.select2Open = false;
            });
        }
    }

    TreatmentController.$inject = ['$scope', '$http', '$modal', 'urls', 'EntryType', 'TreatmentPermission', 'User',
        'Treatment', 'Subject', 'Document', 'LaboratoryReport', 'Biometric', 'DisabilityCertificate'];
    function TreatmentController($scope, $http, $modal, urls, EntryType, TreatmentPermission, User, Treatment, Subject, Document, LaboratoryReport, Biometric, DisabilityCertificate) {
        var dc = this,
            treatmentId = $scope.treatment.id;

        dc.newEntry = {
            type: null
        };

        EntryType.all()
            .then(function (types) {
                dc.types = types;
            });
        Subject.all()
            .then(function (subjects) {
                dc.subjects = subjects;
            });

        dc.loadDocuments = loadDocuments;
        dc.loadLaboratoryReports = loadLaboratoryReports;
        dc.loadBiometrics = loadBiometrics;
        dc.loadDisability = loadDisability;
        dc.addEntry = Treatment.addEntry;

        dc.baseUrl = urls.baseUrl();


        dc.addTreatment = Treatment.addTreatment;
        dc.copyTreatment = Treatment.copyTreatment;
        dc.deleteTreatment = Treatment.deleteTreatment;
        dc.changeStatus = Treatment.changeStatus;
        dc.changeSubject = Treatment.changeSubject;
        dc.removeCase = removeCase;

        dc.warning = {};
        dc.permissionToEdit = false;

        User.get().then(function (user) {
            dc.warning = TreatmentPermission.shouldBeWarned(user, $scope.treatment);
            dc.permissionToEdit = TreatmentPermission.checkEditPermission(user, $scope.treatment);
        });

        dc.removeEntry = function (entry) {
            var entries = $scope.treatment.entries;
            for (var i = 0; i < entries.length; i++) {
                if (entry.type.id == entries[i].type.id) {
                    entries.splice(i, 1);
                    break;
                }
            }
        };

        dc.testModal = function () {
            var modalInstance = $modal.open({
                templateUrl: '../js/templates/preset-modal.tpl.html',
                controller: 'PresetModalController',
                controllerAs: 'mc',
                size: 'lg'
            });
        };

        function loadDocuments(open) {
            //only load the documents if the dropdown was opened, and the documents were not already loaded before
            if (open && !dc.documents) {
                Document.list(treatmentId)
                    .then(function (documents) {
                        dc.documents = documents;
                    }, function (error) {
                        //TODO: remove after testing
                        console.error(error.statusText);
                        dc.documents = [
                        ];
                    });
            }
        }

        function loadLaboratoryReports(open) {
            //only load the lab reports if the dropdown was opened, and the lab reports were not already loaded before
            if (open && !dc.laboratoryReports) {
                LaboratoryReport.list(treatmentId)
                    .then(function (laboratoryReports) {
                        dc.laboratoryReports = laboratoryReports;
                    }, function () {
                        //dc.laboratoryReports = [];
                    });

            }
        }

        function loadBiometrics(open) {
            //only load the biometrics if the dropdown was opened, and the biometrics were not already loaded before
            if (open && !dc.biometrics) {
                Biometric.list(treatmentId)
                    .then(function (biometrics) {
                        dc.biometrics = biometrics;
                    }, function () {
                        //TODO: handle this case

                    });

            }
        }

        function loadDisability(open) {
            //only load the disability if the dropdown was opened, and the disability were not already loaded before
            if (open && !dc.disabilityCertificates) {
                DisabilityCertificate.list(treatmentId)
                    .then(function (disabilityCertificates) {
                        dc.disabilityCertificates = disabilityCertificates;
                    }, function () {
                        //TODO: handle this case
                    });

            }
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