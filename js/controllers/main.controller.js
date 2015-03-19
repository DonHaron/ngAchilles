(function () {
    "use strict";

    angular
        .module('achilles')
        .controller('MainController', MainController);

    MainController.$inject = ['$http', '$scope', '$timeout', '$q'];

    function MainController($http, $scope, $timeout, $q) {
        var vm = this;
        $scope.somethingElse = 0;

        $scope.$on('somethingChanged', function () {
            console.log('event caught', 'something', something);
            $scope.somethingElse++;
        });

        vm.test = function () {
            $http.get('http://date.jsontest.com/');
        }

        vm.waitForResponse = function () {
            watchSomethingElseFor6Seconds().then(
                function () {//success
                    console.log('Yay!');
                },
                function () {//error
                    console.log('Nay...');
                });
        }

        function watchSomethingElseFor6Seconds() {
            var deferred = $q.defer();
            var timeout = false;

            /*$scope.$watch('somethingElse', function (newVal, oldVal) {
                console.log('running $watch');
                if(newVal!=oldVal){
                    console.log('new', newVal, 'old', oldVal);
                    deferred.resolve(newVal);
                }
            });*/

            $timeout(checkSomething, 50);

            $timeout(function () {
                //deferred.reject('Timeout reached.');
                timeout = true;
            }, 6000);

            return deferred.promise;

            function checkSomething(){
                if(timeout){
                   return false;
                }
                if(something>0){
                    deferred.resolve();
                    return true;
                }
                $timeout(checkSomething, 50);
            }
        }
    }
})();