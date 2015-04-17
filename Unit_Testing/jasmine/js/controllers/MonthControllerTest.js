/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 17/04/2015
 * type: month controller
 */

/** Test for:
  * buildWeeks function
  * showListEvent function
  */

describe('Month Calendar', function() {
	beforeEach(module('MainApp.controllers.month'));

	var $controller, $rootScope, $scope;

	beforeEach(inject(function($injector){
		$rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
		$scope = $rootScope.$new();
		
		$rootScope.eSettings = {};
		$rootScope.eCalendar = {};
		
		$controller('MonthController', 
			{'$rootScope' : $rootScope, '$scope': $scope}
		);

		$scope.currentDate = new Date();
		$scope.currentDateNumber = $scope.currentDate.getDate();
		$scope.currentMonthNumber = $scope.currentDate.getMonth();
		$scope.currentYear = $scope.currentDate.getFullYear();
		$scope.weeks = new Array(5);
		for (var i = 0; i < 5; i++) {
			$scope.weeks[i] = {
				days: new Array(7)
			};
			for (var j = 0; j < 7; j++) {
				$scope.weeks[i].days[j] = {
					numberDate: 0,
					month: 0
				}
			}
		}
	}));
	
	describe('Build Month', function() {
		var weeks = 
			[
				{ days: [ 
					{numberDate: 29, month: 2}, {numberDate: 30, month: 2}, {numberDate: 31, month: 2}, 
					{numberDate: 1, month: 3}, {numberDate: 2, month: 3}, {numberDate: 3, month: 3}, {numberDate: 4, month: 3}] },
				{ days: [ 
					{numberDate: 5, month: 3}, {numberDate: 6, month: 3}, {numberDate: 7, month: 3}, 
					{numberDate: 8, month: 3}, {numberDate: 9, month: 3}, {numberDate: 10, month: 3}, {numberDate: 11, month: 3}] },
				{ days: [
					{numberDate: 12, month: 3}, {numberDate: 13, month: 3}, {numberDate: 14, month: 3}, 
					{numberDate: 15, month: 3}, {numberDate: 16, month: 3}, {numberDate: 17, month: 3}, {numberDate: 18,month: 3}] },
				{ days: [ 
					{numberDate: 19, month: 3}, {numberDate: 20, month: 3}, {numberDate: 21, month: 3}, 
					{numberDate: 22, month: 3}, {numberDate: 23, month: 3}, {numberDate: 24, month: 3}, {numberDate: 25, month: 3}] },
				{ days: [ 
					{numberDate: 26, month: 3}, {numberDate: 27, month: 3}, {numberDate: 28, month: 3}, 
					{numberDate: 29, month: 3}, {numberDate: 30, month: 3}, {numberDate: 1, month: 4}, {numberDate: 2, month: 4}] }	
		];

		it('should build all weeks and days in April and week start on Sunday', function() {
			$rootScope.eSettings.sFirstDay = 'Sunday';
			$scope.buildWeeks();
			expect($scope.weeks).toEqual(weeks);
		});
		
		it('should build all weeks and days in April and week start on Monday', function() {
			var weeksM = [];
			weeksM[0] = {days: []};
			weeksM[0].days = [ {numberDate: 30, month: 2}, {numberDate: 31, month: 2}, {numberDate: 1, month: 3}, 
							   {numberDate: 2, month: 3}, {numberDate: 3, month: 3}, {numberDate: 4, month: 3}, {numberDate: 5, month: 3} ];

			for(var i=1; i<4; i++){
				weeksM[i] = { days: [] };
				for(var j=0; j<7; j++){
					weeksM[i].days[j] = {};
					weeksM[i].days[j].numberDate = weeks[i].days[j].numberDate + 1;
					weeksM[i].days[j].month = 3;
				}
			}

			weeksM[4] = {days: []};
			weeksM[4].days = [ {numberDate: 27, month: 3}, {numberDate: 28, month: 3}, {numberDate: 29, month: 3}, 
							   {numberDate: 30, month: 3}, {numberDate: 1, month: 4}, {numberDate: 2, month: 4}, {numberDate: 3, month: 4} ];

			$rootScope.eSettings.sFirstDay = 'Monday';
			$scope.buildWeeks();
			expect($scope.weeks).toEqual(weeksM);
		});

		it('should build all weeks and days in April and week start on Saturday', function() {
			var weeksS = [];
			weeksS[0] = {days: []};
			weeksS[0].days = [ {numberDate: 28, month: 2}, {numberDate: 29, month: 2}, {numberDate: 30, month: 2}, 
							   {numberDate: 31, month: 2}, {numberDate: 1, month: 3}, {numberDate: 2, month: 3}, {numberDate: 3, month: 3} ];

			for(var i=1; i<4; i++){
				weeksS[i] = { days: [] };
				for(var j=0; j<7; j++){
					weeksS[i].days[j] = {};
					weeksS[i].days[j].numberDate = weeks[i].days[j].numberDate - 1;
					weeksS[i].days[j].month = 3;
				}
			}

			weeksS[4] = {days: []};
			weeksS[4].days = [ {numberDate: 25, month: 3}, {numberDate: 26, month: 3}, {numberDate: 27, month: 3}, 
							   {numberDate: 28, month: 3}, {numberDate: 29, month: 3}, {numberDate: 30, month: 3}, {numberDate: 1, month: 4} ];

			$rootScope.eSettings.sFirstDay = 'Saturday';
			$scope.buildWeeks();
			expect($scope.weeks).toEqual(weeksS)
		});
	});


	describe('Show list of events', function(){
		it('should show events of correct day', function(){
			var d = new Date();
			d = new Date(d.setHours(0,0,0,0));
			var date = d.getDate();
			var month = d.getMonth();
			var year = d.getFullYear();

			$scope.showListEvent(date, month, year);
			expect($scope.position).toEqual(d);
		});
	});
});


