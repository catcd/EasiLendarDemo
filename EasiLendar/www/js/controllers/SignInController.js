/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 26/02/2015
 * type: particular controller
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
            password: "",
            re_password: "",
            name: "",
            email: ""
        };
        /* validate user to sign in */
        $scope.validate = function() {
            for (var i = 0; i < $scope.users.length; i++) {
                if ($scope.user.id == $scope.users[i].id && $scope.user.password == $scope.users[i].password) {
                    return true;
                }
            }
            return false;
        };
        
        /* sign in function */
        $scope.signIn = function() {
            if ($scope.validate()) {

                /* Something here */

                $state.go('home');
            } else {
                $state.go('warning');
            }
        };

        /* confirm the warning */
        $scope.confirm = function() {
            $state.go('form');
        }
        
        /* check the valid informations to register */
        $scope.check = function() {
        	return true;
        }
        
        /* register function */
        $scope.register = function() {
        	if ($scope.check()) {
        		/*Something*/
        		$state.go('form');
        	} else {
        		
        	}
        }
    })
