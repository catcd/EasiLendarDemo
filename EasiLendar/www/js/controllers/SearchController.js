angular.module('MainApp.controllers.search', [])

.controller("SearchController", function($scope, $ionicPopup){
	$scope.fShow = false;
	$scope.showAdvanceFilter = function(){
		$scope.fShow = !($scope.fShow);
	}
})