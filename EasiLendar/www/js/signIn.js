/**
 * Nguyen Minh Trang
 * 09/02/2015
 */
(function() {
	var app = angular.module('signIn', []);
	
	app.controller("SignInController", function($scope) {
		
		$scope.isRemember = false;
		$scope.users = [{ id: "TEXAS", password:"easilendar"},
		                { id: "catcd", password:"easilendar"}];
		$scope.user = { id: "", password:""};
		$scope.isWarning = false;
		
		$scope.validate = function() {
			for (var i=0; i < $scope.users.length; i++) {
				if ($scope.user.id == $scope.users[i].id 
						&& $scope.user.password == $scope.users[i].password) {
					return true;
				}
			}
			return false;
		};
		
		$scope.signIn = function() {
			if ($scope.validate()) {
				
				/* Something here*/
				
				window.location.href="../html/home.html";
			} else {
				$scope.isWarning = true;
				$scope.user.id = "";
				$scope.user.password ="";
			}
		};
		
		$scope.confirm = function() {
			$scope.isWarning = false;
		}
		
	});
	
})();