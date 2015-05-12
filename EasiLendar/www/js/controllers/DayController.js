/**
 * starter: Can Duy Cat
 * owner: Nguyen Thi Luong
 * last update: 30/04/2015
 * type: day controller
 */

angular.module('MainApp.controllers.day', [])

.controller("DayController", function($scope, $rootScope,eSettings,eCalendar, eEasiLendar,eUser) {
	$scope.eUser = eUser;
	$scope.eCalendar = eCalendar;
	$scope.eEasiLendar = eEasiLendar;
	$scope.eSettings = eSettings;
	$scope.bkgE = 'bkg';
	$scope.newDayCalendar = function() {
		return new DayCalendar();

	};
	$scope.weekCalendar = eEasiLendar.newWeekCalendar();
	$scope.weekCalendar.setNavDays();
	console.log($scope.weekCalendar.navDays[0]);
	console.log($scope.weekCalendar.navDays[6]);
	$scope.navigationDay = $scope.newDayCalendar();
	var view = eSettings.sDayView;
	$scope.viewCalendar = function(view){
		if(view=="timeGrid") return true
	};
	$scope.view_Calendar = function(view){
		if(view=="eventList") return true
	};
	
	$rootScope.dayToday = function(){
		$scope.navigationDay = $scope.newDayCalendar();
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
		var setNavMonth = function(month1, month2) {
			if (month1 == month2) {
				return eCalendar.months[month1];
			} else {
				return eCalendar.months[month1] + "-" + eCalendar.months[month2];
			}
		};
		
	
	function FirstLastDay (day){
		var start =eSettings.sFirstDay;
		var pos,sub,add,posOfDay;
		switch(start){	case "Monday":	pos = 6;
						case "Saturday":	pos = 1;
						case "Sunday":	pos = 0;
				};
		var FirstLastDay =[];		
		for(var i=0; i<7;i++){
			if(day.day == eCalendar.weekDays[i])
			{	
				posOfDay = i; break;
			}
		}
		sub = (posOfDay +pos)%7;
		add = 7-sub;
		for(var i=0; i<sub;i++){
			day = day.prevDay();
		}
		FirstLastDay[0] = day;
		for(var i=0; i<6; i++){
			day = day.nextDay();
		}
		FirstLastDay[1] = angular.copy(day);
		for(var i=0; i<add; i++){
			day = day.prevDay();
		}
		FirstLastDay[2] = posOfDay;
			
		return FirstLastDay;
	};

	//set Navigation time 
	this.setNavTime = function(day){
		week = FirstLastDay(day);
		this.FirstDayInWeek = $scope.weekCalendar.navDays[0].origin.date;
		this.LastDayInWeek = $scope.weekCalendar.navDays[6].origin.date;
	
		this.navMonth = eCalendar.months[day.month];// Time grid
		this.nav_Month= setNavMonth(week[0].month,week[1].month) ;//event list
		
		this.navYear = day.year;
		
		this.navDate = setNavDate(day);//Time grid
		this.nav_Date = day.date;//event list
		
		this.navDay = day.day;//time grid
		this.nav_Day = new Date(day.year, day.month, day.date,0,0,0,0);
		this.indexOfNavDay = this.nav_Day.toString();
		positionOfDay = week[2];
		this.DAY = $scope.weekCalendar.navDays[positionOfDay];
		
		this.navBackground = 'bkg-style ' +"easi-" + eCalendar.shortMonths[day.month] + "-bkg";//Time grid
		this.nav_Background = 'bkg ' +"easi-" + eCalendar.shortMonths[day.month] + "-bkg";//Time grid
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
	
	$scope.weekCalendar = eEasiLendar.newWeekCalendar();
		$scope.weekCalendar.setNavDays();
	$scope.$watch('eFriend.fMultiCal', function() {
		$scope.weekCalendar = eEasiLendar.newWeekCalendar();
		$scope.weekCalendar.setNavDays();
	});
	
	var week = FirstLastDay(this.Day);
	this.FirstDayInWeek = $scope.weekCalendar.navDays[0].origin.date;
		this.LastDayInWeek = $scope.weekCalendar.navDays[6].origin.date;
	
	
	var positionOfDay = week[2];
	this.DAY = $scope.weekCalendar.navDays[positionOfDay];
	
	this.navMonth = eCalendar.months[this.Day.month];//Time grid;
	this.nav_Month= setNavMonth(week[0].month,week[1].month) ;//event list
	
	this.navYear = this.Day.year;
	this.navDate = setNavDate(this.Day);
	this.nav_Date = this.Day.date;
	this.navDay = this.Day.day;
	this.nav_Day = new Date(this.Day.year, this.Day.month, this.Day.date,0,0,0,0);
	this.indexOfNavDay = this.nav_Day.toString();
	
	
	this.navBackground = 'bkg-style ' +"easi-" + eCalendar.shortMonths[this.Day.month] + "-bkg";//Time grid
	this.nav_Background = 'bkg ' +"easi-" + eCalendar.shortMonths[this.Day.month] + "-bkg";//Event list
	this.nextDay = function(){
		if(positionOfDay==6) $scope.weekCalendar.nextWeek();
		this.setNavTime(this.Day.nextDay());	
	};
	
	this.prevDay = function(){
		if(positionOfDay==0) $scope.weekCalendar.prevWeek();
		this.setNavTime(this.Day.prevDay());
	};
	
	};	
		// watch for changes in eUser.uGmailCalendar 
	$scope.$watch('eUser.uGmailCalendar', function() {
		$scope.weekCalendar = eEasiLendar.newWeekCalendar();
		$scope.weekCalendar.setNavDays();
		$scope.navigationDay = $scope.newDayCalendar();
	});

	// watch for changes in eSettings.sFirstDay
	$scope.$watch('eSettings.sFirstDay', function() {
		$scope.weekCalendar = eEasiLendar.newWeekCalendar();
		$scope.weekCalendar.setNavDays();
		$scope.navigationDay = $scope.newDayCalendar();
		
	});

});




