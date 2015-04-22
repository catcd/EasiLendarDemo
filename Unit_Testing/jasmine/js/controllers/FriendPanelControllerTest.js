/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 17/4/2015
 * type: friend panel controller
 */

/** Test for:
  * sortAZ function
  * filter
  */

describe('Friend Panel', function() {
	beforeEach(module('MainApp.controllers.sideMenu.friendPanel'));

	var $controller, $rootScope, $scope, $filter, $ionicScrollDelegate;

	beforeEach(inject(function($injector){
		$rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        $filter = $injector.get('$filter');
		$scope = $rootScope.$new();
		
		$rootScope.eUser = {};
		$rootScope.eUser.uFriend = [
			{name: 'Barack Obama'}, {name: 'Kim Kardadshian'},
			{name: 'Justin Bieber'}, {name: 'Justin Timberlake'},
			{name: 'Taylor Swiff'}, {name: 'Karty Perry'},
			{name: 'Harry Potter'}, {name: 'Emma Stone'}
		];
		
		$controller('friendPanelController', 
			{'$rootScope' : $rootScope, '$scope': $scope, '$ionicScrollDelegate' : $ionicScrollDelegate}
		);
	}));
	
	xdescribe('Sort Friend', function() {
		it('should sort list of friends by name from A to Z', function() {
			var sortedList = [
				{name: 'Barack Obama'}, {name: 'Emma Stone'}, 
				{name: 'Harry Potter'}, {name: 'Justin Bieber'},
				{name: 'Justin Timberlake'}, {name: 'Karty Perry'},
				{name: 'Kim Kardadshian'}, {name: 'Taylor Swiff'}
			];

			$scope.sort('AZ');
			expect($rootScope.eUser.uFriend).toEqual(sortedList);
		});
	});

	xdescribe('Search Friend', function(){
		it('should return 0 when can not find friend', function(){
			var array = $filter('findingFriend');
			expect(array($rootScope.eUser.uFriend,'Google').length).toEqual(0);
		});

		it('should return 1 when have friend in list', function(){
			var array = $filter('findingFriend');
			expect(array($rootScope.eUser.uFriend,'Barack Obama').length).toEqual(1);
		});
	})
});