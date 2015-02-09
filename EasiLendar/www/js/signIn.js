/**
 * Nguyen Minh Trang
 * 09/02/2015
 */
(function() {
	var app = angular.module('signIn', []);
	
	app.controller("SignInController", function($scope) {
		
		$scope.isRemember = false;
		$scope.userFix = { id: "TEXAS", password:"easilendar"};
		$scope.user = { id: "", password:""};
		$scope.isWarning = false;
		
		$scope.validate = function() {
			if ($scope.user.id == $scope.userFix.id && $scope.user.password == $scope.userFix.password) {
				return true;
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