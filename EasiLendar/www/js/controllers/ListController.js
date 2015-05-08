/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 08/05/2015
 * type: list controller
 */

angular.module('MainApp.controllers.list', [])

.controller("ListController", function($scope, $rootScope, $ionicScrollDelegate, $location, eUser, eCalendar, eEasiLendar) {
	//Using eUser, eCalendar factory
	$scope.eUser = eUser;
	$scope.eCalendar = eCalendar;

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

			if($scope.eUser.uGmailCalendar != null){
				if(j > 1 && $scope.eUser.uGmailCalendar[$scope.allMonths[i].weeks[j-1].toString()] != undefined){
					$scope.allMonths[i].events = true;
				}
			}
		}

		if($scope.allMonths[i].events == false){
			$scope.allMonths[i].weeks = [];
			var date = $scope.allMonths[i].first;
			var number = $scope.allMonths[i].length;
			var j=0;
			while( j+8 < number){
				var lenth = $scope.allMonths[i].weeks.length;
				var objDay = {days: []};
				objDay.days[0] = new Date(date.getFullYear(),date.getMonth(),date.getDate()+j);
				objDay.days[1] = new Date(objDay.days[0].getFullYear(),objDay.days[0].getMonth(),objDay.days[0].getDate()+7);

				$scope.allMonths[i].weeks.push(angular.copy(objDay));
				j=j+8;
			}

			var objDay = {days: []};
			objDay.days[0] = new Date(date.getFullYear(),date.getMonth(),date.getDate()+j);
			objDay.days[1] = $scope.allMonths[i].last;
			$scope.allMonths[i].weeks.push(angular.copy(objDay));
		}
	};

	//build previous Month
	$scope.buildPrevMonth = function(date){
		var obj = { weeks: [], length: 0, first: null, last: null, events: false };
		obj.first = new Date(date.getFullYear(), date.getMonth() - 1, 1);
		obj.last = new Date(date.getFullYear(), date.getMonth(),0);
		obj.length =  obj.last.getDate();

		for(var j=1; j<=obj.length; j++){
			obj.weeks.push(new Date(obj.last.getFullYear(), obj.last.getMonth(), j));
			if($scope.eUser.uGmailCalendar != null){
				if(j>1 && $scope.eUser.uGmailCalendar[obj.weeks[j-1].toString()] != undefined){
					obj.events = true;
				}
			}
		}

		if(obj.events == false){
			obj.weeks = [];
			var date = obj.first;
			var number = obj.length;
			var j=0;
			while( j+8 < number){
				var lenth = obj.weeks.length;
				var objDay = {days: []};
				objDay.days[0] = new Date(date.getFullYear(),date.getMonth(),date.getDate()+j);
				objDay.days[1] = new Date(objDay.days[0].getFullYear(),objDay.days[0].getMonth(),objDay.days[0].getDate()+7);

				obj.weeks.push(angular.copy(objDay));
				j=j+8;
			}

			var objDay = {days: []};
			objDay.days[0] = new Date(date.getFullYear(),date.getMonth(),date.getDate()+j);
			objDay.days[1] = obj.last;
			obj.weeks.push(angular.copy(objDay));
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

	//Load next month when scroll UP
	$scope.scrollUp = function(){
		var top = document.getElementById('list-calendar-title').getBoundingClientRect().height + 25;
		var winHeight = window.innerHeight;
		var lastTable = document.getElementById($scope.allMonths[$scope.allMonths.length-1].first.toDateString());
		var posLast = lastTable.getBoundingClientRect();

		if(posLast.bottom <= winHeight - 30){
			$scope.buildNextMonth(toDay);
		}
	};

	//Load previous month when scroll DOWN
	$scope.scrollDown = function(){
		var top = document.getElementById('list-calendar-title').getBoundingClientRect().height + 25;
		var winHeight = window.innerHeight;
		var firstTable = document.getElementById($scope.allMonths[0].first.toDateString());
		var posFirst = firstTable.getBoundingClientRect();

		if(posFirst.top >= top){
			var date = $scope.allMonths[0].first;
			$scope.buildPrevMonth(date);
		}
	};

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

	//console.log($scope.allMonths);

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

