/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 22/4/2015
 * type: TimeHeap object, Time Node object
 * number of tests: 10
 */

/** Test for:
  * TimeNode class
  * maxNode function
  * TimeHeap class
  */

describe('TimeNode and TimeHeap', function() {
	var eTimeHeap;
	var ePointFake;

	beforeEach(function(){
		module('MainApp.shareds.timeHeap', function($provide){
			//Fake ePoint service
			ePointFake = {
				calPoint: function(mHour){
					switch (mHour) {
						case 0: case 1: case 2: case 3: case 4: case 5: return 0;
						case 6: case 7: return 15;
						case 8: case 9: case 10: return 30;
						case 11: case 12: case 13: return 20;
						case 14: case 15: case 16: return 50;
						case 17: case 18: case 19: return 20;
						case 20: case 21: case 22: case 23: return 15;
					};
				}
			};
			$provide.value('ePoint', ePointFake);
		});

		//inject the service we're testing
		inject(function(_eTimeHeap_){
			eTimeHeap = _eTimeHeap_;
		});
	});

	describe('Contructor', function(){
		describe('TimeNode', function(){
			var start = new Date(2015,3,22);
			var end = new Date(2015,3,23);

			it('should create a object when pass start and time of an event', function(){
				var obj = eTimeHeap.newTimeNode(start,end);
				expect(obj.hasOwnProperty('getStart')).toBe(true);
				expect(obj.hasOwnProperty('getEnd')).toBe(true);
				expect(obj.hasOwnProperty('getScore')).toBe(true);
			});

			it('should create an object with start property is an object Date', function(){
				var obj = eTimeHeap.newTimeNode(start,end);
				expect(obj.start).toEqual(start);
			});

			it('should create an object with end property is an object Date', function(){
				var obj = eTimeHeap.newTimeNode(start,end);
				expect(obj.end).toEqual(end);
			});
		});

		describe('TimeHeap', function(){
			it('should create an object with push, pop, backUp function', function(){
				var heap = eTimeHeap.newTimeHeap();
				expect(heap).toBeDefined();
				expect(heap.hasOwnProperty('push')).toBe(true);
				expect(heap.hasOwnProperty('pop')).toBe(true);
				expect(heap.hasOwnProperty('backUp')).toBe(true);
			});

			it('should create an object with timeList property is an empty array', function(){
				var heap = eTimeHeap.newTimeHeap();
				expect(heap.timeList.length).toBe(0);
			});

			it('should create an object with length property is 0', function(){
				var heap = eTimeHeap.newTimeHeap();
				expect(heap.length).toBe(0);
			});

			it('should create an object with cache property is null', function(){
				var heap = eTimeHeap.newTimeHeap();
				expect(heap.cache).toBe(null);
			});
		});

		describe('MaxNode', function(){
			it('should return null when pass an empty array', function(){
				var array = new Array();
				var obj = eTimeHeap.maxNode(array);
				expect(obj).toBe(null);
			});

			it('should return null when pass an undefined variable or null', function(){
				var array = null;
				var obj = eTimeHeap.maxNode(array);
				expect(obj).toBe(null);
				array = undefined;
				obj = eTimeHeap.maxNode(array);
				expect(obj).toBe(null);
			});

			it('should return an object TimeNode object when pass a non-empty array', function(){
				var array = [
					{start: new Date(2015,3,20), end: new Date(2015,3,21)}
					];
				var obj = eTimeHeap.maxNode(array);
				expect(obj).toBeDefined();
				expect(obj.start).toEqual(new Date(2015,3,20));
				expect(obj.hasOwnProperty('getStart')).toBe(true);
				expect(obj.hasOwnProperty('getScore')).toBe(true);
			});
		});
	});

	describe('Set values', function(){

	});

	describe('All cases can happen', function(){
		describe('TimeNode', function(){
			it('should create an object with start property is the first paremeters of newTimeNode(start,end)', function(){
				var start = new Date(2015,3,22);
				var end = new Date(2015,3,23);
				var obj = eTimeHeap.newTimeNode(start,end);
				expect(obj.start).toEqual(start);
			});

			it('should create an object with end property is the second paremeters of newTimeNode(start,end)', function(){
				var start = new Date(2015,3,22);
				var end = new Date(2015,3,23);
				var obj = eTimeHeap.newTimeNode(start,end);
				expect(obj.end).toEqual(end);
			});

			it('should return correct points points when start is 8:00AM and end is 8:01AM in same day', function(){
				var start = new Date(2015,3,18,8,0,0);
				var end = new Date(2015,3,18,8,1,0);
				var node = eTimeHeap.newTimeNode(start,end);
				expect(node.getScore()).toEqual(ePointFake.calPoint(8));
			});

			it('should return correct points points when start is 8:00AM and end is 9:30AM in same day', function(){
				var start = new Date(2015,3,18,8,0,0);
				var end = new Date(2015,3,18,9,30,0);
				var node = eTimeHeap.newTimeNode(start,end);
				expect(node.getScore()).toEqual(60*ePointFake.calPoint(8)+30*ePointFake.calPoint(8));
			});

			it('should return correct points when start is 8:59AM and end is 9:59AM in same day', function(){
				var start = new Date(2015,3,18,8,59,0);
				var end = new Date(2015,3,18,9,59,0);
				var node = eTimeHeap.newTimeNode(start,end);
				expect(node.getScore()).toEqual(60*ePointFake.calPoint(8));
			});

			it('should return correct points when start is 8:59AM and end is 10:00AM in same day', function(){
				var start = new Date(2015,3,18,8,59,0);
				var end = new Date(2015,3,18,10,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				expect(node.getScore()).toEqual(60*ePointFake.calPoint(8)+ePointFake.calPoint(8));
			});

			it('should return correct points points when start is 9:00AM and end is 10:00AM in same day', function(){
				var start = new Date(2015,3,18,9,0,0);
				var end = new Date(2015,3,18,10,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				expect(node.getScore()).toEqual(60*ePointFake.calPoint(8));
			});

			it('should return correct points when start is the next day of current date', function(){
				var maxPoint = 119*ePointFake.calPoint(6) + 179*ePointFake.calPoint(8) + 179*ePointFake.calPoint(11)
						   + 179*ePointFake.calPoint(14) + 179*ePointFake.calPoint(17) + 239*ePointFake.calPoint(20);
				var toDay = new Date();
				var start = new Date(toDay.setDate(toDay.getDate()+1));
				var end = start;
				var node = eTimeHeap.newTimeNode(start,end);
				expect(node.getScore()).toEqual(0 - ( ((end - start)/1000)/60 ));
			});

			it('should return 0 point when start is the same time as end', function(){
				var start = new Date(2015,3,18,0,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				expect(node.getScore()).toEqual(0);
			});

			it('should return max points when start is 00:00AM of today and end is 00:00AM of tomorrow', function(){
				var maxPoint = 119*ePointFake.calPoint(6) + 179*ePointFake.calPoint(8) + 179*ePointFake.calPoint(11)
						   + 179*ePointFake.calPoint(14) + 179*ePointFake.calPoint(17) + 239*ePointFake.calPoint(20);
				var start = new Date(2015,3,18,0,0,0);
				var end = new Date(2015,3,18,24,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				expect(node.getScore()).toEqual(maxPoint);
			});
		});
	});

	/*describe('TimeNode', function(){
		it('should return 2700 points when start is 8:00AM and end is 9:30AM in same day', function(){
			var start = new Date(2015,3,18,8,0,0);
			var end = new Date(2015,3,18,9,30,0);

			var node = $rootScope.newTimeNode(start,end);

			expect(node.getScore()).toBe(2700);
		});

		it('should return 1770 when start is 8:59AM and end is 9:59AM in same day', function(){

		});

		it('should return 0 when start is the same time as end', function(){

		});

		it('should return 26850 points when end is next day of start', function(){

		});
	});*/

	/*describe('MaxNode', function(){
		it('should return time with max points when pass an array of time', function(){

		});

		it('should return time from 9:00AM to 10:00AM with max points 
			when pass an array of time: 8:58AM - 9:58AM; 8:59AM - 9:59AM; 9:00AM - 10:00AM', function(){

		});
	});

	describe('TimeHeap', function(){
		it('should push a new time to array and sort,
			the first item should has a max points', function(){

		});

		it('should remove first item that has max points from array
			and continue sorting to push item with max points to head array', function(){

		});

		it('should return first item that has max points of array', function(){

		});

		it('should return all items in array as before using pop', function(){

		});
	});*/
});