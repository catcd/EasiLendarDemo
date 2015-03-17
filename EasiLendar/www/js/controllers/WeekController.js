/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 16/03/2015
 * type: home controller
 */

var week = angular.module('MainApp.controllers.week', []);

week.controller("WeekController", function($scope, $rootScope) {	
	$scope.bkgs = ["jan","feb","mar","apr","may","jun",
		           "jul","aug","sep","oct","nov","dec"];
	
	/* find number of days in a month */
	var numOfDays = function(month, year) {
		switch(month) {
			case 0: case 2: case 4: case 6:
			case 7: case 9: case 11:
				return 31;
			case 3: case 5: case 8: case 10:
				return 30;
			case 1:
				if ((year%4==0 && year%100!=0) || year%400==0) {
					return 29;
				} else return 28;
		};
	};
	
	// create new Calendar Object
	$scope.calendar = new Calendar($rootScope.uGmailCalendar);
	$scope.calendar.setHours();
	$scope.calendar.setEvents();
	
	/*
	 * class Calendar
	 * items id array of array 
	 * index is date string
	 */
	function Calendar(items) {
		/* convert events to array of Object Event */
	    this.convertEvent = function (events) {
	    	if (typeof(events) != "undefined") {
	    		var temp = [];
	    		temp[0] = new Event(events[0], null);
	    		for (var i=1; i < events.length; i++) {
	    			temp[i] = new Event(events[i], temp[i-1]);
	    		}
	    		return temp;
	    	} else return null;
	    };
		
		/* hours to display in calendar
		   0 - 23
		*/
		this.hours = [];
		
		// array of (day-array of events)
		this.items = items;
		
		/*
		 *  Current Time
		 */
		// current date
		this.curDate = new Date();
		
		// current week
		this.curWeek = new Week();
		// current month 
		this.curMonth = this.curWeek.month1; // 0 - 11
		
		// current year
		this.curYear = this.curWeek.days[0].year; // yyyy
		
		// Navigation time
		this.navDates = this.curWeek.days;	// array of navigate dates
		this.navWeek = this.curWeek;
		this.navMonth = this.curMonth;
		this.navYear = this.curYear;
		this.navBackground = $scope.bkgs[this.navMonth];
		
		/*
		 *  Set Navigation Time function
		 */
		this.setNavTime = function (week) {
			this.navDates = week.days;
			this.navWeek = week;
			this.navMonth = week.month1;	// 0 - 11
			this.navYear = week.days[0].year;
			this.navBackground = $scope.bkgs[this.navMonth];
		};
		
		/* go to next week */
		this.nextWeek = function() {
			this.setNavTime(this.navWeek.nextWeek());
			this.setEvents();
		};
		
		/* go to previous week */
		this.prevWeek = function() {
			this.setNavTime(this.navWeek.prevWeek());
			this.setEvents();
		};
		
		/* set hours to display in calendar */
	    this.setHours = function () {
	       for (var i = 0; i < 24; i++) {
	    	   if (i == 0) {
	    		   this.hours[i] = "12AM";
	    	   } else if (i < 12) {
	    		   this.hours[i] = i+"AM";
	    	   } else if (i == 12) { 
	    		   this.hours[i] = i+"PM";
	    	   } else {
	    		   this.hours[i] = (i-12)+"PM";
 	    	   } 
	       }
	    };
	    
	    /* set events into navDates */
	    this.setEvents = function () {
	    	// go through all day in navWeek;
	    	for (var i=0; i < 7; i++) {
	    		var day = this.items[this.navDates[i].toString()];
	    		// if there are events in this day
	    		if (typeof(day) != "undefined") {
	    			this.navDates[i].events = this.convertEvent(day);
	    		}
	    	}
	    	console.log(this.navDates);
	    };
	};	// end of class Calendar
	
	/*
	 * class Time 
	 * argument time is a string 
	 * format: hh:mmXM
	 */
	function Time(time) {
		/*
		 * time is a string format: hh:mmXM
		 * return time in minutes (from 00:00:00)
		 */
		this.toMinute = function() {
			var hour = parseInt(time.slice(0, 2));
			var min = parseInt(time.slice(3, 5));
			return hour * 60 + min;
		};
		
		this.minutes = this.toMinute();
	};	// end of class Time

	/*
	 * class Event
	 * event is the Object define by Duy
	 */
	function Event(event, prevEvent) {
		this.date = event.date;
		this.month = event.month - 1;	// 0 - 11
		this.year = event.year;
		
		// re-construct dateTime to calculate (mins)
		this.start = new Time(event.start.dateTime);
		
		// re-construct dateTime to calculate (mins)
		this.end = new Time(event.end.dateTime);

		this.summary = event.summary; // no change, string
		this.location = event.location; // no change, string

		/*
		 * this function find height (in px)
		 * of this event
		 * from start to end (in minutes)
		 * each 12 mins is 8px
		 */
		this.durationToPx = function() {
			// assume that it's in one day
			var dur = this.end.minutes - this.start.minutes;
			return parseInt(dur/12 * 8);
		};
		
		/* 
		 * this function set margin (in px)
		 * from the end of previous event
		 * to the start time of this event
		 * Note: 24 hour is 960px height
		 * => each hour is 40px
		 * => each 12 minutes is 8px
		 * 
		 * event is Object Event (previous event)
		 * set margin of this event
		 */
		this.startToPx = function(other) {
			// time in minutes
			if (other == null) {
				var min = this.start.minutes;
				return parseInt(min/12 * 8)+'px';
			} else {
				var min = this.start.minutes - other.end.minutes;
				return parseInt(min/12 * 8)+'px';
			}
		};
		
		// return string of random color for this event
		this.randomColor = function() {
			var ran = parseInt(Math.random()*5) % 5; // 0 - 4
			switch (ran) {
				case 0: return "#690";
				case 1: return "#f39";
				case 2: return "#06f";
				case 3: return "#960";
				case 4: return "#069";
			};
		};
		
		// all display variable
		this.height = this.durationToPx() + "px";
		this.margin = this.startToPx(prevEvent);
		this.color = this.randomColor();
		this.style = {
			"height": this.height,
			"margin-top": this.margin,
			"background-color": this.color,
		};
		
	};	// end of class Event

	/*
	 * class Day
	 * events is array of events in this day (Object Event)
	 * time is string yyyy-mm-dd
	 */
	function Day(time, events) {
		// convert time
		this.year = parseInt(time.slice(0,4));
		this.month = parseInt(time.slice(5,7)) - 1;	// 0 - 11
		this.date = parseInt(time.slice(8,10));	// 1 - 31
		
		this.events = events;
		
		/* return the next day of this day */
		this.nextDay = function() {
			var date = this.date + 1;
			var month = this.month;
			var year = this.year;
			// number of days of this month
			var num = numOfDays(month,year);
			
			if (date > num) {
				month = month + 1;
				date = date % num;
			}
			if (month == 12) {
				month = 0;
				year++;
			}
			if (month+1 < 10) month = "0"+(month+1);
			else month = month+1;
			if (date < 10) date = "0"+date;
			// return the next day
			return new Day(year+"-"+month+"-"+date, null);
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
				date = numOfDays(month,year);
			}
			if (month+1 < 10) month = "0" + (month+1);
			else month = month + 1;
			if(date < 10) date = "0" + date;
			// return the previous day
			return new Day(year+'-'+month+'-'+date, null);
		};
		
		/* set margin of events */
		this.setMargin = function() {
			this.events[0].startToPx(null);
			for (var i=1; i < this.events.length; i++) {
				this.events[i].startToPx(this.events[i-1]);
			}
		};
		
		/* convert to string with format of new Date() */
		this.toString = function() {
			var date = this.date;
			var month = this.month;
			var temp = new Date(this.year, month, date);
			return temp.toString();
		};
	};	// end of class Day
	
		
	/*
	 * class Week
	 * days is array of 7 days (Object Day) in this week
	 * index 0 (Monday) - 6 (Sunday)
	 */
	function Week(days) {
		/*
		 * return the current week if no argument
		 */
		this.setDays = function() {
			// set week as a current week
			if (days == null) {
				var date = new Date();
				var pos = (date.getDay() + 6) % 7; // 0(Mon) - 6(Sun)
				var dates = [];
				
				var yyyy = date.getFullYear();
				
				var mm = date.getMonth();	// 0 - 11
				if (mm+1 < 10) mm = "0"+(mm+1);
				else mm = mm+1;
				
				var dd = date.getDate();
				if (dd < 10) dd = "0"+dd;
				
				dates[pos] = new Day(yyyy + '-' + mm + '-' + dd);
				
				for (var i=pos; i < 6; i++) {
					dates[i+1] = dates[i].nextDay();
				}
				for (var i=pos; i > 0; i--) {
					dates[i-1] = dates[i].prevDay();
				}
				return dates;
			} else {
				return days;
			}
		};
		
		this.days = this.setDays();
		
		this.month1 = this.days[0].month;
		this.month2 = this.days[6].month;
		
		/* 
		 * find next week 
		 * return Week Object
		 */
		this.nextWeek = function () {
			var dates = [];
			dates[0] = this.days[6].nextDay();
			for (var i=0; i < 6; i++) {
				dates[i+1] = dates[i].nextDay();
			}
			return new Week(dates);
		};
		
		/* find previous week 
		 * return Week Object 
		 */
		this.prevWeek = function() {
			var dates = [];
			dates[6] = this.days[0].prevDay();
			for (var i=6; i > 0; i--) {
				dates[i-1] = dates[i].prevDay();
			}
			return new Week(dates);
		};
	}; // end of class Week
});
