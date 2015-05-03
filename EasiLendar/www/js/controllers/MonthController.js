/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 03/05/2015
 * type: month controller
 */
 
/*MONTH CONTROLLER*/
angular.module('MainApp.controllers.month', [])

.controller("MonthController", function($scope, $rootScope, $document, eDate, eCalendar, eUser, eSettings, eEasiLendar) {
	//Using eUser, eSettings, eDate, eCalendar factory
	$scope.eCalendar = eCalendar;
	$scope.eDate = eDate;
	$scope.eUser = eUser;
	$scope.eSettings = eSettings;

	$scope.allMonths = [
					{first: 0, second: 1, third: 2, fourth: 3},
					{first: 4, second: 5, third: 6, fourth: 7},
					{first: 8, second: 9, third: 10, fourth: 11}
					];
	//refresh calendar when return from other states
	$rootScope.$on('$stateChangeStart',
		function(event, toState, toParams, fromState, fromParams) {
			if (toState.name == 'month') {
				//months list in year
				$scope.showMonthsList = false;
				$scope.showMonthCalendar = true;
				if($document.find('td').children().hasClass('month-current-style') == true){
					$document.find('td').children().removeClass('month-current-style');
				}
				$scope.buildCurrentMonth();
			}
		});

	$scope.buildCurrentMonth = function() {
		$scope.currentDate = new Date();
		$scope.currentDate = new Date($scope.currentDate.setHours(0,0,0,0));
		$scope.currentDateNumber = $scope.currentDate.getDate();
		$scope.currentMonthNumber = $scope.currentDate.getMonth();
		$scope.currentYear = $scope.currentDate.getFullYear();
		$scope.currentMonthString = $scope.eCalendar.months[$scope.currentMonthNumber];
		$scope.position = angular.copy($scope.currentDate);
		$scope.eDate.cDate = angular.copy($scope.position);
		
		/** All weeks of a month
		  * week: array of days in month
		  * days: array of 7 days in month
		  * numberDate: date
		  * month: month of date
		  */
		$scope.weeks = new Array(5);
		for (var i = 0; i < 5; i++) {
			$scope.weeks[i] = {
				days: new Array(7)
			};
			for (var j = 0; j < 7; j++) {
				$scope.weeks[i].days[j] = {
					numberDate: 0,
					month: 0
				}
			}
		}

		//pristine value of $scope.weeks
		$scope.resetWeeks = angular.copy($scope.weeks);
		$scope.buildWeeks();
	}

	$scope.previousMonth = function() {
		$scope.currentMonthNumber = ($scope.currentMonthNumber - 1 >= 0 ? 0 : 12) + ($scope.currentMonthNumber - 1);
		$scope.currentMonthString = $scope.eCalendar.months[$scope.currentMonthNumber];
		if ($scope.currentMonthNumber == 11) {
			$scope.currentYear--;
		}
		$scope.buildWeeks();
	};

	$scope.nextMonth = function() {
		$scope.currentMonthNumber = ($scope.currentMonthNumber + 1) - ($scope.currentMonthNumber + 1 > 11 ? 12 : 0);
		$scope.currentMonthString = $scope.eCalendar.months[$scope.currentMonthNumber];
		if ($scope.currentMonthNumber == 0) {
			$scope.currentYear++;
		}
		$scope.buildWeeks();
	}

	$scope.thisMonth = function(year,month){
		if(year >= 0 && month >= 0 && month <= 11){
			$scope.currentMonthNumber = month;
			$scope.currentMonthString = $scope.eCalendar.months[$scope.currentMonthNumber];
			$scope.currentYear = year;
			$scope.buildWeeks();
			$scope.changeState();
		}
	}

	$scope.previousYear = function(){
		$scope.currentYear--;
	}

	$scope.nextYear = function(){
		$scope.currentYear++;
	}

	$scope.buildWeeks = function() {
		var newWeeks = angular.copy($scope.resetWeeks);
		var firstDatePreviousMonth = new Date($scope.currentYear, $scope.currentMonthNumber, 1);
		var dayOfFirstDate = 0;
		if ($scope.eSettings.sFirstDay == 'Sunday') {
			dayOfFirstDate = firstDatePreviousMonth.getDay();
			$scope.daysInWeek = [{day: 'S'},{day: 'M'},{day: 'T'},{day: 'W'},{day: 'T'},{day: 'F'},{day: 'S'}];
		}
		if ($scope.eSettings.sFirstDay == 'Monday') {
			dayOfFirstDate = firstDatePreviousMonth.getDay();
			dayOfFirstDate += (dayOfFirstDate > 0 ? -1 : 6);
			$scope.daysInWeek = [{day: 'M'},{day: 'T'},{day: 'W'},{day: 'T'},{day: 'F'},{day: 'S'},{day: 'S'}];
		}
		if ($scope.eSettings.sFirstDay == 'Saturday') {
			dayOfFirstDate = firstDatePreviousMonth.getDay();
			dayOfFirstDate += (dayOfFirstDate < 6 ? 1 : -6);
			$scope.daysInWeek = [{day: 'S'},{day: 'S'},{day: 'M'},{day: 'T'},{day: 'W'},{day: 'T'},{day: 'F'}];
		}
		var numberDaysPreviousMonth = (new Date($scope.currentYear, $scope.currentMonthNumber, 0)).getDate();
		var numberDaysCurrentMonth = (new Date($scope.currentYear, $scope.currentMonthNumber + 1, 0)).getDate();
		var j = 0;

		//Show event of the first day in month
		var toDay = new Date();
		toDay = new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getDate(), 0, 0, 0, 0);
		if ($scope.currentMonthNumber == toDay.getMonth() && $scope.currentYear == toDay.getFullYear()) {
			$scope.position = toDay;
		} else {
			$scope.position = firstDatePreviousMonth;
		}
		$scope.eDate.cDate = angular.copy($scope.position);

		//Build weeks and days in month
		newWeeks[0].days[dayOfFirstDate].numberDate = 1;
		newWeeks[0].days[dayOfFirstDate].month = $scope.currentMonthNumber;
		for (j = 0; j < dayOfFirstDate; j++) {
			newWeeks[0].days[j].numberDate = numberDaysPreviousMonth - (dayOfFirstDate - 1 - j);
			newWeeks[0].days[j].month = ($scope.currentMonthNumber - 1 < 0) ? 11 : ($scope.currentMonthNumber - 1);
		}
		for (j = 6; j > dayOfFirstDate; j--) {
			newWeeks[0].days[j].numberDate = 1 + (j - dayOfFirstDate);
			newWeeks[0].days[j].month = $scope.currentMonthNumber;
		}

		//Build row 1 to 4 of $scope.weeks array
		for (var i = 1; i < 5; i++) {
			for (j = 0; j < 7; j++) {
				if (i == 1) {
					var numberDaysMonth = numberDaysPreviousMonth;
				} else {
					numberDaysMonth = numberDaysCurrentMonth;
				}
				newWeeks[i].days[j].numberDate = (newWeeks[i - 1].days[j].numberDate + 7) - ((newWeeks[i - 1].days[j].numberDate + 7) > numberDaysMonth ? numberDaysMonth : 0);

				newWeeks[i].days[j].month = $scope.currentMonthNumber;
				if (i >= 3 && newWeeks[i - 1].days[j].numberDate + 7 > numberDaysCurrentMonth) {
					newWeeks[i].days[j].month = ($scope.currentMonthNumber + 1 > 11) ? 0 : ($scope.currentMonthNumber + 1);
				}
			}
		}

		//If month has only 4 weeks
		if(newWeeks[0].days[0].numberDate == 1 && newWeeks[3].days[6].numberDate == numberDaysCurrentMonth){
			newWeeks.splice(4,1);
		}

		//Push new weeks has some days of next month
		if(newWeeks.length == 5){
			if (newWeeks[4].days[6].numberDate < numberDaysCurrentMonth && newWeeks[4].days[6].month == $scope.currentMonthNumber) {
				var days = angular.copy(newWeeks[4].days);
				for (j = 0; j < 7; j++) {
					days[j].numberDate = (days[j].numberDate + 7) - ((days[j].numberDate + 7) > numberDaysCurrentMonth ? numberDaysCurrentMonth : 0);
					days[j].month = $scope.currentMonthNumber;
					if (newWeeks[4].days[j].numberDate + 7 > numberDaysCurrentMonth) {
						days[j].month = $scope.currentMonthNumber + 1;
					}
				}

				if(newWeeks.length < 6){
					newWeeks.push({ days: days });
				}
			}
		}

		//Push new weeks has some days of previous month
		if(newWeeks.length == 4){
			var days = angular.copy(newWeeks[0].days);
			for(j = 0; j < 7; j++){
				days[j].numberDate = ((days[j].month == $scope.currentMonthNumber) ? days[j].numberDate + numberDaysPreviousMonth : days[j].numberDate) - 7;
				days[j].month = (days[j].month == $scope.currentMonthNumber) ? days[j].month-1 : days[j].month;
			}

			newWeeks.unshift({ days: days });
		}

		//Push new weeks has some days of next month
		if(newWeeks.length == 5){
			var days = angular.copy(newWeeks[4].days);
			for(j = 0; j < 7; j++){
				days[j].numberDate = (days[j].numberDate + 7) - ( (days[j].numberDate + 7 > numberDaysCurrentMonth) ? numberDaysCurrentMonth : 0 );
				days[j].month = (days[j].month == $scope.currentMonthNumber) ? days[j].month+1 : days[j].month;
			}

			newWeeks.push({ days: days });
		}

		$scope.weeks = angular.copy(newWeeks);
	}

	$scope.backgroundMonth = function(index) {
		var className = 'list-bkg-style ' + 'easi-' + $scope.eCalendar.shortMonths[index] + '-bkg';
		return className;
	}

	$scope.showListEvent = function(day, month, year) {
		if(day >= 0 && month >= 0 && year >= 0){
			if (month > $scope.currentMonthNumber) {
				if (month == 11 && $scope.currentMonthNumber == 0) {
					$scope.previousMonth();
				} else {
					$scope.nextMonth();
				}
			} else if (month < $scope.currentMonthNumber) {
				if (month == 0 && $scope.currentMonthNumber == 11) {
					$scope.nextMonth();
				} else {
					$scope.previousMonth();
				}
			}
			$scope.position = new Date(year, month, day, 0, 0, 0, 0);
			$scope.eDate.cDate = angular.copy($scope.position);
		}
	}

	// Increment carousel thing
	$scope.next = function() {
		$scope.nextMonth();
	};
	// Decrement carousel thing
	$scope.prev = function() {
		$scope.previousMonth();
	};

	//months list in year
	$scope.showMonthsList = false;
	$scope.showMonthCalendar = true;

	//change from month calendar to months list
	$scope.changeState = function(){
		$scope.showMonthsList = !$scope.showMonthsList;
		$scope.showMonthCalendar = !$scope.showMonthCalendar;
	}

	/** Change month calendar when week calendar changes
	  * date: a date in month or weeks that is used to build calendar
	  */
	$rootScope.changeMonth = function(date){
		$scope.currentDate = date;
		$scope.currentDateNumber = date.getDate();
		$scope.currentMonthNumber = date.getMonth();
		$scope.currentYear = date.getFullYear();
		$scope.currentMonthString = $scope.eCalendar.months[$scope.currentMonthNumber];
		$scope.position = angular.copy(date);
		$scope.eDate.cDate = angular.copy($scope.position);

		$scope.buildWeeks();
	};

	/* Return today */
	$rootScope.monthToday = function(){
		var date = new Date();
		data = new Date(date.setHours(0,0,0,0));
		$scope.currentDate = date;
		$scope.currentDateNumber = date.getDate();
		$scope.currentMonthNumber = date.getMonth();
		$scope.currentYear = date.getFullYear();
		$scope.currentMonthString = $scope.eCalendar.months[$scope.currentMonthNumber];
		$scope.position = angular.copy(date);
		$scope.eDate.cDate = angular.copy($scope.position);

		$scope.buildWeeks();
	}

	$scope.bkgE = 'bkg'; //set background for events

	//view detail of events
	$scope.viewE = function(event){
		//create EasiEvent obj
		var easiE = eEasiLendar.newEasiEvent(event.summary, event.start, event.end, event.location, event.id, event.colorID, event.position, event.src, event.status);
		$rootScope.viewEvent(easiE);
	}
})

.directive('differentMonth', function($document) {
	return {
		restrict: 'A',
		scope: {
			isDifferent: "=differentMonth",
			isCurrentDay: "=currentDay"
		},
		link: function(scope, element, attr) {
			var month = attr.currentMonth;
			var year = attr.currentYear;
			var toDay = new Date();
			if (scope.isCurrentDay == toDay.getDate() && scope.isDifferent == toDay.getMonth() && year == toDay.getFullYear()) {
				element.children().prop('checked',true);
				element.addClass('month-current-date-style');
			}
		
			if (scope.isDifferent != month) {
				element.addClass('month-different-color');
			}
			
			//check on a day when change month
			element.bind('click', function() {
				var id = '#m' + scope.isDifferent + scope.isCurrentDay;
				//Using find() function of JQUERY !
				$document.find(id).prop('checked', true);
			})

			$document.bind('click', function() {
				if (element.children().prop('checked') == false) {
					element.removeClass('month-radio-selected');
				} else {
					if (scope.isCurrentDay == toDay.getDate() && scope.isDifferent == toDay.getMonth() && year == toDay.getFullYear()) {
						element.addClass('month-current-date-style');
					} else {
						element.addClass('month-radio-selected');
					}
				}
			})
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
				var index = new Date(attr.year, attr.month, attr.date, 0, 0, 0, 0);
				if (scope.haveEvent[index] != null && attr.month == attr.currentMonth) {
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
				if($document.find('td').children().hasClass('month-current-style') == true){
					$document.find('td').children().removeClass('month-current-style');
				}

				var currentMonth = (new Date()).getMonth();
				var currentYear = (new Date()).getFullYear();

				//check on first day when change month
				if ( scope.isFirstDate !== currentMonth){
					var id = '#m' + scope.isFirstDate + '1';
					//Using find() function of JQUERY !
					$document.find(id).prop('checked', true);
				}

				//check on first day when change to current month but in other year
				if(scope.isFirstDate == currentMonth && attr.thisYear != currentYear){
					var id = '#m' + scope.isFirstDate + '1';
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
		link: function(scope, element, attr) {
			var currentMonth = (new Date()).getMonth();

			//check on current day
			element.bind('click', function() {
				var id = '#' + scope.isThisMonth;
				//Using find() function of JQUERY !
				$document.find(id).children().addClass('month-current-style');
			});
		}
	};
})

.directive('checkFirstMonth',function($document){
	return {
		restrict: 'A',
		link: function(scope, element, attr) {
			//check on first Month in month list
			element.bind('click',function(){
				if($document.find('td').children().hasClass('month-current-style') == true){
					$document.find('td').children().removeClass('month-current-style');
				}

				$document.find('#0').children().addClass('month-current-style');
			})
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
		link: function(scope, element, attr) {
			var allBkgClass = ['event-color-1', 'event-color-2',
				'event-color-3', 'event-color-4', 'event-color-5'
			];
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
			today = new Date(today.setHours(0,0,0,0));
			var date = new Date(attr.year, attr.month, scope.day, 0,0,0,0);
			if(date.toString() == today.toString()){
				element.addClass('day-list-current-date');
			}
			if(attr.month != attr.currentMonth){
				element.addClass('month-different-opacity');
			}
		}
	};
});