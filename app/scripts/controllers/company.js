'use strict';
function notifyError(response) {
  if (response.status === 500) {
    alert("Could not update, error on server!");
  } else if (response.status === 400) {
    alert("Data format is wrong");
  } else if (response.status === 404) {
    alert("This record is doest not exist on server!");
  } else if (response.status === 409) {
    alert("Could not update as there is contraint violation");
  }
}
var app = angular.module('projectsApp');
app.controller('CompanyCtrl', ['$scope', '$resource', 'Company', function ($scope, $resource, Company) {
  var resource = $resource('http://127.0.0.1:8080/company', {}, {
      get: {method: 'GET'}
  });

  $scope.query = {
    order: 'id',
    limit: 5,
    page: 1
  };

  getCompanies($scope.query);

  function getCompanies(query) {
    $scope.promise = resource.get(query, success).$promise;
  }

  function success(result) {
    $scope.companies = result;
  }

  $scope.onPaginate = function (page, limit) {
    getCompanies(angular.extend({}, $scope.query, {page: page, limit: limit}));
  };

  $scope.onReorder = function (order) {
    getCompanies(angular.extend({}, $scope.query, {order: order}));
  };
}]);
app.controller("CompanyDetailCtrl", ['$scope', '$routeParams', 'Company', 'AddOwner', function($scope, $routeParams, Company, AddOwner) {
  $scope.company = Company.get({id: $routeParams.id});
  $scope.owner = {};

  $scope.addOwner = function(owner) {
    $scope.company = AddOwner.add({id: $scope.company.id}, owner, function(data) {
      $scope.company = data;
    }, function(response){
      notifyError(response);
    });
  }
}]);
app.controller("CompanyEditCtrl", ['$scope', '$routeParams', '$location', 'Company', function($scope, $routeParams, $location, Company) {
  $scope.company = Company.get({id: $routeParams.id});
  $scope.newOwner = {};

  $scope.$watch('company.email', function (newValue, oldValue) {
    if(newValue === "")
      $scope.company.email = undefined;
  });
  $scope.$watch('company.phone_number', function (newValue, oldValue) {
    if(newValue === "")
      $scope.company.phone_number = undefined;
  });

  $scope.addOwner = function(newOwner) {
    $scope.company.owners.push(newOwner);
    $scope.newOwner = {};
  };

  $scope.delOwner = function(index) {
    $scope.company.owners.splice(index, 1);
  };

  $scope.updateCompany = function() {
    $scope.company = Company.update({id: $scope.company.id}, $scope.company, function(data) {
      $location.path('#/');
    }, function(response) {
      notifyError(response);
    });
  }
}]);
app.controller("CompanyNewCtrl", ['$scope', '$location', 'Company', function($scope, $location, Company) {
  $scope.company = {};
  $scope.company.owners = [];
  $scope.newOwner = {};

  $scope.$watch('company.email', function (newValue, oldValue) {
    if(newValue === "")
      $scope.company.email = undefined;
  });
  $scope.$watch('company.phone_number', function (newValue, oldValue) {
    if(newValue === "")
      $scope.company.phone_number = undefined;
  });

  $scope.addOwner = function(newOwner) {
    $scope.company.owners.push(newOwner);
    $scope.newOwner = {};
  };

  $scope.delOwner = function(index) {
    $scope.company.owners.splice(index, 1);
  };

  $scope.saveCompany = function() {
    $scope.company = Company.save({}, $scope.company, function(data) {
      $scope.company = {};
      $scope.company.owners = [];
      $scope.newOwner = {};
      $location.path('#/');
    }, function(response) {
      notifyError(response);
    });
  }

}]);
