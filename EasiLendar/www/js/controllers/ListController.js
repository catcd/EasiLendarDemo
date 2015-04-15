/**
 * starter: Can Duy Cat
 * owner: Nguo Duc Dung
 * last update: 14/04/2015
 * type: list controller
 */

angular.module('MainApp.controllers.list', [])

.controller("ListController", function($scope, $rootScope, $ionicScrollDelegate, $location) {
	var toDay = new Date();
	toDay = new Date(toDay.setHours(0,0,0,0));
	var lastDay = new Date(toDay.getFullYear(),toDay.getMonth()+1,0);

	/** Contructor current month list
	* weeks: array of all days in month
	* length: number of days in month
	* first: first day of month
	* last: last day of month
	* cache: last version of month
	*/
	$scope.threeMonths = [
		{weeks: [], length: 0, first: new Date(lastDay.getFullYear(), lastDay.getMonth()-1,1), last: new Date(lastDay.getFullYear(), lastDay.getMonth(), 0), cache: []},
		{weeks: [], length: 0, first: new Date(lastDay.getFullYear(), lastDay.getMonth(),1), last: lastDay, cache: []},
		{weeks: [], length: 0, first: new Date(lastDay.getFullYear(), lastDay.getMonth()+1,1), last: new Date(lastDay.getFullYear(), lastDay.getMonth()+2, 0), cache: []}
	];
	//build three Month from a date of middle month in array
	$scope.build = function(){
		for(var i=0; i<$scope.threeMonths.length; i++){
			var d = $scope.threeMonths[i].last;
			$scope.threeMonths[i].length = d.getDate();
			
			for(var j=1; j<=$scope.threeMonths[i].length; j++){
				$scope.threeMonths[i].weeks.push(new Date(d.getFullYear(), d.getMonth(), j));
			}

			$scope.threeMonths[i].cache = angular.copy($scope.threeMonths[i].weeks);
		}
	}

	$scope.build();

	console.log($scope.threeMonths);

	//set random background event
	$scope.bkgE = 'bkg';

	//set month background
	$scope.background = function(index) {
		var className = 'list-calendar-title ' + 'bkg-style ' + 'easi-' + $rootScope.shortMonths[index] + '-bkg';
		return className;
	}
})

.directive('scrollWatch', function(){
	return{
		restrict: 'A',
		controller: 'ListController',
		link: function(scope, element, attr){
			var content = document.getElementById('content-list-calendar');
			var oldPos = content.getBoundingClientRect();
			var winHeight = window.innerHeight;

			element.bind('scroll', function(){
				//Scroll UP = push
				if(oldPos.top > content.getBoundingClientRect().top){

				}
				//Scroll DOWN = pull
				else{
					
				}

				oldPos = content.getBoundingClientRect();
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
				element.addClass('current-date-list');
			}

			element.bind('click', function(){
				console.log(element.parent().attr('id'));
			})
		}
	};
})

