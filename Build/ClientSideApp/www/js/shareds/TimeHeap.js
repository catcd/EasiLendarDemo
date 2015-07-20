/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 24/04/2015
 * type: TimeHeap object, Time Node object
 */

angular.module('MainApp.shareds.timeHeap', [])

.factory('eTimeHeap', function(ePoint) {
	// Check an object is TimeNode object or not
	var checkTimeNodeObj = function(obj){
		if(obj.hasOwnProperty('start') == true && obj.hasOwnProperty('end') == true && obj.hasOwnProperty('score') == true && obj.hasOwnProperty('getScore') == true && obj.hasOwnProperty('getStart') == true && obj.hasOwnProperty('getEnd') == true){
			return true;
		}
	};

	/**
	 * TimeNode object
	 * include: var start, end, score
				all basic getting, setting function (getEnd(), setEnd(object Date), etc.)
	 * constructor: TimeNode(start, end); auto rate the time and save to score
	 */

	function TimeNode(mStart, mEnd){
		var scoreArray = [{start: 0, end: 359, pts: ePoint.calPoint(0)},
						  {start: 360, end: 479, pts: ePoint.calPoint(6)},
						  {start: 480, end: 659, pts: ePoint.calPoint(8)},
						  {start: 660, end: 839, pts: ePoint.calPoint(11)},
						  {start: 840, end: 1019, pts: ePoint.calPoint(14)},
						  {start: 1020, end: 1199, pts: ePoint.calPoint(17)},
						  {start: 1200, end: 1439, pts: ePoint.calPoint(20)} 
						 ];
		//auto rate the time and save to score
		var rateScore = function(start,end){
			var sumPts = 0;
			var toDay = new Date();
			toDay = new Date(toDay.setHours(0,0,0,0));

			var endTime = end.getHours() * 60 + end.getMinutes();

			//break into separate days
			if(end.getDate() > start.getDate() && endTime !== 0) {
				var first = angular.copy(end);
				first = new Date(first.setHours(0,0,0,0));
				sumPts = rateScore(start,first) + rateScore(first,end); 
			}

			else {
				//convert to minutes
				var startTime = start.getHours() * 60 + start.getMinutes();

				//case: end: 00:00:00 of next day of start
				if(endTime == 0 && end > start){ endTime = 1440; }

				//minus (mDuration)pts if time node in next day of today
				var d = angular.copy(start);
				if(new Date(d.setHours(0,0,0,0)) > toDay) { sumPts = sumPts - ( ((end - start)/1000)/60 ); }
				
				//rate score in a day
				if (start == end) { sumPts += 0; }
				if (start < end) {
					if(startTime == 0 && endTime >= 1439){ 
					sumPts += ( 119*ePoint.calPoint(6) + 179*ePoint.calPoint(8) + 179*ePoint.calPoint(11) + 179*ePoint.calPoint(14) + 179*ePoint.calPoint(17) + 239*ePoint.calPoint(20) ); 
					} //all day
					else{
						for(var i=0; i < scoreArray.length; i++){
							if(startTime > scoreArray[i].end || endTime < scoreArray[i].start) { continue; }
							else {
								if(i == 0) { sumPts += 0; }
								else {
									sumPts = sumPts + ((endTime < scoreArray[i].end ? endTime:scoreArray[i].end) - (startTime > scoreArray[i].start ? startTime:scoreArray[i].start)) * scoreArray[i].pts;
									if(endTime == scoreArray[i].end) { sumPts = sumPts - scoreArray[i].pts; }
									if(endTime == scoreArray[i].end + 1) { sumPts = sumPts + scoreArray[i].pts; }
								}
							}
						}
					}
				}
			}
			
			return sumPts;
		};

		if(mStart == null || mEnd == null){
			this.score = -1;
		}
		else if(mStart == null && mEnd == null){
			this.score = -1;
		}
		else {
			if(mStart > mEnd) { 
				var term = angular.copy(mStart);
				mStart = angular.copy(mEnd);
				mEnd = angular.copy(term);
			}
			this.start = (mStart.hasOwnProperty('getStart') == false) ? new Date(mStart) : mStart ;
			this.end = (mEnd.hasOwnProperty('getStart') == false) ? new Date(mEnd) : mEnd ;
			this.score = rateScore(mStart,mEnd); 
		}

		this.getStart = function(){
			return this.start;
		};

		this.getEnd = function(){
			return this.end;
		};

		//return score of time after auto rate
		this.getScore = function(){
			return this.score;
		};

		this.setStart = function(startTime){
			if(startTime != null || startTime != undefined){
				if(startTime.hasOwnProperty('getDate') == true || startTime <= this.end){
					this.start = startTime;
					this.score = rateScore(startTime,this.end);
				}
			}
		};

		this.setEnd = function(endTime){
			if(endTime != null || endTime != undefined){
				if(endTime.hasOwnProperty('getDate') == true || this.start <= endTime){
					this.end = endTime;
					this.score = rateScore(this.start,endTime);
				}
			}
		};

		this.setScore = function(score){
			if(score != null || score != undefined){
				if(score.length == null){
					this.score = score;
				}
			}
		};
	}

	/**
	 * TimeHeap object
	 * priority queue (max on the top)
	 * include: var: date, timeList, length, cache
				function: push (+ upHeap), pop (+ downHeap), getTop, backUp and all basic function
	 * constructor: TimeHeap(mDate); auto contruct the heap with this.date is Monday of the week has mDate
	 */
	//TimeHeap array before using pop 
	function TimeHeap(){
		this.timeList = [];
		this.length = 0;
		this.cache = null;

		//push an TimeNode object (!= null && != undefined) to bottom of array
		this.push = function(item){
			if(item != null && item != undefined && checkTimeNodeObj(item) == true){
				this.length++;
				this.timeList[this.length-1] = item;

				var i = this.length-1;
				var j = ( i - (i%2 == 0 ? 2:1) ) / 2;
				while(j >= 0){
					if(this.timeList[i].getScore() > this.timeList[j].getScore()){
						var term = angular.copy(this.timeList[i]);
						this.timeList[i] = angular.copy(this.timeList[j]);
						this.timeList[j] = angular.copy(term);
					}

					i = j;
					j = ( i - (i%2 == 0 ? 2:1) ) / 2;
				}

				this.cache = angular.copy(this.timeList);
			}
		};

		//return and delete an item on top of array
		this.pop = function(){
			var top = angular.copy(this.timeList[0]);
			this.timeList[0] = angular.copy(this.timeList[this.length-1]);
			this.timeList.splice(this.length-1,1);
			this.length--;
			
			if(this.length > 0){
				var i = 0;
				var j = 0;

				while(this.timeList[j+1] != undefined && this.timeList[j+2] != undefined){
					if(this.timeList[j+1] != undefined && this.timeList[j+2] == undefined) { j += 1; }
					else if(this.timeList[j+2] != undefined && this.timeList[j+1] == undefined) {j += 2; }
					else { j += (this.timeList[j+1].getScore() > this.timeList[j+2].getScore() ? 1:2); }

					if(this.timeList[i].getScore() < this.timeList[j].getScore()){
						var term = angular.copy(this.timeList[i]);
						this.timeList[i] = angular.copy(this.timeList[j]);
						this.timeList[j] = angular.copy(term);
					}

					i = j;
					j = 2*i;
				}
			}

			return top;
		};

		//parameter is date in the week that want to back up
		//return all item in array as before using pop
		this.backUp = function(){
			this.timeList = angular.copy(this.cache);
			this.length = this.timeList.length;
		};

		//return length of array
		this.getLength = function(){
			return this.length;
		};

		//return item on top of array
		this.getTop = function(){
			return this.timeList[0];
		};
	}

	//return an Object of eTimeHeap factory
	return {
		//Time Node contructor
		newTimeNode: function(mStart, mEnd) {
			return new TimeNode(mStart, mEnd);
		},
	
		/**
		 *Constructor with an array of TimeNode objects
	     *and return a TimeNode object with max score
		 */
		maxNode: function(array){
			var maxNode;
			//case: array is empty
			if(array == null || array == undefined) { maxNode = null; }
			else{
				if(array.length == 0 || array.length == null){ maxNode = null; }
				else{
					var maxScore;
					var valid = 0;
					if(array[array.length-1].start != undefined && array[array.length-1].end != undefined){
						maxNode = new TimeNode(array[array.length-1].start, array[array.length-1].end);
						maxScore = maxNode.getScore();
						valid++;
					}

					for(var i=array.length-2; i>=0; i--){
						if(array[i].start != undefined && array[i].end != undefined){
							var node = new TimeNode(array[i].start, array[i].end);
							if(maxNode == null){ 
								maxNode = angular.copy(node);
								maxScore = maxNode.getScore;
							}
							if(node.getScore() > maxScore){
									maxScore = node.getScore();
									maxNode = node;
							}
							valid++;
						}
					}

					if(valid == 0) { maxNode = null; }
				}
			}

			return maxNode;
		},

		//TimeHeap contructor
		newTimeHeap: function() {
			return new TimeHeap();
		}
	};
});
