(function () {
    "use strict";

    angular
        .module('achilles')
        .controller('MainController', MainController);

    MainController.$inject = ['$http'];

    function MainController($http) {
        var vm = this;
        vm.entries = [];

        vm.loadEntries = function () {
            vm.entries = [
                {
                    date: '2015-03-19 14:21',
                    user: 'bha',
                    case: '???',
                    attributes: [
                        {
                            name: 'Subjektiv',
                            content: ''
                        },
                        {
                            name: 'Objektiv',
                            content: ''
                        },
                        {
                            name: 'Lokalbefund',
                            content: ''
                        },
                        {
                            name: 'Beurteilung/Diag',
                            content: ''
                        },
                        {
                            name: 'Procedere',
                            content: ''
                        }
                    ]
                },
                {
                    date: '2015-03-19 14:20',
                    user: 'bha',
                    case: '???',
                    type: 'success',
                    attributes: [
                        {
                            name: 'Subjektiv',
                            content: ''
                        },
                        {
                            name: 'Objektiv',
                            content: ''
                        },
                        {
                            name: 'Beurteilung/Diag',
                            content: ''
                        },
                        {
                            name: 'Procedere',
                            content: ''
                        }
                    ]
                }
                ,
                {
                    date: '2013-08-06 09:06',
                    user: 'afr',
                    case: 'Krankheit',
                    attributes: [
                        {
                            name: 'Subjektiv',
                            content: ''
                        },
                        {
                            name: 'Objektiv',
                            content: ''
                        },
                        {
                            name: 'Beurteilung/Diag',
                            content: ''
                        },
                        {
                            name: 'Procedere',
                            content: ''
                        }
                    ]
                }
            ];
        }

    }
})();