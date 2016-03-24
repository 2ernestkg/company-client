var COMPANY_REST_URL="http://127.0.0.1:8080"
angular.module('projectsApp')
        .factory('Company', ['$resource', function($resource) {
            return $resource(COMPANY_REST_URL+'/company/:id', {}, {
                query: {method: 'GET', params: {id: ''}, isArray: true},
                update: {method: 'PUT'},
                save: {method: 'POST'}
            })
        }])
        .factory('AddOwner', ['$resource', function($resource) {
            return $resource(COMPANY_REST_URL+'/company/:id/owner', {}, {
                add: {method: 'PUT'}
            });
        }]);