(function () {
    "use strict";

    angular
        .module("productManagement")
        .controller("ProductEditCtrl",
                     ProductEditCtrl);

    function ProductEditCtrl(productResource) {
        var vm = this;
        vm.product = {};
        vm.message = '';

        function errorCallback(response) {
            vm.message = response.statusText + "\r\n";
            if (response.data.modelState) {
                for (var key in response.data.modelState) {
                    vm.message += response.data.modelState[key] + "\r\n";
                }
            }
            if (response.data.exceptionMessage)
                vm.message += response.data.exceptionMessage;
        };

        productResource.get({ id: 52 },
            function (data) {
                vm.product = data;
                vm.originalProduct = angular.copy(data);
            }, errorCallback);

        if (vm.product && vm.product.productId) {
            vm.title = "Edit: " + vm.product.productName;
        }
        else {
            vm.title = "New Product";
        }

        vm.submit = function () {
            vm.message = '';
            if (vm.product.productId) {
                vm.product.$update({ id: vm.product.productId }, function(data) {
                    vm.message = "... Update Complete";
                }, errorCallback);
            } else {
                vm.product.$save(function(data) {
                    vm.originalProduct = angular.copy(data);
                    vm.message = "... Save Complete";
                },errorCallback);
            }
        };

        vm.cancel = function (editForm) {
            editForm.$setPristine();
            vm.product = angular.copy(vm.originalProduct);
            vm.message = "";
        };

    }
}());
