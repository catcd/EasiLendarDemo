var App = angular.module("filterApp",["ionic"]);
App.controller("filterController",["$scope",filterController]);

function filterController($scope){
	$scope.fShow = false;
	$scope.showAdvanceFilter = function(){
		$scope.fShow = !($scope.fShow);
	}
}