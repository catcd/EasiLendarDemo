/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 21/04/2015
 * type: home controller
 */

var week = angular.module('MainApp.controllers.week', []);

week.controller("WeekController", function($scope, eEasiLendar) {
	
	$scope.weekCalendar = eEasiLendar.newWeekCalendar();
	$scope.weekCalendar.setNavDays();
	
	// watch for changes in eUser.uGmailCalendar 
	$scope.$watch('eUser.uGmailCalendar', function() {
		$scope.weekCalendar = eEasiLendar.newWeekCalendar();
		$scope.weekCalendar.setNavDays();
	});

	// watch for changes in eSettings.sFirstDay
	$scope.$watch('eSettings.sFirstDay', function() {
		$scope.weekCalendar = eEasiLendar.newWeekCalendar();
		$scope.weekCalendar.setNavDays();
	});
});