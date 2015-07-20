/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 15/07/2015
 * type: multi calendar object and specific function for calendar
 */

var multiCalendar = angular.module('MainApp.shareds.multiCalendar', []);

multiCalendar.factory('eMultiCalendar', function($rootScope, eEasiLendar) {

	// check if obj is null/undefined/'' or not
	var isNull = function(obj) {
		if (obj === null || obj === undefined || obj === '') {
			return true;
		}
		return false;
	};
	
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
			if (isNull(items)) {
				return null;
			}
			// copy items because it's pointer
			var tempItems = [];
			for (var i=0; i < items.length; i++) {
				tempItems[i] = [];
				for (var x in items[i]) {
					if (items[i].hasOwnProperty(x)) {
						tempItems[i][x] = angular.copy(items[i][x]);
					}
				}
			}
			if (isNull(tempItems)) {
				return null;
			}
			
			// array of arrays of events
			var cal = [];
			
			for (var i=0; i < tempItems.length; i++) {
				if (!isNull(tempItems[i])) {
					// tempItems[i] is standard to compare with
					for (var j in tempItems[i]) {
						if (tempItems[i].hasOwnProperty(j)) {
							var temp = new BusyDay(tempItems[i][j]);
							// if "j" doesn't has any normal event
							if (isNull(temp.events)) {
								continue;
							}
							// go through others
							for (var k = i+1; k < tempItems.length; k++) {
								if (!isNull(tempItems[k])) {
									// if tempItems[k] doesn't have "j"
									if (isNull(tempItems[k][j])) { 
										break; 
									} else {
										temp = new BusyDay(temp.events, tempItems[k][j]);
										// delete it so it won't 
										// be compared next time
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
			}
			return cal;
		};
		
		this.calendar = setMultiCal();
	}

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
			if (!isNull(day1)) {
				for (var i = 0; i < day1.length; i++) {
					list[i] = day1[i];
				}
			}
			if (!isNull(day2)) {
				for (var i = 0; i < day2.length; i++) {
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
			for (var i = 0; i < list.length; i++) {
				list[i] = eEasiLendar.newBusyEvent(list[i].start, list[i].end);
			}
			var tempList = [];
			for (var i = 0; i < list.length; i++) {
				if (!isNull(list[i].start)) {
					tempList[tempList.length] = list[i];
				}
			}
			if (tempList.length === 0) {
				return null;
			}
			return tempList;
		};

		/*
		 * PRIVATE
		 * set events in this day
		 */
		var setEvent = function() {
			if (isNull(day1) && isNull(day2)) {
				return null;
			}
			var events = [];
			var list = sort();	// list of all event (dateTime increasing)
			if (!isNull(list)) {
				var temp = list[0];
				for (var i=1; i < list.length; i++) {
					// if we can combine list[i] and temp as 1 busy event
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
	}

	return {
		/*
		 * items is array of all calendar
		 * the calendar is the array itself
		 */
		newMultiCal: function(items) {
			return new MultiCal(items);
		},
	};
});