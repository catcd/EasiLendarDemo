angular.module('MainApp.controllers.setting', [])

.controller('SettingController', function($scope, $ionicPopup) {
	$scope.theme="Blue";
	$scope.mlang="English";
	$scope.local=true;
	$scope.gmail=true;
	$scope.sunrise=false;
	$scope.sync=true;
	$scope.mView="Day";
	$scope.mDayView="Event list";
})