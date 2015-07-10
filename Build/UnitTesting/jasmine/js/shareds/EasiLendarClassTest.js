/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 26/04/2015
 * type: unit test
 * base on: javascript, Google Calendar API
 */
 
describe('EasiLendar Classes Test', function() {
	angular.module("EasiLendarClassMock", [])
	.factory("$rootScope", function() {
		return {
			currentState: "week"
		};
	});
	beforeEach(function() {
		module('MainApp.shareds.data');
		module('EasiLendarClassMock');
		module('MainApp.shareds.calendar');
		module('MainApp.shareds.easiLendarClass');
		inject(function(_$rootScope_, _eEasiLendar_, _eCalendar_, _eUser_, _eFriend_, _eSettings_) {
			$rootScope = _$rootScope_;
			eEasiLendar = _eEasiLendar_;
			eCalendar = _eCalendar_;
			eUser = _eUser_,
			eFriend = _eFriend_;
			eSettings = _eSettings_;
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
		
		it("should create Event Object", function() {
			var e = eEasiLendar.newEvent();
			expect(e).toBeDefined();
		});
		
		describe("Missing argument", function() {
			var e;
			beforeEach(function() {
				e = eEasiLendar.newEvent();
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
				expect(e.color).toEqual(eEasiLendar.eventColor[0]);
			});
		});
		describe("Argument 'event' is normal event", function() {
			var e;
			beforeEach(function() {
				e = eEasiLendar.newEvent(event1);
			});
			it("origin should be 'event' argument", function() {
				expect(e.origin).toBe(event1);
			});
			it("type should be 'normal'", function() {
				expect(e.type).toBe("normal");
			});
			it("color should be '#36f'", function() {
				expect(e.color).toBe(eEasiLendar.eventColor[2]);
			});
		});
		describe("Argument 'event' is overday event", function() {
			var e;
			beforeEach(function() {
				e = eEasiLendar.newEvent(event2);
			});
			it("origin should be 'event' argument", function() {
				expect(e.origin).toBe(event2);
			});
			it("type should be 'over'", function() {
				expect(e.type).toBe("over");
			});
			it("color should be '#93f'", function() {
				expect(e.color).toBe(eEasiLendar.eventColor[3]);
			});
		});
		describe("Argument 'event' is allday event", function() {
			var e;
			beforeEach(function() {
				e = eEasiLendar.newEvent(event3);
			});
			it("origin should be 'event' argument", function() {
				expect(e.origin).toBe(event3);
			});
			it("type should be 'all'", function() {
				expect(e.type).toBe("all");
			});
			it("color should be '#ff9999'", function() {
				expect(e.color).toBe(eEasiLendar.eventColor[4]);
			});
		});
	});
	
	describe("Day Class", function() {
		var event1, event2, event3;
		var date1, date2, date3, date4;
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
			date1 = new Date(2015,2,21);
			date2 = new Date(2015,2,23);
			date3 = new Date(2015,3,22);
			date4 = new Date(2015,5,22);
			eUser.uGmailCalendar = [];
			eUser.uGmailCalendar[date1] = [event2];
			eUser.uGmailCalendar[date2] = [event2];
			eUser.uGmailCalendar[date3] = [event1];
			eUser.uGmailCalendar[date4] = [event3];
		});
		
		it("should create Day object", function() {
			var d = eEasiLendar.newDay(); 
			expect(d).toBeDefined();
		});
			
		describe("Missing argument", function(){
			var d;
			beforeEach(function() {
				d = eEasiLendar.newDay();
			});
			it("year should be null", function() {
				expect(d.year).toBeNull();
			});
			it("month should be null", function() {
				expect(d.month).toBeNull();
			});
			it("date should be null", function() {
				expect(d.date).toBeNull();
			});
			it("day should be null", function() {
				expect(d.day).toBeNull();
			});
			it("events should be null", function() {
				expect(d.events).toBeNull();
			});
			it("next day should be null", function() {
				expect(d.nextDay()).toBeNull();
			});
			it("previous day should be null", function() {
				expect(d.prevDay()).toBeNull();
			});
		});
		
		describe("'date' argument is the day that has a normal event", function() {
			var d;
			beforeEach(function() {
				d = eEasiLendar.newDay(date3);
			});
			it("year should be 2015", function() {
				expect(d.year).toBe(2015);
			});
			it("month should be April", function() {
				expect(eCalendar.months[d.month]).toBe(eCalendar.months[3]);
			});
			it("date should be 22", function() {
				expect(d.date).toBe(22);
			});
			it("day should be Wed", function() {
				expect(d.day).toBe("Wed");
			});
			
			describe("Events array", function() {
				it("should contains elements", function() {
					expect(d.events).not.toBeNull();
				});
				it("should contains all events of 'date'", function() {
					expect(d.events.length).toBe(eUser.uGmailCalendar[date3].length);
				});
				it("should convert all events of 'date' to Event objects", function() {
					expect(d.events[0].origin).toBe(event1);
					expect(d.events[0].type).toBe("normal");
					expect(d.events[0].color).toBe("#36f");
				});
			});
		});
		
		describe("'date' argument is the day that has a overday event", function() {
			var d;
			beforeEach(function() {
				d = eEasiLendar.newDay(date1);
			});
			it("year should be 2015", function() {
				expect(d.year).toBe(2015);
			});
			it("month should be March", function() {
				expect(eCalendar.months[d.month]).toBe(eCalendar.months[2]);
			});
			it("date should be 21", function() {
				expect(d.date).toBe(21);
			});
			it("day should be Sat", function() {
				expect(d.day).toBe("Sat");
			});
			
			describe("Events array", function() {
				it("should contains elements", function() {
					expect(d.events).not.toBeNull();
				});
				it("should contains all events of 'date'", function() {
					expect(d.events.length).toBe(eUser.uGmailCalendar[date3].length);
				});
				it("should convert all events of 'date' to Event objects", function() {
					expect(d.events[0].origin).toBe(event2);
					expect(d.events[0].type).toBe("over");
					expect(d.events[0].color).toBe("#93f");
				});
			});
		});
		
		describe("'date' argument is the day that has a allday event", function() {
			var d;
			beforeEach(function() {
				d = eEasiLendar.newDay(date4);
			});
			it("year should be 2015", function() {
				expect(d.year).toBe(2015);
			});
			it("month should be March", function() {
				expect(eCalendar.months[d.month]).toBe(eCalendar.months[5]);
			});
			it("date should be 22", function() {
				expect(d.date).toBe(22);
			});
			it("day should be Mon", function() {
				expect(d.day).toBe("Mon");
			});
			
			describe("Events array", function() {
				it("should contains elements", function() {
					expect(d.events).not.toBeNull();
				});
				it("should contains all events of 'date'", function() {
					expect(d.events.length).toBe(eUser.uGmailCalendar[date4].length);
				});
				it("should convert all events of 'date' to Event objects", function() {
					expect(d.events[0].origin).toBe(event3);
					expect(d.events[0].type).toBe("all");
					expect(d.events[0].color).toBe("#ff9999");
				});
			});
		});
		
		describe("nextDay function", function() {
			var d, nd;
			beforeEach(function() {
				d = eEasiLendar.newDay(date1);
				nd = d.nextDay();
			});
			it("should return Day object", function() {
				expect(nd.year).toBeDefined();
				expect(nd.month).toBeDefined();
			});
			it("next date of 2015/03/22 should be 2015/03/23", function() {
				expect(nd.year).toBe(2015);
				expect(eCalendar.months[nd.month]).toBe("March");
				expect(nd.date).toBe(22);
			});
		});
		
		describe("prevDay function", function() {
			var d, pd;
			beforeEach(function() {
				d = eEasiLendar.newDay(date4);
				pd = d.prevDay();
			});
			it("should return Day object", function() {
				expect(pd.year).toBeDefined();
				expect(pd.month).toBeDefined();
			});
			it("previous date of 2015/06/22 should be 2015/06/21", function() {
				expect(pd.year).toBe(2015);
				expect(eCalendar.months[pd.month]).toBe("June");
				expect(pd.date).toBe(21);
			});
		});
		
		afterEach(function() {
			eUser.uGmailCalendar = null;
		});
	});
	
	describe("Week Class", function() {
		var date1 = new Date(2015,3,27);
		var date2 = new Date(2015,3,25);
		var days1 = [];
		var days2 = [];
		beforeEach(function() {
			days1[0] = eEasiLendar.newDay(date1);
			for (var i = 1; i < 7; i++) {
				days1[i] = days1[i-1].nextDay();
			}
			days2[0] = eEasiLendar.newDay(date2);
			for (var i = 1; i < 7; i++) {
				days2[i] = days2[i-1].nextDay();
			}
		});
		describe("Missing argument", function() {
			var week;
			beforeEach(function() {
				week = eEasiLendar.newWeek();
			});
			it("should create Week object", function() {
				expect(week).toBeDefined();
			});
			it("should be a current week", function() {
				var curDate = new Date();
				var d = (curDate.getDay() + 6) % 7; // 0(Mon) - 6(Sun)
				var mon = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - d);
				var sun = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() + 6 - d);
				expect(week.days[0].date).toBe(mon.getDate());
				expect(week.days[6].date).toBe(sun.getDate());
			});
			it("default start day of the week should be Monday", function() {
				expect(week.days[0].day).toBe("Mon");
			});
			it("days array should contains 7 Day objects", function() {
				expect(week.days[0].year).toBeDefined();
				expect(week.days[4].month).toBeDefined();
				expect(week.days[5].date).toBeDefined();
				expect(week.days[6].prevDay().date).toEqual(week.days[5].date);
			});
			it("month1 should be month of Monday", function() {
				expect(week.month1).toEqual(week.days[0].month);
			});
			it("month2 should be month of Sunday", function() {
				expect(week.month2).toEqual(week.days[6].month);
			});
			it("year1 should be year of Monday", function() {
				expect(week.year1).toEqual(week.days[0].year);
			});
			it("year2 should be year of Sunday", function() {
				expect(week.year2).toEqual(week.days[6].year);
			});
			it("nextWeek function should return Week object which is the next week of current week", function() {
				var next = week.nextWeek();
				expect(next.days[0].date).toEqual(week.days[6].nextDay().date);
			});
			it("prevWeek function should return Week object which is the previous week of current week", function() {
				var prev = week.prevWeek();
				expect(prev.days[6].date).toEqual(week.days[0].prevDay().date);
			});
		});
		
		describe("Missing 'days' argument, 'start' argument is Sunday", function() {
			var week;
			beforeEach(function() {
				week = eEasiLendar.newWeek(null, "Sun");
			});
			it("should create Week object", function() {
				expect(week).toBeDefined();
			});
			it("should be a current week", function() {
				var curDate = new Date();
				var d = curDate.getDay(); // 0(Sun) - 6(Sat)
				var sun = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - d);
				var sat = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() + 6 - d);
				expect(week.days[0].date).toBe(sun.getDate());
				expect(week.days[6].date).toBe(sat.getDate());
			});
			it("start day of the week should be Sunday", function() {
				expect(week.days[0].day).toBe("Sun");
			});
			it("days array should contains 7 Day objects", function() {
				expect(week.days[0].year).toBeDefined();
				expect(week.days[4].month).toBeDefined();
				expect(week.days[5].date).toBeDefined();
				expect(week.days[6].prevDay().date).toEqual(week.days[5].date);
			});
			it("month1 should be month of Sunday", function() {
				expect(week.month1).toEqual(week.days[0].month);
			});
			it("month2 should be month of Saturday", function() {
				expect(week.month2).toEqual(week.days[6].month);
			});
			it("year1 should be year of Sunday", function() {
				expect(week.year1).toEqual(week.days[0].year);
			});
			it("year2 should be year of Saturday", function() {
				expect(week.year2).toEqual(week.days[6].year);
			});
			it("nextWeek function should return Week object which is the next week of current week", function() {
				var next = week.nextWeek();
				expect(next.days[0].date).toEqual(week.days[6].nextDay().date);
			});
			it("prevWeek function should return Week object which is the previous week of current week", function() {
				var prev = week.prevWeek();
				expect(prev.days[6].date).toEqual(week.days[0].prevDay().date);
			});
		});
		
		describe("'days' argument is array of 7 days start at 2015/04/27, 'start' is missing", function() {
			var week;
			beforeEach(function() {
				week = eEasiLendar.newWeek(days1);
			});
			it("should create Week object", function() {
				expect(week).toBeDefined();
			});
			it("should be a week that has start day is 2015/04/27", function() {
				expect(week.days[0].date).toBe(27);
				expect(week.days[0].year).toBe(2015);
				expect(week.days[0].month).toBe(3);
			});
			it("should be a week that has last day is 2015/05/03", function() {
				expect(week.days[6].date).toBe(3);
				expect(week.days[6].year).toBe(2015);
				expect(week.days[6].month).toBe(4);
			});
			it("start day of the week should be Monday", function() {
				expect(week.days[0].day).toBe("Mon");
			});
			it("days array should contains 7 Day objects", function() {
				expect(week.days[0].year).toBeDefined();
				expect(week.days[4].month).toBeDefined();
				expect(week.days[5].date).toBeDefined();
				expect(week.days[6].prevDay().date).toEqual(week.days[5].date);
			});
			it("month1 should be April", function() {
				expect(week.month1).toBe(3);
			});
			it("month2 should be May", function() {
				expect(week.month2).toBe(4);
			});
			it("year1 should be 2015", function() {
				expect(week.year1).toBe(2015);
			});
			it("year2 should be 2015", function() {
				expect(week.year2).toBe(2015);
			});
			describe("nextWeek function", function() {
				var next;
				beforeEach(function() {
					week = eEasiLendar.newWeek(days1);
					next = week.nextWeek();
				});
				it("first day should be Monday 2015/05/04", function() {
					expect(next.days[0].date).toBe(4);
					expect(next.days[0].day).toBe("Mon");
					expect(next.days[0].month).toBe(4);
					expect(next.days[0].year).toBe(2015);
				});
				it("last day should be Sunday 2015/05/10", function() {
					expect(next.days[6].date).toBe(10);
					expect(next.days[6].day).toBe("Sun");
					expect(next.days[6].month).toBe(4);
					expect(next.days[6].year).toBe(2015);
				});
			});
			describe("prevWeek function", function() {
				var prev;
				beforeEach(function() {
					week = eEasiLendar.newWeek(days1);
					prev = week.prevWeek();
				});
				it("first day should be Monday 2015/04/20", function() {
					expect(prev.days[0].date).toBe(20);
					expect(prev.days[0].day).toBe("Mon");
					expect(prev.days[0].month).toBe(3);
					expect(prev.days[0].year).toBe(2015);
				});
				it("last day should be Sunday 2015/04/26", function() {
					expect(prev.days[6].date).toBe(26);
					expect(prev.days[6].day).toBe("Sun");
					expect(prev.days[6].month).toBe(3);
					expect(prev.days[6].year).toBe(2015);
				});
			});
		});
		
		describe("'days' argument is array of 7 days start at 2015/04/25, 'start' is Monday", function() {
			var week;
			beforeEach(function() {
				week = eEasiLendar.newWeek(days2, "Mon");
			});
			it("should create Week object", function() {
				expect(week).toBeDefined();
			});
			it("should be a week that has start day is 2015/04/25", function() {
				expect(week.days[0].date).toBe(25);
				expect(week.days[0].year).toBe(2015);
				expect(week.days[0].month).toBe(3);
			});
			it("should be a week that has last day is 2015/05/01", function() {
				expect(week.days[6].date).toBe(1);
				expect(week.days[6].year).toBe(2015);
				expect(week.days[6].month).toBe(4);
			});
			it("start day of the week should be Saturday, 'start' argument should be ignored", function() {
				expect(week.days[0].day).toBe("Sat");
			});
			it("days array should contains 7 Day objects", function() {
				expect(week.days[0].year).toBeDefined();
				expect(week.days[4].month).toBeDefined();
				expect(week.days[5].date).toBeDefined();
				expect(week.days[6].prevDay().date).toEqual(week.days[5].date);
			});
			it("month1 should be April", function() {
				expect(week.month1).toBe(3);
			});
			it("month2 should be May", function() {
				expect(week.month2).toBe(4);
			});
			it("year1 should be 2015", function() {
				expect(week.year1).toBe(2015);
			});
			it("year2 should be 2015", function() {
				expect(week.year2).toBe(2015);
			});
			describe("nextWeek function", function() {
				var next;
				beforeEach(function() {
					week = eEasiLendar.newWeek(days2);
					next = week.nextWeek();
				});
				it("first day should be Saturday 2015/05/02", function() {
					expect(next.days[0].date).toBe(2);
					expect(next.days[0].day).toBe("Sat");
					expect(next.days[0].month).toBe(4);
					expect(next.days[0].year).toBe(2015);
				});
				it("last day should be Friday 2015/05/08", function() {
					expect(next.days[6].date).toBe(8);
					expect(next.days[6].day).toBe("Fri");
					expect(next.days[6].month).toBe(4);
					expect(next.days[6].year).toBe(2015);
				});
			});
			describe("prevWeek function", function() {
				var prev;
				beforeEach(function() {
					week = eEasiLendar.newWeek(days2);
					prev = week.prevWeek();
				});
				it("first day should be Monday 2015/04/18", function() {
					expect(prev.days[0].date).toBe(18);
					expect(prev.days[0].day).toBe("Sat");
					expect(prev.days[0].month).toBe(3);
					expect(prev.days[0].year).toBe(2015);
				});
				it("last day should be Sunday 2015/04/24", function() {
					expect(prev.days[6].date).toBe(24);
					expect(prev.days[6].day).toBe("Fri");
					expect(prev.days[6].month).toBe(3);
					expect(prev.days[6].year).toBe(2015);
				});
			});
		});
	});
	
	describe("WeekCalendar Class", function() {
		
	});
});