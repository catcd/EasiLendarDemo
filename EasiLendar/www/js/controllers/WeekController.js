/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 26/04/2015
 * type: home controller
 */

var week = angular.module('MainApp.controllers.week', []);

week.controller("WeekController", function($rootScope, $scope, eEasiLendar, eUser, eSettings) {
	/*
	* View Event function of week calendar
	* event is NorEvent/ AllEvent/ OverEvent
	*/
	$scope.view = function(event) {
		$rootScope.viewEvent(event.event.origin);
	};
	
	// today function
	$rootScope.weekToday = function() {
		$scope.weekCalendar = eEasiLendar.newWeekCalendar();
		$scope.weekCalendar.setNavDays();
	};
	
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