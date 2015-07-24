/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 24/07/2015
 * type: month controller
 */
 
/*MONTH CONTROLLER*/
angular.module('MainApp.controllers.month', [])

.controller('MonthController',
	function($scope, $rootScope, $document,
	eCalendar, eSettings, eEasiLendar) {

	$scope.eCalendar = eCalendar;
	$scope.eSettings = eSettings;

	$scope.allMonths = [
		{first: 0, second: 1, third: 2, fourth: 3},
		{first: 4, second: 5, third: 6, fourth: 7},
		{first: 8, second: 9, third: 10, fourth: 11}
		];

	//refresh calendar when return from other states
	$rootScope.$on('$stateChangeStart',
		function(event, toState, toParams, fromState) {
			if (toState.name == 'month') {
				//months list in year
				$scope.showMList = false;
				$scope.showMCal = true;
				$scope.showM2Cal = true;

				var children = $document.find('td').children();
				children = angular.element(children);
				if(children.hasClass('month-current-style') === true){
					children.removeClass('month-current-style');
				}

				$scope.buildCurrentMonth();
			}
		});

	/** Change month when know date in month
	  * date: a date in month or weeks that is used to build calendar
	  * state: init - begin build month; rebuild - rebuild month
	  */
	$scope.changeMonth = function(date, state){
		$scope.currentDate = date;
		$scope.currentDateNumber = date.getDate();
		$scope.curMonthNum = date.getMonth();
		$scope.curYear = date.getFullYear();
		$scope.curMonthStr = eCalendar.months[$scope.curMonthNum];
		$scope.position = angular.copy(date);

		if (state == 'rebuild') {
			$scope.buildWeeks();
		}
	};

	/* Return today */
	$rootScope.monthToday = function(){
		var date = new Date();
		date = new Date(date.setHours(0,0));
		$scope.changeMonth(date,'rebuild');
	};

	$scope.buildCurrentMonth = function() {
		//months list in year
		$scope.showMList = false;
		$scope.showMCal = true;
		$scope.showM2Cal = true;

		var date = new Date();
		date = new Date(date.setHours(0,0));

		$scope.changeMonth(date,'init');
		
		/** All weeks of a month
		  * week: array of days in month
		  * days: array of 7 days in month
		  * numDate: date
		  * month: month of date
		  */
		$scope.weeks = new Array(5);
		for (var i = 0; i < 5; i++) {
			$scope.weeks[i] = {
				days: new Array(7)
			};
			for (var j = 0; j < 7; j++) {
				$scope.weeks[i].days[j] = {
					numDate: 0,
					month: 0
				};
			}
		}

		//pristine value of $scope.weeks
		$scope.resetWeeks = angular.copy($scope.weeks);
		$scope.buildWeeks();
	};

	//check on a day when change month
	var checkOnDay = function(month, day){
		var id = 'm' + month.toString() + day.toString();
		var elem = document.getElementById(id);
		angular.element(elem).prop('checked', true);
	}

	$scope.setMonthNum = function(state){
		var month = $scope.curMonthNum;
		
		if(state == 'prev') {
			month = (month - 1 >= 0 ? 0 : 12) + (month - 1);
		} else {
			month = (month + 1) - (month + 1 > 11 ? 12 : 0);
		}
		
		$scope.curMonthNum = month;
		$scope.curMonthStr = eCalendar.months[month];

		if ($scope.curMonthNum == 11) {
			$scope.curYear--;
		}

		if ($scope.curMonthNum === 0) {
			$scope.curYear++;
		}

		$scope.buildWeeks();
	}

	$scope.thisMonth = function(year,month){
		if(year >= 0 && month >= 0 && month <= 11){
			$scope.curMonthNum = month;
			$scope.curMonthStr = eCalendar.months[month];
			$scope.curYear = year;
			$scope.buildWeeks();
			$scope.changeState();
		}
	};

	// Increment month
	$scope.nextMonth = function() {
		$scope.setMonthNum('next');
		//$scope.$apply();
		checkOnDay($scope.curMonthNum,1);
	};
	// Decrement month
	$scope.prevMonth = function() {
		$scope.setMonthNum('prev');
		//$scope.$apply();
		checkOnDay($scope.curMonthNum,1);
	};

	// Increment year
	$scope.previousYear = function(){
		$scope.curYear--;
	};
	// Decrement year
	$scope.nextYear = function(){
		$scope.curYear++;
	};

	var setNumDate = function(date, other){
		date = (date + 7) - ((date + 7) > other ? other : 0);
		return date;
	}

	var setOrderDaysInWeek = function(firstDay) {
		if(eSettings.sFirstDay == 'Sunday') {
			$scope.daysInWeek = [{day: 'S'},{day: 'M'},{day: 'T'},
								{day: 'W'},{day: 'T'},
								{day: 'F'},{day: 'S'}];
		}
		if(eSettings.sFirstDay == 'Monday') {
			firstDay += (firstDay > 0 ? -1 : 6);
			$scope.daysInWeek = [{day: 'M'},{day: 'T'},{day: 'W'},
								{day: 'T'},{day: 'F'},
								{day: 'S'},{day: 'S'}];
		}
		if(eSettings.sFirstDay == 'Saturday') {
			firstDay += (firstDay < 6 ? 1 : -6);
			$scope.daysInWeek = [{day: 'S'},{day: 'S'},{day: 'M'},
								{day: 'T'},{day: 'W'},
								{day: 'T'},{day: 'F'}];
		}
	}

	$scope.buildWeeks = function() {
		var newWeeks = angular.copy($scope.resetWeeks);

		var bYear = $scope.curYear;
		var bMonth = $scope.curMonthNum;

		// First date in month and its day in week
		var firstDatePreM = new Date(bYear, bMonth, 1);
		var dayOfFirst = firstDatePreM.getDay();

		var numDaysPreM = (new Date(bYear, bMonth, 0)).getDate();
		var numDaysCurM = (new Date(bYear, bMonth + 1, 0)).getDate();
		var j = 0;

		//Show event of the first day in month
		var toDay = new Date();

		//Set order of days in week
		setOrderDaysInWeek(dayOfFirst);

		// Show event of today or first day of month
		if (bMonth == toDay.getMonth() && bYear == toDay.getFullYear()) {
			$scope.position = toDay;
		} else {
			$scope.position = firstDatePreM;
		};

		/** Build weeks and days in month **/

		newWeeks[0].days[dayOfFirst].numDate = 1;
		newWeeks[0].days[dayOfFirst].month = bMonth;
		for (j = 0; j < dayOfFirst; j++) {
			newWeeks[0].days[j].numDate = numDaysPreM - (dayOfFirst - 1 - j);
			newWeeks[0].days[j].month = (bMonth - 1 < 0) ? 11 : (bMonth - 1);
		}
		for (j = 6; j > dayOfFirst; j--) {
			newWeeks[0].days[j].numDate = 1 + (j - dayOfFirst);
			newWeeks[0].days[j].month = bMonth;
		}
		
		//Build row 1 to 4 of $scope.weeks array
		for (var i = 1; i < 5; i++) {
			for (j = 0; j < 7; j++) {
				var numDaysM;
				
				if (i == 1) {
					numDaysM = numDaysPreM;
				} else {
					numDaysM = numDaysCurM;
				}
				
				var numPreDate = newWeeks[i - 1].days[j].numDate;
				newWeeks[i].days[j].numDate = setNumDate(numPreDate,numDaysM);

				newWeeks[i].days[j].month = bMonth;
				if (i >= 3 && numPreDate + 7 > numDaysCurM) {
					newWeeks[i].days[j].month = (bMonth + 1 > 11) ? 0 : (bMonth + 1);
				}
			}
		}

		//If month has only 4 weeks
		if(newWeeks[0].days[0].numDate == 1 && newWeeks[3].days[6].numDate == numDaysCurM){
			newWeeks.splice(4,1);
		}

		var days, numDate;
		//Push new weeks has some days of next month
		if(newWeeks.length == 5){
			if (newWeeks[4].days[6].numDate < numDaysCurM && newWeeks[4].days[6].month == bMonth) {
				days = angular.copy(newWeeks[4].days);
				for (j = 0; j < 7; j++) {
					numDate = days[j].numDate;
					days[j].numDate = setNumDate(numDate,numDaysCurM);
					days[j].month = bMonth;
					if (newWeeks[4].days[j].numDate + 7 > numDaysCurM) {
						days[j].month = bMonth + 1;
					}
				}
				if(newWeeks.length < 6){
					newWeeks.push({ days: days });
				}
			}
		}

		//Push new weeks has some days of previous month
		if(newWeeks.length == 4){
			days = angular.copy(newWeeks[0].days);
			for(j = 0; j < 7; j++){
				numDate = days[j].numDate;
				var month = days[j].month;
				days[j].numDate = ((month == bMonth) ? numDate + numDaysPreM : days[j].numDate) - 7;
				days[j].month = (month == bMonth) ? month - 1 : month;
			}
			newWeeks.unshift({ days: days });
		}

		//Push new weeks has some days of next month
		if(newWeeks.length == 5){
			days = angular.copy(newWeeks[4].days);
			for(j = 0; j < 7; j++){
				numDate = days[j].numDate;
				month = days[j].month;
				days[j].numDate = setNumDate(numDate,numDaysCurM);
				days[j].month = (month == bMonth) ? month+1 : month;
			}
			newWeeks.push({ days: days });
		}

		$scope.weeks = angular.copy(newWeeks);
	};

	$scope.showListEvent = function(day, month, year) {
		if(day >= 0 && month >= 0 && year >= 0){
			if (month > $scope.curMonthNum) {
				if (month == 11 && $scope.curMonthNum === 0) {
					$scope.setMonthNum('prev');
				} else {
					$scope.setMonthNum('next');
				}
			} else if (month < $scope.curMonthNum) {
				if (month === 0 && $scope.curMonthNum == 11) {
					$scope.setMonthNum('next');
				} else {
					$scope.setMonthNum('prev');
				}
			}
			$scope.position = new Date(year, month, day);
			checkOnDay(month, day);
		}
	};

	//change from month calendar to months list
	$scope.changeState = function(){
		$scope.showMList = !$scope.showMList;
		$scope.showMCal = !$scope.showMCal;
		$scope.showM2Cal = !$scope.showM2Cal;
	};

	$scope.bkgE = 'bkg'; //set background for events

	//view detail of events
	$scope.viewE = function(event){
		//create EasiEvent obj
		var easiE = eEasiLendar.newEasiEvent(event);
		$rootScope.viewEvent(easiE);
	};
})

.directive('differentMonth', function($document) {
	return {
		restrict: 'A',
		scope: {
			isDifferent: '=differentMonth',
			isCurrentDay: '=currentDay'
		},
		link: function(scope, element, attr) {
			var toDay = new Date();
			var boolDay = scope.isCurrentDay == toDay.getDate();
			var boolMonth = scope.isDifferent == toDay.getMonth();
			var boolYear = attr.currentYear == toDay.getFullYear();

			if (boolDay && boolMonth && boolYear) {
				element.children().prop('checked',true);
				element.addClass('month-current-date-style');
			}
		
			if (scope.isDifferent != attr.currentMonth) {
				element.addClass('month-different-color');
			}
			
			$document.bind('click', function() {
				if (element.children().prop('checked') === false) {
					element.removeClass('month-radio-selected');
				} else {
					
					if (boolDay && boolMonth && boolYear) {
						element.addClass('month-current-date-style');
					} else {
						element.addClass('month-radio-selected');
					}
				}
			});
		}
	};
})

.directive('dayHasEvent', function() {
	return {
		restrict: 'A',
		scope: {
			haveEvent: '=dayHasEvent'
		},
		link: function(scope, element, attr) {
			if (scope.haveEvent != null) {
				var index = new Date(attr.year, attr.month, attr.date);
				var boolMonth = attr.month == attr.currentMonth;
				if (scope.haveEvent[index] != null && boolMonth) {
					element.parent().addClass('month-day-has-event');
				}
			}
		}
	};
})

.directive('checkFirstDay', function($document) {
	return {
		restrict: 'A',
		scope: {
			isFirstDate: '=checkFirstDay'
		},
		link: function(scope, element, attr) {
			element.bind('click', function() {
				var children = $document.find('td').children();
				if(children.hasClass('month-current-style') === true){
					children.removeClass('month-current-style');
				}

				var currentMonth = (new Date()).getMonth();
				var currentYear = (new Date()).getFullYear();
				var id;
				//check on first day when change month
				/*if ( scope.isFirstDate !== currentMonth){
					id = '#m' + scope.isFirstDate + '1';
					//Using find() function of JQUERY !
					$document.find(id).prop('checked', true);
				}*/

				//check on first day when change to current month but in other year
				if(scope.isFirstDate == currentMonth && attr.thisYear != currentYear){
					id = '#m' + scope.isFirstDate + '1';
					//Using find() function of JQUERY !
					$document.find(id).prop('checked', true);
				}
			});
		}
	};
})

.directive('checkThisMonth', function($document){
	return {
		restrict: 'A',
		scope: {
			isThisMonth: '=checkThisMonth'
		},
		link: function(scope, element) {
			//check on current day
			element.bind('click', function() {
				var id = '#' + scope.isThisMonth;
				//Using find() function of JQUERY !
				/*var className = 'month-current-style';
				$document.find(id).children().addClass(className);
				$document.find('#0').children().removeClass(className);*/
			});
		}
	};
})

.directive('checkFirstMonth',function($document){
	return {
		restrict: 'A',
		link: function(scope, element) {
			//check on first Month in month list
			var className = 'month-current-style';
			element.bind('click',function(){
				var children = $document.find('td').children();
				if(children.hasClass(className) === true){
					children.removeClass(className);
				}

				/*$document.find('#0').children().addClass(className);*/
			});
		}
	};
})

.directive('showEvents', function(){
	return{
		restrict: 'E',
		link: function(scope, element, attr){
			scope.date = new Date(attr.year, attr.month, attr.day);
		}
	};
})

.directive('backgroundColorEvent', function(){
	return {
		restrict: 'A',
		scope: {
			isType: '=backgroundColorEvent'
		},
		link: function(scope, element) {
			var allBkgClass = ['event-color-1', 'event-color-2',
				'event-color-3', 'event-color-4', 'event-color-5'];
			if (scope.isType == 'bkg') {
				element.addClass(allBkgClass[Math.floor((Math.random() * 5))]);
			}
		}
	};
})

.directive('currentDayAndDifferentMonth', function(){
	return {
		restrict: 'A',
		scope: {
			day: '=currentDayAndDifferentMonth'
		},
		link: function(scope, element, attr){
			var today = new Date();
			today = new Date(today.setHours(0,0));
			var date = new Date(attr.year, attr.month, scope.day);
			if(date.toString() == today.toString()){
				element.addClass('day-list-current-date');
			}
			if(attr.month != attr.currentMonth){
				element.addClass('month-different-opacity');
			}
		}
	};
});