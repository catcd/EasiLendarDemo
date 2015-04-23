/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 22/04/2015
 * type: unit test
 * base on: javascript, Google Calendar API
 */

describe('EasiLendar Classes Test', function() {
	var eEasiLendar;
	
	// fake services
//	var eFriend = {fMultiCal: null};
//	var eSettings = {sFirstDay: "Monday"};
//	var eCalendar = {
//		months: ["January", "February", "March", "April", "May", "June",
//				"July", "August", "September", "October", "November", "December"
//		],
//		weekDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//		shortMonths: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
//	};
	var $rootScope = {currentState: "week"};
	
	beforeEach(function() {
		module('MainApp.shareds.easiLendarClass', function($provide) {
			eCalendarMock = jasmine.createSpyObj('eCalendar', ['weekDays', 'months', 'shortMonths']);
			eUserMock = jasmine.createSpyObj('eUser', ['uGmailCalendar']);
			eFriendMock = jasmine.createSpyObj('eFriend', ['fMultiCal']);
			eSettingsMock = jasmine.createSpyObj('eSettings', ['sFirstDay']);
			$provide.value('eCalendar', eCalendarMock);
			$provide.value('eUser', eUserMock);
			$provide.value('eFriend', eFriendMock);
			$provide.value('eSettings', eSettingsMock);
		});
		
		inject(function(_eEasiLendar_) {
			eEasiLendar = _eEasiLendar_;
		});
	});
	
	describe("Events' colors", function() {
		it('should be ["#09c","#0cf","#36f","#93f","#ff9999","#fc0","#f60","#0c6","#666","#99f","#393","#c30"]', function() {
			expect(eEasiLendar.eventColor).toEqual(["#09c","#0cf","#36f","#93f","#ff9999","#fc0","#f60","#0c6","#666","#99f","#393","#c30"]);
		});
	});
	
	describe("Time Class", function() {
		it("should create Time object", function() {
			var time = eEasiLendar.newTime();
			expect(time).toBeDefined();
		});
		it("00:00:00, minutes should be 0", function() {
			var time = eEasiLendar.newTime(new Date(0,0,0,0,0,0));
			expect(time.minutes).toEqual(0);
		});
		it("24:00:00, minutes should be 0", function() {
			var time = eEasiLendar.newTime(new Date(0,0,0,24,0,0));
			expect(time.minutes).toEqual(0);
		});
		it("00:00:23, minutes should be 0", function() {
			var time = eEasiLendar.newTime(new Date(0,0,0,0,0,23));
			expect(time.minutes).toEqual(0);
		});
		it("02:00:00, minutes should be 120", function() {
			var time = eEasiLendar.newTime(new Date(0,0,0,2,0,0));
			expect(time.minutes).toEqual(120);
		});
		it("5:30:33, minutes should be 330", function() {
			var time = eEasiLendar.newTime(new Date(0,0,0,5,30,33));
			expect(time.minutes).toEqual(330);
		});
		it("23:59:59, minutes should be 1439", function() {
			var time = eEasiLendar.newTime(new Date(0,0,0,23,59,59));
			expect(time.minutes).toEqual(1439);
		});
		
		it("4:32:59, minutes should be 272", function() {
			var time = eEasiLendar.newTime(new Date(0,0,0,4,32,59));
			expect(time.minutes).toEqual(272);
		});
		it("null, minutes should be null", function() {
			var time = eEasiLendar.newTime();
			expect(time.minutes).toBeNull();
		});
	});
	
	describe("BusyEvent Class", function() {
		it("should create BusyEvent Object", function() {
			var busyE = eEasiLendar.newBusyEvent();
			expect(busyE).toBeDefined();
		});
		it("color should be dark gray (#666)", function() {
			var busyE = eEasiLendar.newBusyEvent();
			expect(eEasiLendar.eventColor[busyE.colorId]).toBe("#666");
		});
		it("summary should be 'Busy'", function() {
			var busyE = eEasiLendar.newBusyEvent();
			expect(busyE.summary).toBe("Busy");
		});
		
		describe("Missing arguments", function() {
			var busyE;
			beforeEach(function() {
				busyE = eEasiLendar.newBusyEvent();
			});
			
			it("start should be null if missing both arguments", function() {
				expect(busyE.start).toBeNull();
			});
			it("start should be null if missing 'start' argument", function() {
				var end = {dateTime: new Date(2015,3,24,10,50,22)}
				busyE = eEasiLendar.newBusyEvent(null, end);
				expect(busyE.start).toBeNull();
			});
			it("start should be null if missing 'end' argument", function() {
				var start = {dateTime: new Date(2015,3,22,3,30,0)}
				busyE = eEasiLendar.newBusyEvent(start);
				expect(busyE.start).toBeNull();
			});
			it("end should be null if missing both arguments", function() {
				expect(busyE.end).toBeNull();
			});
			it("end should be null if missing 'start' argument", function() {
				var end = {dateTime: new Date(2015,3,24,10,50,22)}
				busyE = eEasiLendar.newBusyEvent(null, end);
				expect(busyE.end).toBeNull();
			});
			it("end should be null if missing 'end' argument", function() {
				var start = {dateTime: new Date(2015,3,22,3,30,0)}
				busyE = eEasiLendar.newBusyEvent(start);
				expect(busyE.end).toBeNull();
			});
			
			afterEach(function() {
				busyE = null;
			});
		});
		
		describe("It is an overday event", function() {
			var busyE;
			beforeEach(function() {
				var start = {dateTime: new Date(2015,3,22,3,30,0)}
				var end = {dateTime: new Date(2015,3,24,10,50,22)}
				busyE = eEasiLendar.newBusyEvent(start, end);
			});
			it("start should be null", function() {
				expect(busyE.start).toBeNull();
			});
			it("end should be null", function() {
				expect(busyE.end).toBeNull();
			});
		});
		
		describe("It is an allday event", function() {
			var busyE;
			beforeEach(function() {
				var start = {dateTime: new Date(2015,3,22,0,0,0)}
				var end = {dateTime: new Date(2015,3,22,23,59,0)}
				busyE = eEasiLendar.newBusyEvent(start, end);
			});
			it("start should be null", function() {
				expect(busyE.start).toBeNull();
			});
			it("end should be null", function() {
				expect(busyE.end).toBeNull();
			});
		});
		
		describe("Unvalid arguments", function() {
			it("start should be null if both arguments are unvalid", function() {
				var start = {};
				var end = {abc: 123};
				var busyE = eEasiLendar.newBusyEvent(start, end);
				expect(busyE.start).toBeNull();
			});
			it("start should be null if 'start' argument is unvalid", function() {
				var start = {abc: 123};
				var end = {dateTime: new Date(2015,3,22,22,59,0)};
				var busyE = eEasiLendar.newBusyEvent(start, end);
				expect(busyE.start).toBeNull();
			});
			it("start should be null if 'end' argument is unvalid", function() {
				var start = {dateTime: new Date(2015,3,22,22,59,0)};
				var end = {abc: 123};
				var busyE = eEasiLendar.newBusyEvent(start, end);
				expect(busyE.start).toBeNull();
			});
			it("end should be null if both arguments are unvalid", function() {
				var start = {abc: 123};
				var end = {};
				var busyE = eEasiLendar.newBusyEvent(start, end);
				expect(busyE.start).toBeNull();
			});
			it("end should be null if 'start' argument is unvalid", function() {
				var start = {abc: 123};
				var end = {dateTime: new Date(2015,3,22,22,59,0)};
				var busyE = eEasiLendar.newBusyEvent(start, end);
				expect(busyE.end).toBeNull();
			});
			it("end should be null if 'end' argument is unvalid", function() {
				var start = {dateTime: new Date(2015,3,22,22,59,0)};
				var end = {abc: 123};
				var busyE = eEasiLendar.newBusyEvent(start, end);
				expect(busyE.end).toBeNull();
			});
		});
		
		describe("Valid argument", function() {
			it("start is 'start' argument if it is a normal event", function() {
				var start = {dateTime: new Date(2015,3,22,18,22,0)};
				var end = {dateTime: new Date(2015,3,22,22,59,0)};
				var busyE = eEasiLendar.newBusyEvent(start, end);
				expect(busyE.start).toBe(start);
			});
			it("end is 'end' argument if it is a normal event", function() {
				var start = {dateTime: new Date(2015,3,22,3,59,0)};
				var end = {dateTime: new Date(2015,3,22,22,59,0)};
				var busyE = eEasiLendar.newBusyEvent(start, end);
				expect(busyE.end).toBe(end);
			});
		});
	});
	
	describe("Event Class", function() {
		var event1, event2, event3;
		beforeEach(function() {
			// normal event
			event1 = {
				start: {dateTime: new Date(2015,3,22,7,9,0)},
				end: {dateTime: new Date(2015,3,22,13,30,0)},
				colorId: 2,
			};
			// overday event
			event2 = {
				start: {dateTime: new Date(2015,2,21,12,40,0)},
				end: {dateTime: new Date(2015,2,23,18,6,12)},
				colorId: 3,
			};
			// allday event
			event3 = {
				start: {dateTime: new Date(2015,5,22,0,0,0)},
				end: {dateTime: new Date(2015,5,22,23,59,0)},
				colorId: 4,
			};
		});
		describe("Missing argument", function() {
			var e;
			beforeEach(function() {
				e = eEasiLendar.newEvent();
			});
			it("should create Event Object", function() {
				expect(e).toBeDefined();
			});
			it("origin should be undefined if no argument", function() {
				expect(e.origin).toBeUndefined();
			});
			it("origin should be null if argument is null", function() {
				e = eEasiLendar.newEvent(null);
				expect(e.origin).toBeNull();
			});
			it("type should be null if no argument", function() {
				expect(e.type).toBeNull();
			});
			it("color should be #09c(default color) if no argument", function() {
				
			});
	
		
	});
	
	describe("Day Class", function() {
		
	});
	
	describe("Week Class", function() {
		
	});
	
	describe("WeekCalendar Class", function() {
		
	});
});