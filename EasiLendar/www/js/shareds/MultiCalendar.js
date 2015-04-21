/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 21/04/2015
 * type: multi calendar object and specific function for calendar
 */

var multiCalendar = angular.module('MainApp.shareds.multiCalendar', []);

multiCalendar.factory('eMultiCalendar', function($rootScope, eEasiLendar) {	
	/*
	 * class MultiCal
	 * items is array of all calendar (pointer)
	 * calendar is the array itself
	 */
	function MultiCal(items) {
		/*
		 * PRIVATE
		 * set multiCalendar
		 */
		var setMultiCal = function() {
			// copy items because it's pointer
			var tempItems = [];
			for (var i=0; i < items.length; i++) {
				tempItems[i] = [];
				for (var x in items[i]) {
					tempItems[i][x] = angular.copy(items[i][x]);
				}
			}
			// array of arrays of events
			var cal = [];
			if (tempItems == null) return null;
			for (var i=0; i < tempItems.length; i++) {
				if (tempItems[i] != null) {
					// tempItems[i] is standard to compare with
					for (var j in tempItems[i]) {
						var temp = new BusyDay(tempItems[i][j]);
						// if "j" doesn't has any normal event
						if (temp.events == null) continue;
					
						// go through others
						for (var k = i+1; k < tempItems.length; k++) {
							if (tempItems[k] != null) {
								// if tempItems[k] doesn't have "j"
								if (tempItems[k][j] == null) { break; }
								else {
									temp = new BusyDay(temp.events, tempItems[k][j]);
									// delete it so it won't be compared next time
									delete tempItems[k][j];
								}
							}
						}
						cal[j] = temp.events;
						// delete it so it won't be compared next time
						delete tempItems[i][j];
					}
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
					list[i] = day1[i];
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
				list[i] = eEasiLendar.newBusyEvent(list[i].start, list[i].end);
			}
			var tempList = [];
			for (var i=0; i < list.length; i++) {
				if (list[i].start != null) {
					tempList[tempList.length] = list[i];
				}
			}
			if (tempList.length == 0) return null;
			return tempList;
		};
		
		/*
		 * PRIVATE
		 * set events in this day
		 */
		var setEvent = function() {
			if (day1 == null && day2 == null) return null;
			var events = [];
			var list = sort();	// list of all event (dateTime increasing)
			if (list != null) {
				var temp = list[0];
				for (var i=1; i < list.length; i++) {
					// if we can combime list[i] and temp as 1 busy event
					if (list[i].start.dateTime <= temp.end.dateTime) {
						// list[i] is not completely inside temp's interval
						if (list[i].end.dateTime >= temp.end.dateTime) {
							temp = eEasiLendar.newBusyEvent(temp.start, list[i].end);
						}
					} else {
						events[events.length] = temp;
						temp = list[i];
					}
				}
				events[events.length] = temp;
				return events;
			}
		};
		// array of BusyEvent in this day
		this.events = setEvent();
	};	
	
	return {
		/*
		* items is array of all calendar
		* the calendar is the array itself
		*/
		newMultiCal : function(items) {
			return new MultiCal(items);
		},
	};
});