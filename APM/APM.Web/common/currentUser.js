(function() {
    'use strict';

    angular
        .module('common.services')
        .factory('currentUser', currentUser);

    //userAccount.$inject = ['$resource', 'appSettings'];

    function currentUser() {
        var vm = this;
        vm.profile = {
            userName: '',
            token: '',
            isLoggedIn: false
        };

        function setProfile(username, token) {
            vm.profile.userName = username;
            vm.profile.token = token;
            vm.profile.isLoggedIn = true;
        };

        function getProfile() { return vm.profile; }

        return {
            setProfile: setProfile,
            getProfile: getProfile
    };
    }

})();