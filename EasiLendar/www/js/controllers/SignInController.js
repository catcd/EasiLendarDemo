/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 24/02/2015
 * type: paticular controller
 */

angular
    .module('MainApp.controllers.signIn', [])

.controller(
    'SignInController',
    function($scope, $state) {

        $scope.isRemember = false;
        $scope.users = [{
            id: "TEXAS",
            password: "easilendar"
        }, {
            id: "catcd",
            password: "easilendar"
        }];
        $scope.user = {
            id: "",
            password: ""
        };

        $scope.validate = function() {
            for (var i = 0; i < $scope.users.length; i++) {
                if ($scope.user.id == $scope.users[i].id && $scope.user.password == $scope.users[i].password) {
                    return true;
                }
            }
            return false;
        };

        $scope.signIn = function() {
            if ($scope.validate()) {

                /* Something here */

                $state.go('home');
            } else {
                $state.go('warning');
            }
        };

        $scope.confirm = function() {
            $state.go('form');
        }
    })
