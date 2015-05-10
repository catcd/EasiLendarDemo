/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 26/04/2015
 * type: multi calendar object and specific function for calendar
 */

describe("MultiCalendar Test", function() {
	var eEasiLendar;
	angular.module("MultiCalendarMock", [])
	.factory("eEasiLendar", function() {
		return {
			newBusyEvent: function(start, end) {
				return {
					start: start,
					end: end,
					summary: "Busy",
					colorId: 8,
				};
			},
		};
	});
	beforeEach(function() {
		module('MultiCalendarMock');
		module('MainApp.shareds.multiCalendar');
		inject(function(_eMultiCalendar_,_eEasiLendar_, _$rootScope_) {
			eMultiCalendar = _eMultiCalendar_;
			$rootScope = _$rootScope_;
			eEasiLendar = _eEasiLendar_;
		});
	});
	// data
	var item1 = [];
	item1[new Date(2015,3,6)] = [
	{
		start: {dateTime: new Date(2015,3,6,9,0,0)},
		end: {dateTime: new Date(2015,3,6,11,50,0)},
	},
	{
		start: {dateTime: new Date(2015,3,6,16,0,0)},
		end: {dateTime: new Date(2015,3,6,17,50,0)},
	}
	];
	item1[new Date(2015,3,7)] = [
	{
		start: {dateTime: new Date(2015,3,7,13,0,0)},
		end: {dateTime: new Date(2015,3,7,14,50,0)},
	},
	{
		start: {dateTime: new Date(2015,3,7,15,0,0)},
		end: {dateTime: new Date(2015,3,7,17,50,0)},
	},
	];
	item1[new Date(2015,3,10)] = [
	{
		start: {dateTime: new Date(2015,3,10,19,30,0)},
		end: {dateTime: new Date(2015,3,10,21,30,0)},
	},
	];
	var item2 = [];
	item2[new Date(2015,3,6)] = [
	{
		start: {dateTime: new Date(2015,3,6,11,0,0)},
		end: {dateTime: new Date(2015,3,6,14,0,0)},
	},
	];
	item2[new Date(2015,3,7)] = [
	{
		start: {dateTime: new Date(2015,3,7,14,0,0)},
		end: {dateTime: new Date(2015,3,7,16,0,0)},
	},
	{
		start: {dateTime: new Date(2015,3,7,9,0,0)},
		end: {dateTime: new Date(2015,3,7,12,0,0)},
	},
	];
	item2[new Date(2015,3,9)] = [
	{
		start: {dateTime: new Date(2015,3,9,18,0,0)},
		end: {dateTime: new Date(2015,3,9,22,0,0)},
	},
	];
	
	describe("Missing argument", function() {
		it("calendar should be null", function() {
			var mc = eMultiCalendar.newMultiCal();
			expect(mc.calendar).toBeNull();
		});
	});
	
	describe("'items' argument is an array that contains only 1 item", function() {
		var mc;
		beforeEach(function() {
			mc = eMultiCalendar.newMultiCal([item1]);
		});
		it("should create MultiCalendar object", function() {
			expect(mc).toBeDefined();
			expect(mc.calendar).not.toBeNull();
		});
		it("date 2015/04/06 in calendar should contains 2 events", function() {
			expect(mc.calendar[new Date(2015,3,6)]).not.toBeNull();
			expect(mc.calendar[new Date(2015,3,6)][0]).toBeDefined();
			expect(mc.calendar[new Date(2015,3,6)][1]).toBeDefined();
		});
		it("date 2015/04/07 in calendar should contains 2 events", function() {
			expect(mc.calendar[new Date(2015,3,7)]).not.toBeNull();
			expect(mc.calendar[new Date(2015,3,7)][0]).toBeDefined();
			expect(mc.calendar[new Date(2015,3,7)][1]).toBeDefined();
		});
		it("date 2015/04/10 in calendar should contains 1 event", function() {
			expect(mc.calendar[new Date(2015,3,10)]).not.toBeNull();
			expect(mc.calendar[new Date(2015,3,10)][0]).toBeDefined();
		});
		it("all event should be BusyEvent object", function() {
			expect(mc.calendar[new Date(2015,3,10)][0].summary).toBe("Busy");
			expect(mc.calendar[new Date(2015,3,6)][1].summary).toBe("Busy");
			expect(mc.calendar[new Date(2015,3,7)][0].colorId).toBe(8);
		});
		it("busy event 1 in 2015/04/06 should have start's date time is 9:00-2015/04/06", function() {
			expect(mc.calendar[new Date(2015,3,6)][0].start.dateTime).toEqual(new Date(2015,3,6,9,0,0));
		});
		it("busy event 1 in 2015/04/06 should have end's date time is 11:50-2015/04/06", function() {
			expect(mc.calendar[new Date(2015,3,6)][0].end.dateTime).toEqual(new Date(2015,3,6,11,50,0));
		});
		it("busy event 2 in 2015/04/06 should have start's date time is 16:00-2015/04/06", function() {
			expect(mc.calendar[new Date(2015,3,6)][1].start.dateTime).toEqual(new Date(2015,3,6,16,0,0));
		});
		it("busy event 2 in 2015/04/06 should have end's date time is 16:00-2015/04/06", function() {
			expect(mc.calendar[new Date(2015,3,6)][1].end.dateTime).toEqual(new Date(2015,3,6,17,50,0));
		});
		it("busy event 1 in 2015/04/07 should have start's date time is 13:00-2015/04/07", function() {
			expect(mc.calendar[new Date(2015,3,7)][0].start.dateTime).toEqual(new Date(2015,3,7,13,0,0));
		});
		it("busy event 1 in 2015/04/07 should have end's date time is 14:50-2015/04/07", function() {
			expect(mc.calendar[new Date(2015,3,7)][0].end.dateTime).toEqual(new Date(2015,3,7,14,50,0));
		});
		it("busy event 2 in 2015/04/07 should have start's date time is 15:00-2015/04/07", function() {
			expect(mc.calendar[new Date(2015,3,7)][1].start.dateTime).toEqual(new Date(2015,3,7,15,0,0));
		});
		it("busy event 2 in 2015/04/07 should have end's date time is 17:50-2015/04/07", function() {
			expect(mc.calendar[new Date(2015,3,7)][1].end.dateTime).toEqual(new Date(2015,3,7,17,50,0));
		});
		it("busy event 1 in 2015/04/10 should have start's date time is 19:30-2015/04/10", function() {
			expect(mc.calendar[new Date(2015,3,10)][0].start.dateTime).toEqual(new Date(2015,3,10,19,30,0));
		});
		it("busy event 1 in 2015/04/10 should have end's date time is 21:30-2015/04/10", function() {
			expect(mc.calendar[new Date(2015,3,10)][0].end.dateTime).toEqual(new Date(2015,3,10,21,30,0));
		});
	});
	
	describe("'items' argument is an array that contains 2 item", function() {
		var mc;
		beforeEach(function() {
			mc = eMultiCalendar.newMultiCal([item1,item2]);
		});
		it("should create MultiCalendar object", function() {
			expect(mc).toBeDefined();
			expect(mc.calendar).not.toBeNull();
		});
		it("date 2015/04/06 in calendar should contains 2 events", function() {
			expect(mc.calendar[new Date(2015,3,6)]).not.toBeNull();
			expect(mc.calendar[new Date(2015,3,6)][0]).toBeDefined();
			expect(mc.calendar[new Date(2015,3,6)][1]).toBeDefined();
		});
		it("date 2015/04/07 in calendar should contains 2 events", function() {
			expect(mc.calendar[new Date(2015,3,7)]).not.toBeNull();
			expect(mc.calendar[new Date(2015,3,7)][0]).toBeDefined();
			expect(mc.calendar[new Date(2015,3,7)][1]).toBeDefined();
		});
		it("date 2015/04/09 in calendar should contains 1 event", function() {
			expect(mc.calendar[new Date(2015,3,9)]).not.toBeNull();
			expect(mc.calendar[new Date(2015,3,9)][0]).toBeDefined();
		});
		it("date 2015/04/10 in calendar should contains 1 event", function() {
			expect(mc.calendar[new Date(2015,3,10)]).not.toBeNull();
			expect(mc.calendar[new Date(2015,3,10)][0]).toBeDefined();
		});
		it("all event should be BusyEvent object", function() {
			expect(mc.calendar[new Date(2015,3,10)][0].summary).toBe("Busy");
			expect(mc.calendar[new Date(2015,3,6)][1].summary).toBe("Busy");
			expect(mc.calendar[new Date(2015,3,7)][0].colorId).toBe(8);
		});
		it("busy event 1 in 2015/04/06 should have start's date time is 9:00-2015/04/06", function() {
			expect(mc.calendar[new Date(2015,3,6)][0].start.dateTime).toEqual(new Date(2015,3,6,9,0,0));
		});
		it("busy event 1 in 2015/04/06 should have end's date time is 14:00-2015/04/06", function() {
			expect(mc.calendar[new Date(2015,3,6)][0].end.dateTime).toEqual(new Date(2015,3,6,14,0,0));
		});
		it("busy event 2 in 2015/04/06 should have start's date time is 16:00-2015/04/06", function() {
			expect(mc.calendar[new Date(2015,3,6)][1].start.dateTime).toEqual(new Date(2015,3,6,16,0,0));
		});
		it("busy event 2 in 2015/04/06 should have end's date time is 17:50-2015/04/06", function() {
			expect(mc.calendar[new Date(2015,3,6)][1].end.dateTime).toEqual(new Date(2015,3,6,17,50,0));
		});
		it("busy event 1 in 2015/04/07 should have start's date time is 9:00-2015/04/07", function() {
			expect(mc.calendar[new Date(2015,3,7)][0].start.dateTime).toEqual(new Date(2015,3,7,9,0,0));
		});
		it("busy event 1 in 2015/04/07 should have end's date time is 12:00-2015/04/07", function() {
			expect(mc.calendar[new Date(2015,3,7)][0].end.dateTime).toEqual(new Date(2015,3,7,12,0,0));
		});
		it("busy event 2 in 2015/04/07 should have start's date time is 13:00-2015/04/07", function() {
			expect(mc.calendar[new Date(2015,3,7)][1].start.dateTime).toEqual(new Date(2015,3,7,13,0,0));
		});
		it("busy event 2 in 2015/04/07 should have end's date time is 17:50-2015/04/07", function() {
			expect(mc.calendar[new Date(2015,3,7)][1].end.dateTime).toEqual(new Date(2015,3,7,17,50,0));
		});
		it("busy event 1 in 2015/04/09 should have start's date time is 18:00-2015/04/10", function() {
			expect(mc.calendar[new Date(2015,3,9)][0].start.dateTime).toEqual(new Date(2015,3,9,18,0,0));
		});
		it("busy event 1 in 2015/04/09 should have end's date time is 22:00-2015/04/10", function() {
			expect(mc.calendar[new Date(2015,3,9)][0].end.dateTime).toEqual(new Date(2015,3,9,22,0,0));
		});
		it("busy event 1 in 2015/04/10 should have start's date time is 19:30-2015/04/10", function() {
			expect(mc.calendar[new Date(2015,3,10)][0].start.dateTime).toEqual(new Date(2015,3,10,19,30,0));
		});
		it("busy event 1 in 2015/04/10 should have end's date time is 21:30-2015/04/10", function() {
			expect(mc.calendar[new Date(2015,3,10)][0].end.dateTime).toEqual(new Date(2015,3,10,21,30,0));
		});
	});
	
	describe("All cases when merge busy events", function() {
		var date = new Date(2015,3,26);
		var event1 = {
			start: {dateTime: new Date(2015,3,26,7,30,0)},
			end: {dateTime: new Date(2015,3,26,10,0,0)},
		};
		var event2 = {
			start: {dateTime: new Date(2015,3,26,14,50,0)},
			end: {dateTime: new Date(2015,3,26,18,0,0)},
		};
		var event3 = {
			start: {dateTime: new Date(2015,3,26,9,30,0)},
			end: {dateTime: new Date(2015,3,26,11,0,0)},
		};
		var event4 = {
			start: {dateTime: new Date(2015,3,26,8,0,0)},
			end: {dateTime: new Date(2015,3,26,9,0,0)},
		};
		var event5 = {
			start: {dateTime: new Date(2015,3,26,9,0,0)},
			end: {dateTime: new Date(2015,3,26,16,0,0)},
		};
		describe("merge 7:30-10:00 and 14:50-18:00", function() {
			var mc;
			beforeEach(function() {
				var item1 = [];
				var item2 = [];
				item1[date] = [event1];
				item2[date] = [event2];
				mc = eMultiCalendar.newMultiCal([item1, item2]);
			});
			it("should have 2 busy events", function() {
				expect(mc.calendar[date]).not.toBeNull();
				expect(mc.calendar[date][0]).toBeDefined();
				expect(mc.calendar[date][1]).toBeDefined();
			});
			it("event1's start should be 7:30", function() {
				expect(mc.calendar[date][0].start).toEqual(event1.start);
			});
			it("event1's end should be 10:00", function() {
				expect(mc.calendar[date][0].end).toEqual(event1.end);
			});
			it("event2's start should be 14:50", function() {
				expect(mc.calendar[date][1].start).toEqual(event2.start);
			});
			it("event2's end should be 18:00", function() {
				expect(mc.calendar[date][1].end).toEqual(event2.end);
			});
		});
		
		describe("merge 7:30-10:00 and 9:30-11:00", function() {
			var mc;
			beforeEach(function() {
				var item1 = [];
				var item2 = [];
				item1[date] = [event1];
				item2[date] = [event3];
				mc = eMultiCalendar.newMultiCal([item1, item2]);
			});
			it("should have 1 busy events", function() {
				expect(mc.calendar[date]).not.toBeNull();
				expect(mc.calendar[date][0]).toBeDefined();
			});
			it("event1's start should be 7:30", function() {
				expect(mc.calendar[date][0].start).toEqual(event1.start);
			});
			it("event1's end should be 11:00", function() {
				expect(mc.calendar[date][0].end).toEqual(event3.end);
			});
		});
		
		describe("merge 7:30-10:00 and 8:00-9:00", function() {
			var mc;
			beforeEach(function() {
				var item1 = [];
				var item2 = [];
				item1[date] = [event1];
				item2[date] = [event4];
				mc = eMultiCalendar.newMultiCal([item1, item2]);
			});
			it("should have 1 busy events", function() {
				expect(mc.calendar[date]).not.toBeNull();
				expect(mc.calendar[date][0]).toBeDefined();
			});
			it("event1's start should be 7:30", function() {
				expect(mc.calendar[date][0].start).toEqual(event1.start);
			});
			it("event1's end should be 10:00", function() {
				expect(mc.calendar[date][0].end).toEqual(event1.end);
			});
		});
		
		describe("merge 7:30-10:00 and 9:00-16:00 and 14:50-18:00", function() {
			var mc;
			beforeEach(function() {
				var item1 = [];
				var item2 = [];
				item1[date] = [event1, event2];
				item2[date] = [event5];
				mc = eMultiCalendar.newMultiCal([item1, item2]);
			});
			it("should have 1 busy events", function() {
				expect(mc.calendar[date]).not.toBeNull();
				expect(mc.calendar[date][0]).toBeDefined();
			});
			it("event1's start should be 7:30", function() {
				expect(mc.calendar[date][0].start).toEqual(event1.start);
			});
			it("event1's end should be 18:00", function() {
				expect(mc.calendar[date][0].end).toEqual(event2.end);
			});
		});
	});
});