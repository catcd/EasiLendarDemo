
/**
 * starter: Can Duy Cat
 * owner: Nguyen Thi Luong
 * last update: 24/04/2015
 * type: paticular controller
 */
/*test for:
 * calendarOfFriend function
 */

describe('Day',function(){

	var $controller, $rootScope, $scope;
	var eSettings, eUser, eEasiLendar,eCalendar,date;
	
	beforeEach(module('MainApp.controllers.day'));
	var start= "Monday";
	date = new Date(2015,4,25,0,0,0,0);
	// simulate services
	var eSettings = {
		sFirstDay: "Monday",
	};
	var eUser = {};
	var eCalendar ={
	months: ["January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December"
	],
	shortMonths: ["jan", "feb", "mar", "apr", "may", "jun", "jul", 
	"aug", "sep", "oct", "nov", "dec"],
	weekDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
	};
	var eEasiLendar = {	
		newDay: function(date) {	
			return day2;
		},
	};
	//create 7 objects
	var day1 = {
		year:'2015',
		month: '4',
		date:'20',
		day:"Tue",
		nextDay: function(){return day2},
	};
	var day2 = {
		year:'2015',
		month: '4',
		date:'21',
		day:"Mon",
		prevDay: function(){return day1;},
		nextDay: function(){return day3;},
	};
	var day3 = {
		year:'2015',
		month: '4',
		date:'22',
		day:"Wed",
		prevDay: function(){return day2},
		nextDay: function(){return day4;},
	};
	var day4 = {
		year:'2015',
		month: '4',
		date:'23',
		day:"Thu",
		prevDay: function(){return day3},
		nextDay: function(){return day5;},
	};
	var day5 = {
		year:'2015',
		month: '4',
		date:'25',
		day:"Fri",
		prevDay: function(){return day4},
		nextDay: function(){return day6;}
	};
	var day6 = {
		year:'2015',
		month: '4',
		date:'26',
		day:"Sat",
		prevDay: function(){return day7},
		nextDay: function(){return day5;},
	};
	var day7 = {
		year:'2015',
		month: '4',
		date:'27',
		day:"Sun",
		prevDay: function(){return day6},
		nextDay: function(){return day1;},
	};	
	
	beforeEach(inject(function(_$controller_, _$rootScope_){
		$rootScope = _$rootScope_;
		$controller = _$controller_;
		$scope = $rootScope.$new();
		
		$controller('DayController', {
			'$scope': $scope,
			'$rootScope': $rootScope,
			'eSettings': eSettings,
			'eCalendar': eCalendar,
			'eEasiLendar': eEasiLendar,
			'eUser': eUser,
		});
	}));

	describe('Check Date ', function(){
		it('Shoulld be nav Year', function(){
			expect(	$scope.navYear).toBe('2015');
		});
		it('Shoulld be background month', function(){
			expect($scope.backgroundMonth()).toBe('bkg-05');
		});
		it('Should be nav Month', function(){
			expect($scope.navMonthName).toBe("May");
		});
		it('Shoulld be month', function(){
			expect($scope.navMonthNumber).toBe('4');
		});
		it('Should be nav date', function(){
			expect($scope.navDate).toBe('21');
		});
		it('Should be nav day', function(){
			expect($scope.navDay).toBe('Mon');
		});
			var x = day2.nextDay();
		it('Should be next date', function(){
			expect(x.date).toBe('22');
		});
	
	});
	describe('test FirstLastDay', function(){
		beforeEach(function(){
			var week = new Array(2);
			week = $scope.FirstLastDay(day2);
			$scope.FirstDayOfWeek = week[0];
			$scope.LastDayOfWeek = week[1];
		});
		it('Should be first day', function(){
			expect($scope.FirstDayOfWeek).toBe(day2);
		});
		it('Should be last day', function(){
			expect($scope.LastDayOfWeek.date).toBe('26');
		});
		it('Should be nav Month', function(){
			expect($scope.navShortMonth ).toBe('May');
		});
		
	});
	
});

	
	
 