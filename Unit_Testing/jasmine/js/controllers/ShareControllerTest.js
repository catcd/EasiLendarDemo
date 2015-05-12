/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 10/05/2015
 * type: paticular controller
 * number of tests: 2
 */

describe('Share Controller', function() {
	var $controller, $rootScope, $scope, $ionicPopup;
	var eUser, eFacebook, eToast;
	var facebookConnectPlugin;

	beforeEach(module('MainApp.controllers.share'));

	eUser = {
		uGmailCalendar: null,
		uFacebook: null
	};

	eFacebook = {
		fbLogin: function() {},
		fbLogout: function() {},
		fbFeed: function() {},
		fbSend: function() {},
		fbSetLoginStatus: function() {}
	};

	facebookConnectPlugin = {
		getLoginStatus: function(){},
	};

	beforeEach(inject(function($injector){
		$rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
		$scope = $rootScope.$new();

		$controller('ShareController', {
			'$rootScope': $rootScope,
			'$scope': $scope,
			'eUser': eUser,
			'eFacebook': eFacebook,
			'$ionicPopup': $ionicPopup,
			'eToast': eToast/*,
			'facebookConnectPlugin': facebookConnectPlugin*/
		});
	}));

	describe('Initialize data', function(){
		it('should create $scope.allSites', function(){
			expect($scope.allSites).toBeDefined();
			expect($scope.allSites[0].name).toBe('facebook');
			expect($scope.allSites[0].options[0].id).toBe('share');
			expect($scope.allSites[0].options[1].id).toBe('send');
			expect($scope.allSites[0].options[2].id).toBe('logout');
			expect($scope.allSites[0].options[0].name).toBe('Share');
			expect($scope.allSites[0].options[1].name).toBe('Send message');
			expect($scope.allSites[0].options[2].name).toBe('Logout');
		});
	});

	describe('All functions', function(){
		describe('$scope.checkLoginStatus', function(){
			it("should call eFacebook.fbSetLoginStatus when app's name is facebook", function(){
				spyOn(eFacebook,'fbSetLoginStatus');
				$scope.checkLoginStatus('facebook');
				expect(eFacebook.fbSetLoginStatus).toBeDefined();
			});
		});

		/*describe('$scope.handleOptions', function(){
			it("should call facebookConnectPlugin.getLoginStatus function when site's name is facebook", function(){
				spyOn(facebookConnectPlugin,'getLoginStatus');
				$scope.handleOptions('facebook','share')
				expect(facebookConnectPlugin.getLoginStatus).toHaveBeenCalled();
			});
		});*/
	});
});