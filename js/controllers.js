'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('ScheduleCtrl', [function() {

    }])
    .controller('ClientManCtrl', ['$scope','$http','$routeParams', function($scope,$http,$routeParams) {
        $scope.action = $routeParams.action.toString().toLowerCase();

        $scope.formData = {};
        $scope.saveClient =  function() {
            $http({
                    method: 'POST',
                    url: 'api/index.php/clientinsert',
                    data: $scope.formData
                }
            ).success( function(data) {
                    console.log('Success: '.concat(data));
                })
                .error( function(data) {
                    console.log('Failed: '.concat(data));
                })
        }
    }])
    .controller('DogManCtrl', [function() {

    }])
    .controller('ReservationCtrl', [function() {

    }]);