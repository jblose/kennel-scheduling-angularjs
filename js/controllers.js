'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('ScheduleCtrl', [function() {

    }])
    .controller('ClientManCtrl', ['$scope','$http','$routeParams', function($scope,$http,$routeParams) {
        $scope.action = $routeParams.action.toString().toLowerCase();

        $scope.formData = {};
        $scope.dogFormData = {};
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
            $http({
                    method: 'GET',
                    url: 'api/index.php/clientsearch/'.concat($scope.clientSearchParameter)
                }
            ).success( function(data) {
                    $scope.clientList = data;
                    console.log('Succes: '.concat(data));
                    $scope.clientResults = true;
                })
                .error( function(data) {
                    console.log('Failed: '.concat(data));
                })
        }

        $scope.selectClient = function(clientId) {
            console.log(clientId);
            $http({
                    method: 'GET',
                    url: 'api/index.php/clientselect/'.concat(clientId)
                }
            ).success( function(data) {
                    $scope.clientSelected = data;
                    $scope.formData.first_name = data.first_name;
                    $scope.formData.last_name = data.last_name;
                    $scope.formData.phone = data.phone;
                    $scope.formData.email = data.email;
                    $scope.formData.media_reception = data.media_reception;
                    $scope.formData.emergency_name = data.emergency_name;
                    $scope.formData.emergency_phone = data.emergency_phone;
                    $scope.action = 'view';
                    $scope.processAction();
                    console.log('Success: '.concat(data));
                })
                .error( function(data) {
                    console.log('Failed: '.concat(data));
                })
            $http({
                    method: 'GET',
                    url: 'api/index.php/clientdogs/'.concat(clientId)
                }
            ).success( function(data) {
                    $scope.clientDogs = data;
                    console.log('Success: '.concat(data));
                })
                .error( function(data) {
                    console.log('Failed: '.concat(data));
                })
        }

        $scope.dogIdFetch = function() {
            $http({
                    method: 'GET',
                    url: 'api/index.php/dogidfetch'
                }
            ).success( function(data) {
                    $scope.dogFormData.dogid = data.dogid;
                    console.log('Success: '.concat(data));
                })
                .error( function(data) {
                    console.log('Failed: '.concat(data));
                })
        }

        //TODO: BUG Fix Spayed setting to 0 and not meaningful value.
        $scope.saveDog = function () {
            $http({
                    method: 'POST',
                    url: 'api/index.php/doginsert',
                    data: $scope.dogFormData
                }
            ).success( function(data) {
                    console.log('Success: inserted dog '.concat(data));
                })
                .error( function(data) {
                    console.log('Failed: '.concat(data));
                });
            //TODO: BUG Fix issue with customer assignment here.
            $http({
                    method: 'POST',
                    url: 'api/index.php/clientdogassign?clientid='.concat($scope.clientid).concat('&dogid=').concat($scope.dogid)
                }
            ).success( function (data) {
                    console.log('Success: assigned dog: '.concat(data));
                }
            ).error( function (data) {
                    console.log('Failed: '.concat(data));
                });

            $http({
                    method: 'GET',
                    url: 'api/index.php/clientdogs/'.concat(clientId)
                }
            ).success( function(data) {
                    $scope.clientDogs = data;
                    console.log('Success: '.concat(data));
                })
                .error( function(data) {
                    console.log('Failed: '.concat(data));
                });
        }

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