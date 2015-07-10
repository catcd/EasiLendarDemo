/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 25/04/2015
 * type: side menu unit test
 * test: 1
 */

describe('Side menu Controller test', function() {
	var $controller, $rootScope, $scope,
		$ionicSideMenuDelegate,
		eUser, eDatabase;

	// inject module
	beforeEach(module('MainApp.controllers.sideMenu'));

	// fake services
	var $ionicSideMenuDelegate = {
		toggleLeft: function() {},
	};

	// execuse before each it
	beforeEach(inject(function(_$rootScope_, _$controller_) {
		$rootScope = _$rootScope_;
		$controller = _$controller_;
		$scope = $rootScope.$new();

		$controller('sideMenuController', {
			'$rootScope': $rootScope,
			'$scope': $scope,
			'$ionicSideMenuDelegate': $ionicSideMenuDelegate,
			'eUser': eUser,
			'eDatabase': eDatabase,
		});
	}));

	describe('toggleLeft funcion', function() {
		it('should call $ionicSideMenuDelegate.toggleLeft when toggleLeft', function() {
			// create spy
			spyOn($ionicSideMenuDelegate, 'toggleLeft');

			// toggleLeft
			$scope.toggleLeft();

			expect($ionicSideMenuDelegate.toggleLeft).toHaveBeenCalled();
		});
	});
});
