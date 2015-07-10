/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 09/05/2015
 * type: home controller unit test
 * test: 11 specs
 */

describe('Home controller test', function() {
	var $controller, $rootScope, $scope;
	var $ionicPopover;

	beforeEach(module('MainApp.controllers.home'));

	var $ionicPopover = {
		fromTemplate: function(input, object) {
			return {
				show: function($event) {},
				hide: function() {},
				remove: function() {},
			};
		},
		fromTemplateUrl: function() {
			return {
				then: function(object) {}
			};
		},
	};

	// execuse before each it
	beforeEach(inject(function(_$rootScope_, _$controller_) {
		$rootScope = _$rootScope_;
		$controller = _$controller_;
		$scope = $rootScope.$new();

		$controller('HomeController', {
			'$rootScope': $rootScope,
			'$scope': $scope,
			'$ionicPopover': $ionicPopover,
		});
	}));

	describe('Test today function', function() {
		beforeEach(function() {
			$rootScope.currentState = "";
			$rootScope.monthToday = function() {};
			$rootScope.weekToday = function() {};
			$rootScope.dayToday = function() {};
			$rootScope.listToday = function() {};
		});

		it('currentState == month should call monthToday()', function() {
			spyOn($rootScope, 'monthToday');
			$rootScope.currentState = "month";
			$scope.today();

			expect($rootScope.monthToday).toHaveBeenCalled();
		});

		it('currentState == week should call weekToday()', function() {
			spyOn($rootScope, 'weekToday');
			$rootScope.currentState = "week";
			$scope.today();

			expect($rootScope.weekToday).toHaveBeenCalled();
		});

		it('currentState == day should call dayToday()', function() {
			spyOn($rootScope, 'dayToday');
			$rootScope.currentState = "day";
			$scope.today();

			expect($rootScope.dayToday).toHaveBeenCalled();
		});

		it('currentState == list should call listToday()', function() {
			spyOn($rootScope, 'listToday');
			$rootScope.currentState = "list";
			$scope.today();

			expect($rootScope.listToday).toHaveBeenCalled();
		});

		it('currentState is other state should not call anything', function() {
			spyOn($rootScope, 'monthToday');
			spyOn($rootScope, 'weekToday');
			spyOn($rootScope, 'dayToday');
			spyOn($rootScope, 'listToday');
			$rootScope.currentState = "profile";
			$scope.today();

			expect($rootScope.monthToday).not.toHaveBeenCalled();
			expect($rootScope.weekToday).not.toHaveBeenCalled();
			expect($rootScope.dayToday).not.toHaveBeenCalled();
			expect($rootScope.listToday).not.toHaveBeenCalled();
		});
	});

	describe('Initialize popover', function() {
		it('$scope.calendarPopover should be created', function() {
			var popover = $scope.calendarPopover;

			expect(popover).toBeDefined();
		});

		it('$scope.calendarPopover show should be defined', function() {
			var popover = $scope.calendarPopover;

			expect(popover.show).toBeDefined();
		});

		it('$scope.calendarPopover hide should be defined', function() {
			var popover = $scope.calendarPopover;

			expect(popover.hide).toBeDefined();
		});

		it('$scope.calendarPopover remove should be defined', function() {
			var popover = $scope.calendarPopover;

			expect(popover.remove).toBeDefined();
		});
	});

	describe('Popover function', function() {
		it('$scope.selectPopover should call show', function() {
			var popover = $scope.calendarPopover;
			// create spy
			spyOn(popover, 'show');

			// function
			$scope.selectPopover();

			//test
			expect(popover.show).toHaveBeenCalled();
		});

		it('$scope.closeSelect should call hide', function() {
			var popover = $scope.calendarPopover;
			// create spy
			spyOn(popover, 'hide');

			// function
			$scope.closeSelect();

			//test
			expect(popover.hide).toHaveBeenCalled();
		});
	});
});
