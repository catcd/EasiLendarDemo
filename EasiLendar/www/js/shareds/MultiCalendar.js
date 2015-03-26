/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 26/03/2015
 * type: multi calendar object and specific function for calendar
 */

var multiCalendar = angular.module('MainApp.shareds.multiCalendar', []);

multiCalendar.run(function($rootScope) {
	/*
	 * constructor function
	 * items is array of all calendar
	 * the calendar is the array itself
	 */
	$rootScope.newMultiCal = function(items) {
		return new MultiCal(items);
	};
	
	/*
	 * class MultiCal
	 * items is array of all calendar
	 * calendar is the array itself
	 */
	function MultiCal(items) {
		/*
		 * PRIVATE
		 * set multiCalendar
		 */
		var setMultiCal = function() {
			// array of arrays of events
			var cal = [];
			if (items == null) return null;
			for (var i=0; i < items.length; i++) {
				// items[i] is standard to compare with
				for (var j in items[i]) {
					var temp = new BusyDay(items[i][j]);
					// if "j" doesn't has any normal event
					if (temp.events == null) break;
					
					// go through others
					for (var k = i+1; k < items.length; k++) {
						// if items[k] doesn't have "j"
						if (items[k][j] == null) { break; }
						else {
							temp = new BusyDay(temp.events,items[k][j]);
							// delete it so it won't be compared next time
							delete items[k][j];
						}
					}
					cal[j] = temp.events;
					// delete it so it won't be compared next time
					delete items[i][j];
				}
			}
			return cal;
		};
		
		this.calendar = setMultiCal();
	};
	
	/*
	 * Busy Day class
	 * day1, day2 is array of events 
	 * different calendar or different id
	 */
	function BusyDay (day1, day2) {
		/*
		 * PRIVATE
		 * sort event base on start.dateTime increasing
		 * of 2 array day1 and day2
		 */
		var sort = function() {
			// array of the sorted events
			var list = [];
			// combine 2 array into 1 array list
			if (day1 != null) {
				for (var i=0; i < day1.length; i++) {
					list[list.length] = day1[i];
				}
			}
			if (day2 != null) {
				for (var i=0; i < day2.length; i++) {
					list[list.length] = day2[i];
				}
			}				
			// sort list array
			for (var i=0; i < list.length; i++) {
				var min = list[i];
				var pos = i;
				for (var j=i+1; j < list.length; j++) {
					if (list[j].start.dateTime < min.start.dateTime) {
							min = list[j];
							pos = j;
					}
				}
				if (pos != i) {
					var temp = list[i];
					list[i] = list[pos];
					list[pos] = temp;
				}
			}
			// convert all event to BusyEvent
			for (var i=0; i < list.length; i++) {
				list[i] = new BusyEvent(list[i].start, list[i].end);
				if (list[i].start == null) {
					for (var j = i+1; j < list.length; j++) {
						list[j-1] = list[j];
					}
					delete list[list.length];
				}
			}
			return list;
		};
		
		/*
		 * PRIVATE
		 * set events in this day
		 */
		var setEvent = function() {
			if (day1 == null && day2 == null) return null;
			var events = [];
			var list = sort();	// list of all event (dateTime increasing)
			var temp = list[0];
			for (var i=1; i < list.length; i++) {
				// if we can combime list[i] and temp as 1 busy event
				if (list[i].start.dateTime <= temp.end.dateTime) {
					// list[i] is inside temp's interval
					if (list[i].end.dateTime >= temp.end.dateTime) {
						temp = new BusyEvent(temp.start, list[i].end);
					}
				} else {
					events[events.length] = temp;
					temp = list[i];
				}
			}
			events[events.length] = temp;
			return events;
		};
		// array of BusyEvent in this day
		this.events = setEvent();
	};
	
	/* 
	 * simple event class
	 * start, end are start, end of event object
	 * or BusyEvent object
	 */
	function BusyEvent (start, end) {
		/*
		 * PRIVATE
		 * true if in the same date
		 */
		var check = function() {
			var startDate = start.dateTime.getDate();
			var endDate = end.dateTime.getDate();
			var startMonth = start.dateTime.getMonth();
			var endMonth = end.dateTime.getMonth();
			var startYear = start.dateTime.getFullYear();
			var endYear = end.dateTime.getFullYear();
			// if not the same day
			if (startDate != endDate || startMonth != endMonth
					|| startYear != endYear) {
				return false;
			}
			return true;
		};
		
		/*
		 * PRIVATE
		 */
		this.setStart= function() {
			if (start != null && check())
				return start;
			return null;
		};
		
		/*
		 * PRIVATE
		 */
		this.setEnd = function() {
			if (end != null && check())
				return end;
			return null;
		};
		
		this.start = this.setStart();
		this.end = this.setEnd();
	};
});