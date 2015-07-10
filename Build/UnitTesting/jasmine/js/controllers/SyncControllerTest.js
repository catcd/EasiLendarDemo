/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 30/04/2015
 * type: paticular controller
 * number of tests: 26
 */

 
describe('Sync Controller', function() {
	var $controller, $rootScope, $scope, $ionicPopup;
	var eUser, eFacebook, eSync, eToast;
	var facebookConnectPlugin;

	beforeEach(module('MainApp.controllers.sync'));

	eUser = {
		uGmailCalendar: null,
		uFacebook: null
	};

	eFacebook = {
		fbSetLoginStatus: function() {},
		fbLogin: function() {},
		fbLogout: function() {},
	};

	eSync = {};

	eToast = {
		toastSuccessOne: function(message, delay){},
		toastInfo: function(message, delay){}
	};

	beforeEach(inject(function($injector){
		$rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
		$scope = $rootScope.$new();

		$controller('SyncController', {
			'$rootScope': $rootScope,
			'$scope': $scope,
			'eUser': eUser,
			'eFacebook': eFacebook,
			'$ionicPopup': $ionicPopup,
			'eSync': eSync,
			'eToast': eToast
		});
	}));

	describe('Initialize data', function(){
		it('should set eUser.uGmailCalendar is null if user does not have any events', function(){
			expect(eUser.uGmailCalendar).toBeDefined();
			expect(eUser.uGmailCalendar).toBeNull();
		});

		it('should set eUser.uFacebook is null if user does not have any events', function(){
			expect(eUser.uFacebook).toBeDefined();
			expect(eUser.uFacebook).toBeNull();
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

		it('should create $scope.isShowDes is {}', function(){
			expect($scope.isShowDes).toBeDefined();
			expect($scope.isShowDes).toEqual({});
		});
	});

	describe('All functions', function(){
		describe('$scope.checkLoginStatus', function(){
			it('should call eFacebook.fbSetLoginStatus function when parameter is "facebook"', function(){
				spyOn(eFacebook, 'fbSetLoginStatus');
				$scope.checkLoginStatus('facebook');
				expect(eFacebook.fbSetLoginStatus).toHaveBeenCalled();
			});

			it('should call $scope.handleClientLoad function when parameter is "google"', function(){
				spyOn($scope, 'handleClientLoad');
				$scope.checkLoginStatus('google');
				expect($scope.handleClientLoad).toHaveBeenCalled();
			});
		});

		describe('$scope.login', function(){
			it('should call eFacebook.fbLogin function when parameter is "facebook"', function(){
				spyOn(eFacebook, 'fbLogin');
				$scope.login('facebook');
				expect(eFacebook.fbLogin).toHaveBeenCalled();
			});

			it('should call $scope.handleAuthClick function when parameter is "google"', function(){
				spyOn($scope, 'handleAuthClick');
				$scope.login('google');
				expect($scope.handleAuthClick).toHaveBeenCalled();
			});
		});

		describe('$scope.logout', function(){
			it('should call eFacebook.fbLogout and eFacebook.fbSetLoginStatus functions when parameter is "facebook"', function(){
				spyOn(eFacebook, 'fbLogout');
				$scope.logout('facebook');
				expect(eFacebook.fbLogout).toHaveBeenCalled();
			});

			it('should call $scope.logMeOut function when parameter is "google"', function(){
				spyOn($scope, 'logMeOut');
				$scope.logout('google');
				expect($scope.logMeOut).toHaveBeenCalled();
			});
		});

		describe('$scope.handleOptions', function(){
			it('should call $scope.logout function when option is logout and app is facebook', function(){
				spyOn($scope, 'logout');
				$scope.handleOptions('facebook','logout');
				expect($scope.logout).toHaveBeenCalled();
			});

			it('should call $scope.logout function when option is logout and app is google', function(){
				spyOn($scope, 'logout');
				$scope.handleOptions('google','logout');
				expect($scope.logout).toHaveBeenCalled();
			});

			it('should call $scope.updateEvents function when option is events and app is facebook', function(){
				spyOn($scope, 'updateEvents');
				$scope.handleOptions('facebook','events');
				expect($scope.updateEvents).toHaveBeenCalled();
			});

			it('should call $scope.updateEvents function when option is events and app is google', function(){
				spyOn($scope, 'updateEvents');
				$scope.handleOptions('google','events');
				expect($scope.updateEvents).toHaveBeenCalled();
			});

			it('should call $scope.updateEvents function when option is events and app is local', function(){
				spyOn($scope, 'updateEvents');
				$scope.handleOptions('local','events');
				expect($scope.updateEvents).toHaveBeenCalled();
			});
		});

		describe('$scope.updateEvents', function(){
			/*it('should call $scope.convertMe and facebookConnectPlugin.api functions when parameter is "facebook"', function(){
				spyOn(facebookConnectPlugin,'api');
				$scope.updateEvents('facebook');
				expect(facebookConnectPlugin.api).toHaveBeenCalled();
			});*/

			it('should call eToast.toastSuccessOne function when parameter is "local"', function(){
				spyOn(eToast, 'toastInfo');
				$scope.updateEvents('local');
				expect(eToast.toastInfo).toHaveBeenCalled();
			});

			it('should call $scope.makeApiCallNoBound function when parameter is "google"', function(){
				spyOn($scope, 'makeApiCallNoBound')
				$scope.updateEvents('google');
				expect($scope.makeApiCallNoBound).toHaveBeenCalled();
			});
		});

		describe('$scope.convertMe', function(){
			it('should does not do anything when $scope.fbEvents is empty array', function(){
				$scope.fbEvents = [];
				$scope.convertMe('facebook');
				expect(eUser.uFacebook).toBe(null);
			});

			it('should create eUser.uFacebook array with an object has full property', function(){
				$scope.fbEvents = [
					{start_time: new Date(2015,3,2,13), end_time: new Date(2015,3,2,17), name: 'A', place: 'A', id: '01'}
				];
				$scope.convertMe('facebook');
				expect(eUser.uFacebook != null).toBe(true);
				for(var x in eUser.uFacebook){
					expect(eUser.uFacebook[x][0].start).toBeDefined();
					expect(eUser.uFacebook[x][0].start.toString()).toBe($scope.fbEvents[0].start_time.toString());
					expect(eUser.uFacebook[x][0].end).toBeDefined();
					expect(eUser.uFacebook[x][0].end.toString()).toBe($scope.fbEvents[0].end_time.toString());
					expect(eUser.uFacebook[x][0].summary).toBeDefined();
					expect(eUser.uFacebook[x][0].summary).toBe($scope.fbEvents[0].name);
					expect(eUser.uFacebook[x][0].location).toBeDefined();
					expect(eUser.uFacebook[x][0].location).toBe($scope.fbEvents[0].place);
					expect(eUser.uFacebook[x][0].id).toBeDefined();
					expect(eUser.uFacebook[x][0].id).toBe($scope.fbEvents[0].id);
					expect(eUser.uFacebook[x][0].src).toBeDefined();
					expect(eUser.uFacebook[x][0].src).toBe('facebook');
					expect(eUser.uFacebook[x][0].position).toBeDefined();
					expect(eUser.uFacebook[x][0].position.toString()).toBe( (new Date(2015,3,2,0,0,0,0)).toString() );
					expect(eUser.uFacebook[x][0].colorID).toBeDefined();
					expect(eUser.uFacebook[x][0].colorID).toBe(0);
					expect(eUser.uFacebook[x][0].status).toBeDefined();
					expect(eUser.uFacebook[x][0].status).toBe(true);
				}
			});

			it("should create eUser.uFacebook array with 2 objects has full property when event's duration is more then one day", function(){
				$scope.fbEvents = [
					{start_time: new Date(2015,3,2,13), end_time: new Date(2015,3,3,13), name: 'A', place: 'A', id: '01'}
				];
				$scope.convertMe('facebook');
				expect(eUser.uFacebook != null).toBe(true);
				var i = 0;
				for(var x in eUser.uFacebook){
					if(i == 0){
						expect(eUser.uFacebook[x][0].start).toBeDefined();
						expect(eUser.uFacebook[x][0].start.toString()).toBe($scope.fbEvents[0].start_time.toString());
						expect(eUser.uFacebook[x][0].end).toBeDefined();
						expect(eUser.uFacebook[x][0].end.toString()).toBe( (new Date(2015,3,3,0,0,0,0)).toString() );
						expect(eUser.uFacebook[x][0].summary).toBeDefined();
						expect(eUser.uFacebook[x][0].summary).toBe($scope.fbEvents[0].name);
						expect(eUser.uFacebook[x][0].location).toBeDefined();
						expect(eUser.uFacebook[x][0].location).toBe($scope.fbEvents[0].place);
						expect(eUser.uFacebook[x][0].id).toBeDefined();
						expect(eUser.uFacebook[x][0].id).toBe($scope.fbEvents[0].id);
						expect(eUser.uFacebook[x][0].src).toBeDefined();
						expect(eUser.uFacebook[x][0].src).toBe('facebook');
						expect(eUser.uFacebook[x][0].position).toBeDefined();
						expect(eUser.uFacebook[x][0].position.toString()).toBe( (new Date(2015,3,2,0,0,0,0)).toString() );
						expect(eUser.uFacebook[x][0].colorID).toBeDefined();
						expect(eUser.uFacebook[x][0].colorID).toBe(0);
						expect(eUser.uFacebook[x][0].status).toBeDefined();
						expect(eUser.uFacebook[x][0].status).toBe(true);
					}

					else{
						expect(eUser.uFacebook[x][0].start).toBeDefined();
						expect(eUser.uFacebook[x][0].start.toString()).toBe( (new Date(2015,3,3,0,0,0,0)).toString() );
						expect(eUser.uFacebook[x][0].end).toBeDefined();
						expect(eUser.uFacebook[x][0].end.toString()).toBe($scope.fbEvents[0].end_time.toString());
						expect(eUser.uFacebook[x][0].summary).toBeDefined();
						expect(eUser.uFacebook[x][0].summary).toBe($scope.fbEvents[0].name);
						expect(eUser.uFacebook[x][0].location).toBeDefined();
						expect(eUser.uFacebook[x][0].location).toBe($scope.fbEvents[0].place);
						expect(eUser.uFacebook[x][0].id).toBeDefined();
						expect(eUser.uFacebook[x][0].id).toBe($scope.fbEvents[0].id);
						expect(eUser.uFacebook[x][0].src).toBeDefined();
						expect(eUser.uFacebook[x][0].src).toBe('facebook');
						expect(eUser.uFacebook[x][0].position).toBeDefined();
						expect(eUser.uFacebook[x][0].position.toString()).toBe( (new Date(2015,3,3,0,0,0,0)).toString() );
						expect(eUser.uFacebook[x][0].colorID).toBeDefined();
						expect(eUser.uFacebook[x][0].colorID).toBe(0);
						expect(eUser.uFacebook[x][0].status).toBeDefined();
						expect(eUser.uFacebook[x][0].status).toBe(true);
					}

					i++;
				}
			})
		});

		describe('$scope.toggleFunc', function(){
			/*it('should call facebookConnectPlugin.getLoginStatus function when parameter is "facebook"', function(){
				spyOn(facebookConnectPlugin,'getLoginStatus');
				$scope.toggleFunc('facebook');
				expect(facebookConnectPlugin.getLoginStatus).toHaveBeenCalled();
			});*/

			/*it('should call $scope.checkLoginStatus function when parameter is "google"', function(){
				spyOn($scope, 'checkLoginStatus');
				$scope.toggleFunc('google');
				expect($scope.checkLoginStatus).toHaveBeenCalled();
			});*/
		});

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