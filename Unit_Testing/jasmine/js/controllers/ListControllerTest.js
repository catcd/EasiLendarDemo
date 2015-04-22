/**
 * starter: Can Duy Cat
 * owner: Nguo Duc Dung
 * last uptoDay: 17/04/2015
 * type: list controller
 */

/** Test for:
  * buildNextMonth function
  * buildPrevMonth function
  */

/*describe('List Calendar', function() {
	beforeEach(module('MainApp.controllers.list'));

	var $controller, $rootScope, $scope, $ionicScrollDelegate;

	beforeEach(inject(function($injector){
		$rootScope = $injector.get('$rootScope');
		$controller = $injector.get('$controller');
		$scope = $rootScope.$new();
		
		$rootScope.eUser = {};
		$rootScope.eUser.uGmailCalendar = null;

		$controller('ListController', 
			{'$rootScope' : $rootScope, '$scope': $scope, '$ionicScrollDelegate' : $ionicScrollDelegate}
		);
	}));

	describe('Build next month', function(){
		it('should build an array of all days in a month', function(){
			$scope.allMonths = [];
			var toDay = new Date(2015,3,17);
			$scope.buildNextMonth(toDay);
			expect($scope.allMonths[0].weeks[16]).toEqual(toDay);
		});

		it('should set events property is false if month does not have any event', function(){
			$scope.allMonths = [];
			var toDay = new Date(2015,3,17);
			$scope.buildNextMonth(toDay);

			expect($scope.allMonths[0].events).toEqual(false);
		})
	});

	describe('Build previous month', function(){
		it('should build an array of all days in a month', function(){
			$scope.allMonths = [];
			var toDay = new Date(2015,3,17);
			$scope.buildNextMonth(toDay);

			$scope.buildPrevMonth($scope.allMonths[0].first);
			expect($scope.allMonths[0].weeks[30]).toEqual(new Date(2015,3,0));
		});

		it('should set events property is false if month does not have any event', function(){
			$scope.allMonths = [];
			var toDay = new Date(2015,3,17);
			$scope.buildNextMonth(toDay);

			$scope.buildPrevMonth($scope.allMonths[0].first);
			expect($scope.allMonths[0].events).toEqual(false);
		})
	});
});
*/