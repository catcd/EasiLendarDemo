/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 28/04/2015
 * type: algorithm service
 */

angular.module('MainApp.shareds.algorithm', [])

// All function for single searching algorithm
.factory('eSAlgorithm', function(eTimeHeap, eCalendar){
	var eTimeHeap = eTimeHeap;
	var eCalendar = eCalendar;

	// evaluate normal case
	// evaluate step by step from start of day to end of day
	var evaluateNormal = function(mMCal, mStart, mEnd, mDuration) {
		// result Heap
		var mHeap = eTimeHeap.newTimeHeap();

		// pointer move from mStart to mEnd
		var mCurrentDay = mStart;

		// temp for event array
		var arrayEvent = null;

		// 2 busi events up and down
		var upEvent = null;
		var downEvent = null;

		// temp day to move pointer
		var tempDay = null;

		// 2 variable for push part
		// start and end
		var mTempStart = null;
		var mTempEnd = null;

		while (mCurrentDay <= mEnd) {
			// if (mMCal.calendar[mCurrentDay] == undefined) that day does not have any event
			// so push to Heap step by step
			// to reduce time
			if (mMCal.calendar[mCurrentDay] == undefined) {
				pushAllDay(mCurrentDay, mHeap);
			}
			// in the case that a day is not empty
			else {
				// get busi event
				arrayEvent = mMCal.calendar[mCurrentDay];

				/**
				 * evaluate meeting time
				 */
				// construct up and down event
				upEvent = arrayEvent[0];
				downEvent = arrayEvent[0];

				/**
				 * evaluate start of day
				 */

				// Variables to pass to pushPart()
				// mTempStart = start of mCurrentday
				// mTempEnd = start first event (upEvent)
				mTempStart = mCurrentDay;
				mTempEnd = upEvent.start.dateTime;

				pushPart(mHeap, mTempStart, mTempEnd, mDuration);
				// end of evaluate start of day

				/**
				 * evaluate middle of day
				 */
				// if day has more than 1 busi event
				// that day has some more empty part
				// start evaluate middle of day
				if (arrayEvent.length > 1) {
					// loop from the second event to last event
					for (var count = 1; count < arrayEvent.length; count++) {
						// upEvent and downEvent will be the next event of themselves
						// upEvent = last downEvent
						// downEvent = the event that counter poit to (arrayEvent[count])
						upEvent = downEvent;
						downEvent = arrayEvent[count];

						/**
						 * evaluate a part between upEvent and downEvent
						 */

						// Variables to pass to pushPart()
						// mTempStart = end of current event (upEvent.end.dateTime)
						// mTempEnd = start of next event (downEvent.start.dateTime)
						mTempStart = upEvent.end.dateTime;
						mTempEnd = downEvent.start.dateTime;

						pushPart(mHeap, mTempStart, mTempEnd, mDuration);
						// end of evaluate a part
						// next to a new loop
					}
				}
				// end of evaluate middle of day

				/**
				 * evaluate end of day
				 */

				// Variables to pass to pushPart()
				// mTempStart = end of the last event (downEvent)
				// mTempEnd = start of next day of current day
				mTempStart = downEvent.end.dateTime;
				mTempEnd = eCalendar.tomorrow(mCurrentDay);

				pushPart(mHeap, mTempStart, mTempEnd, mDuration);
				// end of evaluate end of day

				//end of evaluate meeting time
			}

			// move to next day
			mCurrentDay = eCalendar.tomorrow(mCurrentDay);
		}

		// return a timeHeap of timeNode evaluated
		return mHeap;
	};

	// function to push a part of day
	// input a heap, a start time, an end time, duration
	var pushPart = function(mHeap, mStart, mEnd, mDuration) {
		// 5 variables to save year, month, etc that start loop
		// to reduce caculate time in while loop
		var tYear = mStart.getFullYear();
		var tMonth = mStart.getMonth();
		var tDate = mStart.getDate();
		var tHour = mStart.getHours();
		var tMinutes = mStart.getMinutes();

		// count for while loop
		var i = 0;

		// temp array to save list of time Node {start, end}
		var tempArray = [];

		while (new Date(tYear, tMonth, tDate, tHour, tMinutes + i + mDuration) <= mEnd) {
			tempArray.push({
				start: new Date(tYear, tMonth, tDate, tHour, tMinutes + i),
				end: new Date(tYear, tMonth, tDate, tHour, tMinutes + i + mDuration)
			});
			i++;
		}

		if (tempArray.length != 0) {
			mHeap.push(eTimeHeap.maxNode(tempArray));
		}
		tempArray = [];
	};

	// function to push timeNode to timeHeap step by step
	// in order to reduce while loop to reduce time
	var pushAllDay = function(mDate, mHeap) {
		mHeap.push(eTimeHeap.newTimeNode(mDate, eCalendar.tomorrow(mDate)));
	};

	return {
		evaluateTime: function(mMCal, mStart, mEnd, mDuration) {
			// evaluate the normal case
			if(true) {
				var mHeap = evaluateNormal(mMCal, mStart, mEnd, mDuration);
			}

			//return the result
			return mHeap;
		}
	};
})

// service for calculate point of time
.factory('ePoint', function(){
	return {
		calPoint: function(mHour) {
		// Function to caculate a time in what part of day and return the points
		// return 0: 12: 00 am to 5: 59 am 0 pts
		// return 1: 6: 00 am to 7: 59 am + 15 pts
		// return 2: 8: 00 am to 10: 59 am + 30 pts
		// return 3: 11: 00 am to 13: 59 pm + 20 pts
		// return 4: 14: 00 pm to 16: 59 pm + 50 pts
		// return 5: 17: 00 pm to 19: 59 pm + 20 pts
		// return 6: 20: 00 pm to 12: 00 am + 15 pts
			switch (mHour) {
				case 6: case 7: return 15;
				case 8: case 9: case 10: return 30;
				case 11: case 12: case 13: return 20;
				case 14: case 15: case 16: return 50;
				case 17: case 18: case 19: return 20;
				case 20: case 21: case 22: case 23: return 15;
				default: return 0;
			};
		}
	};
})
