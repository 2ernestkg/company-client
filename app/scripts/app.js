'use strict';

/**
 * @ngdoc overview
 * @name projectsApp
 * @description
 * # projectsApp
 *
 * Main module of the application.
 */
angular
  .module('projectsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/company.html',
        controller: 'CompanyCtrl',
        controllerAs: 'company'
      })
      .when('/view/:id', {
        templateUrl: 'views/company-detail.html',
        controller: 'CompanyDetailCtrl'
      })
      .when('/edit/:id', {
        templateUrl: 'views/company-edit.html',
        controller: 'CompanyEditCtrl'
      })
      .when('/new', {
        templateUrl: 'views/company-new.html',
        controller: 'CompanyNewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
