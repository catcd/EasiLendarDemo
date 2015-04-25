/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 25/04/2015
 * type: home controller unit test
 * test: 6
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
