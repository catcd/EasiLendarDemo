/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 12/05/2015
 * type: list controller
 */

angular.module('MainApp.controllers.list', [])

.controller('ListController',
	function($scope, $rootScope, $ionicScrollDelegate,
	$location, eUser, eCalendar, eEasiLendar, eSettings,
	eTimeHeap) {
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
		var day, firstDate, lastDate;
		var i = $scope.allWeeks.length;
		$scope.allWeeks[i] = { date: null, first: null, last: null};

		$scope.allWeeks[i].date = angular.copy(date);

		var month = date.getMonth();
		var year = date.getFullYear();

		//Week start from Sunday - Monday - Saturday
		if(eSettings.sFirstDay == 'Sunday'){
			firstDate = date.getDate() - date.getDay();
			$scope.allWeeks[i].first = new Date (year, month, firstDate);
			lastDate = date.getDate() + 6 - date.getDay();
			$scope.allWeeks[i].last = new Date (year, month, lastDate);
		}

		if(eSettings.sFirstDay == 'Monday'){
			day = date.getDay();
			firstDate = date.getDate() - ( (day === 0) ? 6 : (day-1) );
			$scope.allWeeks[i].first = new Date (year, month, firstDate);
			lastDate = date.getDate() + ( (day === 0) ? day : (7-day) );
			$scope.allWeeks[i].last = new Date (year, month, lastDate);
		}

		if(eSettings.sFirstDay == 'Saturday'){
			day = date.getDay();
			firstDate = date.getDate() - ( (day == 6) ? 0 : (day+1) );
			$scope.allWeeks[i].first = new Date (year, month, firstDate);
			lastDate = date.getDate() + ( (day == 6) ? 6 : (5-day) );
			$scope.allWeeks[i].last = new Date (year, month, lastDate);
		}
	};

	$scope.buildPrevWeek = function(date){
		var day, firstDate, lastDate;
		var objWeek = { date: null, first: null, last: null};

		objWeek.date = angular.copy(date);

		var month = date.getMonth();
		var year = date.getFullYear();

		//Week start from Sunday - Monday - Saturday
		if(eSettings.sFirstDay == 'Sunday'){
			firstDate = date.getDate() - date.getDay();
			objWeek.first = new Date(year, month, firstDate);
			lastDate = date.getDate() + 6 - date.getDay();
			objWeek.last = new Date(year, month, lastDate);
		}

		if(eSettings.sFirstDay == 'Monday'){
			day = date.getDay();
			firstDate = date.getDate() - ( (day === 0) ? 6 : (day-1) );
			objWeek.first = new Date (year, month, firstDate);
			lastDate = date.getDate() + ( (day === 0) ? day : (7-day) );
			objWeek.last = new Date (year, month, lastDate);
		}

		if(eSettings.sFirstDay == 'Saturday'){
			day = date.getDay();
			firstDate = date.getDate() - ( (day == 6) ? 0 : (day+1) );
			objWeek.first = new Date (year, month, firstDate);
			lastDate = date.getDate() + ( (day == 6) ? 6 : (5-day) );
			objWeek.last = new Date (year, month, lastDate);
		}

		$scope.allWeeks.unshift(objWeek);
	};

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
		function(event, toState) {
			if (toState.name == 'list') {
				$scope.allWeeks = [];
				$scope.buildNextWeek(toDay);
				$scope.changeMonth(toDay);
				$rootScope.listToday();
			}
		});

	//Load NEXT week when scroll UP
	$scope.scrollNext = function(){
		var date = angular.copy($scope.allWeeks[$scope.allWeeks.length-1].date);
		var year = date.getFullYear();
		var month = date.getMonth();
		$scope.buildNextWeek( new Date(year, month, date.getDate()+1 ) );
	};

	//Load PREVIOUS week when scroll DOWN
	$scope.scrollPrev = function(){
		var date = angular.copy($scope.allWeeks[0].date);
		var year = date.getFullYear();
		var month = date.getMonth();
		$scope.buildPrevWeek( new Date(year, month, date.getDate()-1 ) );
	};

	//The position of ion-content after each scrolling.
	$scope.lastPosContent = 0;
	//time to call scrollUp and scrollDown function
	$scope.setTimeOut = 0;

	//Called when scroll is activing
	$scope.handleScrolling = function(){
		var content = document.getElementById('list-div-calendar');
		var posContent = content.getBoundingClientRect();

		//Scroll previous date when posContent.top increase
		if(posContent.top > $scope.lastPosContent){
			var topElm = document.getElementById('list-calendar-title');
			var top = topElm.getBoundingClientRect().height - 50;
			var idOfFirst = $scope.allWeeks[0].first.toDateString();
			var firstTable = document.getElementById(idOfFirst);
			var posFirst = firstTable.getBoundingClientRect();

			if(posFirst.top - 100 >= top){
				//while($scope.setTimeOut < 14){
					$scope.scrollPrev();
					//$scope.setTimeOut++;
				//}
				$scope.$apply();
			}
		}
		//Scroll next date when posContent.top reduce
		else if(posContent.top < $scope.lastPosContent){
			var winHeight = window.innerHeight;
			var length = $scope.allWeeks.length;
			var idOfLast = $scope.allWeeks[length-1].first.toDateString();
			var lastTable = document.getElementById(idOfLast);
			var posLast = lastTable.getBoundingClientRect();

			if(posLast.bottom <= winHeight + 200){
				//while($scope.setTimeOut < 14){
					$scope.scrollNext();
					//$scope.setTimeOut++;
				//}
				$scope.$apply();
			}
		}
	};

	//Called when scroll stops
	$scope.whenStopScrolling = function(){
		var content = document.getElementById('list-div-calendar');
		var posContent = content.getBoundingClientRect();
		$scope.lastPosContent = angular.copy(posContent.top);
		$scope.setTimeOut = 0;
	};

	//Scroll to current day in list
	$scope.currDay = toDay;
	$rootScope.listToday = function(){
		var topElm = document.getElementById('list-calendar-title');
		var top = topElm.getBoundingClientRect().height + 25;
		var currDay = document.getElementById('date-' + toDay.toDateString());
		var currPos = currDay.getBoundingClientRect();

		if(currPos.top < 0){
			$ionicScrollDelegate.scrollBy(0,-(top+currPos.top),false);
		}	
		else if(currPos.top > 0){
			$ionicScrollDelegate.scrollBy(0,currPos.top-top,false);
		}
	};

	//set random background event
	$scope.bkgE = 'bkg';

	//view detail of events
	$scope.viewE = function(event){
		//create EasiEvent obj
		var easiE = eEasiLendar.newEasiEvent(event);
		$rootScope.viewEvent(easiE);
	};
})

.directive('listEvents', function(){
	return{
		restrict: 'E',
		controller: 'ListController',
		link: function(scope){
			var topElm = document.getElementById('list-calendar-title');
			var top = topElm.getBoundingClientRect().height + 60;
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
					if(tableElm !== undefined){
						if(tablePos.top <= top){
							date = new Date( tableElm.attr('id') );
						}
					}
				}
				if(date !== undefined && date !== null){
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
		link: function(scope, element) {
			var allBkgClass = ['event-color-1',
				'event-color-2', 'event-color-3',
				'event-color-4', 'event-color-5'];
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
			var numberDate = toDay.getDate();
			var month = toDay.getMonth();
			var year = toDay.getFullYear();

			var attrMonth = attr.currentMonth;
			var attrYear = attr.currentYear;
			if (scope.isToDay == numberDate && attrMonth == month) {
				if(attrYear == year){
					element.addClass('list-current-date');
				}
			}
		}
	};
});

