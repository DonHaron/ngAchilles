/* jshint -W040 */
(function () {
    "use strict";

    angular
        .module('achilles')
        .directive('treatment', treatment);

    treatment.$inject = ['$timeout', 'Treatment'];
    function treatment($timeout, Treatment) {
        var directive = {
            scope: {
                treatment: '=',
                treatments: '=treatmentlist',
                editable: '@',
                user: '=',
                index: '@'
            },
            restrict: 'E',
            controller: TreatmentController,
            controllerAs: 'dc',
            templateUrl: '../js/treatment/treatment.tpl.html',
            link: link
        };

        return directive;

        function link(scope, element, attrs, ctrl) {
            var promise;

            scope.treatment.editable = scope.editable;

            scope.$watch(function () {
                return element.find('treatment').position();
            }, function (position) {
                if (angular.isDefined(position)) {
                    console.log(position);
                }
            });

            element.on('focusin', function () {
                $timeout(function () {
                    scope.treatment.focused = true;
                    scope.editable = true;
                    scope.treatment.editable = true;
                    Treatment.setCurrent(scope.treatment);
                });

                //scope.$apply();
                $timeout.cancel(promise);
            });
            element.on('focusout', function () {
                promise = $timeout(function () {
                    scope.treatment.focused = false;
                    //scope.editable = false;
                    //scope.treatment.editable = false;
                }, 300);
            });
        }
    }

    TreatmentController.$inject = ['$scope', 'urls', 'EntryType', 'TreatmentPermission', 'User',
        'Treatment', 'Subject', 'Document', 'LaboratoryReport', 'Biometric', 'DisabilityCertificate',
        'Preset', 'CreatePresetWidget', 'ReplacePresetWidget'];
    function TreatmentController($scope, urls, EntryType, TreatmentPermission, User, Treatment, Subject, Document, LaboratoryReport, Biometric, DisabilityCertificate, Preset, CreatePresetWidget, ReplacePresetWidget) {
        var dc = this,
            treatmentId = $scope.treatment.id;

        dc.newEntry = {
            type: null
        };

        //dc.addEntry = addEntry;
        //dc.addPreset = Treatment.addPreset;
        dc.createPreset = createPreset;
        dc.loadDocuments = loadDocuments;
        dc.loadLaboratoryReports = loadLaboratoryReports;
        dc.loadBiometrics = loadBiometrics;
        dc.loadDisability = loadDisability;
        dc.replacePreset = replacePreset;

        dc.baseUrl = urls.baseUrl();


        dc.addTreatment = Treatment.addTreatment;
        dc.copyTreatment = Treatment.copyTreatment;
        dc.deleteTreatment = Treatment.deleteTreatment;
        dc.changeStatus = Treatment.changeStatus;
        dc.changeSubject = Treatment.changeSubject;
        dc.removeCase = Treatment.removeCase;

        dc.warning = {};
        dc.permissionToEdit = false;

        dc.removeEntry = Treatment.removeEntry;

        Subject.all()
            .then(function (subjects) {
                dc.subjects = subjects;
            });


        $scope.$watch(Preset.hasUpdated, function (newVal) {
            if (newVal === true) {
                // reload all presets
                Preset.all()
                    .then(function (presets) {
                        dc.presets = presets;
                        Preset.setUpdated(false);
                    });
            }
        });


        User.get().then(function (user) {
            dc.warning = TreatmentPermission.shouldBeWarned(user, $scope.treatment);
            dc.permissionToEdit = TreatmentPermission.checkEditPermission(user, $scope.treatment);
        });


        function createPreset(treatment) {
            CreatePresetWidget.getName().then(function (name) {
                Preset.create(treatment, name);
            });
        }

        function replacePreset(treatment) {
            ReplacePresetWidget.selectPreset().then(function (preset) {
                Preset.replace(treatment, preset);
            });
        }

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

//
//        function removeCase(treatment) {
//            var oldCase = treatment.invoiceCase;
//            treatment.invoiceCase = {id: 0, name: ''};
//            $http.post(urls.treatment('put'), treatment)
//                .then(function (response) {
//                    treatment.invoiceCase = response.data.invoiceCase;
//                }, function () {
//                    treatment.invoiceCase = oldCase;
//                });
//        }
    }


})();