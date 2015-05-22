(function () {
    "use strict";
    angular
        .module("productManagement")
        .controller("ProductListCtrl",ProductListCtrl);

    ProductListCtrl.$inject = ['productResource'];

    function ProductListCtrl(productResource) {
        var vm = this;
        vm.searchCriteria = 'GDN';
        vm.sortProperty = "Price";
        vm.changeSort = changeSort;
        vm.sortAscending = true;

        function changeSort(column) {
            console.log(column);
            vm.sortProperty = column;
            vm.sortAscending = !vm.sortAscending;
            loadData();
        }

        function loadData()
        {
            productResource.query({
                $filter: "contains(ProductCode,'GDN')",
                $orderby: vm.sortProperty + " " + (vm.sortAscending ? "asc" : "desc"),
                $skip: 0,
                $top: 10
            }, function(data) {
                vm.products = data;
            });
        };

        loadData();
    }
}());
