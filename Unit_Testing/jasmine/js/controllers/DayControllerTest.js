
/**
 * starter: Can Duy Cat
 * owner: Nguyen Thi Luong
 * last update: 30/04/2015
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
	var d, nd;
			beforeEach(function() {
				d = $scope.newDayCalendar();
			});
		it('navigation year', function(){
			expect(	d.navYear).toBe('2015');
		});
		it('navigation background monht of time grid', function(){
			expect(d.navBackground).toBe('bkg-style '+"easi-may-bkg");
		});
		it('navigation background monht of event list', function(){
			expect(d.nav_Background).toBe('bkg '+"easi-may-bkg");
		});
		it('navigaition month of timegrid', function(){
			expect(d.navMonth).toBe("May");
		});
		
		it('navigation date of time grid', function(){
			expect(d.navDate).toBe('21st');
		});
		it('navigation date of event list ', function(){
			expect(d.nav_Date).toBe('21');
		});
		
		it('navigation day', function(){
			expect(d.navDay).toBe('Mon');
		});
		it('first day in navigation week', function(){
			expect(d.FirstDayInWeek).toBe('21');
		});
		it('last day in navigation  week', function(){
			expect(d.FirstDayInWeek).toBe('21');
		});
		

	});
	
	
});

	
	
 