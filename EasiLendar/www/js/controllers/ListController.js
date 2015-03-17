/**
 * starter: Can Duy Cat
 * owner: Nguo Duc Dung
 * last update: 17/03/2015
 * type: list controller
 */

angular.module('MainApp.controllers.list', [])

.controller("ListController", function($scope, $rootScope) {
	$scope.$watch('uGmailCalendar', function(){
			var count = 0;
			$scope.listEvents = new Array();
			for(var x in $rootScope.eUser.uGmailCalendar){
				$scope.listEvents[count] = $rootScope.eUser.uGmailCalendar[x]; 
				count++;
			}
	})

	//set random background
	$scope.bkgE = 'bkg'; 
})

.directive('backgroundEvent',function(){
	return{
		restrict: 'A',
		scope: {
			isType : '=backgroundEvent'
		},
		link: function(scope,element,attr){
			var allBkgClass = ['birthday-background', 'holiday-background', 'hotel-background', 
								'restaurant-background', 'ticket-background', 'event-color-1', 'event-color-2',
								'event-color-3', 'event-color-4', 'event-color-5'];
			scope.$watch('isType',function(){
				if(scope.isType == 'bkg'){
					element.addClass( allBkgClass[Math.floor((Math.random() * 10))] );
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
