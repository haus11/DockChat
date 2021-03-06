'use strict';

/**
 * @ngdoc overview
 * @name webchatApp
 * @description
 * # webchatApp
 *
 * Main module of the application.
 */
angular
  .module('webchatApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular.filter',
    'luegg.directives',
    'emoji',
    'angular.chronicle'
  ])
  .config(function ($routeProvider, $locationProvider) {

    //$locationProvider.html5Mode({
    //  enabled: true,
    //  requireBase: false
    //});

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/createUser', {
        templateUrl: 'views/createuser.html',
        controller: 'CreateuserCtrl'
      })
      .when('/chatRoom', {
        templateUrl: 'views/chatroom.html',
        controller: 'ChatroomCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  })
  .run(function ($rootScope, $location, userService, connectionService) {

    console.log('Run');

    connectionService.on(config.api.connect, function () {
      console.log('Connect');
      connectionService.post(config.api.authenticate, function (_data, _jwres) {
        console.log('Authenticate');
        console.log(_data);

        if (Object.keys(_data).length === 0) {
          // ask for name
          // create user on /user POST
          $location.path('/createUser');
        }
        else {
          // get data from session
          userService.setAlias(_data.username);
          userService.setUserName(_data.username);

          $location.path('/chatRoom');
        }

        $rootScope.$apply();
      });
    });

  });
