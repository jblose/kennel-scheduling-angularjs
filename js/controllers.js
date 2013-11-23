'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('ScheduleCtrl', [function() {

    }])
    .controller('ClientManCtrl', ['$scope','$http','$routeParams', function($scope,$http,$routeParams) {
        $scope.action = $routeParams.action.toString().toLowerCase();

        $scope.formData = {};
        $scope.clientList = {};

        $scope.clientIdFetch = function() {
            $http({
                    method: 'GET',
                    url: 'api/index.php/clientidfetch'
                }
            ).success( function(data) {
                    $scope.formData.clientid = data.clientid;
                    console.log('Success: '.concat(data));
                })
                .error( function(data) {
                    console.log('Failed: '.concat(data));
                })
        }

        $scope.saveClient = function() {
            $http({
                    method: 'POST',
                    url: 'api/index.php/clientinsert',
                    data: $scope.formData
                }
            ).success( function(data) {
                    console.log('Success: '.concat(data));
                    $scope.action = "view";
                    $scope.processAction();
                })
                .error( function(data) {
                    console.log('Failed: '.concat(data));
                })
        }

        $scope.clientSearchFx = function() {
            console.log('1');
            $http({
                    method: 'GET',
                    url: 'api/index.php/clientsearch/'.concat($scope.clientSearchParameter)
                }
            ).success( function(data) {
                    console.log('2');
                    $scope.clientList = data;
                    console.log('Success: '.concat(data));
                    $scope.clientResults = true;
                })
                .error( function(data) {
                    console.log('3');
                    console.log('Failed: '.concat(data));
                })
        }

        //TODO: implement selectClient

        $scope.processAction = function () {
            if ($scope.action.localeCompare('new') == 0){
                $scope.clientIdFetch();
                $scope.clientNew = true;
                $scope.clientSearch = false;
                $scope.clientResults = false;
                $scope.clientView = false;
            }
            else if ($scope.action.localeCompare('search') == 0){
                $scope.clientNew = false;
                $scope.clientSearch = true;
                $scope.clientResults = false;
                $scope.clientView = false;
            }
            else if ($scope.action.localeCompare('view') == 0){
                $scope.clientNew = false;
                $scope.clientSearch = false;
                $scope.clientResults = false;
                $scope.clientView = true;
            }
            /*
            else if ($scope.action.localeCompare('select') == 0){
                $scope.clientNew = false;
                $scope.clientSearch = false;
                $scope.clientResults = true;
                $scope.clientView = false;
            }
            */
        }

        $scope.processAction();
    }
    ])
    .controller('DogManCtrl', [function() {

    }])
    .controller('ReservationCtrl', [function() {

    }]);