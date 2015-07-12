/**
 * starter: Can Duy Cat
 * owner: Nguyen Thi Luong
 * last update: 12/7/2015
 * type: day controller
 */

angular.module('MainApp.controllers.day', [])

.controller("DayController", function($scope, $rootScope,eSettings,eCalendar, eEasiLendar,eUser) {
	$scope.eUser = eUser;
	$scope.eCalendar = eCalendar;
	$scope.eEasiLendar = eEasiLendar;
	$scope.eSettings = eSettings;
	$scope.newDayCalendar = function() {
		return new DayCalendar();
	};
	$scope.weekCalendar = eEasiLendar.newWeekCalendar();
	$scope.weekCalendar.setNavDays();
	
	$scope.navigationDay = $scope.newDayCalendar();
	$scope.calculatorTime = function(time){
		var hour= parseInt(time/60);
		var minute= parseInt(time%60);
		if(minute<10){
			minute = ':0' + minute;
		}
		else{
			minute = ':' + minute;
		}
		if(hour<12){
			result = hour + minute + ' a';
		}
		else if(hour>12){
			hour = hour-12;
			result = hour + minute + ' p';
		}
	return result;
	}
	$rootScope.dayToday = function(){
		$scope.navigationDay = $scope.newDayCalendar();
	};
	$scope.view = function(event) {
		$rootScope.viewEvent(event.event.origin);
	};
	function DayCalendar(){
		var curDate = new Date();
		this.Day = eEasiLendar.newDay(curDate);

		var setNavDate = function(date){
			var check = date.date %10;
			if(check == 1) {
				return date.date+ "st";
			}else if(check ==2){
				return date.date + "nd";}
			else{
				return date.date + "th";}
		};
		var setHours = function () {
			var hours = [];
			for (var i = 0; i < 24; i++) {
				if (i == 0) {
					hours[i] = "12AM";
				} else if (i < 12) {
					hours[i] = i + "AM";
				} else if (i == 12) {
					hours[i] = i + "PM";
				} else {
					hours[i] = (i - 12) + "PM";
				}
			}
			return hours;
		};
		function findPositionOfDay (day){
			var posOfDay;
			for(var i=0; i<7;i++){
				if(day.day == eCalendar.weekDays[i])
				{	
					posOfDay = i; break;
				}
			}
			return posOfDay;
		};
		//set Navigation time 
		this.setNavTime = function(day){
			
			this.navMonth = eCalendar.months[day.month];
			this.navYear = day.year;
			this.navDate = setNavDate(day);
			this.navDay = day.day;
			positionOfDay = findPositionOfDay(day);
			this.DAY = $scope.weekCalendar.navDays[positionOfDay];
			this.Day = day;
		};
		/* hours to display in calendar
		 * 0 - 23
		 */
		this.hours = setHours();
		// day-content height
		this.contentHeight = {
			"height": "90%",
		};
		// create week object
		$scope.weekCalendar = eEasiLendar.newWeekCalendar();
		$scope.weekCalendar.setNavDays();

		var positionOfDay = findPositionOfDay(this.Day);
		this.DAY = $scope.weekCalendar.navDays[positionOfDay];
		this.navMonth = eCalendar.months[this.Day.month];
		this.navYear = this.Day.year;
		this.navDate = setNavDate(this.Day);
		this.navDay = this.Day.day;
		this.navBackground = 'bkg-style ' +"easi-" + eCalendar.shortMonths[this.Day.month] + "-bkg";
		this.nextDay = function(){
			if(positionOfDay==6) $scope.weekCalendar.nextWeek();
			this.setNavTime(this.Day.nextDay());
		};
		this.prevDay = function(){
			if(positionOfDay==0) $scope.weekCalendar.prevWeek();
			this.setNavTime(this.Day.prevDay());
		};
	};
		// watch for changes in eUser.uGmailCalendar and eSetting.sFirstDay
	$scope.$watch('eUser.uGmailCalendar', function() {
		$scope.weekCalendar = eEasiLendar.newWeekCalendar();
		$scope.weekCalendar.setNavDays();
		$scope.navigationDay = $scope.newDayCalendar();
	});
	$scope.$watch('eSettings.sFirstDay', function() {
		$scope.weekCalendar = eEasiLendar.newWeekCalendar();
		$scope.weekCalendar.setNavDays();
		$scope.navigationDay = $scope.newDayCalendar();
	});
});

