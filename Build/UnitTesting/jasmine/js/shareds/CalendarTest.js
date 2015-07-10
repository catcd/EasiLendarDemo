/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 09/05/2015
 * type: test for functions use for calendar
 * test: 65 specs
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

		it('should create weekDaysFull: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]', function() {
			var weekDaysFull = eCalendar.weekDaysFull;

			expect(weekDaysFull).toBeDefined();
			expect(weekDaysFull.length).toEqual(7);
			expect(weekDaysFull[0]).toEqual("Monday");
			expect(weekDaysFull[6]).toEqual("Sunday");
			expect(weekDaysFull[3]).toEqual("Thursday");
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

	describe('Test easiConvertTime', function() {
		describe('Test time', function() {
			// 12:0 AM
			it('Start of day with 12:00:00 AM not 0:00:00 AM', function() {
				var day = new Date(2015, 0, 1, 0, 0, 0);
				var result = eCalendar.easiConvertTime(day);

				expect(result.time).toEqual("12:00:00 AM");
			});

			// time with 1 char number of hour (<10)
			it('time with 1 char number of hour (<10) should normal', function() {
				var day = new Date(2015, 0, 1, 3, 0, 0);
				var result = eCalendar.easiConvertTime(day);

				expect(result.time).toEqual("3:00:00 AM");
			});

			// time with 1 char number of minute (<10)
			it('time with 1 char number of minute (<10) should add 0', function() {
				var day = new Date(2015, 0, 1, 3, 4, 0);
				var result = eCalendar.easiConvertTime(day);

				expect(result.time).toEqual("3:04:00 AM");
			});

			// time with 1 char number of second (<10)
			it('time with 1 char number of second (<10) should add 0', function() {
				var day = new Date(2015, 0, 1, 3, 4, 5);
				var result = eCalendar.easiConvertTime(day);

				expect(result.time).toEqual("3:04:05 AM");
			});

			// time == 12PM
			it('time with 1 char number of second (<10) should add 0', function() {
				var day = new Date(2015, 0, 1, 12, 4, 5);
				var result = eCalendar.easiConvertTime(day);

				expect(result.time).toEqual("12:04:05 PM");
			});

			// time > 12PM
			it('time with 1 char number of second (<10) should add 0', function() {
				var day = new Date(2015, 0, 1, 14, 4, 5);
				var result = eCalendar.easiConvertTime(day);

				expect(result.time).toEqual("2:04:05 PM");
			});
		});

		describe('Test date', function() {
			// start of week
			it('start of week 03/05/2015', function() {
				var day = new Date(2015, 4, 3);
				var result = eCalendar.easiConvertTime(day);

				expect(result.date).toEqual("Sunday, May 3, 2015");
			});

			// end of week
			it('end of week 02/05/2015', function() {
				var day = new Date(2015, 4, 2);
				var result = eCalendar.easiConvertTime(day);

				expect(result.date).toEqual("Saturday, May 2, 2015");
			});

			// middle of week
			it('middle of week 05/05/2015', function() {
				var day = new Date(2015, 4, 5);
				var result = eCalendar.easiConvertTime(day);

				expect(result.date).toEqual("Tuesday, May 5, 2015");
			});

			// year before 2000
			it('year before 2000 14/09/1995', function() {
				var day = new Date(1995, 8, 14);
				var result = eCalendar.easiConvertTime(day);

				expect(result.date).toEqual("Thursday, September 14, 1995");
			});
		});
	});

	describe('Test parseDate', function() {
		// start of week
		it('start of week', function() {
			var day = new Date(2015, 4, 3);
			var result = eCalendar.parseDate(day);

			expect(result.date).toEqual("May, 3");
		});

		// start of month
		it('start of month', function() {
			var day = new Date(2015, 10, 1);
			var result = eCalendar.parseDate(day);

			expect(result.date).toEqual("November, 1");
		});

		// year before 2000
		it('year before 2000', function() {
			var day = new Date(1995, 8, 14);
			var result = eCalendar.parseDate(day);

			expect(result.year).toEqual(1995);
		});

		// three number digits year
		it('three number digits year', function() {
			var day = new Date(195, 8, 14);
			var result = eCalendar.parseDate(day);

			expect(result.year).toEqual(195);
		});

		// year after 2000
		it('year after 2000', function() {
			var day = new Date(2995, 8, 14);
			var result = eCalendar.parseDate(day);

			expect(result.year).toEqual(2995);
		});
	});

	describe('Test daysOfMonth', function() {
		// invalid month
		// bigger than 12
		it('should return 0 if month is 13/2015', function() {
			var days = eCalendar.daysOfMonth(13, 2015);

			expect(days).toEqual(0);
		});

		// zero month
		it('should return 0 if month is 0/2015', function() {
			var days = eCalendar.daysOfMonth(0, 2015);

			expect(days).toEqual(0);
		});

		// negative month
		it('should return 0 if month is -5/2015', function() {
			var days = eCalendar.daysOfMonth(-5, 2015);

			expect(days).toEqual(0);
		});

		// all 31-days month
		// random year
		it('should return 31 if month is 01/2015', function() {
			var days = eCalendar.daysOfMonth(1, 2015);

			expect(days).toEqual(31);
		});

		it('should return 31 if month is 03/1015', function() {
			var days = eCalendar.daysOfMonth(3, 1015);

			expect(days).toEqual(31);
		});

		it('should return 31 if month is 05/2010', function() {
			var days = eCalendar.daysOfMonth(5, 2010);

			expect(days).toEqual(31);
		});

		it('should return 31 if month is 07/2016', function() {
			var days = eCalendar.daysOfMonth(7, 2016);

			expect(days).toEqual(31);
		});

		it('should return 31 if month is 08/2016', function() {
			var days = eCalendar.daysOfMonth(8, 2016);

			expect(days).toEqual(31);
		});

		it('should return 31 if month is 10/2017', function() {
			var days = eCalendar.daysOfMonth(10, 2017);

			expect(days).toEqual(31);
		});

		it('should return 31 if month is 12/2222', function() {
			var days = eCalendar.daysOfMonth(12, 2222);

			expect(days).toEqual(31);
		});

		// all 30-days month
		// random year
		it('should return 30 if month is 04/1995', function() {
			var days = eCalendar.daysOfMonth(4, 1995);

			expect(days).toEqual(30);
		});

		it('should return 30 if month is 06/1995', function() {
			var days = eCalendar.daysOfMonth(9, 1995);

			expect(days).toEqual(30);
		});

		it('should return 30 if month is 09/2115', function() {
			var days = eCalendar.daysOfMonth(6, 2115);

			expect(days).toEqual(30);
		});

		it('should return 30 if month is 11/3015', function() {
			var days = eCalendar.daysOfMonth(11, 3015);

			expect(days).toEqual(30);
		});

		// test February
		// leap year
		it('should return 29 if month is 02/2016', function() {
			var days = eCalendar.daysOfMonth(2, 2016);

			expect(days).toEqual(29);
		});

		it('should return 29 if month is 02/2000', function() {
			var days = eCalendar.daysOfMonth(2, 2000);

			expect(days).toEqual(29);
		});

		it('should return 29 if month is 02/000', function() {
			var days = eCalendar.daysOfMonth(2, 0);

			expect(days).toEqual(29);
		});

		// normal year
		it('should return 28 if month is 02/001', function() {
			var days = eCalendar.daysOfMonth(2, 1);

			expect(days).toEqual(28);
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

	describe('Test tomorrow', function() {

		// first day to second day
		it('first day to second day today is 01/01/2015 should return tommorow is 02/01/2015', function() {
			var today = new Date(2015, 0, 1);
			var tomorrow = eCalendar.tomorrow(today);

			expect(tomorrow).toEqual(new Date(2015, 0, 2));
		});

		// next year
		it('next year today is 31/12/2015 should return tommorow is 01/01/2016', function() {
			var today = new Date(2015, 11, 31);
			var tomorrow = eCalendar.tomorrow(today);

			expect(tomorrow).toEqual(new Date(2016, 0, 1));
		});

		// next month
		it('next month today is 31/01/2015 should return tommorow is 01/02/2015', function() {
			var today = new Date(2015, 0, 31);
			var tomorrow = eCalendar.tomorrow(today);

			expect(tomorrow).toEqual(new Date(2015, 1, 1));
		});

		// next month 28/2 leap year
		it('next month 28/2 leap year today is 28/02/2016 should return tommorow is 29/02/2016', function() {
			var today = new Date(2016, 1, 28);
			var tomorrow = eCalendar.tomorrow(today);

			expect(tomorrow).toEqual(new Date(2016, 1, 29));
		});

		// next month 28/2 normal year
		it('next month 28/2 normal year today is 28/02/2013 should return tommorow is 01/03/2013', function() {
			var today = new Date(2013, 1, 28);
			var tomorrow = eCalendar.tomorrow(today);

			expect(tomorrow).toEqual(new Date(2013, 2, 1));
		});

		// normal
		it('normal day today is 14/09/2015 should return tommorow is 15/09/2015', function() {
			var today = new Date(2015, 8, 14);
			var tomorrow = eCalendar.tomorrow(today);

			expect(tomorrow).toEqual(new Date(2015, 8, 15));
		});

		// with time
		it('with time today is 14:00 14/09/2015 should return tommorow is 14:00 15/09/2015', function() {
			var today = new Date(2015, 8, 14, 14);
			var tomorrow = eCalendar.tomorrow(today);

			expect(tomorrow).toEqual(new Date(2015, 8, 15, 14));
		});
	});

	describe('Test yesterday', function() {

		// previous year
		it('previous year today is 01/01/2015 should return yesterday is 31/12/2014', function() {
			var today = new Date(2015, 0, 1);
			var yesterday = eCalendar.yesterday(today);

			expect(yesterday).toEqual(new Date(2014, 11, 31));
		});

		// last day to the pre-last day
		it('last day to the pre-last day today is 31/12/2015 should return yesterday is 30/12/2015', function() {
			var today = new Date(2015, 11, 31);
			var yesterday = eCalendar.yesterday(today);

			expect(yesterday).toEqual(new Date(2015, 11, 30));
		});

		// previous month
		it('previous month today is 01/05/2015 should return yesterday is 30/04/2015', function() {
			var today = new Date(2015, 4, 1);
			var yesterday = eCalendar.yesterday(today);

			expect(yesterday).toEqual(new Date(2015, 3, 30));
		});

		// previous month 1/3 leap year
		it('previous month 1/3 leap year today is 01/03/2016 should return yesterday is 29/02/2016', function() {
			var today = new Date(2016, 2, 1);
			var yesterday = eCalendar.yesterday(today);

			expect(yesterday).toEqual(new Date(2016, 1, 29));
		});

		// previous month 1/3 normal year
		it('previous month 1/3 normal year today is 01/03/2014 should return yesterday is 28/02/2014', function() {
			var today = new Date(2014, 2, 1);
			var yesterday = eCalendar.yesterday(today);

			expect(yesterday).toEqual(new Date(2014, 1, 28));
		});

		// normal
		it('normal day today is 14/09/2015 should return yesterday is 13/09/2015', function() {
			var today = new Date(2015, 8, 14);
			var yesterday = eCalendar.yesterday(today);

			expect(yesterday).toEqual(new Date(2015, 8, 13));
		});

		// with time
		it('with time today is 14:00 14/09/2015 should return yesterday is 14:00 13/09/2015', function() {
			var today = new Date(2015, 8, 14, 14);
			var yesterday = eCalendar.yesterday(today);

			expect(yesterday).toEqual(new Date(2015, 8, 13, 14));
		});
	});

	describe('Test convertTime', function() {

		it('event from 1 day to 1 other day differ time', function() {
			var mEvent = {start: {dateTime: new Date(2015, 1, 14, 20)}, end: {dateTime: new Date(2015, 1, 15, 6)}};
			var mOutput = eCalendar.convertTime(mEvent);

			expect(mOutput).toEqual("from 20:00 14/02/2015 to 06:00 15/02/2015");
		});

		it('event from 1 day to 1 other day same time', function() {
			var mEvent = {start: {dateTime: new Date(2015, 1, 14, 20)}, end: {dateTime: new Date(2015, 1, 15, 20)}};
			var mOutput = eCalendar.convertTime(mEvent);

			expect(mOutput).toEqual("from 20:00 14/02/2015 to 20:00 15/02/2015");
		});

		it('event from 1 month to 1 other month differ time', function() {
			var mEvent = {start: {dateTime: new Date(2015, 8, 14, 10)}, end: {dateTime: new Date(2015, 9, 15, 18)}};
			var mOutput = eCalendar.convertTime(mEvent);

			expect(mOutput).toEqual("from 10:00 14/09/2015 to 18:00 15/10/2015");
		});

		it('event from 1 month to 1 other month same time', function() {
			var mEvent = {start: {dateTime: new Date(2015, 8, 14, 18)}, end: {dateTime: new Date(2015, 9, 15, 18)}};
			var mOutput = eCalendar.convertTime(mEvent);

			expect(mOutput).toEqual("from 18:00 14/09/2015 to 18:00 15/10/2015");
		});

		it('event from 1 year to 1 other year differ time', function() {
			var mEvent = {start: {dateTime: new Date(2014, 8, 14, 17)}, end: {dateTime: new Date(2015, 9, 15, 18)}};
			var mOutput = eCalendar.convertTime(mEvent);

			expect(mOutput).toEqual("from 17:00 14/09/2014 to 18:00 15/10/2015");
		});

		it('event from 1 year to 1 other year same time', function() {
			var mEvent = {start: {dateTime: new Date(2014, 8, 14, 18)}, end: {dateTime: new Date(2015, 9, 15, 18)}};
			var mOutput = eCalendar.convertTime(mEvent);

			expect(mOutput).toEqual("from 18:00 14/09/2014 to 18:00 15/10/2015");
		});

		it('event at a same day normal', function() {
			var mEvent = {start: {dateTime: new Date(2015, 8, 14, 19)}, end: {dateTime: new Date(2015, 8, 14, 23)}};
			var mOutput = eCalendar.convertTime(mEvent);

			expect(mOutput).toEqual("from 19:00 to 23:00 14/09/2015");
		});

		it('event at a same day one 0 before hour', function() {
			var mEvent = {start: {dateTime: new Date(2015, 8, 14, 6)}, end: {dateTime: new Date(2015, 8, 14, 9)}};
			var mOutput = eCalendar.convertTime(mEvent);

			expect(mOutput).toEqual("from 06:00 to 09:00 14/09/2015");
		});

		it('event at a same day two 0s before hour', function() {
			var mEvent = {start: {dateTime: new Date(2015, 8, 14, 0, 30)}, end: {dateTime: new Date(2015, 8, 14, 9)}};
			var mOutput = eCalendar.convertTime(mEvent);

			expect(mOutput).toEqual("from 00:30 to 09:00 14/09/2015");
		});

		it('event at a same day one 0 before minute', function() {
			var mEvent = {start: {dateTime: new Date(2015, 8, 14, 6, 9)}, end: {dateTime: new Date(2015, 8, 14, 9, 6)}};
			var mOutput = eCalendar.convertTime(mEvent);

			expect(mOutput).toEqual("from 06:09 to 09:06 14/09/2015");
		});

		it('event at a same day two 0s before minute', function() {
			var mEvent = {start: {dateTime: new Date(2015, 8, 14, 10)}, end: {dateTime: new Date(2015, 8, 14, 19)}};
			var mOutput = eCalendar.convertTime(mEvent);

			expect(mOutput).toEqual("from 10:00 to 19:00 14/09/2015");
		});
	});
});
