/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 22/03/2015
 * type: multi calendar object and specific function for calendar
 */

var multiCalendar = angular.module('MainApp.shareds.multiCalendar', []);

multiCalendar.run(function($rootScope) {
	
	// 12 colors for user's choices;
	$rootScope.eventColor = ["#069","#f39","#06f","#960","#690","#fc0",
	                         "#606","#f30","#996","#999","#f93","#f99"];
	
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
			var hour = time.getHours(); // 0 - 23
			var min = time.getMinutes(); // 0 - 59
			return hour * 60 + min;	// 0 - 1439
		};
		
		// minutes from 00:00:00
		this.minutes = toMinute();
	};	// end of class Time
	
	
	/*
	 * Class Event
	 * event is the original object of Google
	 */
	function Event(event) {
		
		this.origin = event;	// copy that event
		
		// type of this event
		// "normal" / "all"/ "over"
		this.type = this.setType();
		
		this.color = $rootScope.eventColor[this.origin.colorId];
		
		/*
		 * PRIVATE
		 * set type of this event
		 * return 'normal'/'all'/'over'
		 */
		this.setType = function() {
			var startDate = this.origin.start.dateTime.getDate();
			var endDate = this.origin.end.dateTime.getDate();
			
			var startHour = this.origin.start.dateTime.getHours();
			var startMin = this.origin.start.dateTime.getMinutes();
			var startSec = this.origin.start.dateTime.getSeconds();
			
			var endHour = this.origin.end.dateTime.getHours();
			var endMin = this.origin.end.dateTime.getMinutes();
			var endSec = this.origin.end.dateTime.getSeconds();
			
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
		};
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
		
		// array of Object Event in this day
		this.events = this.setEvents();
		
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
		
		/*
		 * PRIVATE
		 * set original events of this day to array of Events Object
		 */
		this.setEvents = function() {
			var temp = $rootScope.eUser.uID[new Date(this.year,this.month,this.date)];
			// if there is no event 
			if (temp == null) return null;
			
			var events = [];
			for (var i=0; i < temp.length; i++) {
				events[i] = new Event(temp[i]);
			}
			return events;
		};
		
	};	// end of class Day
	
		
	/*
	 * class Week
	 * days is array of 7 days (Object Day) in this week
	 * start is string "Mon", "Sat" or "Sun" 
	 * default is "Mon"
	 */
	function Week(days, start) {
		
		// start day of this week (setting)
		this.start = this.setStart();
		this.days = this.setDays();
		
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
			var days = [];
			days[0] = this.days[6].nextDay();
			for (var i=0; i < 6; i++) {
				days[i+1] = days[i].nextDay();
			}
			return new Week(days);
		};
		
		/* find previous week 
		 * return Week Object 
		 */
		this.prevWeek = function() {
			var days = [];
			days[6] = this.days[0].prevDay();
			for (var i=6; i > 0; i--) {
				days[i-1] = days[i].prevDay();
			}
			return new Week(days);
		};
		
		/*
		 * PRIVATE
		 * set start day of this week
		 */
		this.setStart = function() {
			if (days != null) {
				return $rootScope.weekDays[days[0].day];
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
		this.setDays = function() {
			// set week as a current week
			if (days == null) {
				var date = new Date();	// current day
				var days = [];	// array of current days
				var pos;
				switch (this.start) {
					case "Sat" : pos = (date.getDay() + 1) % 7; // 0(Sat) - 6(Fri)
					case "Sun" : pos = date.getDay(); // 0(Sun) - 6(Sat)
					default : pos = (date.getDay() + 6) % 7; // 0(Mon) - 6(Sun)
				};
				
				days[pos] = new Day(date);
				
				for (var i=pos; i < 6; i++) {
					days[i+1] = days[i].nextDay();
				}
				for (var i=pos; i > 0; i--) {
					days[i-1] = days[i].prevDay();
				}
				return days;
			} else {
				return days;
			}
		};
	}; // end of class Week
});