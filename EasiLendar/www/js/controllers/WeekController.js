/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 16/03/2015
 * type: home controller
 */

var week = angular.module('MainApp.controllers.week', []);

week.controller("WeekController", function($scope, $rootScope) {	
	
	$scope.days = ["Mon", "Tue", "Wed", "Thu",
		            "Fri", "Sat", "Sun"];
	$scope.months = ["January","February","March","April","May","June",
		            "July","August","September","October","November","December"];
		
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
	
	// example item
	var item = [{
		end : {
			timeZone : "Asia/Saigon",
			dateTime : "2014-02-14T15:50:00+07:00"	
		},
		description : "ThS. Nguy\u1ec5n Nam H\u1ea3i",
		reminders : {
			"useDefault" : false
		},
		summary : "MAT1093 2: \u0110\u1ea1i s\u1ed1",
		recurrence : [ "RRULE:FREQ=WEEKLY;WKST=MO;UNTIL=20140530T055959Z;BYDAY=FR" ],
		start : {
			timeZone : "Asia/Saigon",
			dateTime : "2014-02-14T13:00:00+07:00"
		},
		location : "301-G2",
	}];
	
	// create new Calendar Object
	$scope.calendar = new Calendar(item);
	$scope.calendar.setHours();
	
	/*
	 * class Calendar
	 * events id array of all events
	 */
	function Calendar(events) {
		/* hours to display in calendar
		   0 - 23
		*/
		this.hours = [];
		
		// all events
		this.events = events;
		
		/*
		 *  Current Time
		 */
		// current date
		this.curDate = new Date();
		
		// current week
		this.curWeek = new Week();
		
		// current month 
		this.curMonth = this.curWeek.month1-1; // 0 - 11
		
		// current year
		this.curYear = this.curWeek.days[0].time.year; // yyyy
		
		// Navigation time
		this.navDates = this.curWeek.days;
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
			this.navMonth = week.month1-1;	// 0 - 11
			this.navYear = week.days[0].time.year;
			this.navBackground = $scope.bkgs[this.navMonth];
		};
		
		/* go to next week */
		this.nextWeek = function() {
			this.setNavTime(this.navWeek.nextWeek());
		};
		
		/* go to previous week */
		this.prevWeek = function() {
			this.setNavTime(this.navWeek.prevWeek());
		};
		
		/* set hours to display in calendar */
	    this.setHours = function () {
	       for (var i = 0; i < 24; i++) {
	    	   if (i == 0) {
	    		   this.hours[i] = "12AM";
	    	   } else if (i < 12) {
	    		   this.hours[i] = i+"AM";
	    	   } else {
	    		   this.hours[i] = (i-12)+"PM";
 	    	   } 
	       }
	    };
	};	
	
	/*
	 * class Time 
	 * argument time is a string 
	 * format: yyyy-mm-ddThh:mm:ss+hh:mm
	 */
	function Time(time) {
		/*
		 * time is a string format: hh:mm:ss return time in
		 * minutes (from 00:00:00)
		 */
		this.toMinute = function() {
			var hour = parseInt(time.slice(11, 13));
			var min = parseInt(time.slice(14, 16));
			return hour * 60 + min;
		}

		this.year = parseInt(time.slice(0, 4));
		this.month = parseInt(time.slice(5, 7));
		this.day = parseInt(time.slice(8, 10));
		this.time = this.toMinute();
	};

	/*
	 * class Event
	 */
	function Event(start, end, des, sum, location, recurrence) {
		
		this.start = start;
		// re-construct dateTime to calculate
		this.start.dateTime = new Time(start.dateTime);
		
		this.end = end;
		// re-construct dateTime to calculate
		this.end.dateTime = new Time(end.dateTime);

		this.description = des; // no change
		this.summary = sum; // no change
		this.location = location; // no change
		this.recurrence = recurrence;

		/* 
		 * this function find margin (in px)
		 * from 0 (0 hour is also 0 px) 
		 * to the start time of this event
		 * Note: 24 hour is 960px height
		 * => each hour is 40px
		 * => each 12 minutes is 8px
		 * return px (is the margin) type int
		 */
		this.startToPx = function() {
			// time in minutes
			var min = this.start.dateTime.time;
			return min/12 * 8;
		};
		
		/*
		 * this function find height (in px)
		 * of this event
		 * from start to end (in minutes)
		 * each 12 mins is 8px
		 */
		this.durationToPx = function() {
			// assume that it's in one day
			var dur = this.end.dateTime.time - this.start.dateTime.time;
			return dur/12 * 8;
		};
		
		
	};

	/*
	 * class Day
	 * events is array of events in this day
	 * time is string yyyy-mm-dd
	 */
	function Day(time, events) {
		// convert to time Object
		this.time = new Time(time);
		
		this.events = events;
		
		/* return the next day of this day */
		this.nextDay = function() {
			var day = this.time.day + 1;
			var month = this.time.month;
			var year = this.time.year;
			// number of days of this month
			var num = numOfDays(month-1,year);
			
			if (day > num) {
				month = month + 1;
				day = day % num;
			}
			if (month > 12) {
				month = 1;
				year++;
			}
			if (month < 10) month = "0"+month;
			if (day < 10) day = "0"+day;
			// return the next day
			return new Day(year+"-"+month+"-"+day, null);
		};
		
		/* return the previous day of this day */
		this.prevDay = function() {
			var day = this.time.day - 1;
			var month = this.time.month;
			var year = this.time.year;
			
			if (day == 0) {
				month = month - 1;
				if (month == 0) {
					month = 12;
					year--;
				}
				day = numOfDays(month-1,year);
			}
			if (month < 10) month = "0"+month;
			if(day < 10) day = "0"+day;
			// return the previous day
			return new Day(year+'-'+month+'-'+day, null);
		};
	};
		
	/*
	 * class Week
	 * days is array of 7 days (Object Day) in this week
	 * index 0 (Monday) - 6 (Sunday)
	 * 
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
				
				var mm = date.getMonth()+1;
				if (mm < 10) mm = "0"+mm;
				
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
		
		this.month1 = this.days[0].time.month;
		this.month2 = this.days[6].time.month;
		
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
	};
});
