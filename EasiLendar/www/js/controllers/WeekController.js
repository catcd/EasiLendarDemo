/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 29/03/2015
 * type: home controller
 */

var week = angular.module('MainApp.controllers.week', []);

week.controller("WeekController", function($scope, $rootScope) {
	
	$scope.calendar = new WeekCalendar($rootScope.eUser.uGmailCalendar);
	$scope.calendar.setNavDays();
	
	// watch for changes in eUser.uGmailCalendar 
	$scope.$watch('eUser.uGmailCalendar', function() {
		$scope.calendar = new WeekCalendar($rootScope.eUser.uGmailCalendar);
		$scope.calendar.setNavDays();
	});
	// watch for changes in eSettings.sFirstDay
	$scope.$watch('eSettings.sFirstDay', function() {
		$scope.calendar = new WeekCalendar($rootScope.eUser.uGmailCalendar);
		$scope.calendar.setNavDays();
	});
	
	/*
	 * class Calendar
	 * items id array of array 
	 * index is date string
	 */
	function WeekCalendar(items) {
		/* 
		 * PRIVATE
		 * set hours to display in calendar 
		 */
	    var setHours = function () {
			var hours = [];
			for (var i = 0; i < 24; i++) {
				if (i == 0) {
					hours[i] = "12AM";
				} else if (i < 12) {
					hours[i] = i + "AM";
				} else if (i == 12) { 
					hours[i] = i + "PM";
				} else {
					hours[i] = (i - 12) + "PM";
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
				return $rootScope.months[month1];
			} else {
				return $rootScope.months[month1] + "-" + $rootScope.months[month2];
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
				return year1 + "-" + year2;
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
				// convert object Event  to Event
				this.navDays[i] = new WeekDay(this.navDays[i]);	// object WeekDay
	    	}
	    };
		
		/*
		 * PRIVATE
		 * Set Navigation Time function
		 */
		this.setNavTime = function (week) {
			this.navWeek = week;
			this.navDays = angular.copy(week.days); //object Day
			this.setNavDays();
			this.navMonth = setNavMonth(week.month1, week.month2);	// 0 - 11
			this.navYear = setNavYear(week.year1, week.year2)
			
			this.navBackground = "easi-" + $rootScope.shortMonths[week.month2] + "-bkg";
		};
		
		/* hours to display in calendar
		 * 0 - 23
		 */
		this.hours = setHours();
		
		// array of (day-array of events)
		this.items = items;
		
		// current week
		this.curWeek = $rootScope.newWeek(null, $rootScope.eSettings.sFirstDay.slice(0,3)); 
		
		// current month 
		this.curMonth1 = this.curWeek.month1; // 0 - 11
		this.curMonth2 = this.curWeek.month2; // 0 - 11
		
		// current year
		this.curYear1 = this.curWeek.year1;
		this.curYear2 = this.curWeek.year2;
		
		// Navigation time
		this.navDays = angular.copy(this.curWeek.days);	// object Day
		this.navWeek = this.curWeek;
		this.navMonth = setNavMonth(this.curWeek.month1, this.curWeek.month2);	// 0 - 11
		this.navYear = setNavYear(this.curWeek.year1, this.curWeek.year2)
			
		this.navBackground = "easi-" + $rootScope.shortMonths[this.curWeek.month2] + "-bkg";
		
		/* go to next week */
		this.nextWeek = function() {
			this.setNavTime(this.navWeek.nextWeek());
		};
		
		/* go to previous week */
		this.prevWeek = function() {
			this.setNavTime(this.navWeek.prevWeek());
		};
	};	// end of class Calendar
	
	/* 
	 * class WeekDay
	 * day is Object Day of rootScope
	 */
	function WeekDay(day) {
		// the original day
		this.origin = day;
		
		/*
		 * PRIVATE
		 * set events to match type, null if don't have
		 */
		this.setEvent = function(type) {
			if (this.origin != null && this.origin.events != null) {
				var event = [];
				var j=0;
				for (var i=0; i < this.origin.events.length; i++) {
					if (this.origin.events[i].type == type) {
						switch (type) {
							case "normal": 
								event[j++] = new NorEvent(this.origin.events[i]); break;
							case "all": 
								event[j++] = new AllEvent(this.origin.events[i]); break;
							case "over": 
								var start = this.origin.events[i].origin.start.dateTime;
								// the first day OR first day of the week (the event across week)
								var date = this.origin.date;
								var year = this.origin.year;
								var month = this.origin.month;
								if (start.getFullYear() == year && start.getMonth() == month && start.getDate() == date
										|| this.origin.day == $rootScope.eSettings.sFirstDay.slice(0,3)) 
								{
									event[j++] = new OverEvent(this.origin.events[i], this.origin);
								}
						}
					}
				} 
				if (j == 0) return null;
				return event;
			} else return null;
		};
		
		// array of normal events 
		this.norEvent = this.setEvent("normal");
		// array of all day events
		this.allEvent = this.setEvent("all");
		//array of over day events
		this.overEvent = this.setEvent("over");
	}; // end of class WeekDay

	/*
	 * class NorEvent
	 * event is the Object Event of rootScope
	 */
	function NorEvent(event) {
		// copy the original event
		this.event = event;

		// re-construct dateTime to calculate (mins)
		this.start = $rootScope.newTime(event.origin.start.dateTime)
		
		// re-construct dateTime to calculate (mins)
		this.end = $rootScope.newTime(event.origin.end.dateTime);
		
		/*
		 * PRIVATE
		 * this function find height (in px)
		 * of this event
		 * from start to end (in minutes)
		 * each 12 mins is 8px
		 */
		this.durationToPx = function() {
			// assume that it's in one day
			var dur = this.end.minutes - this.start.minutes;
			return parseInt(dur/12 * 8)+"px";
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
		this.startToPx = function() {
			// time in minutes
			var min = this.start.minutes;
			return parseInt(min/12 * 8) + "px";
		};
		
		// all display variable
		this.height = this.durationToPx();
		this.margin = this.startToPx();
		this.style = {
			"height": this.height,
			"margin-top": this.margin,
			"background-color": this.event.color,
		};
	}; // end of class NorEvent
	
	/*
	 * class AllEvent
	 * event is the Object Event of rootScope
	 */
	function AllEvent(event) {
		// copy the original event
		this.event = event;
		
		this.style = {
			"background-color": this.event.color,
		};
		
	}; // end of class AllEvent
	
	/*
	 * class OverEvent
	 * event is the Object Event of rootScope
	 * date is object Day (the first day of event or first day of week)
	 */
	function OverEvent(event, date) {
		// copy the original event
		this.event = event;
		
		/*
		 * PRIVATE
		 * set the width of this event (in %)
		 * depends on how many days
		 * 1 day's width: 13%
		 */
		this.setWidth = function() {
			var startDate = date.toDate();
			var endDate = event.origin.end.dateTime;
			var duration = endDate.getDate() - startDate.getDate() + 1;	// the remain duration of event since "date"
			var startDay = (startDate.getDay()+6) % 7;	// 0(Mon) - 6(Sun)
			var startOfWeek = $rootScope.eSettings.sFirstDay.slice(0,3);	// Mon - Sun

			var endOfWeek = 6; // always is 6
			switch(startOfWeek) {
				case "Mon": break;	// Mon(0) - Sun(6)
				case "Sat": startDay = (startDay+2)%7; break; // Sat(0) - Fri(6)
				case "Sun": startDay = (startDay+1)%7; break;	// Sun(0) - Sat(6)
			};
			var tempDuration = endOfWeek - startDay + 1; // the duration within this week
			
			// if this event cross over the next week
			if (duration >= tempDuration) {
				return tempDuration*13 + "%";
			} else {
				return duration*13 + "%";
			}
		};
		this.width = this.setWidth();
		this.style = {
			"width": this.width,
			"background-color": this.event.color,
		};
	}; // end of class OverEvent
});
