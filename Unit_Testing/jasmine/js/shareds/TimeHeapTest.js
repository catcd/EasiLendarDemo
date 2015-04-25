/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 24/04/2015
 * type: TimeHeap object, Time Node object
 * number of tests: 74
 */

/** Test for:
  * contructor
  * set values
  * all cases can happen
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


	/** Test Contructor
	  * TimeNode class
	  * TimeHeap class
	  * maxNode function that call TimeNode's contructor
	  */

	describe('Contructor', function(){
		describe('TimeNode', function(){
			var start = new Date(2015,3,22);
			var end = new Date(2015,3,23);

			it('should create a object when pass valid time of an event', function(){
				var obj = eTimeHeap.newTimeNode(start,end);
				expect(obj.hasOwnProperty('getStart')).toBe(true);
				expect(obj.hasOwnProperty('getEnd')).toBe(true);
				expect(obj.hasOwnProperty('getScore')).toBe(true);
			});

			it('should create a object with score property is -1 when pass null time of an event', function(){
				var obj = eTimeHeap.newTimeNode(null,end);
				expect(obj.getScore()).toBe(-1);
				obj = eTimeHeap.newTimeNode(start,null);
				expect(obj.getScore()).toBe(-1);
				obj = eTimeHeap.newTimeNode();
				expect(obj.getScore()).toBe(-1);
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
			it('should return null when call maxNode function but does not pass any variable', function(){
				var obj = eTimeHeap.maxNode();
				expect(obj).toBeNull();
			});

			it('should return null when pass an empty array', function(){
				var array = new Array();
				var obj = eTimeHeap.maxNode(array);
				expect(obj).toBe(null);
			});

			it('should return null when pass an number or string', function(){
				var array = 3;
				var obj = eTimeHeap.maxNode(array);
				expect(obj).toBe(null);
				array = 'string';
				obj = eTimeHeap.maxNode(array);
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

			it('should return an TimeNode object', function(){
				var node = eTimeHeap.newTimeNode(new Date(2015,3,20), new Date(2015,3,21));
				var array = []
				array.push(node);
				var obj = eTimeHeap.maxNode(array);
				expect(obj).toBeDefined();
				expect(obj.start).toEqual(new Date(2015,3,20));
				expect(obj.hasOwnProperty('getStart')).toBe(true);
				expect(obj.hasOwnProperty('getScore')).toBe(true);
			});
		});
	});


	/** Test setting values
	  * TimeNode class
	  */

	describe('Set values', function(){
		describe('TimeNode', function(){
			it('should return an object with start property that was set', function(){
				var start = new Date(2015,3,18,3,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				node.setStart(new Date(2015,3,18,0,0,0));
				expect(node.getScore()).toBe(0);
			});

			it('should not change any thing when set start property is null or undefined or not Date object', function(){
				var start = new Date(2015,3,18,3,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				var oldScore = node.getScore();

				node.setStart(null);
				expect(node.getScore()).toBe(oldScore);
				node.setStart(undefined);
				expect(node.getScore()).toBe(oldScore);
				node.setStart('2015-3-18');
				expect(node.getScore()).toBe(oldScore);
			});

			it('should not change any thing when set start is greater than end or set end is less than start', function(){
				var start = new Date(2015,3,18,3,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				var oldScore = node.getScore();

				node.setStart(new Date(2015,3,24));
				expect(node.getScore()).toBe(oldScore);
				node.setEnd(new Date(2015,3,15));
				expect(node.getScore()).toBe(oldScore);
			});

			it('should return an object with end property that was set', function(){
				var start = new Date(2015,3,18,3,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				node.setEnd(new Date(2015,3,18,3,0,0));
				expect(node.getScore()).toBe(0);
			});

			it('should not change any thing when set end property is null or undefined or not Date object', function(){
				var start = new Date(2015,3,18,3,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				var oldScore = node.getScore();
				
				node.setEnd(null);
				expect(node.getScore()).toBe(oldScore);
				node.setEnd(undefined);
				expect(node.getScore()).toBe(oldScore);
				node.setEnd('2015-3-18');
				expect(node.getScore()).toBe(oldScore);
			});

			it('should return an object with score property that was set', function(){
				var start = new Date(2015,3,18,0,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				node.setScore(50);
				expect(node.getScore()).toBe(50);
			});

			it('should not change any thing when set score property is null or undefined or string', function(){
				var start = new Date(2015,3,18,3,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				var oldScore = node.getScore();
				
				node.setScore(null);
				expect(node.getScore()).toBe(oldScore);
				node.setScore(undefined);
				expect(node.getScore()).toBe(oldScore);
				node.setScore('3');
				expect(node.getScore()).toBe(oldScore);
			});

			it('should not change anything when call setStart, setEnd and setScore functions but does not pass any value', function(){
				var start = new Date(2015,3,18,3,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				var oldScore = angular.copy(node);

				node.setStart();
				node.setEnd();
				node.setScore();
				expect(node).toEqual(oldScore);
			});
		});
	});


	/** All cases can happen
	  * TimeNode class
	  * TimeHeap class
	  * maxNode function
	  */

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

			it('should return correct points when pass start and end are in duration that is from 12:00AM to 5:59AM', function(){
				var start = new Date(2015,3,18,1,0,0);
				var end = new Date(2015,3,18,2,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				expect(node.getScore()).toEqual(0);
				start = new Date(2015,3,18,3,0,0);
				end = new Date(2015,3,18,4,0,0);
				node = eTimeHeap.newTimeNode(start,end);
				expect(node.getScore()).toEqual(0);
				start = new Date(2015,3,18,4,0,0);
				end = new Date(2015,3,18,5,0,0);
				node = eTimeHeap.newTimeNode(start,end);
				expect(node.getScore()).toEqual(0);
			});

			it('should return correct points when pass start and end are in duration that is from 6:00AM to 7:59AM', function(){
				var start = new Date(2015,3,18,6,0,0);
				var end = new Date(2015,3,18,6,1,0);
				var node = eTimeHeap.newTimeNode(start,end);
				expect(node.getScore()).toEqual(ePointFake.calPoint(6));
			});

			it('should return correct points when pass start and end are in duration that is from 8:00AM to 10:59AM', function(){
				var start = new Date(2015,3,18,8,0,0);
				var end = new Date(2015,3,18,8,1,0);
				var node = eTimeHeap.newTimeNode(start,end);
				expect(node.getScore()).toEqual(ePointFake.calPoint(8));
			});

			it('should return correct points when pass start and end are in duration that is from 11:00AM to 13:59AM', function(){
				var start = new Date(2015,3,18,11,0,0);
				var end = new Date(2015,3,18,11,1,0);
				var node = eTimeHeap.newTimeNode(start,end);
				expect(node.getScore()).toEqual(ePointFake.calPoint(11));
			});

			it('should return correct points when pass start and end are in duration that is from 14:00AM to 16:59AM', function(){
				var start = new Date(2015,3,18,14,0,0);
				var end = new Date(2015,3,18,14,1,0);
				var node = eTimeHeap.newTimeNode(start,end);
				expect(node.getScore()).toEqual(ePointFake.calPoint(14));
			});

			it('should return correct points when pass start and end are in duration that is from 17:00AM to 19:59AM', function(){
				var start = new Date(2015,3,18,17,0,0);
				var end = new Date(2015,3,18,17,1,0);
				var node = eTimeHeap.newTimeNode(start,end);
				expect(node.getScore()).toEqual(ePointFake.calPoint(17));
			});

			it('should return correct points when pass start and end are in duration that is from 20:00AM to 12:00AM', function(){
				var start = new Date(2015,3,18,20,0,0);
				var end = new Date(2015,3,18,20,1,0);
				var node = eTimeHeap.newTimeNode(start,end);
				expect(node.getScore()).toEqual(ePointFake.calPoint(20));
			});

			it('should return correct points points when start is 8:00AM and end is 9:30AM in same day', function(){
				var start = new Date(2015,3,18,8,0,0);
				var end = new Date(2015,3,18,9,30,0);
				var node = eTimeHeap.newTimeNode(start,end);
				expect(node.getScore()).toEqual(90 * ePointFake.calPoint(8));
			});

			it('should return correct points when start is 8:59AM and end is 9:59AM in same day', function(){
				var start = new Date(2015,3,18,8,59,0);
				var end = new Date(2015,3,18,9,59,0);
				var node = eTimeHeap.newTimeNode(start,end);
				expect(node.getScore()).toEqual(60 * ePointFake.calPoint(8));
			});

			it('should return correct points when start is 8:59AM and end is 10:00AM in same day', function(){
				var start = new Date(2015,3,18,8,59,0);
				var end = new Date(2015,3,18,10,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				expect(node.getScore()).toEqual(61 * ePointFake.calPoint(8));
			});

			it('should return correct points points when start is 9:00AM and end is 10:00AM in same day', function(){
				var start = new Date(2015,3,18,9,0,0);
				var end = new Date(2015,3,18,10,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				expect(node.getScore()).toEqual(60 * ePointFake.calPoint(8));
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

			it('should return correct start time when using getStart function', function(){
				var start = new Date(2015,3,18,8,59,0);
				var end = new Date(2015,3,18,9,59,0);
				var node = eTimeHeap.newTimeNode(start,end);
				expect(node.getStart()).toEqual(start);
			});

			it('should return correct end time when using getEnd function', function(){
				var start = new Date(2015,3,18,8,59,0);
				var end = new Date(2015,3,18,9,59,0);
				var node = eTimeHeap.newTimeNode(start,end);
				expect(node.getEnd()).toEqual(end);
			});
		});

		describe('TimeHeap', function(){
			/* PUSH */

			it('should not change any thing when push null item to Heap', function(){
				var heap = eTimeHeap.newTimeHeap();
				heap.push(null);
				expect(heap.length).toEqual(0);
				expect(heap.cache).toEqual(null);
			});

			it('should not change any thing when push undefined item to Heap', function(){
				var heap = eTimeHeap.newTimeHeap();
				heap.push(undefined);
				expect(heap.length).toEqual(0);
				expect(heap.cache).toEqual(null);
			});

			it('should not change any thing when does not push any thing', function(){
				var heap = eTimeHeap.newTimeHeap();
				heap.push();
				expect(heap.length).toEqual(0);
				expect(heap.cache).toEqual(null);
			});

			it('should not change any thing when push an item that is not TimeNode object', function(){
				var heap = eTimeHeap.newTimeHeap();
				heap.push(3);
				expect(heap.length).toEqual(0);
				expect(heap.cache).toEqual(null);
				heap.push('abc');
				expect(heap.length).toEqual(0);
				expect(heap.cache).toEqual(null);
				heap.push({start: 60});
				expect(heap.length).toEqual(0);
				expect(heap.cache).toEqual(null);
			})

			it('should push a new TimeNode object successfully', function(){
				var start = new Date(2015,3,18,0,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);

				var heap = eTimeHeap.newTimeHeap();
				heap.push(node);
				expect(heap.length).toEqual(1);
				expect(heap.cache).toEqual(heap.timeList);
			});

			it('should push a new TimeNode object successfully and sort heap to push item with highest points to top of heap', function(){
				var start = new Date(2015,3,18,0,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				
				var heap = eTimeHeap.newTimeHeap();
				heap.push(node);

				start = new Date(2015,3,18,9,0,0);
				end = new Date(2015,3,18,10,0,0);
				node = eTimeHeap.newTimeNode(start,end);
				heap.push(node);

				expect(heap.length).toEqual(2);
				expect(heap.cache).toEqual(heap.timeList);
				expect(heap.timeList[0].getScore()).toEqual(ePointFake.calPoint(9) * 60);
				expect(heap.timeList[1].getScore()).toEqual(0);
			});

			it('should return length of timeList is 1 if push first item is a TimeNode object and second is not TimeNode object', function(){
				var start = new Date(2015,3,18,0,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				
				var heap = eTimeHeap.newTimeHeap();
				heap.push(node);
				heap.push('3');

				expect(heap.length).toEqual(1);
				expect(heap.cache).toEqual(heap.timeList);
				expect(heap.timeList[0].getScore()).toEqual(0);
			});

			it('should return length of timeList is 0 if all items that are not TimeNode object', function(){
				var heap = eTimeHeap.newTimeHeap();
				heap.push(1);
				heap.push('345');
				heap.push({});
				heap.push({start: 360});
				heap.push({start: 360, end: 720});

				expect(heap.length).toEqual(0);
				expect(heap.cache).toEqual(null);
			});

			it('should return length of timeList is 0 if item has all properties of TimeNode object but is not TimeNode object', function(){
				var heap = eTimeHeap.newTimeHeap();
				heap.push({start: 360, end: 720, score: 3600});

				expect(heap.length).toEqual(0);
				expect(heap.cache).toEqual(null);
			});

			it('should push more than two items successfully and sort heap to push item with highest points to top of heap', function(){
				var start = new Date(2015,3,18,0,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				
				var heap = eTimeHeap.newTimeHeap();
				heap.push(node);

				start = new Date(2015,3,18,9,0,0);
				end = new Date(2015,3,18,10,0,0);
				node = eTimeHeap.newTimeNode(start,end);
				heap.push(node);

				start = new Date(2015,3,18,8,0,0);
				end = new Date(2015,3,18,10,0,0);
				node = eTimeHeap.newTimeNode(start,end);
				heap.push(node);

				start = new Date(2015,3,18,8,0,0);
				end = new Date(2015,3,18,9,30,0);
				node = eTimeHeap.newTimeNode(start,end);
				heap.push(node);

				expect(heap.length).toEqual(4);
				expect(heap.cache).toEqual(heap.timeList);
				expect(heap.timeList[0].getScore()).toEqual(ePointFake.calPoint(9) * 120);
				expect(heap.timeList[1].getScore()).toEqual(ePointFake.calPoint(9) * 90);
				expect(heap.timeList[2].getScore()).toEqual(ePointFake.calPoint(9) * 60);
				expect(heap.timeList[3].getScore()).toEqual(0);
			});
			
			it('should not has null item or undefined item or item that is not TimeNode object in timeList', function(){
				var start = new Date(2015,3,18,0,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				var heap = eTimeHeap.newTimeHeap();
				heap.push(node);
				start = new Date(2015,3,18,9,0,0);
				end = new Date(2015,3,18,10,0,0);
				node = eTimeHeap.newTimeNode(start,end);
				heap.push(node);
				heap.push({});
				heap.push(3);
				heap.push('abc');

				for(var i=0; i<heap.timeList.length; i++){
					expect(heap.timeList[i] != null).toBe(true);
					expect(heap.timeList[i] != undefined).toBe(true);
					expect(heap.timeList[i].hasOwnProperty('start')).toBe(true);
					expect(heap.timeList[i].hasOwnProperty('end')).toBe(true);
					expect(heap.timeList[i].hasOwnProperty('score')).toBe(true);
					expect(heap.timeList[i].hasOwnProperty('getStart')).toBe(true);
					expect(heap.timeList[i].hasOwnProperty('getEnd')).toBe(true);
					expect(heap.timeList[i].hasOwnProperty('getScore')).toBe(true);
				}
			});	

			it('should update cache and length property immediately after push each new item', function(){
				var start = new Date(2015,3,18,0,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				var heap = eTimeHeap.newTimeHeap();
				heap.push(node);
				expect(heap.cache != null).toBe(true);
				var prevCache = angular.copy(heap.cache);

				start = new Date(2015,3,18,9,0,0);
				end = new Date(2015,3,18,10,0,0);
				node = eTimeHeap.newTimeNode(start,end);
				heap.push(node);
				expect(heap.cache.length == prevCache.length + 1).toBe(true);
				prevCache = angular.copy(heap.cache);

				start = new Date(2015,3,18,8,0,0);
				end = new Date(2015,3,18,7,0,0);
				node = eTimeHeap.newTimeNode(start,end);
				heap.push(node);
				expect(heap.cache.length == prevCache.length + 1).toBe(true);
			});

			/* POP */
			it('should return exact item that is pushed then pop immediately', function(){
				var start = new Date(2015,3,18,0,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				
				var heap = eTimeHeap.newTimeHeap();
				heap.push(node);
				var item = heap.pop(node);

				expect(item).toEqual(node);
				expect(heap.length).toEqual(0);
			});

			it('should not change cache property when pop and only change when push', function(){
				var start = new Date(2015,3,18,0,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				var heap = eTimeHeap.newTimeHeap();
				heap.push(node);

				expect(heap.cache != null).toBe(true);
				var prevCache = angular.copy(heap.cache);
				var item = heap.pop();
				expect(heap.cache).toEqual(prevCache);
			});

			it('should return length property is equal to length of timeList after each popping', function(){
				var start = new Date(2015,3,18,0,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				
				var heap = eTimeHeap.newTimeHeap();
				heap.push(node);
				var item = heap.pop(node);

				expect(item).toEqual(node);
				expect(heap.length).toEqual(heap.timeList.length);
			});

			it('should return length property of TimeHeap is less than 0 and top is undefined when pop before push items to empty timeList', function(){
				var heap = eTimeHeap.newTimeHeap();
				var item = heap.pop();

				expect(item).toEqual(undefined);
				expect(heap.length).toEqual(-1);
			});

			it('should return length property of TimeHeap is less than 0 and top is undefined when continue popping but timeList is empty now', function(){
				var start = new Date(2015,3,18,0,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				var heap = eTimeHeap.newTimeHeap();
				heap.push(node);

				var item = heap.pop(node);
				var item = heap.pop(node);
				var item = heap.pop(node);

				expect(item).toEqual(undefined);
				expect(heap.length).toEqual(-2);
			});

			it('should return a TimeNode object after pop', function(){
				var start = new Date(2015,3,18,0,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				var heap = eTimeHeap.newTimeHeap();
				heap.push(node);
				var item = heap.pop();

				expect(item.hasOwnProperty('start')).toBe(true);
				expect(item.hasOwnProperty('end')).toBe(true);
				expect(item.hasOwnProperty('score')).toBe(true);
				expect(item.hasOwnProperty('getStart')).toBe(true);
				expect(item.hasOwnProperty('getEnd')).toBe(true);
				expect(item.hasOwnProperty('getScore')).toBe(true);
				expect(item.hasOwnProperty('setStart')).toBe(true);
				expect(item.hasOwnProperty('setEnd')).toBe(true);
				expect(item.hasOwnProperty('setScore')).toBe(true);
				expect(heap.length).toEqual(0);
			});

			it('should return a TimeNode object with highest score after pop', function(){
				var start = new Date(2015,3,18,0,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				var heap = eTimeHeap.newTimeHeap();
				heap.push(node);
				start = new Date(2015,3,18,9,0,0);
				end = new Date(2015,3,18,10,0,0);
				node = eTimeHeap.newTimeNode(start,end);
				heap.push(node);
				start = new Date(2015,3,18,8,0,0);
				end = new Date(2015,3,18,10,0,0);
				node = eTimeHeap.newTimeNode(start,end);
				heap.push(node);
				start = new Date(2015,3,18,8,0,0);
				end = new Date(2015,3,18,9,30,0);
				node = eTimeHeap.newTimeNode(start,end);
				heap.push(node);

				var max = heap.timeList[0];
				var item = heap.pop();
				expect(item).toEqual(max);
			});

			it('should sort timeList after each popping and current top is TimeNode object that has highest points', function(){
				var start = new Date(2015,3,18,0,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				var heap = eTimeHeap.newTimeHeap();
				heap.push(node);
				start = new Date(2015,3,18,9,0,0);
				end = new Date(2015,3,18,10,0,0);
				node = eTimeHeap.newTimeNode(start,end);
				heap.push(node);
				start = new Date(2015,3,18,8,0,0);
				end = new Date(2015,3,18,10,0,0);
				node = eTimeHeap.newTimeNode(start,end);
				heap.push(node);

				var item = heap.pop();
				
				expect(heap.timeList[0]).toEqual(heap.cache[2]);
				expect(heap.timeList[1]).toEqual(heap.cache[1]);
				expect(heap.timeList[0] >= heap.timeList[1]).toBe(true);
			});

			it('should remove an item completely after each popping', function(){
				var start = new Date(2015,3,18,0,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				var heap = eTimeHeap.newTimeHeap();
				heap.push(node);
				start = new Date(2015,3,18,9,0,0);
				end = new Date(2015,3,18,10,0,0);
				node = eTimeHeap.newTimeNode(start,end);
				heap.push(node);

				var prevTop = heap.timeList[0];
				var item = heap.pop();

				expect(heap.timeList.length).toBe(1);
				expect(heap.timeList.length).toEqual(heap.length);
				expect(heap.timeList.indexOf(prevTop)).toBe(-1);
			});

			//getTop & getLength
			it('should return correct length of timeList and length property of an TimeHeap object', function(){
				var start = new Date(2015,3,18,0,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				var heap = eTimeHeap.newTimeHeap();
				heap.push(node);

				expect(heap.getLength()).toEqual(heap.length);
				expect(heap.getLength()).toEqual(heap.timeList.length);
			});

			it('should get top item that is TimeNode', function(){
				var start = new Date(2015,3,18,0,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				var heap = eTimeHeap.newTimeHeap();
				heap.push(node);
				start = new Date(2015,3,18,9,0,0);
				end = new Date(2015,3,18,10,0,0);
				node = eTimeHeap.newTimeNode(start,end);
				heap.push(node);

				var top = heap.getTop();
				expect(top != null).toBe(true);
				expect(top.hasOwnProperty('start')).toBe(true);
				expect(top.hasOwnProperty('end')).toBe(true);
				expect(top.hasOwnProperty('score')).toBe(true);
				expect(top.hasOwnProperty('getStart')).toBe(true);
				expect(top.hasOwnProperty('getEnd')).toBe(true);
				expect(top.hasOwnProperty('getScore')).toBe(true);
			});

			it('should get top item of timeList that is TimeNode with highest points', function(){
				var start = new Date(2015,3,18,0,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				var heap = eTimeHeap.newTimeHeap();
				heap.push(node);
				start = new Date(2015,3,18,9,0,0);
				end = new Date(2015,3,18,10,0,0);
				node = eTimeHeap.newTimeNode(start,end);
				heap.push(node);

				expect(heap.getTop()).toEqual(heap.timeList[0]);
				expect(heap.getTop().getScore() >= heap.timeList[1].getScore()).toBe(true);
			});

			it('should only get top item of timeList and does not change anything of timeList and TimeHeap object', function(){
				var start = new Date(2015,3,18,0,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				var heap = eTimeHeap.newTimeHeap();
				heap.push(node);

				var top = heap.getTop();
				expect(heap.length).toBe(1);
				expect(heap.timeList.length).toBe(1);
				expect(heap.cache).toEqual(heap.timeList);
			});

			it('should return same top item when getTop many times but return new top item after each popping', function(){
				var start = new Date(2015,3,18,0,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				var heap = eTimeHeap.newTimeHeap();
				heap.push(node);

				for(var i=0 ;i<3; i++){ 
					var top = heap.getTop();
					expect(heap.length).toBe(1);
					expect(heap.timeList.length).toBe(1);
					expect(heap.timeList.length).toBe(1);
					expect(top).toEqual(heap.timeList[0]);
				}

				var item = heap.pop();
				var top = heap.getTop();
				expect(top).toEqual(undefined);
			});

			//backUp function
			it('should back up all items of timeList like before using popping at the first time', function(){
				var start = new Date(2015,3,18,0,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				var heap = eTimeHeap.newTimeHeap();
				heap.push(node);

				var prevHeap = angular.copy(heap);
				var item = heap.pop();

				expect(heap.cache).toEqual(prevHeap.timeList);
				heap.backUp();
				expect(heap.timeList).toEqual(prevHeap.timeList);
				expect(heap.length).toEqual(prevHeap.length);
			});

			it('should return all items of timeList are TimeNode objects', function(){
				var start = new Date(2015,3,18,0,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = eTimeHeap.newTimeNode(start,end);
				var heap = eTimeHeap.newTimeHeap();
				heap.push(node);

				start = new Date(2015,3,18,9,0,0);
				end = new Date(2015,3,18,10,0,0);
				node = eTimeHeap.newTimeNode(start,end);
				heap.push(node);

				start = new Date(2015,3,18,8,0,0);
				end = new Date(2015,3,18,10,0,0);
				node = eTimeHeap.newTimeNode(start,end);
				heap.push(node);

				heap.pop();
				heap.pop();
				heap.backUp();

				for(var i=0 ;i<heap.cache.length; i++){
					expect(heap.timeList[i].hasOwnProperty('start')).toBe(true);
					expect(heap.timeList[i].hasOwnProperty('end')).toBe(true);
					expect(heap.timeList[i].hasOwnProperty('score')).toBe(true);
					expect(heap.timeList[i].hasOwnProperty('getStart')).toBe(true);
					expect(heap.timeList[i].hasOwnProperty('getEnd')).toBe(true);
					expect(heap.timeList[i].hasOwnProperty('getScore')).toBe(true);
				}
			});
		});

		describe('MaxNode', function(){
			it('should return TimeNode object when pass an array has an item is TimeNode object and an item is not TimeNode object', function(){
				var array = [];
				array.push( {start: new Date(2015,3,20), end: new Date(2015,3,21)} );
				array.push({});
				var obj = eTimeHeap.maxNode(array);

				expect(obj != null).toBe(true);
				expect(obj != undefined).toBe(true);
				expect(obj.hasOwnProperty('start')).toBe(true);
				expect(obj.hasOwnProperty('end')).toBe(true);
				expect(obj.hasOwnProperty('score')).toBe(true);
				expect(obj.hasOwnProperty('getStart')).toBe(true);
				expect(obj.hasOwnProperty('getEnd')).toBe(true);
				expect(obj.hasOwnProperty('getScore')).toBe(true);
			});

			it('should return null when pass an array has not any item that has both of start and end properties', function(){
				var array = [];
				array.push({start: new Date()});
				array.push({});
				array.push('abc');
				array.push(3);

				var obj = eTimeHeap.maxNode(array);
				expect(obj).toBeNull();
			});

			it('should return TimeNode object with max points when pass an array only has TimeNode objects', function(){
				var start = new Date(2015,3,18,0,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = { start: start, end: end };
				var array = [];
				array.push(node);
				start = new Date(2015,3,18,9,0,0);
				end = new Date(2015,3,18,10,0,0);
				node = { start: start, end: end };
				array.push(node);
				start = new Date(2015,3,18,8,0,0);
				end = new Date(2015,3,18,10,0,0);
				node = { start: start, end: end };
				var max = eTimeHeap.newTimeNode(start,end);
				array.push(node);
				start = new Date(2015,3,18,8,0,0);
				end = new Date(2015,3,18,9,30,0);
				node = { start: start, end: end };
				array.push(node);

				var obj = eTimeHeap.maxNode(array);
				expect(obj.getStart()).toEqual(max.getStart());
				expect(obj.getEnd()).toEqual(max.getEnd());
				expect(obj.getScore()).toEqual(max.getScore());
			});

			it('should return last item when pass an array of items that have same points', function(){
				var start = new Date(2015,3,18,0,0,0);
				var end = new Date(2015,3,18,0,0,0);
				var node = { start: start, end: end };
				var array = [];
				array.push(node);
				start = new Date(2015,3,18,1,0,0);
				end = new Date(2015,3,18,2,0,0);
				node = { start: start, end: end };
				array.push(node);
				start = new Date(2015,3,18,3,0,0);
				end = new Date(2015,3,18,4,0,0);
				node = { start: start, end: end };
				array.push(node);
				var last = eTimeHeap.newTimeNode(start,end);

				var obj = eTimeHeap.maxNode(array);
				expect(obj.getStart()).toEqual(last.getStart());
				expect(obj.getEnd()).toEqual(last.getEnd());
				expect(obj.getScore()).toEqual(last.getScore());
			});

			it('should return timeNode with start is 8:59AM end is 9:59AM when pass an array of time: 8:58AM - 9:58AM; 8:59AM - 9:59AM;', function(){
				var start = new Date(2015,3,18,8,58,0);
				var end = new Date(2015,3,18,9,58,0);
				var node = { start: start, end: end };
				var array = [];
				array.push(node);
				start = new Date(2015,3,18,8,59,0);
				end = new Date(2015,3,18,9,59,0);
				node = { start: start, end: end };
				array.push(node);
				var max = eTimeHeap.newTimeNode(start,end);

				var obj = eTimeHeap.maxNode(array);
				expect(obj.getStart()).toEqual(max.getStart());
				expect(obj.getEnd()).toEqual(max.getEnd());
				expect(obj.getScore()).toEqual(max.getScore());
			});

			it('should return timeNode with start is 9:00AM end is 10:00AM when pass an array of time has 8:59AM - 9:59AM and 9:00AM - 10:00AM', function(){
				var start = new Date(2015,3,18,8,59,0);
				var end = new Date(2015,3,18,9,59,0);
				var node = { start: start, end: end };
				var array = [];
				array.push(node);
				start = new Date(2015,3,18,9,0,0);
				end = new Date(2015,3,18,10,0,0);
				node = { start: start, end: end };
				array.push(node);
				var max = eTimeHeap.newTimeNode(start,end);

				var obj = eTimeHeap.maxNode(array);
				expect(obj.getStart()).toEqual(max.getStart());
				expect(obj.getEnd()).toEqual(max.getEnd());
				expect(obj.getScore()).toEqual(max.getScore());
			});

			it('should return timeNode object with start is today when pass an array of time has today and tomorrow but they have same duration', function(){
				var today = new Date();
				today = new Date(today.setHours(0,0,0,0));
				var tomorrow = new Date();
				tomorrow = new Date(tomorrow.setDate(today.getDate()+1));

				var start = today;
				var end = today;
				var node = { start: start, end: end };
				var array = [];
				array.push(node);
				var max = eTimeHeap.newTimeNode(start,end);

				start = tomorrow;
				end = tomorrow;
				node = { start: start, end: end };

				var obj = eTimeHeap.maxNode(array);
				expect(obj.getStart()).toEqual(max.getStart());
				expect(obj.getEnd()).toEqual(max.getEnd());
				expect(obj.getScore()).toEqual(max.getScore());
			});
		});
	});
});