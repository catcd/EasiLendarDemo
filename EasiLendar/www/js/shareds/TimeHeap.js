/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 26/03/2015
 * type: TimeHeap object, Time Node object
 */

angular.module('MainApp.shareds.timeHeap', [])

.run(function($rootScope/*, $ionicPopup, $timeout, $state, $ionicPlatform, $ionicHistory*/) {
	/**
	 * TimeNode object
	 * include: var start, end, score
				all basic getting, setting function (getEnd(), setEnd(object Date), etc.)
	 * constructor: TimeNode(start, end); auto rate the time and save to score
	 */
	function TimeNode(mStart, mEnd){
		var scoreArray = [	{start: 0, end: 6, pts: 0},
							{start: 6, end: 8, pts: 5}, {start: 8, end: 11, pts: 10},
							{start: 11, end: 14, pts: 2}, {start: 14, end: 17, pts: 20},
							{start: 17, end: 20, pts: 5}, {start: 20, end: 23, pts: 10}  ];
		//auto rate the time and save to score
		var rateScore = function(start,end){
			var sumPts = 0;
			
			if( start.getDate() < end.getDate() ) {
				var endDay = new Date(start.setHours(23,0,0,0));
				var startDay = new Date(start.setHours(24,0,0,0));  
				sumPts = rateScore(start,endDay) + rateScore(startDay,end) - 9; 
			}
			else if ( start.getDate() > end.getDate() ) { 
				sumPts = rateScore(end, start); 
			}
			else{
				var startTime = start.getHours() * 60 + start.getMinutes();
				var endTime = end.getHours() * 60 + end.getMinutes();
				for(var i=0; i < scoreArray.length; i++){
					if(start.getHours() > scoreArray[i].end || end.getHours() < scoreArray[i].start) { continue; }
					else {
						if(i==0) { sumPts = sumPts; }
						else {
							sumPts = sumPts + (end.getHours() < scoreArray[i].end ? endTime:scoreArray[i].end * 60)
											- (startTime.getHours() > scoreArray[i].start ? startTime:scoreArray[i].start * 60)
											* scoreArray[i].pts;
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
	var cache = new Array();

	function TimeHeap(mDate){
		//find monday of the week has mDate
		var findMonday = function(date){
			var d = date;
			var monday = d.getDate() - d.getDay() + 1;
			d = new Date(d.setDate(monday));
			return d;
		};

		this.date = findMonday(mDate);
		this.timeList = new Array();
		this.length = 0;
		cache[this.date] = new Array();

		//push an item to bottom of array
		this.push = function(item){
			this.length++;
			this.timeList[this.length-1] = item;

			var i = this.length-1;
			var j = ( i - (i%2==0 ? 2:1) ) / 2;
			while(j >= 0){
				if(this.timeList[i].getScore() > this.timeList[j].getScore()){
					var term = this.timeList[i];
					this.timeList[i] = this.timeList[j];
					this.timeList[j] = term;
				}
				i = j;
				j = ( i - (i%2==0 ? 2:1) ) / 2;
			}

			cache[this.date] = this.timeList;
		};

		//return and delete an item on top of array
		this.pop = function(item){
			var top = this.timeList[0];
			this.timeList[0] = this.timeList[this.length-1];
			this.timeList.splice(this.length-1,1);
			this.length--;

			var i = 0;
			var j = 2*i + (this.timeList[2*i+1].getScore() > this.timeList[2*i+2].getScore() ? 1:2);
			while(j < this.length){
				if(this.timeList[i].getScore() < this.timeList[j].getScore()){
					var term = this.timeList[i];
					this.timeList[i] = this.timeList[j];
					this.timeList[j] = this.timeList[j];
					
					i = j;
					j = 2*i + (this.timeList[2*i+1].getScore() > this.timeList[2*i+2].getScore() ? 1:2);
				}
				else { break; }
			}

			return top;
		};

		//parameter is date in the week that want to back up
		//return all item in array as before using pop
		this.backUp = function(date){
			var index = findMonday(date);
			this.timeList = cache[index];
		};

		//return length of array
		this.getLength = function(){
			return this.length;
		};

		//return item on top of array
		this.getTop = function(){
			return this.timeList[0];
		};

		//return date - monday of the week has mDate
		this.getDate = function(){
			return this.date;
		}
	};

})
