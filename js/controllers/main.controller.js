(function () {
    "use strict";

    angular
        .module('achilles')
        .controller('MainController', MainController);

    MainController.$inject = ['$http'];

    function MainController($http) {
        var vm = this;
        vm.entries = [];
        vm.entryTypes = [
            {
                id: 1,
                name: 'Diagnose',

            },
            {
                id: 2,
                name: 'Behandlung',
            },
            {
                id: 3,
                name: 'Lokalbefund',
            },
        ];

        for(var i=0;i<vm.entryTypes.length;i++){
            vm.entryTypes[i].toString = function(){ return this.id; }
        }

        vm.addAttribute = function(entry){
            entry.attributes.push({
                content: '',
                new: true
            });
        }

        vm.loadEntries = function () {
            vm.entries = [
                {
                    date: '2015-03-19 14:21',
                    user: 'bha',
                    case: '???',
                    attributes: [
                        {
                            type: {
                                id: 123,
                                name: 'Diagnose'
                            }, //id of the type
                            columns: [
                                {
                                    width: 10,
                                    content: 'Hypochonder',
                                    readonly: false,
                                    wysiwyg: false,
                                    validation: 'numeric'
                                },
                                {
                                    width: 2,
                                    content: 'asdf',
                                    readonly: true,
                                    wysiwyg: false,
                                    validation: 'numeric'
                                }
                            ]
                        },
                        {
                            name: 'Objektiv',
                            content: '',
                            columns: [
                                {
                                    width: 2,
                                    content: '2',
                                    readonly: false,
                                    wysiwyg: false,
                                    validation: 'numeric'
                                },
                                {
                                    width: 4,
                                    content: '4',
                                    readonly: false,
                                    wysiwyg: false,
                                    validation: 'numeric'
                                },
                                {
                                    width: 6,
                                    content: '6',
                                    readonly: false,
                                    wysiwyg: false,
                                    validation: 'numeric'
                                }
                            ]
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

        vm.loadEntries();

    }
})();