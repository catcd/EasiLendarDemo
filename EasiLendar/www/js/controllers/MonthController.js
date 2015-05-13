/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 12/05/2015
 * type: month controller
 */
 
/*MONTH CONTROLLER*/
angular.module('MainApp.controllers.month', [])

.controller('MonthController',
	function($scope, $rootScope, $document, eDate,
	eCalendar, eUser, eSettings, eEasiLendar) {
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
		function(event, toState, toParams, fromState) {
			if (toState.name == 'month') {
				/* only change when go to 'month'
				from state differ 'week', 'list', 'day' */
				if(fromState.name != 'week'){
					if(fromState.name != 'list' && fromState.name != 'day'){
						//months list in year
						$scope.showMonthsList = false;
						$scope.showMonthCalendar = true;
						$scope.showMonthVer2Cal = true;
						var children = $document.find('td').children();
						if(children.hasClass('month-current-style') === true){
							children.removeClass('month-current-style');
						}
						$scope.buildCurrentMonth();
					}
				}
			}
		});

	$scope.buildCurrentMonth = function() {
		$scope.currentDate = new Date();
		$scope.currentDate = new Date($scope.currentDate.setHours(0,0,0,0));
		$scope.currentDateNumber = $scope.currentDate.getDate();
		$scope.currentMonthNumber = $scope.currentDate.getMonth();
		$scope.currentYear = $scope.currentDate.getFullYear();
		$scope.currentMonthString = eCalendar.months[$scope.currentMonthNumber];
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
				};
			}
		}

		//pristine value of $scope.weeks
		$scope.resetWeeks = angular.copy($scope.weeks);
		$scope.buildWeeks();
	};

	$scope.previousMonth = function() {
		var month = $scope.currentMonthNumber;
		month = (month - 1 >= 0 ? 0 : 12) + (month - 1);
		$scope.currentMonthNumber = month;
		$scope.currentMonthString = eCalendar.months[month];
		if ($scope.currentMonthNumber == 11) {
			$scope.currentYear--;
		}
		$scope.buildWeeks();
	};

	$scope.nextMonth = function() {
		var month = $scope.currentMonthNumber;
		month = (month + 1) - (month + 1 > 11 ? 12 : 0);
		$scope.currentMonthNumber = month;
		$scope.currentMonthString = eCalendar.months[month];
		if ($scope.currentMonthNumber === 0) {
			$scope.currentYear++;
		}
		$scope.buildWeeks();
	};

	$scope.thisMonth = function(year,month){
		if(year >= 0 && month >= 0 && month <= 11){
			$scope.currentMonthNumber = month;
			$scope.currentMonthString = eCalendar.months[month];
			$scope.currentYear = year;
			$scope.buildWeeks();
			$scope.changeState();
		}
	};

	$scope.previousYear = function(){
		$scope.currentYear--;
	};

	$scope.nextYear = function(){
		$scope.currentYear++;
	};

	$scope.buildWeeks = function() {
		var newWeeks = angular.copy($scope.resetWeeks);

		var bYear = $scope.currentYear;
		var bMonth = $scope.currentMonthNumber;

		var firstDatePreMonth = new Date(bYear, bMonth, 1);
		var dayOfFirstDate = 0;
		if ($scope.eSettings.sFirstDay == 'Sunday') {
			dayOfFirstDate = firstDatePreMonth.getDay();
			$scope.daysInWeek = [{day: 'S'},{day: 'M'},{day: 'T'},
								{day: 'W'},{day: 'T'},
								{day: 'F'},{day: 'S'}];
		}
		if ($scope.eSettings.sFirstDay == 'Monday') {
			dayOfFirstDate = firstDatePreMonth.getDay();
			dayOfFirstDate += (dayOfFirstDate > 0 ? -1 : 6);
			$scope.daysInWeek = [{day: 'M'},{day: 'T'},{day: 'W'},
								{day: 'T'},{day: 'F'},
								{day: 'S'},{day: 'S'}];
		}
		if ($scope.eSettings.sFirstDay == 'Saturday') {
			dayOfFirstDate = firstDatePreMonth.getDay();
			dayOfFirstDate += (dayOfFirstDate < 6 ? 1 : -6);
			$scope.daysInWeek = [{day: 'S'},{day: 'S'},{day: 'M'},
								{day: 'T'},{day: 'W'},
								{day: 'T'},{day: 'F'}];
		}
		var numberDaysPreviousMonth = (new Date(bYear, bMonth, 0)).getDate();
		var numberDaysCurrentMonth = (new Date(bYear, bMonth + 1, 0)).getDate();
		var j = 0;

		//Show event of the first day in month
		var toDay = new Date();
		toDay = new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getDate(), 0, 0, 0, 0);
		if (bMonth == toDay.getMonth() && bYear == toDay.getFullYear()) {
			$scope.position = toDay;
		} else {
			$scope.position = firstDatePreMonth;
		}
		$scope.eDate.cDate = angular.copy($scope.position);

		//Build weeks and days in month
		newWeeks[0].days[dayOfFirstDate].numberDate = 1;
		newWeeks[0].days[dayOfFirstDate].month = bMonth;
		for (j = 0; j < dayOfFirstDate; j++) {
			newWeeks[0].days[j].numberDate = numberDaysPreviousMonth - (dayOfFirstDate - 1 - j);
			newWeeks[0].days[j].month = (bMonth - 1 < 0) ? 11 : (bMonth - 1);
		}
		for (j = 6; j > dayOfFirstDate; j--) {
			newWeeks[0].days[j].numberDate = 1 + (j - dayOfFirstDate);
			newWeeks[0].days[j].month = bMonth;
		}

		var numberDaysMonth;
		//Build row 1 to 4 of $scope.weeks array
		for (var i = 1; i < 5; i++) {
			for (j = 0; j < 7; j++) {
				if (i == 1) {
					numberDaysMonth = numberDaysPreviousMonth;
				} else {
					numberDaysMonth = numberDaysCurrentMonth;
				}
				newWeeks[i].days[j].numberDate = (newWeeks[i - 1].days[j].numberDate + 7) - ((newWeeks[i - 1].days[j].numberDate + 7) > numberDaysMonth ? numberDaysMonth : 0);

				newWeeks[i].days[j].month = bMonth;
				if (i >= 3 && newWeeks[i - 1].days[j].numberDate + 7 > numberDaysCurrentMonth) {
					newWeeks[i].days[j].month = (bMonth + 1 > 11) ? 0 : (bMonth + 1);
				}
			}
		}

		//If month has only 4 weeks
		if(newWeeks[0].days[0].numberDate == 1 && newWeeks[3].days[6].numberDate == numberDaysCurrentMonth){
			newWeeks.splice(4,1);
		}

		var days;
		//Push new weeks has some days of next month
		if(newWeeks.length == 5){
			if (newWeeks[4].days[6].numberDate < numberDaysCurrentMonth && newWeeks[4].days[6].month == bMonth) {
				days = angular.copy(newWeeks[4].days);
				for (j = 0; j < 7; j++) {
					days[j].numberDate = (days[j].numberDate + 7) - ((days[j].numberDate + 7) > numberDaysCurrentMonth ? numberDaysCurrentMonth : 0);
					days[j].month = bMonth;
					if (newWeeks[4].days[j].numberDate + 7 > numberDaysCurrentMonth) {
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
				days[j].numberDate = ((days[j].month == bMonth) ? days[j].numberDate + numberDaysPreviousMonth : days[j].numberDate) - 7;
				days[j].month = (days[j].month == bMonth) ? days[j].month-1 : days[j].month;
			}

			newWeeks.unshift({ days: days });
		}

		//Push new weeks has some days of next month
		if(newWeeks.length == 5){
			days = angular.copy(newWeeks[4].days);
			for(j = 0; j < 7; j++){
				days[j].numberDate = (days[j].numberDate + 7) - ( (days[j].numberDate + 7 > numberDaysCurrentMonth) ? numberDaysCurrentMonth : 0 );
				days[j].month = (days[j].month == bMonth) ? days[j].month+1 : days[j].month;
			}

			newWeeks.push({ days: days });
		}

		$scope.weeks = angular.copy(newWeeks);
	};

	$scope.backgroundMonth = function(index) {
		var listStyle = 'list-bkg-style ' + 'easi-';
		var className = listStyle + eCalendar.shortMonths[index] + '-bkg';
		return className;
	};

	$scope.showListEvent = function(day, month, year) {
		if(day >= 0 && month >= 0 && year >= 0){
			if (month > $scope.currentMonthNumber) {
				if (month == 11 && $scope.currentMonthNumber === 0) {
					$scope.previousMonth();
				} else {
					$scope.nextMonth();
				}
			} else if (month < $scope.currentMonthNumber) {
				if (month === 0 && $scope.currentMonthNumber == 11) {
					$scope.nextMonth();
				} else {
					$scope.previousMonth();
				}
			}
			$scope.position = new Date(year, month, day);
			$scope.eDate.cDate = angular.copy($scope.position);
		}
	};

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
	$scope.showMonthVer2Cal = true;

	//change from month calendar to months list
	$scope.changeState = function(){
		$scope.showMonthsList = !$scope.showMonthsList;
		$scope.showMonthCalendar = !$scope.showMonthCalendar;
		$scope.showMonthVer2Cal = !$scope.showMonthVer2Cal;
	};

	/** Change month calendar when week calendar changes
	  * date: a date in month or weeks that is used to build calendar
	  */
	$rootScope.changeMonth = function(date){
		$scope.currentDate = date;
		$scope.currentDateNumber = date.getDate();
		$scope.currentMonthNumber = date.getMonth();
		$scope.currentYear = date.getFullYear();
		$scope.currentMonthString = eCalendar.months[$scope.currentMonthNumber];
		$scope.position = angular.copy(date);
		$scope.eDate.cDate = angular.copy($scope.position);

		$scope.buildWeeks();
	};

	/* Return today */
	$rootScope.monthToday = function(){
		var date = new Date();
		date = new Date(date.setHours(0,0,0,0));
		$scope.currentDate = date;
		$scope.currentDateNumber = date.getDate();
		$scope.currentMonthNumber = date.getMonth();
		$scope.currentYear = date.getFullYear();
		$scope.currentMonthString = eCalendar.months[$scope.currentMonthNumber];
		$scope.position = angular.copy(date);
		$scope.eDate.cDate = angular.copy($scope.position);

		$scope.buildWeeks();
	};

	$scope.bkgE = 'bkg'; //set background for events

	//view detail of events
	$scope.viewE = function(event){
		//create EasiEvent obj
		var easiE = eEasiLendar.newEasiEvent(
			event.summary, event.start, event.end,
			event.location, event.id, event.colorID,
			event.position, event.src, event.status
		);
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
			});

			$document.bind('click', function() {
				if (element.children().prop('checked') === false) {
					element.removeClass('month-radio-selected');
				} else {
					if (scope.isCurrentDay == toDay.getDate() && scope.isDifferent == toDay.getMonth() && year == toDay.getFullYear()) {
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
				var children = $document.find('td').children();
				if(children.hasClass('month-current-style') === true){
					children.removeClass('month-current-style');
				}

				var currentMonth = (new Date()).getMonth();
				var currentYear = (new Date()).getFullYear();
				var id;
				//check on first day when change month
				if ( scope.isFirstDate !== currentMonth){
					id = '#m' + scope.isFirstDate + '1';
					//Using find() function of JQUERY !
					$document.find(id).prop('checked', true);
				}

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
				var className = 'month-current-style';
				$document.find(id).children().addClass(className);
				$document.find('#0').children().removeClass(className);
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

				$document.find('#0').children().addClass(className);
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