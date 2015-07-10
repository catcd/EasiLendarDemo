/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * everyone can update in assigned time
 * last update: 22/04/2015
 * type: about controller (version)
 * test: 2
 */

describe('Test About controller', function() {
	beforeEach(module('MainApp.controllers.about'));
	var $controller, $rootScope;

	beforeEach(inject(function($injector) {
		$rootScope = $injector.get('$rootScope');
		$controller = $injector.get('$controller');
		$scope = $rootScope.$new();

		$controller('AboutController', {
			'$rootScope': $rootScope,
			'$scope': $scope
		});
	}));

	describe('Initialize version data', function() {
		it('should create $scope.ver', function() {
			var ver = $scope.ver;

			expect(ver).toBeDefined();
		});

		it('$scope.ver should be the format 1.1.1.[1]', function() {
			var ver = $scope.ver;

			// convert to array
			var arr = ver.split(".");

			// convert to number
			var num = [];
			num[0] = parseInt(arr[0]);
			num[1] = parseInt(arr[1]);
			num[2] = parseInt(arr[2]);
			num[3] = parseInt(arr[3].substr(1, arr[3].length-2));

			// get '[' and ']'
			var open = arr[3].charAt(0);
			var close = arr[3].charAt(arr[3].length-1);

			// test
			expect(arr.length).toEqual(4);
			expect(num[0]).toBeDefined();
			expect(num[1]).toBeDefined();
			expect(num[2]).toBeDefined();
			expect(num[3]).toBeDefined();

			expect(open).toEqual('[');
			expect(close).toEqual(']');
		});
	});
});
