'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('ScheduleCtrl', ['$scope','$http', function($scope,$http) {
    }])

    .controller('ClientManCtrl', ['$scope','$http','$routeParams', function($scope,$http,$routeParams) {
        $scope.action = $routeParams.action.toString().toLowerCase();

        $scope.formData = {};
        $scope.dogFormData = {};
        $scope.modalDogFormData = {};        $scope.modalDogFormData = {};
        $scope.clientList = {};
        $scope.value_edit = '';

        $scope.editFirstName = false;


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
                    $scope.formData.boarding_agreement = data.boarding_agreement;
                    $scope.action = 'view';
                    $scope.clientList = {};
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
        };

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

        $scope.saveModalDog = function () {
            $http({
                    method: 'POST',
                    url: 'api/index.php/updatedog',
                    data: $scope.modalDogFormData
                }
            ).success( function(data) {
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

                }).error( function(data) {
                    console.log('Error: '.concat(data));
                });
        };

        $scope.viewEditDog = function(dogid){
            $http({
                method: 'GET',
                url: 'api/index.php/fetchdog/'.concat(dogid)
            }).success( function(data){
                    $scope.caughtDog = data;
                    $scope.modalDogFormData.id = $scope.caughtDog[0].id;
                    $scope.modalDogFormData.name = $scope.caughtDog[0].name;
                    $scope.modalDogFormData.breed = $scope.caughtDog[0].breed;
                    $scope.modalDogFormData.age = $scope.caughtDog[0].age;
                    $scope.modalDogFormData.sex = $scope.caughtDog[0].sex;
                    $scope.modalDogFormData.color = $scope.caughtDog[0].color;
                    $scope.modalDogFormData.spayed_neutered = $scope.caughtDog[0].spayed_neutered;
                    $scope.modalDogFormData.behavior = $scope.caughtDog[0].behavior;
                    $scope.modalDogFormData.existing_health_conditions = $scope.caughtDog[0].existing_health_conditions;
                    $scope.modalDogFormData.allergies = $scope.caughtDog[0].allergies;
                    $scope.modalDogFormData.release_command = $scope.caughtDog[0].release_command;
                    $scope.modalDogFormData.notes = $scope.caughtDog[0].notes;
                    $scope.modalDogFormData.rabies_exp = $scope.caughtDog[0].rabies_exp;
                    $scope.modalDogFormData.distemper_exp = $scope.caughtDog[0].distemper_exp;
                    $scope.modalDogFormData.parvo_exp = $scope.caughtDog[0].parvo_exp;
                    $scope.modalDogFormData.bordetella_exp = $scope.caughtDog[0].bordetella_exp;
                    $scope.modalDogFormData.kennel_size = $scope.caughtDog[0].kennel_size;
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

        $scope.updateDB = function (tab,col) {
            var updateObj = {};
            updateObj.table = tab;
            updateObj.column = col;
            updateObj.value = $scope.value_edit;

            if (tab.localeCompare('client') == 0){
                updateObj.key = 'id';
                updateObj.id = $scope.formData.clientid;
            }

            $http({
                method: 'POST',
                url: 'api/index.php/updateDB',
                data: updateObj
            }).success( function(data) {
                    $scope.selectClient($scope.formData.clientid);
                }).error( function(data) {
                    console.log('Error: '.concat(data));
                });

            $scope.value_edit = '';
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
        $scope.clientName = {};
        $scope.kennelname = {};
        $scope.reservationId = {};
        $scope.masterReservationId = {};

        $scope.checkinDone = false;
        $scope.checkinNeed = true;
        $scope.checkoutDone = false;
        $scope.checkoutNeed = true;

        $scope.confirmedRes = false;

        $scope.checkin = {};
        $scope.checkout = {};

        //TODO: Initialize the dates to today and next week.
        /*
        var checkDate = new Date();
        $scope.checkin.date = checkDate.getDate();
        checkDate.setDate(new Date()+7);
        $scope.checkout.date = checkDate.getDate();
        */
        $scope.formData = {};
        $scope.dogFormData = {};
        $scope.modalDogFormData = {};

        $scope.clientList = {};

        $scope.divClientAdd = false;
        $scope.resNeeded = false;

        $scope.checkinDoneFx = function (newDate, oldDate) {
            var dateNow = new Date();
            var dateIn = new Date(newDate);

            if ( dateNow > dateIn ) {
                alert('Cannot make reservations in the past.');
                $scope.checkin.date = '';
            }
            else{
                $scope.checkinDone = true;
                $scope.checkinNeed = false;
            }
        };

        $scope.checkoutDoneFx = function (newDate, oldDate) {
            var dateIn = new Date($scope.checkin.date);
            var dateOut = new Date(newDate);
            if ( dateIn >= dateOut ) {
                alert('Check-out date earlier than Check-in date');
                $scope.checkout.date = '';
            }
            else {
                $scope.checkoutDone = true;
                $scope.checkoutNeed = false;
            }
        };

        $scope.checkinEdit = function () {
            $scope.checkinDone = false;
            $scope.checkinNeed = true;
        };

        $scope.checkoutEdit = function () {
            $scope.checkoutDone = false;
            $scope.checkoutNeed = true;

        };

        $scope.fetchMasterReservationId = function (){
            $http({
                    method: 'GET',
                    url: 'api/index.php/masterresid'
                }
            ).success( function(data) {
                    $scope.masterReservationId = data.masterReservationId;
                })
                .error( function(data) {
                    console.log('Error: '.concat(data));
                })
        };

        $scope.fetchReservationId = function () {
            $http({
                    method: 'GET',
                    url: 'api/index.php/clientresid'
                }
            ).success( function(data) {
                    $scope.reservationId = data.reservationId;
                })
                .error( function(data) {
                    console.log('Error: '.concat(data));
                })
            return $scope.reservationId;
        };

        $scope.fetchClients = function () {
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
        };

        $scope.availKennels = function () {
            $http({
                    method: 'GET',
                    url: 'api/index.php/availkennels'
                }
            ).success( function(data) {
                    $scope.avk = data;
                })
                .error( function(data) {
                    console.log('Error: '.concat(data));
                })
        };

        $scope.clientAdd = function () {
            $location.path('#/clientman/new');
            $scope.$apply();

        };

        $scope.loadDogs = function () {
            $http({
                method: 'GET',
                url: 'api/index.php/fetchclientdog/'.concat($scope.clientName.id)
            })
                .success( function(data) {
                    $scope.dogList = data;
                    $scope.resNeeded = true;
                })
                .error( function(data) {
                    console.log('Error: '.concat(data));
                })
        };

        $scope.saveDogRes = function (dogId,kennelId,training,training_amt,notes,medication,idx){
            var cliname = $scope.clientName.full_name;
            cliname =  cliname.substr(0,cliname.indexOf(' - '));

            var resObj = {};
            resObj.master_reservation_id = $scope.masterReservationId;
            resObj.reservation_id = $scope.reservationId;
            resObj.client_id    = $scope.clientName.id;
            resObj.dog_id       = dogId;
            resObj.kennel_id    = kennelId;
            resObj.check_in     = Date.parse($scope.checkin.date);
            resObj.check_out    = Date.parse($scope.checkout.date);
            resObj.status       = 'Scheduled';
            resObj.title        = $scope.dogList[idx].name.concat(' - ',cliname);
            resObj.url          = 'REMOVE';
            resObj.cost         = $scope.train_cost;
            resObj.training     = training;
            resObj.training_amt = training_amt;
            resObj.notes        = notes;
            resObj.medication   = medication;

            $http({
                    method: 'POST',
                    url: 'api/index.php/reserveinsert',
                    data: resObj
                }
            ).success( function(data) {
                    $scope.reservationId = parseInt($scope.reservationId) + 1;
                    $http({
                            method: 'GET',
                            url: 'api/index.php/fetchresconfirm/'.concat($scope.masterReservationId)
                        }
                    ).success( function(data) {
                            $scope.dogListConfirmed = data;
                            $scope.dogList.splice(idx,1);
                            $scope.confirmedRes = true;
                            if ($scope.dogList.length == 0){
                                $scope.resNeeded = false;
                            }
                        }).error( function(data) {
                            console.log('Error: '.concat(data));
                        });

                }).error( function(data) {
                    console.log('Error: '.concat(data));
                });
        };

        $scope.editDogReservation = function (res_id, idx) {
            var resObj = {};
            resObj.reservation_id = res_id;
            resObj.master_id = $scope.masterReservationId;
            resObj.client_id = $scope.clientName.id;
            $http({
                    method: 'POST',
                    url: 'api/index.php/reserveremove',
                    data: resObj
                }
            ).success( function (data) {
                    $scope.dogListConfirmed.splice(idx,1);
                    $scope.dogList = data;
                    $scope.resNeeded = true;

                })
                .error (function (data) {
                console.log('Error: '.concat(data));
            });
        };

        $scope.inlineClientDogInsert = function () {
            if (!$scope.clientName.id){
                $scope.clientNew = true;
                $scope.clientView = false;
            }
            else {
                $scope.clientNew = false;
                $scope.clientView = true;
                $scope.selectClient($scope.clientName.id);
            }
        };

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
                    method: 'GET',
                    url: 'api/index.php/clientidfetch'
                }
            ).success( function(data) {
                    $scope.formData.clientid = data.clientid;
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
        };

        $scope.saveModalDog = function () {
            $http({
                    method: 'POST',
                    url: 'api/index.php/updatedog',
                    data: $scope.modalDogFormData
                }
            ).success( function(data) {
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

                }).error( function(data) {
                    console.log('Error: '.concat(data));
                });
        };

        $scope.viewEditDog = function(dogid){
            $http({
                method: 'GET',
                url: 'api/index.php/fetchdog/'.concat(dogid)
            }).success( function(data){
                    $scope.caughtDog = data;
                    $scope.modalDogFormData.id = $scope.caughtDog[0].id;
                    $scope.modalDogFormData.name = $scope.caughtDog[0].name;
                    $scope.modalDogFormData.breed = $scope.caughtDog[0].breed;
                    $scope.modalDogFormData.age = $scope.caughtDog[0].age;
                    $scope.modalDogFormData.sex = $scope.caughtDog[0].sex;
                    $scope.modalDogFormData.color = $scope.caughtDog[0].color;
                    $scope.modalDogFormData.spayed_neutered = $scope.caughtDog[0].spayed_neutered;
                    $scope.modalDogFormData.behavior = $scope.caughtDog[0].behavior;
                    $scope.modalDogFormData.existing_health_conditions = $scope.caughtDog[0].existing_health_conditions;
                    $scope.modalDogFormData.allergies = $scope.caughtDog[0].allergies;
                    $scope.modalDogFormData.release_command = $scope.caughtDog[0].release_command;
                    $scope.modalDogFormData.notes = $scope.caughtDog[0].notes;
                    $scope.modalDogFormData.rabies_exp = $scope.caughtDog[0].rabies_exp;
                    $scope.modalDogFormData.distemper_exp = $scope.caughtDog[0].distemper_exp;
                    $scope.modalDogFormData.parvo_exp = $scope.caughtDog[0].parvo_exp;
                    $scope.modalDogFormData.bordetella_exp = $scope.caughtDog[0].bordetella_exp;
                    $scope.modalDogFormData.kennel_size = $scope.caughtDog[0].kennel_size;
                }).error( function(data) {
                    console.log('Error: '.concat(data));
                });
        };

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
                    $scope.formData.boarding_agreement = data.boarding_agreement;
                    $scope.action = 'view';
                    $scope.clientList = {};
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
        };

        $scope.updateDB = function (tab,col) {
            var updateObj = {};
            updateObj.table = tab;
            updateObj.column = col;
            updateObj.value = $scope.value_edit;

            if (tab.localeCompare('client') == 0){
                updateObj.key = 'id';
                updateObj.id = $scope.formData.clientid;
            }

            $http({
                method: 'POST',
                url: 'api/index.php/updateDB',
                data: updateObj
            }).success( function(data) {
                    $scope.selectClient($scope.formData.clientid);
                }).error( function(data) {
                    console.log('Error: '.concat(data));
                });

            $scope.value_edit = '';
        }

        $scope.completeReservation = function (){
            $location.path('/reservation/'.concat($scope.masterReservationId));
        };

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
        }

    }])

    .controller('ResViewCtrl', ['$scope','$http','$routeParams','$location', function($scope,$http,$routeParams,$location) {
        $scope.reservationId = $routeParams.resid.toString();
        $scope.reservationView = {};

        $scope.initResView = function (){
            $http({
                method: 'GET',
                url: 'api/index.php/reservfetchclient/'.concat($scope.reservationId)
            }).success( function(data){
                    console.log('hello - 1');
                    $scope.reservationView = data;
                    console.log('hello - 2');
                }).error( function(data) {
                    console.log('Error: '.concat(data));
                });
        };
    }])

    .controller('VacSearchCtrl', ['$scope','$http', function($scope,$http) {

        $scope.availKennels = function () {
            $http({
                    method: 'GET',
                    url: 'api/index.php/availkennels'
                }
            ).success( function(data) {
                    $scope.avk = data;
                    $scope.hasResults = "true";

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
    }]);