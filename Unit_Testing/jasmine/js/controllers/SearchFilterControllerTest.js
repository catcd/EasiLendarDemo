/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 17/04/2015
 * type: paticular controller
 */

/** Test for:
  * convertToMinute function
  * deleteValue function
  */

/*describe('Search Filter', function(){
	beforeEach(module('MainApp.controllers.searchFilter'));

	var $controller, $rootScope, $scope;

	beforeEach(inject(function(_$rootScope_, _$controller_){
		$rootScope = _$rootScope_;
		$controller = _$controller_;
		$scope = $rootScope.$new();

		$rootScope.eSearchFilter = {};
		$rootScope.eSettings = {};
			
		$controller('SearchFilterController', 
			{'$rootScope': $rootScope, '$scope': $scope}
		);
	}));

	describe('Convert to minute', function(){
		it('should return correct minute when pass valid hours and minutes', function(){
			$scope.timeValues = {};
			$scope.timeValues.mDurationHour = 1;
			$scope.timeValues.mDurationMinute = 30;

			$scope.convertToMinute();
			expect($rootScope.eSearchFilter.mDuration).toBe(90);
		});

		it('should return undefined when pass invalid hours', function(){
			$scope.timeValues = {};
			$scope.timeValues.mDurationHour = -1;
			$scope.timeValues.mDurationMinute = 30;

			$scope.convertToMinute();
			expect($rootScope.eSearchFilter.mDuration).toBe(undefined);
		});

		it('should return undefined when pass invalid minutes', function(){
			$scope.timeValues = {};
			$scope.timeValues.mDurationHour = 1;
			$scope.timeValues.mDurationMinute = 61;

			$scope.convertToMinute();
			expect($rootScope.eSearchFilter.mDuration).toBe(undefined);
		});

		it('should return undefined when pass invalid hours and minutes', function(){
			$scope.timeValues = {};
			$scope.timeValues.mDurationHour = 25;
			$scope.timeValues.mDurationMinute = -1;
			
			$scope.convertToMinute();
			expect($rootScope.eSearchFilter.mDuration).toBe(undefined);
		});
	});
});*/