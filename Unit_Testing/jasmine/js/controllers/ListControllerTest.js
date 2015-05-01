/**
 * starter: Can Duy Cat
 * owner: Nguo Duc Dung
 * last uptoDay: 30/04/2015
 * type: list controller
 * number of tests: 10
 */

/** Test for:
  * buildNextMonth function
  * buildPrevMonth function
  */

describe('List Calendar', function() {
	var $controller, $rootScope, $scope, $ionicScrollDelegate;
	var eUser, eCalendar;

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

	beforeEach(inject(function($injector){
		$rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
		$scope = $rootScope.$new();

		$controller('ListController', {
			'$rootScope': $rootScope,
			'$scope': $scope,
			'$ionicScrollDelegate' : $ionicScrollDelegate,
			'eUser': eUser,
			'eCalendar': eCalendar
		});
	}));

	xdescribe('Services data', function(){
		it('should set eUser.uGmailCalendar is null if user does not have any events', function(){
			expect(eUser.uGmailCalendar).toBeDefined();
			expect(eUser.uGmailCalendar).toBeNull();
		});

		it('should define eCalendar.months and eCalendar.shortMonths', function(){
			expect(eCalendar.months).toBeDefined();
			expect(eCalendar.shortMonths).toBeDefined();
		});
	});

	xdescribe('List Controller data', function(){
		it('should create allMonths has an object is current Month', function(){
			expect($scope.allMonths).toBeDefined();
			var today = new Date();
			today = new Date(today.setHours(0,0,0,0));
			var first = new Date(today.getFullYear(), today.getMonth(), 1);
			var last = new Date(today.getFullYear(), today.getMonth()+1, 0);

			expect($scope.allMonths[0].length).toEqual(last.getDate());
			expect($scope.allMonths[0].first.toString()).toEqual(first.toString());
			expect($scope.allMonths[0].last.toString()).toEqual(last.toString());
			expect($scope.allMonths[0].weeks[0].toString()).toEqual(first.toString());
			expect($scope.allMonths[0].weeks[last.getDate()-1].toString()).toEqual(last.toString());
			expect($scope.allMonths[0].events).toBe(false);
		});

		it('should set $scope.bkgE is bkg', function(){
			expect($scope.bkgE).toBeDefined();
			expect($scope.bkgE).toBe('bkg');
		});

		it('should create $scope.currentMonthNumber and $scope.currentYear', function(){
			expect($scope.currentMonthNumber).toBeDefined();
			expect($scope.currentYear).toBeDefined();
		});
	});

	xdescribe('Some basic functions', function(){
		describe('$scope.background', function(){
			it('should return a class that set background for month has number is index', function(){
				var className = $scope.background(3);
				expect(className).toBe('list-bkg-style easi-apr-bkg');
			});
		});
	});

	xdescribe('Build next month', function(){
		it('should build an array of all days in a May', function(){
			$scope.allMonths = [];
			var toDay = new Date(2015,4,17);
			var first = new Date(2015,4,1);
			var last = new Date(2015,5,0);

			$scope.buildNextMonth(toDay);

			expect($scope.allMonths[0].length).toEqual(last.getDate());
			expect($scope.allMonths[0].first.toString()).toEqual(first.toString());
			expect($scope.allMonths[0].last.toString()).toEqual(last.toString());
			expect($scope.allMonths[0].weeks[0].toString()).toEqual(first.toString());
			expect($scope.allMonths[0].weeks[16].toString()).toEqual(toDay.toString());
			expect($scope.allMonths[0].weeks[last.getDate()-1].toString()).toEqual(last.toString());
			expect($scope.allMonths[0].events).toBe(false);
		});

		it('should set events property is false if month does not have any event', function(){
			$scope.allMonths = [];
			var toDay = new Date(2015,3,17);
			$scope.buildNextMonth(toDay);

			expect($scope.allMonths[0].events).toEqual(false);
		});
	});

	xdescribe('Build previous month', function(){
		it('should build an array of all days in a March', function(){
			$scope.allMonths = [];
			var toDay = new Date(2015,2,17);
			var first = new Date(2015,2,1);
			var last = new Date(2015,3,0);

			$scope.buildNextMonth(toDay);

			expect($scope.allMonths[0].length).toEqual(last.getDate());
			expect($scope.allMonths[0].first.toString()).toEqual(first.toString());
			expect($scope.allMonths[0].last.toString()).toEqual(last.toString());
			expect($scope.allMonths[0].weeks[0].toString()).toEqual(first.toString());
			expect($scope.allMonths[0].weeks[16].toString()).toEqual(toDay.toString());
			expect($scope.allMonths[0].weeks[last.getDate()-1].toString()).toEqual(last.toString());
			expect($scope.allMonths[0].events).toBe(false);
		});

		it('should set events property is false if month does not have any event', function(){
			$scope.allMonths = [];
			var toDay = new Date(2015,3,17);
			$scope.buildNextMonth(toDay);

			$scope.buildPrevMonth($scope.allMonths[0].first);
			expect($scope.allMonths[0].events).toEqual(false);
		})
	});
});