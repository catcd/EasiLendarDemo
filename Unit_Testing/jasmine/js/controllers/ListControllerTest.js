/**
 * starter: Can Duy Cat
 * owner: Nguo Duc Dung
 * last uptoDay: 30/04/2015
 * type: list controller
 * number of tests: 17
 */

/** Test for:
  * buildNextMonth function
  * buildPrevMonth function
  */

describe('List Calendar', function() {
	var $controller, $rootScope, $scope, $ionicScrollDelegate;
	var eUser, eCalendar, eEasiLendar, eSettings;

	beforeEach(module('MainApp.controllers.list'));

	eUser = {
		uGmailCalendar: null
	};

	eCalendar = {
		months: ["January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December"
		],
		shortMonths: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
	};

	eEasiLendar = {
		newEasiEvent: function(){}
	};

	eSettings = {
		sFirstDay: 'Monday',
	};

	beforeEach(inject(function($injector){
		$rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
		$scope = $rootScope.$new();

		$rootScope = {
			$on: function(){},
			viewEvent: function(){}
		};

		$controller('ListController', {
			'$rootScope': $rootScope,
			'$scope': $scope,
			'$ionicScrollDelegate' : $ionicScrollDelegate,
			'eUser': eUser,
			'eCalendar': eCalendar,
			'eEasiLendar': eEasiLendar,
			'eSettings': eSettings
		});
	}));

	afterEach(function() {
		eSettings.sFirstDay = 'Monday';
		$scope.allWeeks = new Array();
	});

	describe('Services data', function(){
		it('should set eUser.uGmailCalendar is null if user does not have any events', function(){
			expect(eUser.uGmailCalendar).toBeDefined();
			expect(eUser.uGmailCalendar).toBeNull();
		});

		it('should set eSettings.sFirstDay is Monday', function(){
			expect(eSettings.sFirstDay).toBeDefined();
			expect(eSettings.sFirstDay).toBe('Monday');
		});

		it('should define eCalendar.months and eCalendar.shortMonths', function(){
			expect(eCalendar.months).toBeDefined();
			expect(eCalendar.shortMonths).toBeDefined();
		});
	});

	describe('List Controller data', function(){
		it('should create allWeeks has an object is current week', function(){
			expect($scope.allWeeks).toBeDefined();
			var today = new Date();
			today = new Date(today.setHours(0,0,0,0));
			var day = today.getDay();

			var firstDate = today.getDate() - ( (day == 0) ? 6 : (day-1) );
			var first = new Date(today.getFullYear(), today.getMonth(), firstDate);
			var lastDate = today.getDate() + ( (day==0) ? day : (7-day) );
			var last = new Date(today.getFullYear(), today.getMonth(), lastDate);

			expect($scope.allWeeks[0].first.toString()).toEqual(first.toString());
			expect($scope.allWeeks[0].last.toString()).toEqual(last.toString());
			expect($scope.allWeeks[0].week[0].toString()).toEqual(first.toString());
			expect($scope.allWeeks[0].week[6].toString()).toEqual(last.toString());
		});

		it('should set $scope.bkgE is bkg', function(){
			expect($scope.bkgE).toBeDefined();
			expect($scope.bkgE).toBe('bkg');
		});

		it('should create $scope.currentMonthNumber and $scope.currentYear', function(){
			expect($scope.currentMonthNumber).toBeDefined();
			expect($scope.currentYear).toBeDefined();
		});

		it('should create $scope.currDay is today', function(){
			var today = new Date();
			today = new Date(today.setHours(0,0,0,0));
			expect($scope.currDay).toBeDefined();
			expect($scope.currDay.toString()).toBe(today.toString());
		})
	});

	describe('Some basic functions', function(){
		describe('$scope.background', function(){
			it('should return a class that set background for month has number is index', function(){
				var className = $scope.background(3);
				expect(className).toBe('list-bkg-style easi-apr-bkg');
			});
		});

		describe('$scope.viewE', function(){
			it('should call eEasiLendar.newEasiEvent and $rootScope.viewEvent functions', function(){
				spyOn($rootScope, 'viewEvent');
				spyOn(eEasiLendar, 'newEasiEvent');
				var event = { start: new Date(), end: new Date(), summary: 'A', location: 'IPH', id: null, position: new Date(), colorID: 0, src: 'google', status: true };
				$scope.viewE(event);

				expect($rootScope.viewEvent).toHaveBeenCalled();
				expect(eEasiLendar.newEasiEvent).toHaveBeenCalled();
			});
		})
	});

	describe('Build next week', function(){
		it('should build next week of current week, week starts from Monday', function(){
			$scope.allWeeks = [];
			var today = new Date();
			today = new Date(today.setHours(0,0,0,0));
			var next = new Date(today.getFullYear(), today.getMonth(), today.getDate()+6);
			var day = next.getDay();
			$scope.buildNextWeek(next);

			var firstDate = next.getDate() - ( (day == 0) ? 6 : (day-1) );
			var first = new Date(next.getFullYear(), next.getMonth(), firstDate);
			var lastDate = next.getDate() + ( (day==0) ? day : (7-day) );
			var last = new Date(next.getFullYear(), next.getMonth(), lastDate);

			expect($scope.allWeeks[0].first.toString()).toEqual(first.toString());
			expect($scope.allWeeks[0].last.toString()).toEqual(last.toString());
			expect($scope.allWeeks[0].week[0].toString()).toEqual(first.toString());
			expect($scope.allWeeks[0].week[6].toString()).toEqual(last.toString());
		});

		it('should build next week of current week, week starts from Sunday', function(){
			$scope.allWeeks = [];
			var today = new Date();
			today = new Date(today.setHours(0,0,0,0));
			var next = new Date(today.getFullYear(), today.getMonth(), today.getDate()+6);
			eSettings.sFirstDay = 'Sunday';
			$scope.buildNextWeek(next);

			var firstDate = next.getDate() - next.getDay();
			var first = new Date(next.getFullYear(), next.getMonth(), firstDate);
			var lastDate = next.getDate() + 6 - next.getDay();
			var last = new Date(next.getFullYear(), next.getMonth(), lastDate);

			expect($scope.allWeeks[0].first.toString()).toEqual(first.toString());
			expect($scope.allWeeks[0].last.toString()).toEqual(last.toString());
			expect($scope.allWeeks[0].week[0].toString()).toEqual(first.toString());
			expect($scope.allWeeks[0].week[6].toString()).toEqual(last.toString());
		});

		it('should build next week of current week, week starts from Saturday', function(){
			$scope.allWeeks = new Array();
			var today = new Date();
			today = new Date(today.setHours(0,0,0,0));
			var next = new Date(today.getFullYear(), today.getMonth(), today.getDate()+6);
			var day = next.getDay();
			eSettings.sFirstDay = 'Saturday';
			$scope.buildNextWeek(next);

			console.log($scope.allWeeks);

			var firstDate = next.getDate() - ( (day == 6) ? 0 : (day+1) );
			var first = new Date(next.getFullYear(), next.getMonth(), firstDate);
			var lastDate = next.getDate() + ( (day == 6) ? 6 : (5-day) );
			var last = new Date(next.getFullYear(), next.getMonth(), lastDate);

			expect($scope.allWeeks[0].first.toString()).toEqual(first.toString());
			expect($scope.allWeeks[0].last.toString()).toEqual(last.toString());
			expect($scope.allWeeks[0].week[0].toString()).toEqual(first.toString());
			expect($scope.allWeeks[0].week[6].toString()).toEqual(last.toString());
		});
	});

	describe('Build previous week', function(){
		it('should build previous week of current week, week starts from Monday', function(){
			$scope.allWeeks = [];
			var today = new Date();
			today = new Date(today.setHours(0,0,0,0));
			var prev = new Date(today.getFullYear(), today.getMonth(), today.getDate()-6);
			var day = prev.getDay();
			$scope.buildPrevWeek(prev);

			var firstDate = prev.getDate() - ( (day == 0) ? 6 : (day-1) );
			var first = new Date(prev.getFullYear(), prev.getMonth(), firstDate);
			var lastDate = prev.getDate() + ( (day==0) ? day : (7-day) );
			var last = new Date(prev.getFullYear(), prev.getMonth(), lastDate);

			expect($scope.allWeeks[0].first.toString()).toEqual(first.toString());
			expect($scope.allWeeks[0].last.toString()).toEqual(last.toString());
			expect($scope.allWeeks[0].week[0].toString()).toEqual(first.toString());
			expect($scope.allWeeks[0].week[6].toString()).toEqual(last.toString());
		});

		it('should build previous week of current week, week starts from Sunday', function(){
			$scope.allWeeks = [];
			var today = new Date();
			today = new Date(today.setHours(0,0,0,0));
			var prev = new Date(today.getFullYear(), today.getMonth(), today.getDate()-6);
			eSettings.sFirstDay = 'Sunday';
			$scope.buildPrevWeek(prev);
			console.log($scope.allWeeks);

			var firstDate = prev.getDate() - prev.getDay();
			var first = new Date(prev.getFullYear(), prev.getMonth(), firstDate);
			var lastDate = prev.getDate() + 6 - prev.getDay();
			var last = new Date(prev.getFullYear(), prev.getMonth(), lastDate);

			expect($scope.allWeeks[0].first.toString()).toEqual(first.toString());
			expect($scope.allWeeks[0].last.toString()).toEqual(last.toString());
			expect($scope.allWeeks[0].week[0].toString()).toEqual(first.toString());
			expect($scope.allWeeks[0].week[6].toString()).toEqual(last.toString());
		});

		it('should build previous week of current week, week starts from Saturday', function(){
			$scope.allWeeks = new Array();
			var today = new Date();
			today = new Date(today.setHours(0,0,0,0));
			var prev = new Date(today.getFullYear(), today.getMonth(), today.getDate()-6);
			var day = prev.getDay();
			eSettings.sFirstDay = 'Saturday';
			$scope.buildPrevWeek(prev);

			console.log($scope.allWeeks);

			var firstDate = prev.getDate() - ( (day == 6) ? 0 : (day+1) );
			var first = new Date(prev.getFullYear(), prev.getMonth(), firstDate);
			var lastDate = prev.getDate() + ( (day == 6) ? 6 : (5-day) );
			var last = new Date(prev.getFullYear(), prev.getMonth(), lastDate);

			expect($scope.allWeeks[0].first.toString()).toEqual(first.toString());
			expect($scope.allWeeks[0].last.toString()).toEqual(last.toString());
			expect($scope.allWeeks[0].week[0].toString()).toEqual(first.toString());
			expect($scope.allWeeks[0].week[6].toString()).toEqual(last.toString());
		});
	});
	
	describe('$scope.scrollUp', function(){
		it('should call $scope.buildNextWeek function', function(){
			spyOn($scope,'buildNextWeek');
			$scope.scrollUp();
			expect($scope.buildNextWeek).toHaveBeenCalled();
		});
	});

	describe('$scope.scrollDown', function(){
		it('should call $scope.buildPrevWeek function', function(){
			spyOn($scope,'buildPrevWeek');
			$scope.scrollDown();
			expect($scope.buildPrevWeek).toHaveBeenCalled();
		});
	});
});