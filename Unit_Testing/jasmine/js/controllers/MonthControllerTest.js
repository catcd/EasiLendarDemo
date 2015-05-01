/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 28/04/2015
 * type: month controller
 * number of tests: 41
 */

/** Test for:
  * Initialize data
  * Some basic functions
  * buildWeeks function
  */

describe('Month Calendar', function() {
	var $controller, $rootScope, $scope;
	var eDate, eCalendar, eUser, eSettings;

	beforeEach(module('MainApp.controllers.month'));

	eDate = {
		cDate: null
	};

	eSettings = {
		sFirstDay: 'Monday'
	};

	eUser = {
		uGmailCalendar: null
	};

	eCalendar = {
		months: ["January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December"
		],
		shortMonths: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
	};

	beforeEach(inject(function($injector){
		$rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
		$scope = $rootScope.$new();

		$controller('MonthController', {
			'$rootScope': $rootScope,
			'$scope': $scope,
			'eDate': eDate,
			'eCalendar': eCalendar,
			'eUser': eUser,
			'eSettings': eSettings
		});
	}));

	describe('Initialize data', function(){
		describe('Services data', function(){
			it('should set eDate.cDate is null', function(){
				expect(eDate.cDate).toBeDefined();
				expect(eDate.cDate).toBeNull();
			});

			it('should set default value of eSettings.sFirstDay is Monday', function(){
				expect(eSettings.sFirstDay).toBeDefined();
				expect(eSettings.sFirstDay).toBe('Monday');
			});

			it('should set eUser.uGmailCalendar is null if user does not have any events', function(){
				expect(eUser.uGmailCalendar).toBeDefined();
				expect(eUser.uGmailCalendar).toBeNull();
			});

			it('should define eCalendar.months and eCalendar.shortMonths', function(){
				expect(eCalendar.months).toBeDefined();
				expect(eCalendar.shortMonths).toBeDefined();
			});
		});

		describe('Month Controller data', function(){
			it('should create allMonths array with number of full months in an year', function(){
				expect($scope.allMonths).toBeDefined();
				expect($scope.allMonths[0].first).toBe(0);
				expect($scope.allMonths[1].third).toBe(6);
				expect($scope.allMonths[2].fourth).toBe(11);
			});

			it('should create showMonthsList is false and showMonthCalendar is true', function(){
				expect($scope.showMonthsList).toBeDefined();
				expect($scope.showMonthCalendar).toBeDefined();
				expect($scope.showMonthsList).toBe(false);
				expect($scope.showMonthCalendar).toBe(true);
			});

			it('should set $scope.bkgE is bkg', function(){
				expect($scope.bkgE).toBeDefined();
				expect($scope.bkgE).toBe('bkg');
			});

			it('should create currentDate, currentDateNumber, currentMonthNumber, currentYear, currentMonthString, position when call buildCurrentMonth function', function(){
				$scope.buildCurrentMonth();
				var today = new Date();
				today = new Date(today.setHours(0,0,0,0));
				expect($scope.currentDate.toString()).toEqual(today.toString());
				expect($scope.currentDateNumber).toEqual(today.getDate());
				expect($scope.currentMonthNumber).toEqual(today.getMonth());
				expect($scope.currentMonthString).toEqual(eCalendar.months[$scope.currentMonthNumber]);
				expect($scope.currentYear).toEqual(today.getFullYear());
				expect($scope.position.toString()).toEqual(today.toString());
			});

			it('should set eDate.cDate is $scope.position when call buildCurrentMonth function', function(){
				$scope.buildCurrentMonth();
				expect(eDate.cDate.toString()).toEqual($scope.position.toString());
			});

			it('should create $scope.weeks when call buildCurrentMonth function', function(){
				$scope.buildCurrentMonth();
				expect($scope.weeks).toBeDefined();
				expect($scope.weeks.length).toBe(5);
				for(var i=0; i<5; i++){
					expect($scope.weeks[i].days).toBeDefined();
					expect($scope.weeks[i].days.length).toBe(7);
					for(var j=0; j<7; j++){
						expect($scope.weeks[i].days[j].hasOwnProperty('numberDate')).toBe(true);
						expect($scope.weeks[i].days[j].hasOwnProperty('month')).toBe(true);
					}
				}
			});

			it('should call $scope.buildWeeks in buildCurrentMonth function', function(){
				spyOn($scope,'buildWeeks');
				$scope.buildCurrentMonth();
				expect($scope.buildWeeks).toHaveBeenCalled();
			});
		});
	});

	describe('Some basic functions', function(){
		describe('$scope.previousMonth', function(){
			it('should reduce currentMonthNumber and change currentMonthString', function(){
				spyOn($scope,'buildWeeks');
				$scope.currentMonthNumber = 3;
				$scope.currentMonthString = 'April';
				$scope.currentYear = 2015;
				$scope.previousMonth();
				expect($scope.currentMonthNumber).toBe(2);
				expect($scope.currentMonthString).toBe('March');
				expect($scope.currentYear).toBe(2015);
				expect($scope.buildWeeks).toHaveBeenCalled();
			});

			it('should reduce currentYear if currentMonthNumber reduce to -1', function(){
				spyOn($scope,'buildWeeks');
				$scope.currentMonthNumber = 0;
				$scope.currentMonthString = 'January';
				$scope.currentYear = 2015;
				$scope.previousMonth();

				expect($scope.currentMonthNumber).toBe(11);
				expect($scope.currentMonthString).toBe('December');
				expect($scope.currentYear).toBe(2014);
				expect($scope.buildWeeks).toHaveBeenCalled();
			});
		});

		describe('$scope.nextMonth', function(){
			it('should increase currentMonthNumber and change currentMonthString', function(){
				spyOn($scope,'buildWeeks');
				$scope.currentMonthNumber = 3;
				$scope.currentMonthString = 'April';
				$scope.currentYear = 2015;
				$scope.nextMonth();

				expect($scope.currentMonthNumber).toBe(4);
				expect($scope.currentMonthString).toBe('May');
				expect($scope.currentYear).toBe(2015);
				expect($scope.buildWeeks).toHaveBeenCalled();
			});

			it('should increase currentYear if currentMonthNumber increase to 12', function(){
				spyOn($scope,'buildWeeks');
				$scope.currentMonthNumber = 11;
				$scope.currentMonthString = 'December';
				$scope.currentYear = 2015;
				$scope.nextMonth();

				expect($scope.currentMonthNumber).toBe(0);
				expect($scope.currentMonthString).toBe('January');
				expect($scope.currentYear).toBe(2016);
				expect($scope.buildWeeks).toHaveBeenCalled();
			});
		});

		describe('$scope.previousYear and $scope.nextYear', function(){
			it('should reduce currentYear when call previousYear function', function(){
				$scope.currentYear = 2015;
				$scope.previousYear();
				expect($scope.currentYear).toBe(2014);
			});

			it('should increase currentYear when call nextYear function', function(){
				$scope.currentYear = 2015;
				$scope.nextYear();
				expect($scope.currentYear).toBe(2016);
			});
		});

		describe('$scope.thisMonth', function(){
			it('should set currentMonthNumber, currentMonthString, currentYear when pass valid month and year', function(){
				$scope.buildCurrentMonth();
				$scope.thisMonth(2015,3);
				expect($scope.currentMonthNumber).toBe(3);
				expect($scope.currentMonthString).toBe('April');
				expect($scope.currentYear).toBe(2015);
			});

			it('should not do anything when pass invalid month and year', function(){
				$scope.currentMonthNumber = 3;
				$scope.currentMonthString = 'April';
				$scope.currentYear = 2015;

				$scope.thisMonth(-2015,20);
				expect($scope.currentMonthNumber).toBe(3);
				expect($scope.currentMonthString).toBe('April');
				expect($scope.currentYear).toBe(2015);
			});

			it('should call buildWeeks and changeState function', function(){
				spyOn($scope, 'buildWeeks');
				spyOn($scope, 'changeState');
				$scope.thisMonth(2015,3);
				expect($scope.buildWeeks).toHaveBeenCalled();
				expect($scope.changeState).toHaveBeenCalled();
			});
		});

		describe('$scope.next and $scope.prev', function(){
			it('should call $scope.previousMonth function in prev function', function(){
				spyOn($scope, 'previousMonth');
				$scope.prev();
				expect($scope.previousMonth).toHaveBeenCalled();
			});

			it('should call $scope.nextMonth function in next function', function(){
				spyOn($scope, 'nextMonth');
				$scope.next();
				expect($scope.nextMonth).toHaveBeenCalled();
			});
		});

		describe('$scope.backgroundMonth', function(){
			it('should return a class that set background for month has number is index', function(){
				var className = $scope.backgroundMonth(3);
				expect(className).toBe('list-bkg-style easi-apr-bkg');
			});
		});

		describe('$scope.changeState', function(){
			it('should change showMonthsList is false when it is true and showMonthCalendar is true when it is false', function(){
				$scope.showMonthsList = true;
				$scope.showMonthCalendar = false;
				$scope.changeState();

				expect($scope.showMonthsList).toBe(false);
				expect($scope.showMonthCalendar).toBe(true);
			});

			it('should change showMonthsList is true when it is false and showMonthCalendar is false when it is true', function(){
				$scope.showMonthsList = false;
				$scope.showMonthCalendar = true;
				$scope.changeState();

				expect($scope.showMonthsList).toBe(true);
				expect($scope.showMonthCalendar).toBe(false);
			});
		});

		describe('$scope.showListEvent', function(){
			it('should set $scope.position and update eDate.cDate correctly when pass valid day, month and year', function(){
				var d = new Date();
				d = new Date(d.setHours(0,0,0,0));
				var date = d.getDate();
				var month = d.getMonth();
				var year = d.getFullYear();

				$scope.showListEvent(date, month, year);
				expect($scope.position).toEqual(d);
				expect(eDate.cDate).toEqual(d);
			});

			it('should not do anthing when pass invalid day, month and year', function(){
				var today = new Date();
				$scope.position = new Date();
				$scope.showListEvent(-1, 3, 2015);
				expect($scope.position.toString()).toEqual(today.toString());
				$scope.showListEvent(1, -3, 2015);
				expect($scope.position.toString()).toEqual(today.toString());
				$scope.showListEvent(1, 3, -2015);
				expect($scope.position.toString()).toEqual(today.toString());
				$scope.showListEvent(-1, -3, -2015);
				expect($scope.position.toString()).toEqual(today.toString());
			});

			it('should call $scope.previousMonth in showListEvent function', function(){
				spyOn($scope, 'previousMonth');
				$scope.currentMonthNumber = 3;
				$scope.showListEvent(31, 2, 2015);
				expect($scope.previousMonth).toHaveBeenCalled();

				$scope.currentMonthNumber = 0;
				$scope.showListEvent(30, 11, 2015);
				expect($scope.previousMonth).toHaveBeenCalled();
			});

			it('should call $scope.nextMonth in showListEvent function', function(){
				spyOn($scope, 'nextMonth');
				$scope.currentMonthNumber = 3;
				$scope.showListEvent(1, 4, 2015);
				expect($scope.nextMonth).toHaveBeenCalled();

				$scope.currentMonthNumber = 11;
				$scope.showListEvent(1, 0, 2015);
				expect($scope.nextMonth).toHaveBeenCalled();
			});
		});

		describe('$rootScope.changeMonth', function(){
			var today = new Date();
			today = new Date(today.setHours(0,0,0,0));

			it('should set currentDate, currentDateNumber, currentMonthNumber, currentYear, currentMonthString, position when pass a date of month or week', function(){
				$scope.buildCurrentMonth();
				$rootScope.changeMonth(today);

				expect($scope.currentDate.toString()).toEqual(today.toString());
				expect($scope.currentDateNumber).toEqual(today.getDate());
				expect($scope.currentMonthNumber).toEqual(today.getMonth());
				expect($scope.currentMonthString).toEqual(eCalendar.months[$scope.currentMonthNumber]);
				expect($scope.currentYear).toEqual(today.getFullYear());
				expect($scope.position.toString()).toEqual(today.toString());
				expect(eDate.cDate.toString()).toEqual(today.toString());
			});

			it('should call $scope.buildWeeks in buildMonth function', function(){
				spyOn($scope, 'buildWeeks');
				$rootScope.changeMonth(today);

				expect($scope.buildWeeks).toHaveBeenCalled();
			});
		});

		describe('$rootScope.monthToday', function(){
			var today = new Date();
			today = new Date(today.setHours(0,0,0,0));

			it('should set currentDate, currentDateNumber, currentMonthNumber, currentYear, currentMonthString, position is today', function(){
				$scope.buildCurrentMonth();
				$rootScope.monthToday();

				expect($scope.currentDate.toString()).toEqual(today.toString());
				expect($scope.currentDateNumber).toEqual(today.getDate());
				expect($scope.currentMonthNumber).toEqual(today.getMonth());
				expect($scope.currentMonthString).toEqual(eCalendar.months[$scope.currentMonthNumber]);
				expect($scope.currentYear).toEqual(today.getFullYear());
				expect($scope.position.toString()).toEqual(today.toString());
				expect(eDate.cDate.toString()).toEqual(today.toString());
			});

			it('should call $scope.buildWeeks in buildMonth function', function(){
				spyOn($scope, 'buildWeeks');
				$rootScope.changeMonth(today);

				expect($scope.buildWeeks).toHaveBeenCalled();
			});
		});
	});

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

		var initializeData = function(month){
			$scope.currentMonthNumber = month;
			$scope.currentYear = 2015;
			$scope.currentMonthString = $scope.eCalendar.months[month];
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
		};

		it('should create $scope.daysInWeek is [{day: "S"},{day: "M"},{day: "T"},{day: "W"},{day: "T"},{day: "F"},{day: "S"}] when eSettings.sFirstDay is Sunday', function(){
			initializeData(3);
			eSettings.sFirstDay = 'Sunday';
			$scope.buildWeeks();
			expect($scope.daysInWeek).toEqual([{day: "S"},{day: "M"},{day: "T"},{day: "W"},{day: "T"},{day: "F"},{day: "S"}]);
		});

		it('should build all weeks and days in April and week start on Sunday', function() {
			initializeData(3);
			eSettings.sFirstDay = 'Sunday';
			$scope.buildWeeks();
			expect($scope.weeks).toEqual(weeks);
		});
		
		it('should create $scope.daysInWeek is [{day: "M"},{day: "T"},{day: "W"},{day: "T"},{day: "F"},{day: "S"},{day: "S"}] when eSettings.sFirstDay is Monday', function(){
			initializeData(3);
			eSettings.sFirstDay = 'Monday';
			$scope.buildWeeks();
			expect($scope.daysInWeek).toEqual([{day: "M"},{day: "T"},{day: "W"},{day: "T"},{day: "F"},{day: "S"},{day: "S"}]);
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
			
			initializeData(3);
			eSettings.sFirstDay = 'Monday';
			$scope.buildWeeks();
			expect($scope.weeks).toEqual(weeksM);
		});

		it('should create $scope.daysInWeek is [{day: "S"},{day: "S"},{day: "M"},{day: "T"},{day: "W"},{day: "T"},{day: "F"}] when eSettings.sFirstDay is Saturday', function(){
			initializeData(3);
			eSettings.sFirstDay = 'Saturday';
			$scope.buildWeeks();
			expect($scope.daysInWeek).toEqual([{day: 'S'},{day: 'S'},{day: 'M'},{day: 'T'},{day: 'W'},{day: 'T'},{day: 'F'}]);
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
			
			initializeData(3);
			eSettings.sFirstDay = 'Saturday';
			$scope.buildWeeks();
			expect($scope.weeks).toEqual(weeksS)
		});

		it('should create $scope.newWeeks is $scope.weeks and delete $scope.newWeeks when finish buildWeeks function', function(){
			initializeData(3);
			eSettings.sFirstDay = 'Saturday';
			$scope.buildWeeks();
			expect($scope.newWeeks).toBeUndefined();
		});

		it('should set $scope.position is today if $scope.currentMonthNumber is current month', function(){
			var today = new Date();
			today = new Date(today.setHours(0,0,0,0));

			initializeData(today.getMonth());
			eSettings.sFirstDay = 'Sunday';
			$scope.buildWeeks();
			expect($scope.position.toString()).toEqual(today.toString());
			expect(eDate.cDate.toString()).toEqual(today.toString());
		});

		it('should set $scope.position is first day of month if $scope.currentMonthNumber is not current month', function(){
			initializeData(2);
			var date = new Date();
			date = new Date(2015,$scope.currentMonthNumber,1);
			eSettings.sFirstDay = 'Sunday';

			$scope.buildWeeks();
			expect($scope.position.toString()).toEqual(date.toString());
			expect(eDate.cDate.toString()).toEqual(date.toString());
		});
	});
});


