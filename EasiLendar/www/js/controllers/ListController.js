/**
 * starter: Can Duy Cat
 * owner: Nguo Duc Dung
 * last update: 17/04/2015
 * type: list controller
 */

angular.module('MainApp.controllers.list', [])

.controller("ListController", function($scope, $rootScope, $ionicScrollDelegate, $location) {
	var toDay = new Date();
	toDay = new Date(toDay.setHours(0,0,0,0));

	/** Contructor current month list
	* weeks: array of all days in month
	* length: number of days in month
	* first: first day of month
	* last: last day of month
	* events: false if month doen not have any events
	*/
	
	//build next Month
	$scope.buildNextMonth = function(date){
		var i = $scope.allMonths.length;
		$scope.allMonths[i] = {weeks: [], length: 0, first: null, last: null, events: false};

		$scope.allMonths[i].first = new Date(date.getFullYear(), date.getMonth() + i, 1);
		$scope.allMonths[i].last = new Date(date.getFullYear(), date.getMonth() + i + 1, 0);
		var d = $scope.allMonths[i].last;
		$scope.allMonths[i].length = d.getDate();

		for(var j=1; j<=$scope.allMonths[i].length; j++){
			$scope.allMonths[i].weeks.push(new Date(d.getFullYear(), d.getMonth(), j));

			if($rootScope.eUser.uGmailCalendar !== null){
				if(j >= 1 && $rootScope.eUser.uGmailCalendar[$scope.allMonths[i].weeks[j-1].toString()] !== undefined){
					$scope.allMonths[i].events = true;
				}
			}
		}
	};

	//build previous Month
	$scope.buildPrevMonth = function(date){
		var obj = { weeks: [], length: 0, first: null, last: null, events: false };
		obj.first = new Date(date.getFullYear(), date.getMonth() - 1, 1);
		obj.last = new Date(date.getFullYear(), date.getMonth(),0);
		obj.length =  obj.last.getDate();

		for(var j=1; j<=obj.weeks.length; j++){
			obj.weeks.push(new Date(obj.last.getFullYear(), obj.last.getMonth(), j));
			if($rootScope.eUser.uGmailCalendar !== null){
				if(j>=1 && $rootScope.eUser.uGmailCalendar[obj.weeks[j-1].toString()] !== undefined){
					obj.events = true;
				}
			}
		}

		$scope.allMonths.unshift(obj);
	}

	//Change month and year
	$scope.changeMonth = function(date){
		$scope.currentMonthNumber = date.getMonth();
		$scope.currentYear = date.getFullYear();
	};

	$scope.allMonths = [];
	$scope.buildNextMonth(toDay);
	$scope.changeMonth(toDay);


	/* Set pixel for some positions */
	var top = document.getElementById('list-calendar-title').getBoundingClientRect().height + 60;
	var winHeight = window.innerHeight;

	//Load next month when scroll UP
	$scope.scrollUp = function(){
		var lastTable = document.getElementById($scope.allMonths[$scope.allMonths.length-1].first.toDateString());
		var posLast = lastTable.getBoundingClientRect();

		if(posLast.bottom <= winHeight - 30){
			var date = $scope.allMonths[$scope.allMonths.length-1].first;
			$scope.buildNextMonth(date);
		}
	};

	//Load previous month when scroll DOWN
	$scope.scrollDown = function(){
		var firstTable = document.getElementById($scope.allMonths[0].first.toDateString());
		var posFirst = firstTable.getBoundingClientRect();

		if(posFirst.top >= top){
			var date = $scope.allMonths[0].first;
			$scope.buildPrevMonth(date);
		}
	}

	console.log($scope.allMonths);

	//set random background event
	$scope.bkgE = 'bkg';

	//set month background
	$scope.background = function(index) {
		var className = 'bkg-style ' + 'easi-' + $rootScope.shortMonths[index] + '-bkg';
		return className;
	}
})

/*.directive('scrollWatch', function(){
	return{
		restrict: 'A',
		controller: 'ListController',
		link: function(scope, element, attr){
			
		}
	};
})*/

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
				element.addClass('current-date-list');
			}

			/*element.bind('click', function(){
				console.log(element.parent().attr('id'));
			})*/
		}
	};
})

