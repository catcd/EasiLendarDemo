/**
 * starter: Can Duy Cat
 * owner: Nguo Duc Dung
 * last update: 15/03/2015
 * type: list controller
 */

angular.module('MainApp.controllers.list', [])

.controller("ListController", function($scope, $rootScope) {
	$scope.listEvents = angular.copy($rootScope.uGmailCalendar);
	/*
	$scope.typesOfEvent = ['BirthDay', 'Holiday', 'Restaurant', 'Important', 'Normal'];
	$scope.listEvents = [
		{ date: (new Date()).getDate()-1, day: 'Fri', events: [ { typeIndex: 1, title: 'Visiting', time: '8:00AM - 10:30AM', location: 'NY city'} ] },
		{ date: (new Date()).getDate()	, day: 'Sat', events: [ { typeIndex: 2, title: 'Having Lunch', time: '11:00AM - 12:30PM', location: 'Restaurant'} ] },
		{ date: (new Date()).getDate()+1, day: 'Sun', events: [ { typeIndex: 4, title: 'Movie', time: '9:00AM - 12:00AM', location: 'National Movie Centre'} ] },
		{ date: (new Date()).getDate()+2, day: 'Mon', events: [ { typeIndex: 0, title: 'BirthDay', time: '8:00PM - 11:00PM', location: "Jonh's House" } ] },
		{ date: (new Date()).getDate()+3, day: 'Tue', events: [ { typeIndex: 1, title: 'Traveling', time: '9:00AM - 17:00PM', location: 'India Park'} ] },
		{ date: (new Date()).getDate()+4, day: 'Wed', events: [ { typeIndex: 3, title: 'Anniversary', time: '8:00AM - 10:30AM', location: 'National Convention Centre'} ] }
	];*/
	/*
	$scope.listEvents = [
	    {end: { dateTime: "2014-04-19T09:50:00+07:00"}, start: { dateTime: "2014-02-21T08:00:00+07:00"}, location: "301-G2", summary: "MAT1093 2: \u0110\u1ea1i s\u1ed1"}, 
	    {end: { dateTime: "2014-04-19T09:50:00+07:00"}, start: { dateTime: "2014-04-19T08:00:00+07:00"}, location: "301-G2", summary: "MAT1093 2: \u0110\u1ea1i s\u1ed1"}
	];
*/
	$scope.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	$scope.months = [
                    'January', 'February','March', 'April', 'May',
                    'June', 'July', 'August', 'September','October',
                     'November', 'December'
                    ];

	for(i=0;i<$scope.listEvents.length;i++){
		$scope.listEvents[i].end.dateTime = new Date($scope.listEvents[i].end.dateTime);
		$scope.listEvents[i].start.dateTime = new Date($scope.listEvents[i].start.dateTime);
		
		var date = $scope.listEvents[i].start.dateTime.getDate();
		var day = $scope.days[$scope.listEvents[i].start.dateTime.getDay()];
		var month = $scope.months[$scope.listEvents[i].start.dateTime.getMonth()];
		$scope.listEvents[i].date = date;
		$scope.listEvents[i].day = day;
		$scope.listEvents[i].month = month;

		if($scope.listEvents[i].end.dateTime.getHours() >= 12) { var termEnd = 'PM';}
		else {termEnd = 'AM';}
		if($scope.listEvents[i].start.dateTime.getHours() >= 12) { var termStart = 'PM';}
		else {termStart = 'AM' }
		$scope.listEvents[i].end.dateTime = $scope.listEvents[i].end.dateTime.getHours() + ':' + ($scope.listEvents[i].end.dateTime.getMinutes() < 10 ? '0':'') + $scope.listEvents[i].end.dateTime.getMinutes() + termEnd;
		$scope.listEvents[i].start.dateTime = $scope.listEvents[i].start.dateTime.getHours() + ':' + ($scope.listEvents[i].start.dateTime.getMinutes() < 10 ? '0':'') + $scope.listEvents[i].start.dateTime.getMinutes() + termStart;
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
					element.addClass('birthday-background');
				}
				else if(scope.isType == 1){
					element.addClass('holiday-background');
				}
				else if(scope.isType == 2){
					element.addClass('restaurant-background');
				}
				else if(scope.isType == 3){
					element.addClass('event-color-5');
				}
				else if(scope.isType == 4){
					element.addClass('event-color-1');
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
