(function () {
    'use strict';

    angular
        .module('productManagement')
        .factory('productResource', productResource);

    productResource.$inject = ['$resource','appSettings'];

    function productResource($resource,appSettings) {
           return $resource(appSettings.serverPath + "api/products/:id", null, {
               'update':{method:'PUT'}
           });
    }
})();