angular.module('projectsApp')
        .factory('Company', ['$resource', function($resource) {
            return $resource('http://localhost:8080/company/:id', {}, {
                query: {method: 'GET', params: {id: ''}, isArray: true},
                update: {method: 'PUT'},
                save: {method: 'POST'}
            })
        }])
        .factory('AddOwner', ['$resource', function($resource) {
            return $resource('http://localhost:8080/company/:id/owner', {}, {
                add: {method: 'PUT'}
            });
        }]);