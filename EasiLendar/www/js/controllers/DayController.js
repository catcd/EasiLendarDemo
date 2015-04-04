/**
 * starter: Can Duy Cat
 * owner: Nguyen Thi Luong
 * last update: 18/03/2015
 * type: day controller
 */

angular.module('MainApp.controllers.day', [])

.controller("DayController", function($scope, $rootScope) {
$scope.$watch('eSettings.sFirstDay', function() {
	var start = $rootScope.eSettings.sFirstDay.slice(0,3);});
	
	var start = $rootScope.eSettings.sFirstDay.slice(0,3);
	var toDay = new Date();
	toDay = new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getDate(),0,0,0,0);
	$scope.indexOfToday = toDay.toString();
	
	var curDate=new Date();
	$scope.NavDay = angular.copy(curDate);
	$scope.NavDay = new Date($scope.NavDay.getFullYear(), $scope.NavDay.getMonth(), $scope.NavDay.getDate(),0,0,0,0);
	$scope.indexofNavDay = $scope.NavDay.toString();
	var Day = $rootScope.newDay($scope.NavDay);

	$scope.NavDay = new Date(Day.year, Day.month, Day.date,0,0,0,0);
	$scope.indexOfNavDay = $scope.NavDay.toString();
	//navigation Day
	$scope.navDate = Day.date;
	$scope.navDay = Day.day;
	//navigation Month
	$scope.navMonthNumber = Day.month;
	$scope.navMonthName = $rootScope.months[$scope.navMonthNumber];
	
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
				return $rootScope.months[month1];
			} else {
				return $rootScope.months[month1] + "-" + $rootScope.months[month2];
			}
		};
	
	var pos,sub,add,posOfDay;
	
	switch(start){	case "Mon":	pos = 6;
					case "Sat":	pos = 1;
					case "Sun":	pos = 0;
				};
	for(var i=0; i<7;i++){
		if(Day.day == $rootScope.weekDays[i])
		{posOfDay = i; break;}
	}
	sub = (posOfDay +pos)%7;
	add = 7-sub;
	for(var i=0; i<sub;i++){Day = Day.prevDay();}
	$scope.firstDay = Day;
	$scope.FirstDayWeek = $scope.firstDay.date;
	for(var i=0; i<6; i++){Day = Day.nextDay();}
	$scope.lastDay = angular.copy(Day);
	$scope.LastDayWeek = $scope.lastDay.date;
	for(var i=0; i<add; i++){Day = Day.prevDay();}
	$scope.navShortMonth = setNavMonth($scope.firstDay.month, $scope.lastDay.month);
	// nextDay function
	$scope.NextDay = function(){
		Day =Day.nextDay();
		//Day = Day.nextDay();
		$scope.navDate = Day.date;
		$scope.navDay = Day.day;
		//navigation Month
		$scope.navMonthNumber = Day.month;
		$scope.navMonthName = $rootScope.months[$scope.navMonthNumber];
		//navigation Year
		$scope.navYear = Day.year;
		$scope.NavDay = new Date(Day.year, Day.month, Day.date,0,0,0,0);
		$scope.indexOfNavDay = $scope.NavDay.toString();

		if(Day.date > $scope.LastDayWeek && Day.month >= $scope.lastDay.month){
			$scope.firstDay = Day;
			$scope.FirstDayWeek = $scope.firstDay.date;
			for(var i=0;i<7; i++){
				$scope.lastDay = $scope.lastDay.nextDay();
				}
			$scope.LastDayWeek = $scope.lastDay.date;
			$scope.navShortMonth = setNavMonth($scope.firstDay.month, $scope.lastDay.month);
		}
	};
	//previous day function
	$scope.previousDay = function(){
		Day = Day.prevDay();
		$scope.navDate = Day.date;
		$scope.navDay = Day.day;
		//navigation Month
		$scope.navMonthNumber = Day.month;
		$scope.navMonthName = $rootScope.months[$scope.navMonthNumber];
		//navigation Year
		$scope.navYear = Day.year;
		$scope.NavDay = new Date(Day.year, Day.month, Day.date,0,0,0,0);
		$scope.indexOfNavDay = $scope.NavDay.toString();
		if(Day.date < $scope.FirstDayWeek && Day.month <= $scope.firstDay.month){
			$scope.lastDay = Day;
			$scope.LastDayWeek = $scope.lastDay.date;
			for(var i=0; i<7; i++){
				$scope.firstDay = $scope.firstDay.prevDay();
				}
			$scope.FirstDayWeek = $scope.firstDay.date;	
			$scope.navShortMonth = setNavMonth($scope.firstDay.month, $scope.lastDay.month);
		}
	};
});




