/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 10/05/2015
 * type: paticular controller
 * number of tests: 6
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

			expect($scope.allSites[1].name).toBe('twitter');
			expect($scope.allSites[1].options[0].id).toBe('share');
			expect($scope.allSites[1].options[1].id).toBe('send');
			expect($scope.allSites[1].options[2].id).toBe('logout');
			expect($scope.allSites[1].options[0].name).toBe('Share');
			expect($scope.allSites[1].options[1].name).toBe('Send message');
			expect($scope.allSites[1].options[2].name).toBe('Logout');

			expect($scope.allSites[2].name).toBe('gmail');
			expect($scope.allSites[2].options[0].id).toBe('send');
			expect($scope.allSites[2].options[1].id).toBe('logout');
			expect($scope.allSites[2].options[0].name).toBe('Send mail');
			expect($scope.allSites[2].options[1].name).toBe('Logout');

			expect($scope.allSites[3].name).toBe('sms');
			expect($scope.allSites[3].options[0].id).toBe('send');
			expect($scope.allSites[3].options[0].name).toBe('Send sms');
		});

		it('should create $scope.isShowDes is {}', function(){
			expect($scope.isShowDes).toBeDefined();
			expect($scope.isShowDes).toEqual({});
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

		describe('$scope.isShow', function(){
			it('should call return false if $scope.isShowDes[name] is false', function(){
				var name = 'facebook';
				$scope.isShowDes['facebook'] = false;
				expect($scope.isShow(name)).toBe(false);
			});

			it('should call return false if $scope.isShowDes[name] is {}', function(){
				var name = 'facebook';
				$scope.isShowDes = {};
				expect($scope.isShow(name)).toBe(false);
			});

			it('should call return false if $scope.isShowDes[name] is true', function(){
				var name = 'facebook';
				$scope.isShowDes['facebook'] = true;
				expect($scope.isShow(name)).toBe(true);
			});
		});
	});
});