/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 09/05/2015
 * type: list controller
 */

angular.module('MainApp.controllers.list', [])

.controller("ListController", function($scope, $rootScope, $ionicScrollDelegate, $location, eUser, eCalendar, eEasiLendar, eSettings) {
	//Using eUser, eCalendar factory
	$scope.eUser = eUser;
	$scope.eCalendar = eCalendar;

	var toDay = new Date();
	toDay = new Date(toDay.setHours(0,0,0,0));


	/* Build next weeks has date
	 allWeeks include many arrays; each array is a week in year.
	 week: is a week; array of dates in week
	 last: last date of week
	 first: frist date of week
	*/
	$scope.buildNextWeek = function(date){
		var day;
		var i = $scope.allWeeks.length;
		$scope.allWeeks[i] = { week: [], first: null, last: null};
		//Week start from Sunday - Monday - Saturday
		if(eSettings.sFirstDay == 'Sunday'){
			day = date.getDay();
		}

		if(eSettings.sFirstDay == 'Monday'){
			day = date.getDay();
			day += (day == 0) ? (6):(-1);
		}

		if(eSettings.sFirstDay == 'Saturday'){
			day = date.getDay();
			day += (day == 6) ? (-6):(1);
		}

		$scope.allWeeks[i].week[day] = angular.copy(date);
		var j;

		//build previous days of date in week
		for(j=day-1; j>=0; j--){
			var d = $scope.allWeeks[i].week[j+1];
			$scope.allWeeks[i].week[j] = new Date( d.getFullYear(), d.getMonth(), d.getDate() - 1 );
		}
		$scope.allWeeks[i].first = angular.copy($scope.allWeeks[i].week[0]);

		//build next days of date in week
		for(j=day+1; j<=6; j++){
			var d = $scope.allWeeks[i].week[j-1];
			$scope.allWeeks[i].week[j] = new Date( d.getFullYear(), d.getMonth(), d.getDate() + 1 );
		}
		$scope.allWeeks[i].last = angular.copy($scope.allWeeks[i].week[6]);
		//console.log($scope.allWeeks);
	};

	$scope.buildPrevWeek = function(date){
		var day;
		var objWeek = { week: [], first: null, last: null};
		//Week start from Sunday - Monday - Saturday
		if(eSettings.sFirstDay == 'Sunday'){
			day = date.getDay();
		}

		if(eSettings.sFirstDay == 'Monday'){
			day = date.getDay();
			day += (day == 0) ? (6):(-1);
		}

		if(eSettings.sFirstDay == 'Saturday'){
			day = date.getDay();
			day += (day == 6) ? (-6):(1);
		}

		objWeek.week[day] = angular.copy(date);
		var j;

		//build next days of date in week
		for(j=day+1; j<=6; j++){
			var d = objWeek.week[j-1];
			objWeek.week[j] = new Date( d.getFullYear(), d.getMonth(), d.getDate() + 1 );
		}
		//build previous days of date in week
		for(j=day-1; j>=0; j--){
			var d = objWeek.week[j+1];
			objWeek.week[j] = new Date( d.getFullYear(), d.getMonth(), d.getDate() - 1 );
		}
		objWeek.first = angular.copy(objWeek.week[0]);
		objWeek.last = angular.copy(objWeek.week[6]);

		$scope.allWeeks.unshift(objWeek);
		//console.log($scope.allWeeks);
	}

	//Change month and year
	$scope.changeMonth = function(date){
		$scope.currentMonthNumber = date.getMonth();
		$scope.currentYear = date.getFullYear();
	};

	$scope.allWeeks = [];
	$scope.buildNextWeek(toDay);
	$scope.changeMonth(toDay);

	//Reset data
	$rootScope.$on('$stateChangeStart',
		function(event, toState, toParams, fromState, fromParams) {
			if (toState.name == 'list') {
				$scope.allWeeks = [];
				$scope.buildNextWeek(toDay);
				$scope.changeMonth(toDay);
				$rootScope.listToday();
			}
		});

	//Load NEXT week when scroll UP
	$scope.scrollUp = function(){
		/*var top = document.getElementById('list-calendar-title').getBoundingClientRect().height + 25;
		var winHeight = window.innerHeight;
		var lastTable = document.getElementById($scope.allWeeks[$scope.allWeeks.length-1].first.toDateString());
		var posLast = lastTable.getBoundingClientRect();*/

		//if(posLast.bottom <= winHeight - 30){
		var date = angular.copy($scope.allWeeks[$scope.allWeeks.length-1].last);
		$scope.buildNextWeek( new Date( date.getFullYear(), date.getMonth(), date.getDate()+1 ) );
		//}
	};

	//Load PREVIOUS week when scroll DOWN
	$scope.scrollDown = function(){
		/*var top = document.getElementById('list-calendar-title').getBoundingClientRect().height - 50;
		var winHeight = window.innerHeight;
		var firstTable = document.getElementById($scope.allWeeks[0].first.toDateString());
		var posFirst = firstTable.getBoundingClientRect();*/

		//if(posFirst.top - 120 >= top){
		var date = angular.copy($scope.allWeeks[0].first);
		$scope.buildPrevWeek( new Date( date.getFullYear(), date.getMonth(), date.getDate()-1 ) );
		//}
	};

	$scope.lastPosContent = 0;				//The position of ion-content after each scrolling.
	$scope.setTimeOut = 0;					//time to call scrollUp and scrollDown function
	//Called when scroll is activing
	$scope.handleScrolling = function(){
		var content = document.getElementById('list-div-calendar');
		var posContent = content.getBoundingClientRect();

		//Scroll Up when posContent.top increase
		if(posContent.top > $scope.lastPosContent){
			while($scope.setTimeOut < 1){
				$scope.scrollDown();
				$scope.setTimeOut++;
				$scope.$apply();
			}
		}
		//Scroll Down when posContent.top reduce
		else if(posContent.top < $scope.lastPosContent){
			while($scope.setTimeOut < 1){
				$scope.scrollUp();
				$scope.setTimeOut++;
				$scope.$apply();
			}
		}
		else {}
	}

	//Called when scroll stops
	$scope.whenStopScrolling = function(){
		var content = document.getElementById('list-div-calendar');
		var posContent = content.getBoundingClientRect();
		$scope.lastPosContent = angular.copy(posContent.top);
		$scope.setTimeOut = 0;
		console.log('Stop');
	}

	//Scroll to current day in list
	$scope.currDay = toDay;
	$rootScope.listToday = function(){
		var top = document.getElementById('list-calendar-title').getBoundingClientRect().height + 25;
		var winHeight = window.innerHeight;
		var currDay = document.getElementById('date-' + toDay.toDateString());

		var currDayElm = angular.element(currDay);
		var currPos = currDay.getBoundingClientRect();

		if(currPos < 0){
			$ionicScrollDelegate.scrollBy(0,-(top+currPos.top),false);
		}	
		else{
			$ionicScrollDelegate.scrollBy(0,currPos.top-top,false);
		}
	};

	//set random background event
	$scope.bkgE = 'bkg';

	//set month background
	$scope.background = function(index) {
		var className = 'list-bkg-style ' + 'easi-' + $scope.eCalendar.shortMonths[index] + '-bkg';
		return className;
	}

	//view detail of events
	$scope.viewE = function(event){
		//create EasiEvent obj
		var easiE = eEasiLendar.newEasiEvent(event.summary, event.start, event.end, event.location, event.id, event.colorID, event.position, event.src, event.status);
		$rootScope.viewEvent(easiE);
	}
})

.directive('listEvents', function(){
	return{
		restrict: 'E',
		controller: 'ListController',
		link: function(scope, element, attr){
			var top = document.getElementById('list-calendar-title').getBoundingClientRect().height + 60;
			var winHeight = window.innerHeight;

			var today = new Date();
			scope.currMonth = today.getMonth();
			scope.currYear = today.getFullYear();

			var content = document.getElementById('list-content-calendar');
			var contentElm = angular.element(content);
			var tables = content.getElementsByTagName('table');

			contentElm.bind('scroll', function(){
				var date;
				for(var i=0; i<tables.length; i++){
					var tableElm = angular.element(tables[i]);
					var tablePos = tables[i].getBoundingClientRect();
					if(tableElm != undefined){
						if(tablePos.top <= top){
							date = new Date( tableElm.attr('id') );
						}
					}
				}
				if(date != undefined && date != null){
					scope.currMonth = date.getMonth();
					scope.currYear = date.getFullYear();
					scope.$apply();
				}
			});
		}
	};
})

.directive('backgroundEvent', function() {
	return {
		restrict: 'A',
		scope: {
			isType: '=backgroundEvent'
		},
		link: function(scope, element, attr) {
			var allBkgClass = ['birthday-background', 'holiday-background', 'hotel-background',
				'restaurant-background', 'ticket-background', 'event-color-1', 'event-color-2',
				'event-color-3', 'event-color-4', 'event-color-5'
			];
			if (scope.isType == 'bkg') {
				element.addClass(allBkgClass[Math.floor((Math.random() * 10))]);
			}
		}
	};
})


.directive('currentTime', function() {
	return {
		restrict: 'A',
		scope: {
			isToDay: '=currentTime'
		},
		link: function(scope, element, attr) {
			var toDay = new Date();
			var month = toDay.getMonth();
			var year = toDay.getFullYear();
			if (scope.isToDay == toDay.getDate() && attr.currentMonth == month && attr.currentYear == year) {
				element.addClass('list-current-date');
			}
		}
	};
})

