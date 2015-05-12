/**
 * starter: Nguyen Minh Trang
 * owner: Nguyen Minh Trang
 * last update: 10/05/2015
 * type: unit test
 * base on: javascript
 */

describe('Event Detail Controller Test', function() {
	var $controller, $rootScope, $scope;
	var eEvent, eEasiLendar, eCalendar, eSync;

	beforeEach(module('MainApp.controllers.eventEdit'));
	beforeEach(module('MainApp.shareds.calendar'));
	
	// simulate services
	eEvent = {
		pointer: null,
		pushBackState: function() {},
		popBackState: function() {},
	};
	eEasiLendar = {
		eventColor: ["#09c","#0cf","#36f","#93f","#ff9999","#fc0",
	                  "#f60","#0c6","#666","#99f","#393","#c30"],
		isType: function() {}
	};
	eSync = {
		deleteEventWithId: function() {},
	};
	
	beforeEach(function() {
		inject(function(_$rootScope_, _$controller_, _eCalendar_) {
			$rootScope = _$rootScope_;
			$controller = _$controller_;
			$scope = $rootScope.$new();
			eCalendar = _eCalendar_;
			$controller('EventDetailController', {
				'$rootScope': $rootScope,
				'$scope': $scope,
				'eEvent': eEvent,
				'eEasiLendar': eEasiLendar,
				'eCalendar': eCalendar,
				'eSync': eSync
			});
		});
		$rootScope.goToState = function() {};
		$rootScope.toEventForm = function() {};
	});
	
	describe("weekDays array", function() {
		it("should be array of Sunday, Monday, Tuesday,...", function() {
			expect($scope.weekDays).toEqual(["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]);
		});
	});
	
	describe("Display Class", function() {
		var display;
		beforeEach(function() {
			eEvent.pointer = {
				summary: "Test",
				location: "Home",
				start: {
					dateTime: new Date(2015,4,10,13,16,0)
				},
				end: {
					dateTime: new Date(2015,4,10,18,30,0)
				},
				id: "abcxyz",
				colorId: 5
			};
			eEasiLendar.isType = function() {
				return "normal";
			};
			display = $scope.newDisplay();
		});
		
		it("should be null if eEvent.pointer is null", function() {
			expect($scope.display).toBeNull();
		});
		it("summary should be 'Test'", function() {
			expect(display.summary).toBe("Test");
		});
		it("location should be 'Home'", function() {
			expect(display.location).toBe("Home");
		});
		it("color should be #09c if eEvent.pointer.colorId is null", function() {
			eEvent.pointer.colorId = null;
			var display = $scope.newDisplay();
			expect(display.color['background-color']).toBe("#09c");
		});
		it("color should be #fc0", function() {
			expect(display.color['background-color']).toBe("#fc0");
		});
		it("date should be null if eEvent.pointer.start is null", function() {
			eEvent.pointer.start = null;
			var display = $scope.newDisplay();
			expect(display.date).toBeNull();
		});
		it("date should be null if eEvent.pointer.end is null", function() {
			eEvent.pointer.end = null;
			var display = $scope.newDisplay();
			expect(display.date).toBeNull();
		});
		it("date should be null if eEvent.pointer.start.dateTime is null", function() {
			eEvent.pointer.start.dateTime = null;
			var display = $scope.newDisplay();
			expect(display.date).toBeNull();
		});
		it("date should be null if eEvent.pointer.end.dateTime is null", function() {
			eEvent.pointer.end.dateTime = null;
			var display = $scope.newDisplay();
			expect(display.date).toBeNull();
		});
		it("date should be ['Sunday, May 10, 2015','13:16 - 18:30']", function() {
			expect(display.date).toEqual(['Sunday, May 10, 2015','13:16 - 18:30']);
		});
		it ("date should be ['Sunday, May 10, 2015, 20:40 -','Monday, May 11, 2015, 10:15']", function() {
			eEvent.pointer.start.dateTime = new Date(2015,4,10,20,40,0);
			eEvent.pointer.end.dateTime = new Date(2015,4,11,10,15,0);
			eEasiLendar.isType = function() {
				return "over";
			};
			var display = $scope.newDisplay();
			expect(display.date).toEqual(['Sunday, May 10, 2015, 20:40 -','Monday, May 11, 2015, 10:15']);
		});
		it ("date should be ['Sunday, May 10, 2015]", function() {
			eEvent.pointer.start.dateTime = new Date(2015,4,10,0,0,0);
			eEvent.pointer.end.dateTime = new Date(2015,4,11,23,59,59);
			eEasiLendar.isType = function() {
				return "all";
			};
			var display = $scope.newDisplay();
			expect(display.date).toEqual(['Sunday, May 10, 2015']);
		});
	});
	
	describe("newDisplay() function", function() {
		it("should create new Display object", function() {
			var display = $scope.newDisplay();
			expect(display).toBeDefined();
		});
	});
	
	describe("isNull(obj) function", function() {
		it("should return true if obj is null", function() {
			expect($scope.isNull(null)).toBe(true);
		});
		it("should return true if obj is undefined", function() {
			expect($scope.isNull()).toBe(true);
		});
		it("should return true if obj is ''", function() {
			expect($scope.isNull('')).toBe(true);
		});
		it("should return false if obj is defined", function() {
			expect($scope.isNull("abc")).toBe(false);
		});
	});
	
	describe("del() function", function() {
		beforeEach(function() {
			spyOn(eSync, 'deleteEventWithId');
			spyOn($scope, 'close');
			eEvent.pointer = {
				id: "abcxyz"
			};
			$scope.del();
		});
		it("call to eSync.deleteEventWithId()", function() {
			expect(eSync.deleteEventWithId).toHaveBeenCalled();
		});
		it("call to close()", function() {
			expect($scope.close).toHaveBeenCalled();
		});
	});
	
	describe("edit() function", function() {
		beforeEach(function() {
			spyOn($rootScope, 'toEventForm');
			$scope.edit();
		});
		it("call to $rootScope.toEventForm", function() {
			expect($rootScope.toEventForm).toHaveBeenCalled();
		});
	});
	
	describe("close() function", function() {
		beforeEach(function() {
			spyOn($rootScope, 'goToState');
			eEvent.pointer = {
				id: "abcxyz"
			};
			$scope.close();
		});
		it("call to $rootScope.goToState", function() {
			expect($rootScope.goToState).toHaveBeenCalled();
		});
		it("eEvent.pointer to be null", function() {
			expect(eEvent.pointer).toBeNull();
		});
	});
});