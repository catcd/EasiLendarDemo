/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 3/4/2015
 * type: TimeHeap object, Time Node object
 */

angular.module('MainApp.shareds.timeHeap', [])

.run(function($rootScope/*, $ionicPopup, $timeout, $state, $ionicPlatform, $ionicHistory*/) {
	$rootScope.newTimeNode = function(mStart, mEnd) {
		return new TimeNode(mStart, mEnd);
	};
	
	/**
	 *Constructor with an array of TimeNode objects
     *and return a TimeNode object with max score
	 */
	$rootScope.maxNode = function(array){
		if(array.length == 0){ 
			console.log('Array is empty');
			var d = new Date(); 
			maxNode = new TimeNode(new Date(d.setHours(0,0,0,0)), new Date(d.setHours(0,0,0,0)));
		}
		else{
			var maxNode = new TimeNode(array[array.length-1].start, array[array.length-1].end);
			var maxScore = maxNode.getScore();
			for(var i=array.length-2; i>=0; i--){
				var node = new TimeNode(array[i].start, array[i].end);
				if(node.getScore() > maxScore){
						maxScore = node.getScore();
						maxNode = node;
				}
			}
		}
		return maxNode;
	};

	$rootScope.newTimeHeap = function() {
		return new TimeHeap();
	};

	/**
	 * TimeNode object
	 * include: var start, end, score
				all basic getting, setting function (getEnd(), setEnd(object Date), etc.)
	 * constructor: TimeNode(start, end); auto rate the time and save to score
	 */
	function TimeNode(mStart, mEnd){
		var scoreArray = [{start: 0, end: 359, pts: 0},
						  {start: 360, end: 479, pts: 15}, {start: 480, end: 659, pts: 30},
						  {start: 660, end: 839, pts: 20}, {start: 840, end: 1019, pts: 50},
						  {start: 1020, end: 1199, pts: 20}, {start: 1200, end: 1439, pts: 15} 
						 ];
		//auto rate the time and save to score
		var rateScore = function(start,end){
			var sumPts = 0;
			var toDay = new Date();
			toDay = new Date(toDay.setHours(0,0,0,0));

			var startTime = start.getHours() * 60 + start.getMinutes();
			var endTime = end.getHours() * 60 + end.getMinutes();
			if(endTime == 0){ endTime = 1440; }
			var d = angular.copy(start);

			if(new Date(d.setHours(0,0,0,0)) > toDay) { sumPts = sumPts - (endTime - startTime); }
			
			if (startTime == endTime) { sumPts += 0; }
			else if (startTime < endTime) {
				if(startTime == 0 && endTime == 1439){ sumPts += 26835; }
				else{
					for(var i=0; i < scoreArray.length; i++){
						if(startTime > scoreArray[i].end || endTime < scoreArray[i].start) { continue; }
						else {
							if(i==0) { sumPts = sumPts; }
							else {
								sumPts = sumPts + ((endTime < scoreArray[i].end ? endTime:scoreArray[i].end)
									     - (startTime > scoreArray[i].start ? startTime:scoreArray[i].start))
										 * scoreArray[i].pts;
								if(endTime == scoreArray[i].end) { sumPts = sumPts - scoreArray[i].pts; }
								if(endTime == scoreArray[i].end+1) {sumPts = sumPts + scoreArray[i].pts; }
							}
						}
					}
				}
			}
			
			return sumPts;
		};

		this.start = mStart;
		this.end = mEnd;
		this.score = rateScore(mStart,mEnd);

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
			this.start = startTime;
		};

		this.setTime = function(endTime){
			this.end = endTime;
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
		/*find monday of the week has mDate
		var findMonday = function(date){
			var d = date;
			var monday = d.getDate() - (d.getDay() == 0 ? 6:d.getDay()) + 1;
			d = new Date(d.setDate(monday));
			return d;
		};

		this.date = findMonday(mDate);*/
		this.timeList = new Array();
		this.length = 0;
		this.cache = null;

		//push an item to bottom of array
		this.push = function(item){
			this.length++;
			this.timeList[this.length-1] = item;

			var i = this.length-1;
			var j = ( i - (i%2==0 ? 2:1) ) / 2;
			while(j >= 0){
				if(this.timeList[i].getScore() > this.timeList[j].getScore()){
					var term = angular.copy(this.timeList[i]);
					this.timeList[i] = angular.copy(this.timeList[j]);
					this.timeList[j] = angular.copy(term);
				}

				i = j;
				j = ( i - (i%2==0 ? 2:1) ) / 2;
			}

			this.cache = angular.copy(this.timeList);
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

				while(this.timeList[j+1] !== null && this.timeList[j+2] !== null){
					if(this.timeList[j+1] !== null && this.timeList[j+2] == null) { j += 1; }
					else if(this.timeList[j+2] !== null && this.timeList[j+1] == null) {j += 2; }
					else { j += (this.timeList[j+1].getScore() > this.timeList[j+2].getScore() ? 1:2) }

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
		};

		//return length of array
		this.getLength = function(){
			return this.length;
		};

		//return item on top of array
		this.getTop = function(){
			return this.timeList[0];
		};

		/*return date - monday of the week has mDate
		this.getDate = function(){
			return this.date;
		}*/
	};

})
