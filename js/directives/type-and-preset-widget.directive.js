(function () {
    "use strict";

    angular
        .module('achilles')
        .directive('typeAndPresetWidget', typeAndPresetWidget);

    typeAndPresetWidget.$inject = ['$timeout', 'Treatment'];
    function typeAndPresetWidget($timeout, Treatment) {
        var directive = {
            templateUrl: '../js/templates/type-and-preset-widget.tpl.html',
            restrict: 'E',
            require: '^main',
            link: link,
            scope: {},
            controller: TypeAndPresetController,
            controllerAs: 'vm'
        };

        return directive;

        function link(scope, element, attrs, main) {
            element.on('blur', setInactive);
            element.on('focusin', setActive);
            element.on('focusout', hide);
            //element.on('keydown', focusSearch);

            element.find('.type-and-preset-search').on('blur', setInactive);
            element.find('.type-and-preset-search').on('keyup', setListFocus);

            scope.$watch(Treatment.getCurrent, function(treatment){
                if(angular.isDefined(treatment)){
                    element.find('.inactive').removeClass('inactive');
                }
            });

            function hide(){
                $timeout(function(){
                    main.temporarilyShowTypeAndPresetWidget = false;
                }, 350);
            }

            function setActive() {
                //console.log('focusin');
                $timeout(function () {
                    scope.active = true;
                });
                //scope.$apply();
            }

            function setInactive() {
                //console.log('blurred');
                $timeout(function () {
                    scope.active = false;
                }, 150);
                //scope.$apply();
            }

            function setListFocus(e) {
                //console.log(e.which);
                var focused = element.find('a.list-group-item.focused');

                if (e.which == 8 || e.which > 40) { // backspace or character key
                    $timeout(function () {
                        focused.removeClass('focused');
                        if (angular.isDefined(scope.search) && scope.search.term > '') {
                            focusFirstItem();
                        }
                    }, 50);
                } else if (e.which == 40) { // cursor down
                    e.preventDefault();
                    if (focused.length) {
                        var next = focused.nextAll('a.list-group-item:visible').first();
                        focused.removeClass('focused');
                        next.addClass('focused');
                        scrollToElement(next);
                    } else {
                        focusFirstItem();
                    }
                } else if (e.which == 38) { // cursor up
                    e.preventDefault();

                    if (focused.length) {
                        var prev = focused.prevAll('a.list-group-item:visible').first();
                        focused.removeClass('focused');
                        prev.addClass('focused');
                        scrollToElement(prev);
                    } else {
                        focusLastItem();
                    }
                } else if (e.which == 13) { // enter
                    focused.click();
                } else if (e.keyCode == 27) { // Escape
                    setInactive();
                }

                function focusFirstItem() {
                    element.find('a.list-group-item:visible').first().addClass('focused');
                }

                function focusLastItem() {
                    element.find('a.list-group-item:visible').last().addClass('focused');
                }

                function scrollToElement(el) {
                    var listGroup = element.find('.list-group');
                    var newPosition = listGroup.scrollTop() + el.position().top - (listGroup.height() - 50);
                    listGroup.animate({
                        scrollTop: newPosition
                    }, 0);
                }

            }
        }
    }


    TypeAndPresetController.$inject = ['EntryType', 'Preset', 'Treatment'];
    function TypeAndPresetController(EntryType, Preset, Treatment) {
        var vm = this;

        vm.addEntry = addEntry;
        vm.addPreset = addPreset;

        EntryType.all()
            .then(function (types) {
                vm.types = types;
            });
        Preset.all()
            .then(function (presets) {
                vm.presets = presets;
            });

        function addEntry(type) {
            var currentTreatment = Treatment.getCurrent();
            if (!angular.isDefined(currentTreatment)) {
                return;
            }
            Treatment.addEntry(currentTreatment.id, type, currentTreatment.entries)
                .then(function () {

                });
        }

        function addPreset(preset) {
            var currentTreatment = Treatment.getCurrent();
            if (!angular.isDefined(currentTreatment)) {
                return;
            }
            var treatments = Treatment.all();
            Treatment.addPreset(currentTreatment.id, preset, treatments);
        }

    }
})();