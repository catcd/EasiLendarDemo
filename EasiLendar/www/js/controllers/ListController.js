/**
 * starter: Can Duy Cat
 * owner: Nguo Duc Dung
 * last update: 17/03/2015
 * type: list controller
 */

angular.module('MainApp.controllers.list', [])

.controller("ListController", function($scope, $rootScope) {
	/*
	$scope.numberOfEvents = 0;
	var countEvent = 0;
	var i;
	for(i=0;i<30;i++){
		
		var date = new Date(2015,3,i,0,0,0,0);
		var events = $rootScope.uGmailCalendar[date];

	}*/
	
	//alert(countEvent.toString() + $scope.numberOfEvents);

	$scope.$watch('uGmailCalendar',function(newVal, oldVal){
		if(newVal !== oldVal || $rootScope.uGmailCalendar !== null){
			$scope.listEvents = [];
			var count = 0;
			for(i=0;i<30;i++){
				var date = new Date(2015, 3, i, 0,0,0,0);
				$scope.listEvents[count] = $rootScope.uGmailCalendar[date]; 

				if ($scope.listEvents[count]== undefined) { continue; }
				else { count++; }
			}
		//$scope.numberOfEvents = countEvent;
		}
	})

	$scope.randomClass = function(){
		$scope.allBkgClass = ['birthday-background', 'holiday-background', 'hotel-background', 
		'restaurant-background', 'ticket-background', 'event-color-1', 'event-color-2',
		'event-color-3', 'event-color-4', 'event-color-5'];

		var className = $scope.allBkgClass[Math.floor((Math.random() * 10))];
		return className;
	}
})

.directive('backgroundEvent',function(){
	return{
		restrict: 'A',
		scope: {
			isType: '=backgroundEvent'
		},
		link: function(scope,element,attr){
			scope.$watch('isType',function(){
				if(scope.isType == 0){
					element.addClass('ticket-background');
				}
				else if(scope.isType == 1){
					element.addClass('birthday-background');
				}
				else if(scope.isType == 2){
					element.addClass('holiday-background');
				}
				else if(scope.isType == 3){
					element.addClass('restaurant-background');
				}
			});
		}
	};
})

.directive('currentDayInList',function(){
	return{
		restrict: 'A',
		scope: {
			isToDay: '=currentDayInList'
		},
		link: function(scope,element,attr){
			var toDay = new Date();
			scope.$watch('isToDay',function(){
				if(scope.isToDay == toDay.getDate()){
					element.addClass('current-date-list');
				}
			});
		}
	};
})
