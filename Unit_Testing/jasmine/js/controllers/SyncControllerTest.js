/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 30/04/2015
 * type: paticular controller
 * number of tests: 12
 */

 
describe('Sync Controller', function() {
	var $controller, $rootScope, $scope, $ionicPopup;
	var eUser, eFacebook;

	beforeEach(module('MainApp.controllers.sync'));

	eUser = {
		uGmailCalendar: null
	};

	eFacebook = {
		fbSetLoginStatus: function() {},
		fbLogin: function() {},
		fbLogout: function() {},
		fbApiEvent: function() {}
	};

	beforeEach(inject(function($injector){
		$rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
		$scope = $rootScope.$new();

		$scope = {
			convertMe: function(name) {}
		}

		$controller('SyncController', {
			'$rootScope': $rootScope,
			'$scope': $scope,
			'eUser': eUser,
			'eFacebook': eFacebook,
			'$ionicPopup': $ionicPopup
		});
	}));

	xdescribe('Initialize data', function(){
		it('should set eUser.uGmailCalendar is null if user does not have any events', function(){
			expect(eUser.uGmailCalendar).toBeDefined();
			expect(eUser.uGmailCalendar).toBeNull();
		});

		it('should create $scope.allApps', function(){
			expect($scope.allApps).toBeDefined();
			expect($scope.allApps[0].title).toBe('social');
			expect($scope.allApps[0].array[0].name).toBe('facebook');
			expect($scope.allApps[0].array[0].options[0].name).toBe('Log out');
			expect($scope.allApps[0].array[0].options[1].name).toBe('Update events');
			expect($scope.allApps[1].title).toBe('calendar');
			expect($scope.allApps[1].array[0].name).toBe('local');
			expect($scope.allApps[1].array[0].options[0].name).toBe('Update events');
			expect($scope.allApps[1].array[0].options[1]).toBeUndefined();
		});

		it('should set $scope.fbEvents is []', function(){
			expect($scope.fbEvents).toBeDefined();
			expect($scope.fbEvents).toEqual([]);
		});
	});

	xdescribe('All functions', function(){
		describe('$scope.checkLoginStatus', function(){
			it('should call eFacebook.fbSetLoginStatus function when parameter is "facebook"', function(){
				spyOn(eFacebook, 'fbSetLoginStatus');
				$scope.checkLoginStatus('facebook');
				expect(eFacebook.fbSetLoginStatus).toHaveBeenCalled();
			});

			/*it('should call  when parameter is "google"', function(){
				$scope.checkLoginStatus('google');
			});*/
		});

		describe('$scope.checkFBLoginStatus', function(){
			it('should call $scope.checkLoginStatus function', function(){
				spyOn($scope, 'checkLoginStatus');
				$scope.checkFBLoginStatus();
				expect($scope.checkLoginStatus).toHaveBeenCalled();
			});
		});

		describe('$scope.login', function(){
			it('should call eFacebook.fbLogin function when parameter is "facebook"', function(){
				spyOn(eFacebook, 'fbLogin');
				$scope.login('facebook');
				expect(eFacebook.fbLogin).toHaveBeenCalled();
			});

			/*it('should call when parameter is "google"', function(){
				$scope.login('google');
			});*/
		});

		describe('$scope.logout', function(){
			it('should call eFacebook.fbLogout and eFacebook.fbSetLoginStatus functions when parameter is "facebook"', function(){
				spyOn(eFacebook, 'fbLogout');
				spyOn(eFacebook, 'fbSetLoginStatus');
				$scope.logout('facebook');
				expect(eFacebook.fbLogout).toHaveBeenCalled();
				expect(eFacebook.fbSetLoginStatus).toHaveBeenCalled();
			});

			/*it('should call when parameter is "google"', function(){
				$scope.logout('google');
			});*/
		});

		describe('$scope.updateEvents', function(){
			it('should call eFacebook.fbApiEvent and $scope.convertMe functions when parameter is "facebook"', function(){
				spyOn(eFacebook, 'fbApiEvent');
				$scope.updateEvents('facebook');
				expect(eFacebook.fbApiEvent).toHaveBeenCalled();

				spyOn($scope, 'convertMe');
				$scope.updateEvents('facebook');
				expect($scope.convertMe).toHaveBeenCalled();
			});

			/*it('should call when parameter is "local"', function(){
				$scope.login('local');
			});*/

			/*it('should call when parameter is "google"', function(){
				$scope.login('google');
			});*/
		});

		describe('$scope.convertMe', function(){

		});
	});
});