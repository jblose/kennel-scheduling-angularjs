'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/schedule', {templateUrl: 'partials/schedule.html', controller: 'ScheduleCtrl'});
        $routeProvider.when('/reservation', {templateUrl: 'partials/reservation.html', controller: 'ReservationCtrl'})
        $routeProvider.when('/clientman', {templateUrl: 'partials/clientman.html', controller: 'ClientManCtrl'})
        $routeProvider.when('/dogman', {templateUrl: 'partials/dogman.html', controller: 'DogManCtrl'})
        $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
        $routeProvider.otherwise({redirectTo: '/schedule'});
    }]);
