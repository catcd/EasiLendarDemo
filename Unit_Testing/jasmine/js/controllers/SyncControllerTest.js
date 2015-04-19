/**
 * starter: Can Duy Cat
 * owner: Nguyen Manh Duy
 * last update: 19/04/2015
 * type: paticular controller
 */

 
describe('Sync', function() {
	beforeEach(module('MainApp.controllers.sync'));
	var $controller, $rootScope, $scope;
	beforeEach(inject(function(_$rootScope_, _$controller_) {
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		
		$rootScope.eSettings = {sDefaultView : ""};
		$controller('SyncController', {'$rootScope' : $rootScope, '$scope': $scope });
	}));
	
	describe('gapi', function() {
		it('gapi should be defined', function(){
			expect(gapi).not.toBeUndefined();
		});
		
		it('gapi.auth should be defined', function(){
			expect(gapi.auth).not.toBeUndefined();
		});
		
		it('gapi.auth.authorize run perfectly', function(){
			var clientId = '164260242142-4er9a46uufjlu6h6hsbv3s7479mqv6pr.apps.googleusercontent.com';
			var scopes = 'https://www.googleapis.com/auth/calendar';
			
			expect(gapi.auth.authorize({
										client_id: clientId,
										scope: scopes,
										immediate: true,
										cookie_policy: 'single_host_origin'
										}, $scope.handleAuthResult)).toBeDefined());
		});
	});
	
	describe('request Google permission', function(){
		var clientId = '164260242142-4er9a46uufjlu6h6hsbv3s7479mqv6pr.apps.googleusercontent.com';
		var scopes = 'https://www.googleapis.com/auth/calendar';
		var authResult;
		
		beforeEach(function(){
			gapi.auth.authorize({
								client_id: clientId,
								scope: scopes,
								immediate: true,
								cookie_policy: 'single_host_origin'
								}, $scope.handleAuthResult);
		});
		
		it('receive token function be called', function(){
			expect($scope.handleAuthResult(authResult)).toHaveBeenCalled();
			$scope.handleAuthResult(authResult);
			if (authResult && !authResult.error) {
				expect($scope.logIN).toEqual(1);
			}
			else{
				expect($scope.logIN).toEqual(0);
			}
		});
	});
	
	describe('log out', function(){
		beforeEach(function(){
			$scope.logMeOut();
		});
		
		it('value logIN should change from 1 to 0', function(){
			expect($scope.logIN).toEqual(0);
		});
	});
	
	describe('Google Calendar data', function(){
		beforeEach(function(){
			var event= null;
			var length=0;
			$scope.logIN= 0;
			$scope.handleAuthClick(event);
			
			// shoule be access to get calendar and calendar should be non-empty array :
		});
		
		it('makeApiCall function should be called', function(){
			expect($scope.makeApiCall()).toHaveBeenCalled();
		});
		
		it('convertMe function should be called to convert format of array', function(){
			expect($scope.convertMe()).toHaveBeenCalled();
		});
		
		it('Google Calendar should be gotten from api', function(){
			for each(var index in $rootScope.eUser.uGmailCalendar){
				length++;
			}
			
			expect(length).not.toEqual(0);
		});
		
		it('Google Calendar should be convert to array which index is an Object Date', function(){
			var length = 0;
			for each(var index in $rootScope.eUser.uGmailCalendar){
				expect(index.getTime()).not.toBeUndefined();
			}
		});
		
		it('Google Calendar should be sort by time', function(){
			var next= null;
			var previous= null;
			var i=0;
			for each(var index in $rootScope.eUser.uGmailCalendar){
				if (i==0)	previous= index;
				else {
					next= index;
					expect(previous.getTime()).toBeLessThan(next.getTime());
					previous=next;
				}
				
				i++;
			}
		});
		
		it('Google Calendar array should have each element which is a non-empty array', function(){
			for each(var index in $rootScope.eUser.uGmailCalendar){
				expect($rootScope.eUser.uGmailCalendar[index].length).not.toEqual(0);
			}
		});
	});
	
	describe('sync to local calendar', function(){
		it('if window.plugin is not defined, cordovaCalendar.listCalendars() should not be called', function(){
			if (window.plugin == undefined){
				expect(cordovaCalendar.listCalendars()).not.toHaveBeenCalled();
			}
			else{
				expect(cordovaCalendar.listCalendars()).toHaveBeenCalled();
			}
		});
	});
});