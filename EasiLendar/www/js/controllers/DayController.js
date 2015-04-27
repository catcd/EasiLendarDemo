/**
 * starter: Can Duy Cat
 * owner: Nguyen Thi Luong
 * last update: 18/03/2015
 * type: day controller
 */

angular.module('MainApp.controllers.day', [])

.controller("DayController", function($scope, $rootScope,eSettings,eCalendar,eEasiLendar,eUser) {
$scope.eUser = eUser;
	$scope.eCalendar = eCalendar;

$scope.$watch('eSettings.sFirstDay', function() {
	var start = eSettings.sFirstDay;});
	var toDay = new Date();
	toDay = new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getDate(),0,0,0,0);
	$scope.indexOfToday = toDay.toString();
	
	var curDate=new Date();
	$scope.NavDay = angular.copy(curDate);
	$scope.NavDay = new Date($scope.NavDay.getFullYear(), $scope.NavDay.getMonth(), $scope.NavDay.getDate(),0,0,0,0);
	$scope.indexofNavDay = $scope.NavDay.toString();
	var Day = eEasiLendar.newDay($scope.NavDay);

	$scope.NavDay = new Date(Day.year, Day.month, Day.date,0,0,0,0);
	$scope.indexOfNavDay = $scope.NavDay.toString();
	
	//navigation Day
	$scope.navDate = Day.date;
	$scope.navDay = Day.day;
	
	//navigation Month
	$scope.navMonthNumber = Day.month;
	$scope.navMonthName = eCalendar.months[$scope.navMonthNumber];
	
	//navigation Year
	$scope.navYear = Day.year;
	
    //navigation background
	$scope.bkgE = 'bkg'; 
	$scope.BKG = ['bkg-01','bkg-02','bkg-03','bkg-04','bkg-05','bkg-06','bkg-07','bkg-08','bkg-09','bkg-10','bkg-11','bkg-12'];
	
	$scope.backgroundMonth = function(){
		return $scope.BKG[$scope.navMonthNumber];  
    };
	var setNavMonth = function(month1, month2) {
		if (month1 == month2) {
			return eCalendar.months[month1];
		} else {
			return eCalendar.months[month1] + "-" + eCalendar.months[month2];
		}
	};	
	
	$scope.FirstLastDay = function(day){
		var start = eSettings.sFirstDay;
		var pos,sub,add,posOfDay;
		switch(start){	case "Monday":	pos = 6;
						case "Saturday":	pos = 1;
						case "Sunday":	pos = 0;
				};
		var FirstLastDay =[];		
		for(var i=0; i<7;i++){
			if(day.day == eCalendar.weekDays[i])
			{posOfDay = i; break;}
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
			
		return FirstLastDay;
	};
	
	var week= $scope.FirstLastDay(Day);
	$scope.FirstDayWeek=week[0].date;
	$scope.LastDayWeek=week[1].date;
	$scope.navShortMonth = setNavMonth(week[0].month, week[1].month);
		
	// nextDay function
	$scope.NextDay = function(){
		Day =Day.nextDay();
		$scope.navDate = Day.date;
		$scope.navDay = Day.day;
		
		//navigation Month
		$scope.navMonthNumber = Day.month;
		$scope.navMonthName =eCalendar.months[$scope.navMonthNumber];
		
		//navigation Year
		$scope.navYear = Day.year;
		$scope.NavDay = new Date(Day.year, Day.month, Day.date,0,0,0,0);
		$scope.indexOfNavDay = $scope.NavDay.toString();
		week =  $scope.FirstLastDay(Day);
		$scope.FirstDayWeek=week[0].date;
		$scope.LastDayWeek=week[1].date;
		$scope.navShortMonth = setNavMonth(week[0].month, week[1].month);
	};
		
	//previous day function
	$scope.previousDay = function(){
		Day = Day.prevDay();
		$scope.navDate = Day.date;
		$scope.navDay = Day.day;
		
		//navigation Month
		$scope.navMonthNumber = Day.month;
		$scope.navMonthName = eCalendar.months[$scope.navMonthNumber];
		
		//navigation Year
		$scope.navYear = Day.year;
		$scope.NavDay = new Date(Day.year, Day.month, Day.date,0,0,0,0);
		$scope.indexOfNavDay = $scope.NavDay.toString();
		week =  $scope.FirstLastDay(Day);
		$scope.FirstDayWeek=week[0].date;
		$scope.LastDayWeek=week[1].date;
		$scope.navShortMonth = setNavMonth(week[0].month, week[1].month);
	};
});




