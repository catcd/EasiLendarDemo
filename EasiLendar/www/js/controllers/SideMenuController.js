angular.module('MainApp.controllers.sideMenu', [])

.controller('sideMenuController', function($scope, $ionicSideMenuDelegate) {
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};
})