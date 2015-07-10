/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 09/05/2015
 * type: unit test for algorithm services
 * test: 34 specs
 */

// load the module.
beforeEach(module('MainApp.shareds.algorithm'));

describe('ePoint service test', function() {
	var ePoint;

	// excuted before each "it" is run.
	beforeEach(function() {
		// inject your service for testing.
		// The _underscores_ are a convenience thing
		// so you can have your variable name be the
		// same as your injected service.
		inject(function(_ePoint_) {
			ePoint = _ePoint_;
		});
	});

	describe('case 1 normal return 0', function() {
		it('mHour = 0 should return 0', function() {
			var point = ePoint.calPoint(0);

			expect(point).toEqual(0);
		});

		it('mHour = 1 should return 0', function() {
			var point = ePoint.calPoint(1);

			expect(point).toEqual(0);
		});

		it('mHour = 2 should return 0', function() {
			var point = ePoint.calPoint(2);

			expect(point).toEqual(0);
		});

		it('mHour = 3 should return 0', function() {
			var point = ePoint.calPoint(3);

			expect(point).toEqual(0);
		});

		it('mHour = 4 should return 0', function() {
			var point = ePoint.calPoint(4);

			expect(point).toEqual(0);
		});

		it('mHour = 5 should return 0', function() {
			var point = ePoint.calPoint(5);

			expect(point).toEqual(0);
		});
	});

	describe('case 2 normal return 15', function() {
		it('mHour = 6 should return 15', function() {
			var point = ePoint.calPoint(6);

			expect(point).toEqual(15);
		});

		it('mHour = 7 should return 15', function() {
			var point = ePoint.calPoint(7);

			expect(point).toEqual(15);
		});
	});

	describe('case 3 normal return 30', function() {
		it('mHour = 8 should return 30', function() {
			var point = ePoint.calPoint(8);

			expect(point).toEqual(30);
		});

		it('mHour = 9 should return 30', function() {
			var point = ePoint.calPoint(9);

			expect(point).toEqual(30);
		});

		it('mHour = 10 should return 30', function() {
			var point = ePoint.calPoint(10);

			expect(point).toEqual(30);
		});
	});

	describe('case 4 normal return 20', function() {
		it('mHour = 11 should return 20', function() {
			var point = ePoint.calPoint(11);

			expect(point).toEqual(20);
		});

		it('mHour = 12 should return 20', function() {
			var point = ePoint.calPoint(12);

			expect(point).toEqual(20);
		});

		it('mHour = 13 should return 20', function() {
			var point = ePoint.calPoint(13);

			expect(point).toEqual(20);
		});
	});

	describe('case 5 normal return 50', function() {
		it('mHour = 14 should return 50', function() {
			var point = ePoint.calPoint(14);

			expect(point).toEqual(50);
		});

		it('mHour = 15 should return 50', function() {
			var point = ePoint.calPoint(15);

			expect(point).toEqual(50);
		});

		it('mHour = 16 should return 50', function() {
			var point = ePoint.calPoint(16);

			expect(point).toEqual(50);
		});
	});

	describe('case 6 normal return 20', function() {
		it('mHour = 17 should return 20', function() {
			var point = ePoint.calPoint(17);

			expect(point).toEqual(20);
		});

		it('mHour = 18 should return 20', function() {
			var point = ePoint.calPoint(18);

			expect(point).toEqual(20);
		});

		it('mHour = 19 should return 20', function() {
			var point = ePoint.calPoint(19);

			expect(point).toEqual(20);
		});
	});

	describe('case 7 normal return 15', function() {
		it('mHour = 20 should return 15', function() {
			var point = ePoint.calPoint(20);

			expect(point).toEqual(15);
		});

		it('mHour = 21 should return 15', function() {
			var point = ePoint.calPoint(21);

			expect(point).toEqual(15);
		});

		it('mHour = 22 should return 15', function() {
			var point = ePoint.calPoint(22);

			expect(point).toEqual(15);
		});

		it('mHour = 23 should return 15', function() {
			var point = ePoint.calPoint(23);

			expect(point).toEqual(15);
		});
	});

	describe('wrong case that return 0', function() {
		it('mHour < 0 should return 0', function() {
			var point = ePoint.calPoint(0);

			expect(point).toEqual(0);
		});

		it('mHour > 23 should return 0', function() {
			var point = ePoint.calPoint(24);

			expect(point).toEqual(0);
		});

		it('mHour is string should return 0', function() {
			var point = ePoint.calPoint('cat');

			expect(point).toEqual(0);
		});

		it('mHour is double should return 0', function() {
			var point = ePoint.calPoint(1.5);

			expect(point).toEqual(0);
		});

		it('mHour is array should return 0', function() {
			var point = ePoint.calPoint([]);

			expect(point).toEqual(0);
		});

		it('mHour is char should return 0', function() {
			var point = ePoint.calPoint('a');

			expect(point).toEqual(0);
		});

		it('mHour is object should return 0', function() {
			var point = ePoint.calPoint({});

			expect(point).toEqual(0);
		});

		it('mHour is Boolean should return 0', function() {
			var point = ePoint.calPoint(true);

			expect(point).toEqual(0);
		});

		it('mHour is undefiend should return 0', function() {
			var x;
			var point = ePoint.calPoint(x);

			expect(point).toEqual(0);
		});

		it('mHour is null should return 0', function() {
			var point = ePoint.calPoint(null);

			expect(point).toEqual(0);
		});
	});
});