/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 31/03/2015
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
			// very complicate
			for (var i=0; i < 7; i++) {
				if (this.navDays[i].events != null) {
					var length = this.navDays[i].events.length;
					for (var j=0; j < length; j++) {
						if (this.navDays[i].events[j].event.type == "over") {
							var dur = this.navDays[i].events[j].duration;
							for (var k=i+1; k < i + dur; k++) {
								if (this.navDays[k].events != null && this.navDays[k].events[j] != null) {
									for (var t=length; t > j; t--) {
										this.navDays[k].events[t] = this.navDays[k].events[t-1];
									}
									this.navDays[k].events[j] = new EmptyEvent(this.navDays[i].events[j]);
								} else if (this.navDays[k].events != null) {
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
		
		// week-content height
		this.contentHeight = {
			"height": "80%",
		};
		// set content height function
		this.setContentHeight = function() {
			var max = 0;
			for (var i=0; i < 7; i++) {
				if (this.navDays[i].events != null) {
					if(this.navDays[i].events.length > max) {
						max = this.navDays[i].events.length;
					}
				}
			}
			var height = 25 + 30 + max*22;
			this.contentHeight = {
				"height": 'calc(100% - '+height+'px)',
			}	
		};
		
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
				// not normal
				if (type == null) {
					for (var i=0; i < this.origin.events.length; i++) {
						switch (this.origin.events[i].type) {
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
				} else {
					for (var i=0; i < this.origin.events.length; i++) {
						if (this.origin.events[i].type == type) {
							event[j++] = new NorEvent(this.origin.events[i]);
						}
					}
				} 
				if (j == 0) return null;
				return event;
			} else return null;
		};
		
		// array of allday, overday and empty events
		this.events = this.setEvent();
		// array of normal event
		this.norEvent = this.setEvent("normal");
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
			if (parseInt(dur/12 * 8) > 20)
				return parseInt(dur/12 * 8)+"px";
			else return 20+"px";
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
				return tempDuration*100;
			} else {
				return duration*100;
			}
		};
		this.duration = this.setWidth() / 100;
		this.width = (this.setWidth()+5) + "%";
		this.style = {
			"width": this.width,
			"background-color": this.event.color,
			'height': '20px',
			'font-size': '15px',
			'color': 'white',
			'overflow': 'hidden',
			'text-align': 'left',
			'margin-top': '2px',
			'position': 'relative',
			'z-index': '1',
		};
	}; // end of class OverEvent
	
	/*
	 * class EmptyEvent
	 * for display over-day event
	 */
	function EmptyEvent(event) {
		// set function
		var set = function() {
			var temp = angular.copy(event.event);
			temp.origin.summary = null;
			return temp;
		};
		
		this.event = set();
		
		this.style = {
			"height" : "20px",
			"width": "90%",
			"margin-top": "2px",
			'position': 'relative',
			'z-index': '1',
		};
	}; // end of class EmptyEvent
});
