/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 12/05/2015
 * type: side menu controller
 */

angular.module('MainApp.controllers.sideMenu', [
	'MainApp.controllers.sideMenu.friendPanel'
])

.controller('sideMenuController',
	function($scope, $ionicSideMenuDelegate, eUser, eDatabase) {
		$scope.eUser = eUser;
		$scope.eDatabase = eDatabase;

		$scope.toggleLeft = function() {
			$ionicSideMenuDelegate.toggleLeft();
		};
	})

.directive('friendPanel', function() {
	return {
		restrict: 'E',
		templateUrl: 'templates/friend-panel.html',
	};
})

.directive('menuPanel', function() {
	return {
		restrict: 'E',
		templateUrl: 'templates/menu-panel.html',
	};
});
