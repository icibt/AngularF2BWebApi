(function () {
    'use strict';

    angular
        .module('productManagement')
        .factory('productResource', productResource);

    productResource.$inject = ['$resource','appSettings','currentUser'];

    function productResource($resource,appSettings, currentUser) {
        return $resource(appSettings.serverPath + "api/products/:id", null, {
                'get' : {
                    headers: { 'Authorization' : 'Bearer ' + currentUser.getProfile().token }
                },
                'save' : {
                    headers: { 'Authorization' : 'Bearer ' + currentUser.getProfile().token }
                },
               'update': {
                   method: 'PUT',
                   headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
               }
           });
    }
})();