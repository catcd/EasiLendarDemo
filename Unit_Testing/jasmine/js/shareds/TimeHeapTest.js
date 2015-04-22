/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 22/4/2015
 * type: TimeHeap object, Time Node object
 * number of tests: 30
 */

/** Test for:
  * TimeNode class
  * maxNode function
  * TimeHeap class
  */

/*$provide.factory('ePoint', function(){
	var calPointFake = jasmine.createSpy('calPoint').andCallFake(
		function(){
			
		}
	)

return ePoint: ePoint
});*/

describe('TimeNode and TimeHeap', function() {
	var eTimeHeap;
	var ePointMock;

	beforeEach(function(){
		module('MainApp.shareds.timeHeap', function($provide){
			ePointMock = jasmine.createSpyObj('ePoint',['calPoint']);

			$provide.value('ePoint', ePointMock);
		});

		inject(function(_eTimeHeap_){
			eTimeHeap = _eTimeHeap_;
		});
	});

	describe('Contructor', function(){
		describe('TimeNode', function(){
			var start = new Date(2015,3,22);
			var end = new Date(2015,3,23);

			it('should create a object when pass 2 parameters', function(){
				var obj = eTimeHeap.newTimeNode(start,end);
				expect(obj).toBeDefined();
			});

			it('should create an object with start property is an object Date', function(){
				var obj = eTimeHeap.newTimeNode(start,end);
				expect(obj.start).toEqual(start);
			});

			it('should create an object with end property is an object Date', function(){
				var obj = eTimeHeap.newTimeNode(start,end);
				expect(obj.end).toEqual(end);
			});

			it('should create an object with getStart function', function(){
				var obj = eTimeHeap.newTimeNode(start,end);
				expect(obj.hasOwnProperty('getStart')).toBe(true);
			});

			it('should create an object with getEnd function', function(){
				var obj = eTimeHeap.newTimeNode(start,end);
				expect(obj.hasOwnProperty('getEnd')).toBe(true);
			});

			it('should create an object with getScore function', function(){
				var obj = eTimeHeap.newTimeNode(start,end);
				expect(obj.hasOwnProperty('getScore')).toBe(true);
			});

			it('should create an object with setStart function', function(){
				var obj = eTimeHeap.newTimeNode(start,end);
				expect(obj.hasOwnProperty('setStart')).toBe(true);
			});

			it('should create an object with setEnd function', function(){
				var obj = eTimeHeap.newTimeNode(start,end);
				expect(obj.hasOwnProperty('setEnd')).toBe(true);
			});

			it('should create an object with setScore function', function(){
				var obj = eTimeHeap.newTimeNode(start,end);
				expect(obj.hasOwnProperty('setScore')).toBe(true);
			});
		});

		describe('TimeHeap', function(){
			it('should create an object', function(){
				var heap = eTimeHeap.newTimeHeap();
				expect(heap).toBeDefined();
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

			it('should create an object with push function', function(){
				var heap = eTimeHeap.newTimeHeap();
				expect(heap.hasOwnProperty('push')).toBe(true);
			});

			it('should create an object with pop function', function(){
				var heap = eTimeHeap.newTimeHeap();
				expect(heap.hasOwnProperty('pop')).toBe(true);
			});

			it('should create an object with getTop function', function(){
				var heap = eTimeHeap.newTimeHeap();
				expect(heap.hasOwnProperty('getTop')).toBe(true);
			});

			it('should create an object with getLength function', function(){
				var heap = eTimeHeap.newTimeHeap();
				expect(heap.hasOwnProperty('getLength')).toBe(true);
			});

			it('should create an object with backUp function', function(){
				var heap = eTimeHeap.newTimeHeap();
				expect(heap.hasOwnProperty('backUp')).toBe(true);
			});
		});

		describe('MaxNode', function(){
			it('should return null when pass an empty array', function(){
				var array = new Array();
				var obj = eTimeHeap.maxNode(array);
				expect(obj).toBe(null);
			})

			it('should return an object TimeNode object when pass a non-empty array', function(){
				var array = [
					{start: new Date(2015,3,20), end: new Date(2015,3,21)}
					];
				var obj = eTimeHeap.maxNode(array);
				expect(obj).toBeDefined();
				expect(obj.start).toEqual(new Date(2015,3,20));
				expect(obj.hasOwnProperty('getStart')).toBe(true);
				expect(obj.hasOwnProperty('getScore')).toBe(true);
			})
		});
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

			/*xit('should return 2700 points when start is 8:00AM and end is 9:30AM in same day', function(){
				var start = new Date(2015,3,18,8,0,0);
				var end = new Date(2015,3,18,9,30,0);

				var node = $rootScope.newTimeNode(start,end);

				expect(node.getScore()).toBe(2700);
			});*/

			/*xit('should return 1770 when start is 8:59AM and end is 9:59AM in same day', function(){

			});

			xit('should return 0 when start is the same time as end', function(){

			});

			xit('should return 26850 points when end is next day of start', function(){

			});*/
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