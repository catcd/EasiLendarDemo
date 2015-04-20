/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 19/04/2015
 * type: test for functions use for calendar
 */

describe('Calendar service test', function() {
	var eCalendar;

	// excuted before each "it" is run.
	beforeEach(function() {

		// load the module.
		module('MainApp.shareds.calendar');

		// inject your service for testing.
		// The _underscores_ are a convenience thing
		// so you can have your variable name be the
		// same as your injected service.
		inject(function(_eCalendar_) {
			eCalendar = _eCalendar_;
		});
	});

	describe('Initialize calendar data', function() {
		it('should create weekDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]', function() {
			var weekDays = eCalendar.weekDays;
			expect(weekDays).toBeDefined();
			expect(weekDays.length).toEqual(7);
			expect(weekDays[0]).toEqual("Mon");
			expect(weekDays[6]).toEqual("Sun");
			expect(weekDays[3]).toEqual("Thu");
		});
		it('should create months: ["January", "February", "March", "April", "May", "June", etc.', function() {
			var months = eCalendar.months;
			expect(months).toBeDefined();
			expect(months.length).toEqual(12);
			expect(months[0]).toEqual("January");
			expect(months[11]).toEqual("December");
			expect(months[8]).toEqual("September");
		});
		it('should create shortMonths: ["jan", "feb", "mar", "apr", "may", "jun", "jul", etc.', function() {
			var shortMonths = eCalendar.shortMonths;
			expect(shortMonths).toBeDefined();
			expect(shortMonths.length).toEqual(12);
			expect(shortMonths[0]).toEqual("jan");
			expect(shortMonths[11]).toEqual("dec");
			expect(shortMonths[8]).toEqual("sep");
		});
		it('should create bkgs: ["bkg_01_jan.jpg", "bkg_02_feb.jpg", "bkg_03_mar.jpg", "bkg_04_apr.jpg", etc.', function() {
			var bkgs = eCalendar.bkgs;
			expect(bkgs).toBeDefined();
			expect(bkgs.length).toEqual(12);
			expect(bkgs[0]).toEqual("bkg_01_jan.jpg");
			expect(bkgs[11]).toEqual("bkg_12_dec.jpg");
			expect(bkgs[8]).toEqual("bkg_09_sep.jpg");
		});
	});

	describe('Test daysOfMonth', function() {
		it('should return 31 if month is 01/2015', function() {
			var days = eCalendar.daysOfMonth(1, 2015);
			expect(days).toEqual(31);
		});
		it('should return 31 if month is 07/2016', function() {
			var days = eCalendar.daysOfMonth(7, 2016);
			expect(days).toEqual(31);
		});
		it('should return 30 if month is 09/1995', function() {
			var days = eCalendar.daysOfMonth(9, 1995);
			expect(days).toEqual(30);
		});
		it('should return 30 if month is 06/2115', function() {
			var days = eCalendar.daysOfMonth(6, 2115);
			expect(days).toEqual(30);
		});
		it('should return 29 if month is 02/2016', function() {
			var days = eCalendar.daysOfMonth(2, 2016);
			expect(days).toEqual(29);
		});
		it('should return 29 if month is 02/2000', function() {
			var days = eCalendar.daysOfMonth(2, 2000);
			expect(days).toEqual(29);
		});
		it('should return 28 if month is 02/2015', function() {
			var days = eCalendar.daysOfMonth(2, 2015);
			expect(days).toEqual(28);
		});
		it('should return 28 if month is 02/2010', function() {
			var days = eCalendar.daysOfMonth(2, 2010);
			expect(days).toEqual(28);
		});
	});

	describe('Test tomorrow and yesterday', function() {
		it('today is 01/01/2015 should return yesterday is 31/12/2014 and tommorow is 02/01/2015', function() {
			var today = new Date(2015, 0, 1);
			var yesterday = eCalendar.yesterday(today);
			var tomorrow = eCalendar.tomorrow(today);

			expect(yesterday).toEqual(new Date(2014, 11, 31));
			expect(tomorrow).toEqual(new Date(2015, 0, 2));
		});
		it('today is 31/12/2015 should return yesterday is 30/12/2014 and tommorow is 01/01/2015', function() {
			var today = new Date(2015, 11, 31);
			var yesterday = eCalendar.yesterday(today);
			var tomorrow = eCalendar.tomorrow(today);

			expect(yesterday).toEqual(new Date(2015, 11, 30));
			expect(tomorrow).toEqual(new Date(2016, 0, 1));
		});
		it('today is 14/09/2015 should return yesterday is 13/09/2014 and tommorow is 15/09/2015', function() {
			var today = new Date(2015, 8, 14);
			var yesterday = eCalendar.yesterday(today);
			var tomorrow = eCalendar.tomorrow(today);

			expect(yesterday).toEqual(new Date(2015, 8, 13));
			expect(tomorrow).toEqual(new Date(2015, 8, 15));
		});
	});

	describe('Test convertTime', function() {
		it('event from 1 day to 1 other day', function() {
			var mEvent = {start: {dateTime: new Date(2015, 1, 14, 20)}, end: {dateTime: new Date(2015, 1, 15, 6)}};
			var mOutput = eCalendar.convertTime(mEvent);

			expect(mOutput).toEqual("from 20:00 14/02/2015 to 06:00 15/02/2015");
		});
		it('event from 1 month to 1 other month', function() {
			var mEvent = {start: {dateTime: new Date(2015, 8, 14, 18)}, end: {dateTime: new Date(2015, 9, 15, 18)}};
			var mOutput = eCalendar.convertTime(mEvent);

			expect(mOutput).toEqual("from 18:00 14/09/2015 to 18:00 15/10/2015");
		});
		it('event from 1 year to 1 other year', function() {
			var mEvent = {start: {dateTime: new Date(2014, 8, 14, 18)}, end: {dateTime: new Date(2015, 9, 15, 18)}};
			var mOutput = eCalendar.convertTime(mEvent);

			expect(mOutput).toEqual("from 18:00 14/09/2014 to 18:00 15/10/2015");
		});
		it('event at a same day', function() {
			var mEvent = {start: {dateTime: new Date(2015, 8, 14, 19)}, end: {dateTime: new Date(2015, 8, 14, 23)}};
			var mOutput = eCalendar.convertTime(mEvent);

			expect(mOutput).toEqual("from 19:00 to 23:00 14/09/2015");
		});
	});
});
