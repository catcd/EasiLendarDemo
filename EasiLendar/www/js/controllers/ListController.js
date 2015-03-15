/**
 * starter: Can Duy Cat
 * owner: Nguo Duc Dung
 * last update: 15/03/2015
 * type: list controller
 */

angular.module('MainApp.controllers.list', [])

.controller("ListController", function($scope, $rootScope) {
	$scope.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	$scope.months = [
                    'January', 'February','March', 'April', 'May',
                    'June', 'July', 'August', 'September','October',
                     'November', 'December'
                    ];
	$scope.typesOfEvent = ['BirthDay', 'Holiday', 'Restaurant', 'Important', 'Normal'];
	$scope.listEvents1 = [
	    {end: { dateTime: "2014-04-19T09:50:00+07:00"}, start: { dateTime: "2014-02-21T08:00:00+07:00"}, location: "301-G2", summary: "MAT1093 2: \u0110\u1ea1i s\u1ed1"}, 
	    {end: { dateTime: "2014-04-19T11:50:00+07:00"}, start: { dateTime: "2014-04-19T08:00:00+07:00"}, location: "301-G2", summary: "MAT1093 2: \u0110\u1ea1i s\u1ed1"},
		{end: { dateTime: "2014-04-19T09:50:00+07:00"}, start: { dateTime: "2014-04-19T08:00:00+07:00"}, location: "India Park", summary: "Đi chơi"},
		{end: { dateTime: "2014-04-20T16:45:00+07:00"}, start: { dateTime: "2014-04-20T13:00:00+07:00"}, location: "Lotte Centre", summary: "Shopping"},
		{end: { dateTime: "2014-04-21T16:45:00+07:00"}, start: { dateTime: "2014-04-21T13:00:00+07:00"}, location: "Lotte Centre", summary: "Shopping"},
		{end: { dateTime: "2014-04-22T10:45:00+07:00"}, start: { dateTime: "2014-04-22T13:00:00+07:00"}, location: "Lotte Centre", summary: "Lunch"},
		{end: { dateTime: "2015-03-15T16:45:00+07:00"}, start: { dateTime: "2015-03-15T13:00:00+07:00"}, location: "Lotte Centre", summary: "Yoga"},
		{end: { dateTime: "2015-03-16T16:45:00+07:00"}, start: { dateTime: "2015-03-16T13:00:00+07:00"}, location: "Lotte Centre", summary: "Yoga"}
	];

	$scope.listEvents2 = []; //List of array event*/
	var indexListEvents2 = 0;
	for(var i=0;i<$scope.listEvents1.length;i++){
		$scope.listEvents1[i].end.dateTime = new Date($scope.listEvents1[i].end.dateTime);
		$scope.listEvents1[i].start.dateTime = new Date($scope.listEvents1[i].start.dateTime);
		//Conver time to Day in week and Date in Month
		var date = $scope.listEvents1[i].start.dateTime.getDate();
		var day = $scope.days[$scope.listEvents1[i].start.dateTime.getDay()];
		var month = $scope.months[$scope.listEvents1[i].start.dateTime.getMonth()];
		var year = $scope.listEvents1[i].start.dateTime.getFullYear();
		$scope.listEvents1[i].date = date;
		$scope.listEvents1[i].day = day;
		$scope.listEvents1[i].month = month;
		$scope.listEvents1[i].year = year;

		//Convert time to Hour and Minute
		if($scope.listEvents1[i].end.dateTime.getHours() >= 12) { var termEnd = 'PM';}
		else {termEnd = 'AM';}
		if($scope.listEvents1[i].start.dateTime.getHours() >= 12) { var termStart = 'PM';}
		else {termStart = 'AM' }
		$scope.listEvents1[i].end.dateTime = $scope.listEvents1[i].end.dateTime.getHours() + ':' + ($scope.listEvents1[i].end.dateTime.getMinutes() < 10 ? '0':'') + $scope.listEvents1[i].end.dateTime.getMinutes() + termEnd;
		$scope.listEvents1[i].start.dateTime = $scope.listEvents1[i].start.dateTime.getHours() + ':' + ($scope.listEvents1[i].start.dateTime.getMinutes() < 10 ? '0':'') + $scope.listEvents1[i].start.dateTime.getMinutes() + termStart;
		
		/*Generate new object of events*/
		var count = 0;
		var indexOfSameDay = -1;
		for(var j=0;j<$scope.listEvents2.length;j++){
			if($scope.listEvents1[i].date == $scope.listEvents2[j].date && $scope.listEvents1[i].month == $scope.listEvents2[j].month && $scope.listEvents1[i].year == $scope.listEvents2[j].year){
				count++;
				indexOfSameDay = j;
			}
		}
		if(count == 0){
			//Create a new object of events
			$scope.listEvents2[indexListEvents2] = { date: date, day: day, month: month, year: year, events: []};
			//A new array of events
			var element = {end: $scope.listEvents1[i].end.dateTime, start: $scope.listEvents1[i].start.dateTime, location: $scope.listEvents1[i].location, summary: $scope.listEvents1[i].summary};
			$scope.listEvents2[indexListEvents2].events.push(element);
			indexListEvents2++;
		}
		else{
			var element = {end: $scope.listEvents1[i].end.dateTime, start: $scope.listEvents1[i].start.dateTime, location: $scope.listEvents1[i].location, summary: $scope.listEvents1[i].summary};
			$scope.listEvents2[indexOfSameDay].events.push(element);
		}
	}
	delete $scope.listEvents1;
})
/*
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
})*/

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
