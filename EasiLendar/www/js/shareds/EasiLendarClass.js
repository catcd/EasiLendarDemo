/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 29/03/2015
 * type: All common class for EasiLendar App
 * base on: javascript, Google Calendar API
 */

var easilendar = angular.module('MainApp.shareds.easiLendarClass', []);

easilendar.run(function($rootScope) {
	// 12 colors for user's choices;
	$rootScope.eventColor = ["#09c","#0cf","#36f","#93f","#ff9999","#fc0",
	                         "#f60","#0c6","#666","#99f","#393","#c30"];
	
	/* Day constructor function
	 * date is Date object
	 */
	$rootScope.newDay = function(date) {
		return new Day(date);
	};
	
	/*
	 * Week constructor function
	 * days is array of 7 days (Object Day) in this week
	 * start is string "Mon", "Sat" or "Sun" 
	 * default is "Mon"
	 */
	$rootScope.newWeek = function(days, start) {
		return new Week(days, start);
	};
	
	/*
	 * Time constructor function
	 * time is object Date (Event's start/end .dateTime)
	 */
	$rootScope.newTime = function(time) {
		return new Time(time);
	};
	
	/*
	 * Event constructor function
	 * event is the original object of Google
	 */
	$rootScope.newEvent = function(event) {
		return new Event(event);
	};
	
	/*
	 * class Time 
	 * argument time is object Date
	 * (Event's start/end .dateTime)
	 */
	function Time(time) {
		/* 
		 * PRIVATE
		 * time is object Date
		 * return time in minutes (from 00:00:00)
		 */
		var toMinute = function() {
			if (time != null) {
				var hour = time.getHours(); // 0 - 23
				var min = time.getMinutes(); // 0 - 59
				return hour * 60 + min;	// 0 - 1439
			} else {
				return null;
			}
		};
		
		// minutes from 00:00:00
		this.minutes = toMinute();
	};	// end of class Time
	
	/*
	 * Class Event
	 * event is the original object of Google
	 * or event in Firebase
	 */
	function Event(event) {
		// copy of event
		this.origin = event;	// pointer

		/*
		 * PRIVATE
		 * set type of this event
		 * return 'normal'/'all'/'over'
		 */
		var setType = function() {
			if (event != null) {				
				var startDate = event.start.dateTime.getDate();
				var endDate = event.end.dateTime.getDate();
			
				var startHour = event.start.dateTime.getHours();
				var startMin = event.start.dateTime.getMinutes();
				var startSec = event.start.dateTime.getSeconds();
				
				var endHour = event.end.dateTime.getHours();
				var endMin = event.end.dateTime.getMinutes();
				var endSec = event.end.dateTime.getSeconds();
			
				// check 'all'
				if (startDate == endDate && startHour == 0 && startMin == 0
					&& startSec == 0 && endHour == 23 && endMin == 59
					&& endSec == 59) {
					return "all";
				}
				// check 'over'
				else if (startDate != endDate) {
					return "over";
				}
				// check 'normal'
				else {
					return "normal";
				}
			} else return null;
		};
		
		/* 
		 * PRIVATE
		 * set color
		 */
		var setColor = function() {
			if (event.colorId == null) {
				return $rootScope.eventColor[0];
			} else {
				return $rootScope.eventColor[event.colorId];
			}
		};
		
		// type of this event
		// "normal" / "all"/ "over"
		this.type = setType();
		
		this.color = setColor();
	};
	
	/*
	 * class Day
	 * date is object Date
	 */
	function Day(date) {
		// convert time
		this.year = date.getFullYear();
		this.month = date.getMonth();	// 0 - 11
		this.date = date.getDate();	// 1 - 31
		this.day = $rootScope.weekDays[(date.getDay() + 6) % 7]; // Mon - Sun

		/*
		 * PRIVATE
		 * set original events of this day to array of Events Object
		 */
		var setEvents = function() {
			if ($rootScope.eUser.uGmailCalendar == null) return null;
			// if there is no event 
			if ($rootScope.eUser.uGmailCalendar[date] == null) return null;
			
			var events = [];
			for (var i=0; i < $rootScope.eUser.uGmailCalendar[date].length; i++) {
				events[i] = new Event($rootScope.eUser.uGmailCalendar[date][i]);
			}
			return events;
		};
		
		// array of Object Event in this day
		this.events = setEvents();

		/* return the next day of this day */
		this.nextDay = function() {
			var date = this.date + 1;
			var month = this.month;
			var year = this.year;
			// number of days of this month
			var num = $rootScope.daysOfMonth(month+1,year);
			
			if (date > num) {
				month = month + 1;
				date = date % num;
			}
			if (month == 12) {
				month = 0;
				year++;
			}
			// return the next day
			return new Day(new Date(year, month, date));
		};
		
		/* return the previous day of this day */
		this.prevDay = function() {
			var date = this.date - 1;
			var month = this.month;
			var year = this.year;
			
			if (date == 0) {
				month = month - 1;
				if (month == -1) {
					month = 11;
					year--;
				}
				date = $rootScope.daysOfMonth(month+1,year);
			}
			// return the previous day
			return new Day(new Date(year, month, date));
		};
		
		/* convert to object Date */
		this.toDate = function() {
			return new Date(this.year, this.month, this.date);
		};
	};	// end of class Day
		
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
			if (days != null) {
				return days[0].day;
			} else if (start != null) {
				return start;
			} else {
				return "Mon";
			}
		};

		/*
		 * PRIVATE
		 * return the current week if no argument
		 */
		var setDays = function() {
			// set week as a current week
			if (days == null) {
				var date = new Date();	// current day
				var curdays = [];	// array of current days
				var pos;
				switch (start) {
					case "Sat" : 
						pos = (date.getDay() + 1) % 7; break; // 0(Sat) - 6(Fri)
					case "Sun" : 
						pos = date.getDay(); break; // 0(Sun) - 6(Sat)
					default : 
						pos = (date.getDay() + 6) % 7; break; // 0(Mon) - 6(Sun)
				};
	
				curdays[pos] = new Day(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
				
				for (var i=pos; i < 6; i++) {
					curdays[i+1] = curdays[i].nextDay();
				}
				for (var i=pos; i > 0; i--) {
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
		// month2 is "" if it's month1
		this.month2 = this.days[6].month;
		
		this.year1 = this.days[0].year;
		// year2 is "" if it's year1
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
	}; // end of class Week
});
