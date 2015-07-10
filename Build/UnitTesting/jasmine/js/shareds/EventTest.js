/**
 * starter: Nguyen Minh Trang
 * owner: Nguyen Minh Trang
 * last update: 10/05/2015
 * type: unit test
 * base on: javascript
 */
 
describe("Event Test", function() {
	var eSettingsMock = {
		sDefaultView: "month"
	};
	beforeEach(function() {
		module('MainApp.shareds.event');
		inject(function(_eEvent_) {
			eEvent = _eEvent_;
			eSettings = eSettingsMock;
		});
	});
	
	describe("Attribute 'pointer'", function() {
		var event = {
			summary: "Test",
			location: "Home",
			start: {
				dateTime: new Date(2015,4,10)
			},
			end: {
				dateTime: new Date(2015,4,10)
			},
			id: "abcxyz",
			colorId: 0
		};
		it("should be initialized as null", function() {
			expect(eEvent.pointer).toBeNull();
		});
		it("should be event when assigned", function() {
			eEvent.pointer = event;
			expect(eEvent.pointer).toBe(event);
		});
	});
	
	describe("Attribute 'backState'", function() {
		it("should be initialized as an array contains 'month'", function() {
			expect(eEvent.backState).toEqual(["month"]);
		});
	});
	
	describe("Attribute 'type'", function() {
		it("should be initialized as null", function() {
			expect(eEvent.type).toBeNull();
		});
		it("should be 'create' when assigned", function() {
			eEvent.type = 'create';
			expect(eEvent.type).toBe("create");
		});
		it("should be 'edit' when assigned", function() {
			eEvent.type = 'edit';
			expect(eEvent.type).toBe("edit");
		});
	});
	
	describe("Function pushBackState(state)", function() {
		it("Should not push if state is null", function() {
			eEvent.pushBackState(null);
			expect(eEvent.backState.length).toBe(1);
		});
		it("Should not push if argument state is missing", function() {
			eEvent.pushBackState();
			expect(eEvent.backState.length).toBe(1);
		});
		it("Should push eventDetail to array backState", function() {
			eEvent.pushBackState("eventDetail");
			expect(eEvent.backState.length).toBe(2);
			expect(eEvent.backState[eEvent.backState.length - 1]).toBe("eventDetail");
		});
		it("Should push editEvent to array backState", function() {
			eEvent.pushBackState("eventDetail");
			eEvent.pushBackState("editEvent");
			expect(eEvent.backState.length).toBe(3);
			expect(eEvent.backState[eEvent.backState.length - 1]).toBe("editEvent");
		});
	});
	
	describe("Function popBackState()", function() {
		beforeEach(function() {
			eEvent.pushBackState("eventDetail");
			eEvent.pushBackState("editEvent");
		});
		
		it("should pop editEvent", function() {
			var state = eEvent.popBackState();
			expect(state).toBe("editEvent");
			expect(eEvent.backState[eEvent.backState.length-1]).toBe("eventDetail");
			expect(eEvent.backState.length).toBe(2);
		});
		it("should pop eventDetail", function() {
			eEvent.popBackState();
			var state = eEvent.popBackState();
			expect(state).toBe("eventDetail");
			expect(eEvent.backState[eEvent.backState.length-1]).toBe("month");
			expect(eEvent.backState.length).toBe(1);
		});
		it("should not pop if there is only 1 item left in backState", function() {
			// pop 5 times
			for (var i=0; i < 5; i++) {
				eEvent.popBackState();
			}
			expect(eEvent.backState[eEvent.backState.length-1]).toBe("month");
			expect(eEvent.backState.length).toBe(1);
		});
	});
});