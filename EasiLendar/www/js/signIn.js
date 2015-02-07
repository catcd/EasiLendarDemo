/**
 * 
 */
(function() {
	var app = angular.module('signIn', []);
	
	app.controller("SignInController", function($scope) {
		
		$scope.isRemember = false;
		$scope.user = { id: "", password:""};
		$scope.isShow = false;
		
		$scope.validate = function() {
			return true;
		};
		
		$scope.signIn = function() {
			if ($scope.validate()) {
				window.alert("Validate");
				
				/* Something here*/
				
				window.location.href="../html/home.html";
			} else {
				$scope.isShow = true;
				$scope.user.id = "";
				$scope.user.password ="";
			}
		};
		
		$scope.confirm = function() {
			$scope.isShow = false;
		}
		
	});
	
})();