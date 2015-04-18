/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 18/04/2015
 * type: popover controller unit test
 */
xdescribe('Popover for notification', function() {
	beforeEach(module('MainApp.controllers.popover'));
	var $controller, $rootScope, $scope;

	beforeEach(inject(function($injector) {
		$rootScope = $injector.get('$rootScope');
		$controller = $injector.get('$controller');
		$scope = $rootScope.$new();

		$controller('PopOverController', {
			'$rootScope': $rootScope,
			'$scope': $scope
		});
	}));

	describe('Initialize search data', function() {
		it('should define popup status', function() {
			var status = $scope.mPopoverStatus;
			expect(status).toBeDefined();
		});
		it('status[true] and status[false] must be correct', function() {
			var status = $scope.mPopoverStatus;
			expect(status[true]).toEqual("active");
			expect(status[false]).toEqual("");
		});
		it('should define popover active as defalt equal to ""', function() {
			var active = $scope.mPopoverActive;
			expect(active).toBeDefined();
			expect(active).toEqual("");
		});
	});
});
