/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 17/07/2015
 * type: module all shared variables and functions use for calendar
 */

angular.module('MainApp.shareds.calendar', [])

.factory('eCalendar', function() {
	var doubleChar = function(num) {
		return num < 10 ? '0' + num : '' + num;
	};

	return {
		// Calendar variables
		weekDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		weekDaysFull: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		shortMonths: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],

		// Calendar functions
		// parse object date to some format
		parseDate: function(date) {
			var nday = date.getDay(),
				nmonth = date.getMonth(),
				ndate = date.getDate(),
				nyear = date.getFullYear(),
				nhour = date.getHours(),
				nmin = date.getMinutes(),
				nsec = date.getSeconds(),
				ap;

			if (nhour === 0) {
				ap = ' AM';
				nhour = 12;
			} else if (nhour < 12) {
				ap = ' AM';
			} else if (nhour == 12) {
				ap = ' PM';
			} else if (nhour > 12) {
				ap = ' PM';
				nhour -= 12;
			}

			return {
				// September 14
				date: this.months[nmonth] + ' ' + ndate,
				// 1995
				year: nyear,
				// Thursday, September 14, 1995
				fullDate: this.weekDaysFull[(nday + 6) % 7] + ', ' + this.months[nmonth] + ' ' + ndate + ', ' + nyear + '',
				// UTC date
				utcDate: doubleChar(ndate) + "/" + doubleChar(nmonth + 1) + "/" + nyear,
				// 05:00 AM
				time: doubleChar(nhour) + ':' + doubleChar(nmin) + ap,
				// 05:00:05 AM
				fullTime: doubleChar(nhour) + ':' +	doubleChar(nmin) + ':' + doubleChar(nsec) + ap,
			};
		},

		// Compute the number of days in a month
		daysOfMonth: function(month, year) {
			switch (month) {
				case 1: case 3: case 5: case 7: case 8: case 10: case 12:
					return 31;
				case 4: case 6: case 9: case 11:
					return 30;
				case 2:
					if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
						return 29;
					}
					return 28;
				default:
					return 0;
			}
		},

		// Caculate the next and previous day of one day
		tomorrow: function(today)  { return new Date(today.getTime() + 86400000);},
		yesterday: function(today) { return new Date(today.getTime() - 86400000);},

		// Convert and return event time
		eventTime: function(event) {
			// get and convert start time
			var mStart = parseDate(event.start.dateTime).time;
			var mStartDate = parseDate(event.start.dateTime).utcDate;

			// get and convert end time
			var mEnd = parseDate(event.end.dateTime).time;
			var mEndDate = parseDate(event.end.dateTime).utcDate;

			// if start date and end date are equal return once
			if (mStartDate == mEndDate) {
				return 'from ' + mStart + ' to ' + mEnd + ' ' + mEndDate;
			}
			// if they are not equal
			// return both start date and end date
			else {
				return 'from ' + mStart + ' ' + mStartDate +
					' to ' + mEnd + ' ' + mEndDate;
			}
		},

		// Construct event as a associative array from a array of Event
		parseEvent: function(arr) {}
	};
});
