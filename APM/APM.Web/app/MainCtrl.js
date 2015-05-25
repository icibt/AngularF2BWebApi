﻿(function () {
    'use strict';

    angular
        .module('productManagement')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['userAccount']; 

    function MainCtrl(userAccount) {
        /* jshint validthis:true */
        var vm = this;
        vm.isLoggedIn = false;
        vm.message = '';
        vm.userData = {
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
        };

        vm.registerUser = function() {
            vm.userData.confirmPassword = vm.userData.password;
            userAccount.registration.registerUser(vm.userData,
                function(data) {
                    vm.confirmPassword = '';
                    vm.message = "... Registration successful";
                    vm.login();
                }, errorCallback);
        };

        vm.login = function() {
            vm.userData.grant_type = "password";
            vm.userData.userName = vm.userData.email;
            userAccount.login.loginUser(vm.userData, function(data) {
                vm.isLoggedIn = true;
                vm.message = '';
                vm.password = '';
                vm.token = data.access_token;
            }, function(response) {
                vm.password = '';
                vm.isLoggedIn = false;
                errorCallback(response);
            });
        };

        function errorCallback(response) {
            vm.message = response.statusText + "\r\n";
            if (response.data.modelState) {
                for (var key in response.data.modelState) {
                    vm.message += response.data.modelState[key] + "\r\n";
                }
            }
            if (response.data.exceptionMessage)
                vm.message += response.data.exceptionMessage;
            if (response.data.error)
                vm.message += response.data.error;
        };

        activate();

        function activate() { }
    }
})();
