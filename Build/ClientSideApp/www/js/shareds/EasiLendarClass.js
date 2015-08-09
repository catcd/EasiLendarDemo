/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 15/07/2015
 * type: All common class for EasiLendar App
 * base on: javascript, Google Calendar API
 */

var easilendar = angular.module('MainApp.shareds.easiLendarClass', []);

easilendar.factory('eEasiLendar', function($rootScope, eCalendar, eUser,
	eFriend, eSettings) {
	// 12 colors for user's choices;
	var eventColor = ['#09c', '#0cf', '#36f', '#93f', '#ff9999', '#fc0',
	                  '#f60', '#0c6', '#666', '#99f', '#393', '#c30'];

	// Constants
	var HEIGHT_OF_DAYTAG = 25 + 30;	// day + date
	var HEIGHT_OF_OVERDAY = 22;	// px
	var HEIGHT_OF_HOUR = 40; // px
	var STANDARD_HEIGHT = 20; // px
	var MINUTE_STEP = 12; // px
	var HEIGHT_OF_MINUTE_STEP = HEIGHT_OF_HOUR * MINUTE_STEP / 60;

	// check if obj is null/undefined/'' or not
	var isNull = function(obj) {
		if (obj === null || obj === undefined || obj === '') {
			return true;
		}
		return false;
	};

	/*
	 * check if date1, date2 are same date
	 * date1, date2 are Date
	 */
	var areSameDay = function(date1, date2) {
		// if date1 or date2 is not valid
		if (isNull(date1) && isNull(date2)) {
			return false;
		} else {
			if (date1.getFullYear() == date2.getFullYear() &&
				date1.getMonth() == date2.getMonth() &&
				date1.getDate() == date2.getDate()) {

				return true;
			}
			return false;
		}
	};
	
	/*
	 * PRIVATE
	 * check the type of event
	 */
	var isType = function(start, end) {
		if (isNull(start) || isNull(end)) {
			return false;
		}

		var startHour = start.getHours();
		var startMin = start.getMinutes();
		var endHour = end.getHours();
		var endMin = end.getMinutes();

		if (areSameDay(start, end)) {
			// if time is not from 00:00 to 23:59
			if (endHour - startHour != 23 || endMin - startMin != 59) {
				return 'normal';
			} else {
				return 'all';
			}
		} else {
			return 'over';
		}
	};

	/*
	 * Super function
	 * use to inherit from a class
	 * obj1 is parent class, obj1 is child class
	 * all public attributes and methods will be inherited (which were declared "this")
	 * all private attributes and methods will not be inherited (which were declared "var")
	 */
	var Super = function(obj1, obj2) {
		for (var x in obj1) {
			if (obj1.hasOwnProperty(x)) {
				obj2[x] = obj1[x];
			}
		}
	};
	
	/* 
	 * time is object Date
	 * return time in minutes (from 00:00:00)
	 */
	var toMinute = function(time) {
		if (!isNull(time)) {
			var hour = time.getHours(); // 0 - 23
			var min = time.getMinutes(); // 0 - 59
			return hour * 60 + min;	// 0 - 1439
		} else {
			return null;
		}
	};

	/*
	 * Class BusyEvent
	 * start, end is Object {dateTime: ..., timeZone: ...}
	 */
	function BusyEvent (start, end) {
		/*
		 * PRIVATE
		 */
		var setStart = function() {
			if (isType(start, end) == 'normal') {
				return start;
			}
			return null;
		};

		/*
		 * PRIVATE
		 */
		var setEnd = function() {
			if (isType(start, end) == 'normal') {
				return end;
			}
			return null;
		};

		this.start = setStart();
		this.end = setEnd();
		this.summary = 'Busy';
		this.colorId = 8;
	} // end of class BusyEvent

	/*
	 * class EasiEvent
	 * event is object that have all required properties
	 */
	function EasiEvent(event) {
		/*
		 * PRIVATE
		 * set Summary
		 */
		var setSummary = function() {
			if (isNull(event.summary)) {
				return "No title";
			} else {
				return event.summary;
			}
		};

		/*
		 * PRIVATE
		 * set type of this event
		 * return 'normal'/'all'/'over'
		 */
		var setType = function() {
			if (!isNull(event)) {
				return isType(event.start, event.end);
			} else {
				return undefined;
			}
		};

		/*
		 * PRIVATE
		 * set color
		 */
		var setColor = function() {
			if (isNull(event) || isNull(event.colorId)) {
				return eventColor[0];
			} else {
				return eventColor[event.colorId];
			}
		};

		// type of this event: "normal" / "all"/ "over"
		this.type = setType();
		this.color = setColor();
		
		// id from google or id created by easilendar
		this.id = event.id;
		
		this.summary = setSummary();
		this.start = event.start;
		this.end = event.end;
		this.location = event.location;
		this.colorId = event.colorId;
		this.status = event.status;
		
		// google/easilendar/...
		this.src = event.src;
		
		this.position = event.position;
		
		// two events are equal if their starts(ends) are the same
		this.equals = function(other) {
			if (isNull(other)) return false;
			if (this.start.toString() == other.start.toString()
				&& this.end.toString() == other.end.toString()) {
					
				return true;
			}
			return false;
		}
	} // end of EasiEvent

	/*
	 * class NorEvent
	 * event is EasiEvent
	 */
	function NorEvent(event) {
		// inherit EasiEvent
		Super(event, this);

		// dateTime to minutes to calculate (mins)
		this.startMin = toMinute(this.start);
		this.endMin = toMinute(this.end);

		/*
		 * PRIVATE
		 * this function find height (in px)
		 * of this event
		 * from start to end (in minutes)
		 * each 12 mins is 8px
		 */
		var durationToPx = function(start, end) {
			// assume that it's in one day
			var dur = end - start;
			if (parseInt(dur / MINUTE_STEP * HEIGHT_OF_MINUTE_STEP) > STANDARD_HEIGHT) {
				return parseInt(dur / MINUTE_STEP * HEIGHT_OF_MINUTE_STEP) + 'px';
			} else {
				return STANDARD_HEIGHT + 'px';
			}
		};

		/*
		 * PRIVATE
		 * this function set margin (in px)
		 * from 00:00
		 * to the start time of this event
		 * Note: 24 hour is 960px height
		 * => each hour is 40px
		 * => each 12 minutes is 8px
		 */
		var startToPx = function(start) {
			// time in minutes
			var min = start;
			return parseInt(min / MINUTE_STEP * HEIGHT_OF_MINUTE_STEP) + 'px';
		};

		// all display variable
		this.height = durationToPx(this.startMin, this.endMin);
		this.margin = startToPx(this.startMin);
		this.style = {
			'height': this.height,
			'margin-top': this.margin,
			'background-color': this.color,
		};
	} // end of class NorEvent

	/*
	 * class AllEvent
	 * event is EasiEvent
	 */
	function AllEvent(event) {
		// inherit EasiEvent
		Super(event, this);

		this.style = {
			'background-color': this.color,
			'width': '100%',
			'height': '20px',
			'color': 'white',
			'text-align': 'left',
			'margin-top': '2px',
			'font-size': '15px',
			'overflow': 'hidden',
			'position': 'relative',
			'z-index': '1',
		};
	} // end of class AllEvent

	/*
	 * class OverEvent
	 * event is EasiEvent
	 * date is object Day (the first day of event or first day of week)
	 */
	function OverEvent(event, date) {
		// inherit EasiEvent
		Super(event, this);

		/*
		 * PRIVATE
		 * set the width of this event (in %)
		 * depends on how many days
		 */
		var setWidth = function() {
			var startDate = date.toDate();
			var endDate = event.end;
			// the remain duration of event since "date"
			var duration = endDate.getDate() - startDate.getDate() + 1;
			var startDay = (startDate.getDay() + 6) % 7;	// 0(Mon) - 6(Sun)
			var startOfWeek = eSettings.sFirstDay.slice(0, 3);	// Mon - Sun

			var endOfWeek = 6; // always is 6
			switch(startOfWeek) {
				case 'Mon': break;	// Mon(0) - Sun(6)
				// Sat(0) - Fri(6)
				case 'Sat': startDay = (startDay + 2) % 7; break;
				// Sun(0) - Sat(6)
				case 'Sun': startDay = (startDay + 1) % 7; break;
			}
			// the duration within this week
			var tempDuration = endOfWeek - startDay + 1;

			// if this event cross over the next week
			if (duration >= tempDuration) {
				return tempDuration * 100;
			} else {
				return duration * 100;
			}
		};
		this.duration = setWidth() / 100;
		this.width = (setWidth() + 3) + '%';
		this.style = {
			'width': this.width,
			'background-color': this.color,
			'height': '20px',
			'font-size': '15px',
			'color': 'white',
			'overflow': 'hidden',
			'text-align': 'left',
			'margin-top': '2px',
			'position': 'relative',
			'z-index': '1',
		};
	} // end of class OverEvent

	/*
	 * class Day
	 * date is object Date
	 */
	function Day(date) {
		// convert time
		this.year = !isNull(date) ? date.getFullYear() : undefined;
		this.month = !isNull(date) ? date.getMonth() : undefined; // 0 - 11
		this.date = !isNull(date) ? date.getDate() : undefined;	// 1 - 31
		this.day = !isNull(date) ? eCalendar.weekDays[(date.getDay() + 6) % 7] :
									undefined; // Mon - Sun

		/*
		 * PRIVATE
		 * set original events of this day to array of EasiEvents Object
		 */
		var setEvents = function() {
			var calendar;
			// the calendar is set depends on the current state of the program
			switch ($rootScope.currentState) {
				case 'week':
				case 'day':
					calendar = eUser.uGmailCalendar;
					break;
				case 'profile':
					if (!isNull(eFriend.fMultiCal)) {
						calendar = eFriend.fMultiCal.calendar;
					} else {
						calendar = null;
					}
					break;
				case 'result':
					calendar = $rootScope.resultMultiCalendar.calendar;
					break;
				default:
					calendar = eUser.uGmailCalendar;
			}
			// if there is no calendar or no event on this date
			if (isNull(calendar) || isNull(calendar[date])) {
				return null;
			}

			var events = [];
			// convert event to EasiEvent object
			for (var i=0; i < calendar[date].length; i++) {
				events[i] = new EasiEvent(calendar[date][i]);
			}
			return events;
		};

		// array of Object EasiEvent in this day
		this.events = !isNull(date) ? setEvents() : null;

		/* return the next day of this day */
		this.nextDay = function() {
			if (!isNull(this.date)) {
				var date = this.date + 1;
				var month = this.month;
				var year = this.year;
				// return the next day
				return new Day(new Date(year, month, date));
			} else {
				return null;
			}
		};

		/* return the previous day of this day */
		this.prevDay = function() {
			if (!isNull( this.date )) {
				var date = this.date - 1;
				var month = this.month;
				var year = this.year;
				// return the previous day
				return new Day(new Date(year, month, date));
			} else {
				return null;
			}
		};

		/* convert to object Date */
		this.toDate = function() {
			return new Date(this.year, this.month, this.date);
		};
	}	// end of class Day

	/*
	 * class Week
	 * days is array of 7 days (Object Day) in this week
	 * start is string "Mon", "Sat" or "Sun"
	 * default is "Mon"
	 */
	function Week(days, start) {
		/*
		 * PRIVATE
		 * set start day of this week
		 */
		var setStart = function() {
			if (!isNull(days)) {
				return days[0].day;
			} else if (!isNull(start)) {
				return start;
			} else {
				return 'Mon';
			}
		};

		/*
		 * PRIVATE
		 * return the current week if no argument
		 */
		var setDays = function() {
			// set week as a current week
			if (isNull( days )) {
				var date = new Date();	// current day
				var curdays = [];	// array of current days
				var pos;
				switch (start) {
					case 'Sat':
						pos = (date.getDay() + 1) % 7; break; // 0(Sat) - 6(Fri)
					case 'Sun':
						pos = date.getDay(); break; // 0(Sun) - 6(Sat)
					default:
						pos = (date.getDay() + 6) % 7; break; // 0(Mon) - 6(Sun)
				}

				curdays[pos] = new Day(new Date(date.getFullYear(),
										date.getMonth(), date.getDate()));

				for (var i = pos; i < 6; i++) {
					curdays[i+1] = curdays[i].nextDay();
				}
				for (var i = pos; i > 0; i--) {
					curdays[i-1] = curdays[i].prevDay();
				}
				return curdays;
			} else {
				return days;
			}
		};

		// start day of this week (setting)
		this.start = setStart();
		this.days = setDays();

		this.month1 = this.days[0].month;
		// month2 is '' if it's month1
		this.month2 = this.days[6].month;

		this.year1 = this.days[0].year;
		// year2 is '' if it's year1
		this.year2 = this.days[6].year;

		/*
		 * find next week
		 * return Week Object
		 */
		this.nextWeek = function () {
			var tdays = [];
			tdays[0] = this.days[6].nextDay();
			for (var i=0; i < 6; i++) {
				tdays[i+1] = tdays[i].nextDay();
			}
			return new Week(tdays);
		};

		/* find previous week
		 * return Week Object
		 */
		this.prevWeek = function() {
			var tdays = [];
			tdays[6] = this.days[0].prevDay();
			for (var i=6; i > 0; i--) {
				tdays[i-1] = tdays[i].prevDay();
			}
			return new Week(tdays);
		};
	} // end of class Week

	/*
	 * class Calendar
	 */
	function WeekCalendar() {
		/*
		 * PRIVATE
		 * set hours to display in calendar
		 */
	    var setHours = function () {
			var hours = [];
			for (var i = 0; i < 24; i++) {
				if (i === 0) {
					hours[i] = '12AM';
				} else if (i < 12) {
					hours[i] = i + 'AM';
				} else if (i == 12) {
					hours[i] = i + 'PM';
				} else {
					hours[i] = (i - 12) + 'PM';
				}
			}
			return hours;
		};

		/*
		 * PRIVATE
		 * set navigate month
		 */
		var setNavMonth = function(month1, month2) {
			if (month1 == month2) {
				return eCalendar.months[month1];
			} else {
				return eCalendar.months[month1] + '-' +eCalendar.months[month2];
			}
		};

		/*
		 * PRIVATE
		 * set navigate year
		 */
		var setNavYear = function(year1, year2) {
			if (year1 == year2) {
				return year1;
			} else {
				return year1 + '-' + year2;
			}
		};

		/*
		 * convert navDays from array of Object Day
		 * to array of Object WeekDay
	     * most important function
	     */
	    this.setNavDays = function () {
	    	// go through all day in navWeek;
	    	for (var i=0; i < 7; i++) {
				// convert Day to WeekDay object
				// convert object Event to Event
				this.navDays[i] = new WeekDay(this.navDays[i]);
	    	}

			// very complicate. Insert the EmptyEvent
			for (var i=0; i < 7; i++) {
				if (!isNull(this.navDays[i].events)) {
					var length = this.navDays[i].events.length;
					for (var j=0; j < length; j++) {
						if (this.navDays[i].events[j].type == 'over') {
							var dur = this.navDays[i].events[j].duration;
							for (var k=i+1; k < i + dur; k++) {
								if (!isNull(this.navDays[k].events) &&
									!isNull(this.navDays[k].events[j])) {
									for (var t=length; t > j; t--) {
										this.navDays[k].events[t] = this.navDays[k].events[t-1];
									}
									this.navDays[k].events[j] = new EmptyEvent(this.navDays[i].events[j]);
								} else if (!isNull(this.navDays[k].events)) {
									var kLength = this.navDays[k].events.length;
									for (var t=kLength; t <= j; t++) {
										this.navDays[k].events[t] = new EmptyEvent(this.navDays[i].events[j]);
									}
								} else {
									this.navDays[k].events = [];
									for (var t=0; t <= j; t++) {
										this.navDays[k].events[t] = new EmptyEvent(this.navDays[i].events[j]);
									}
								}
							}
						}
					}
				}
			}

			// set height for the week content
			this.setContentHeight();
	    };

		/*
		 * PRIVATE
		 * Set Navigation Time function
		 * week is object Week
		 */
		this.setNavTime = function (week) {
			this.navWeek = week;
			this.navDays = angular.copy(week.days); //object Day
			this.setNavDays();
			this.navMonth = setNavMonth(week.month1, week.month2);	// 0 - 11
			this.navYear = setNavYear(week.year1, week.year2);
		};

		/* hours to display in calendar
		 * 0 - 23
		 */
		this.hours = setHours();

		// current week
		this.curWeek = new Week(null, eSettings.sFirstDay.slice(0,3));

		// current month
		this.curMonth1 = this.curWeek.month1; // 0 - 11
		this.curMonth2 = this.curWeek.month2; // 0 - 11

		// current year
		this.curYear1 = this.curWeek.year1;
		this.curYear2 = this.curWeek.year2;

		// Navigation time
		this.navDays = angular.copy(this.curWeek.days);	// object Day
		this.navWeek = this.curWeek;
		// 0 - 11
		this.navMonth = setNavMonth(this.curWeek.month1, this.curWeek.month2);
		this.navYear = setNavYear(this.curWeek.year1, this.curWeek.year2);

		// week-content height
		this.contentHeight = {
			'height': '80%',
		};
		// set content height function
		this.setContentHeight = function() {
			var max = 0;
			for (var i=0; i < 7; i++) {
				if (this.navDays[i].events !== null) {
					if(this.navDays[i].events.length > max) {
						max = this.navDays[i].events.length;
					}
				}
			}
			var height = HEIGHT_OF_DAYTAG + max * HEIGHT_OF_OVERDAY;
			this.contentHeight = {
				'height': 'calc(100% - ' + height + 'px)',
			};
		};

		/* go to next week */
		this.nextWeek = function() {
			this.setNavTime(this.navWeek.nextWeek());
		};

		/* go to previous week */
		this.prevWeek = function() {
			this.setNavTime(this.navWeek.prevWeek());
		};
	} // end of class Calendar

	/*
	 * class WeekDay
	 * day is Object Day
	 */
	function WeekDay(day) {
		// inherit Day
		Super(day, this);
		
		/*
		 * PRIVATE
		 * set events to match type, null if don't have
		 */
		this.setEvent = function(type) {
			if (!isNull(this) && !isNull(this.events)) {
				var event = [];
				var j=0;
				
				// not normal
				if (isNull(type)) {
					for (var i=0; i < this.events.length; i++) {
						switch (this.events[i].type) {
							case 'all':
								event[j++] = new AllEvent(this.events[i]);
								break;
							case 'over':
								var start = this.events[i].start;
								// the first day OR first day of the week
								// (the event across week)
								var date = this.date;
								var year = this.year;
								var month = this.month;
								if (start.getFullYear() == year &&
									start.getMonth() == month &&
									start.getDate() == date ||
									this.day == eSettings.sFirstDay.slice(0,3))
								{
									event[j++] = new OverEvent(this.events[i], day);
								}
						}
					}
				} else {
					for (var i=0; i < this.events.length; i++) {
						if (this.events[i].type == type) {
							event[j++] = new NorEvent(this.events[i]);
						}
					}
				}
				if (j === 0) {
					return null;
				}
				return event;
			} else {
				return null;
			}
		};

		// array of normal event
		this.norEvent = this.setEvent('normal');
		
		// array of allday, overday and empty events
		this.events = this.setEvent();
	} // end of class WeekDay

	/*
	 * class EmptyEvent
	 * for display over-day event
	 */
	function EmptyEvent(event) {
		// set function
		var set = function() {
			var temp = angular.copy(event);
			temp.summary = null;
			return temp;
		};

		this.event = set();

		this.style = {
			'height' : '20px',
			'width': '90%',
			'margin-top': '2px',
			'position': 'relative',
			'z-index': '1',
		};
	} // end of class EmptyEvent

	return {
		// colors
		eventColor: eventColor,

		// check type of event
		isType: isType,

		// check if 2 Date are same day
		areSameDay: areSameDay,

		/*
		 * BusyEvent constructor function
		 * start, end is Object {dateTime: ..., timeZone: ...}
		 */
		newBusyEvent : function(start, end) {
			return new BusyEvent(start, end);
		},

		/* Day constructor function
		 * date is Date object
		 */
		newDay : function(date) {
			return new Day(date);
		},

		/*
		 * Week constructor function
		 * days is array of 7 days (Object Day) in this week
		 * start is string "Mon", "Sat" or "Sun"
		 * default is "Mon"
		 */
		newWeek : function(days, start) {
			return new Week(days, start);
		},

		/*
		 * WeekCalendar constructor
		 */
		newWeekCalendar : function() {
			var week = new WeekCalendar();
			week.setNavDays();
			return week;
		},

		/*
		 * EasiEvent constructor
		 */
		newEasiEvent: function(event) {
			return new EasiEvent(event);
		},
	};
});