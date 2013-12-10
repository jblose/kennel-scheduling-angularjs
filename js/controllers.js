'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('ScheduleCtrl', [function() {
        $scope.hasResults = false;

        $scope.availKennels = function () {
            $http({
                    method: 'GET',
                    url: 'api/index.php/availkennels'
                }
            ).success( function(data) {
                    $scope.avk = data;
                    $scope.hasResults = true;
                })
                .error( function(data) {
                    console.log('Error: '.concat(data));
                })
        }
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
                })
                .error( function(data) {
                    console.log('Error: '.concat(data));
                })
        }

        $scope.saveClient = function() {
            $http({
                    method: 'POST',
                    url: 'api/index.php/clientinsert',
                    data: $scope.formData
                }
            ).success( function(data) {
                    $scope.action = "view";
                    $scope.processAction();
                })
                .error( function(data) {
                    console.log('Error: '.concat(data));
                })
        }

        $scope.clientSearchFx = function() {
            $http({
                    method: 'GET',
                    url: 'api/index.php/clientsearch/'.concat($scope.clientSearchParameter)
                }
            ).success( function(data) {
                    $scope.clientList = data;
                    $scope.clientResults = true;
                })
                .error( function(data) {
                    console.log('Error: '.concat(data));
                })
        }

        $scope.selectClient = function(clientId) {
            $http({
                    method: 'GET',
                    url: 'api/index.php/clientselect/'.concat(clientId)
                }
            ).success( function(data) {
                    $scope.clientSelected = data;
                    $scope.formData.clientid = $scope.clientSelected.id;
                    $scope.formData.first_name = data.first_name;
                    $scope.formData.last_name = data.last_name;
                    $scope.formData.phone = data.phone;
                    $scope.formData.email = data.email;
                    $scope.formData.media_reception = data.media_reception;
                    $scope.formData.emergency_name = data.emergency_name;
                    $scope.formData.emergency_phone = data.emergency_phone;
                    $scope.action = 'view';
                    $scope.processAction();
                })
                .error( function(data) {
                    console.log('Error: '.concat(data));
                })
            $http({
                    method: 'GET',
                    url: 'api/index.php/clientdogs/'.concat(clientId)
                }
            ).success( function(data) {
                    $scope.clientDogs = data;
                })
                .error( function(data) {
                    console.log('Error: '.concat(data));
                })
        }

        $scope.dogIdFetch = function() {
            $http({
                    method: 'GET',
                    url: 'api/index.php/dogidfetch'
                }
            ).success( function(data) {
                    $scope.dogFormData.dogid = data.dogid;
                })
                .error( function(data) {
                    console.log('Error: '.concat(data));
                });
        }

        $scope.saveDog = function () {
            $http({
                    method: 'POST',
                    url: 'api/index.php/doginsert',
                    data: $scope.dogFormData
                }
            ).success( function(data) {
                    $http({
                            method: 'POST',
                            url: 'api/index.php/clientdogassign/'.concat($scope.formData.clientid).concat('/').concat($scope.dogFormData.dogid)
                        }
                    ).success( function (data) {
                            $http({
                                    method: 'GET',
                                    url: 'api/index.php/clientdogs/'.concat($scope.formData.clientid)
                                }
                            ).success( function(data) {
                                    $scope.clientDogs = data;
                                    $scope.dogFormData = {};
                                })
                                .error( function(data) {
                                    console.log('Error: '.concat(data));
                                });
                        }
                    ).error( function (data) {
                            console.log('Error: '.concat(data));
                        });
                }).error( function(data) {
                    console.log('Error: '.concat(data));
                });
        };

        $scope.removeDog = function(idx,dogid) {
            $scope.clientDogs.splice(idx,1);

            $http({
                    method: 'POST',
                    url: 'api/index.php/removedog/'.concat($scope.formData.clientid).concat('/').concat(dogid)
                }
            ).success( function (data) {
                    $http({
                            method: 'GET',
                            url: 'api/index.php/clientdogs/'.concat($scope.formData.clientid)
                        }
                    ).success( function(data) {
                            $scope.clientDogs = data;
                        })
                        .error( function(data) {
                            console.log('Error: '.concat(data));
                        });

                    console.log('Success Removal!');
                }
            ).error( function (data) {
                    console.log('Error: '.concat(data));
                }
            );
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

    .controller('ReservationCtrl', ['$scope','$http','$routeParams','$location', function($scope,$http,$routeParams,$location) {
        $scope.hasResults = false;
        $scope.makeReservation = false;
        $scope.clientName = {};
        $scope.kennelname = {};

        $scope.availKennels = function () {
            $http({
                    method: 'GET',
                    url: 'api/index.php/availkennels'
                }
            ).success( function(data) {
                    $scope.avk = data;
                    $scope.hasResults = true;
                    $scope.makeReservation = true;

                    $http({
                        method: 'GET',
                        url: 'api/index.php/fetchclients'
                    })
                        .success( function(data) {
                            $scope.clientList = data;
                        })
                        .error( function(data) {
                            console.log('Error: '.concat(data));
                        })
                })
                .error( function(data) {
                    console.log('Error: '.concat(data));
                })
        }

        $scope.clientAdd = function () {
            $location.path('#/clientman/new');
        };

        $scope.loadDogs = function () {
            $http({
                method: 'GET',
                url: 'api/index.php/fetchclientdog/'.concat($scope.clientName.id)
            })
                .success( function(data) {
                    $scope.dogList = data;
                })
                .error( function(data) {
                    console.log('Error: '.concat(data));
                })
        };
    }]);