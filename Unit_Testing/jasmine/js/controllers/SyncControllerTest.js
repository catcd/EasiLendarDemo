/**
 * starter: Can Duy Cat
 * owner: Nguyen Manh Duy
 * last update: 19/04/2015
 * type: paticular controller
 */

 
describe('Sync', function(eUser) {
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
			
			expect(gapi.auth.authorize).toBeDefined();
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
			for each(var index in eUser.uGmailCalendar){
				length++;
			}
			
			expect(length).not.toEqual(0);
		});
		
		it('Google Calendar should be an array which longest length is less than 1k01', function(){
			for each(var index in eUser.uGmailCalendar){
				length++;
			}
			
			expect(length).toBeLessThan(1001);
		});
		
		it('Google Calendar should be convert to array which index is an Object Date', function(){
			var length = 0;
			for each(var index in eUser.uGmailCalendar){
				expect(index.getTime()).not.toBeUndefined();
			}
		});
		
		it ('Google Calendar should be gotten from a day which after 1 year ago', function(){
			var toDay = new Date();
			var dd = toDay.getDate();
			var mm = toDay.getMonth() + 1; //January is 0!
			var yyyy = toDay.getFullYear();

			if (dd < 10) {
				dd = '0' + dd;
			}

			if (mm < 10) {
				mm = '0' + mm;
			}

			toDay = mm + '/' + dd + '/' + yyyy;

			// form of timeMax: "yyyy-mm-dd T hh:mm:ss - offset

			var oneYearAgo = (yyyy - 1) + '-' + mm + '-' + dd + 'T' + '00:00:00-00:00';

			for each(var index in eUser.uGmailCalendar){
				expect(oneYearAgo.getTime()).toBeLessThan(index.getTime());
				break;
			}
		});
		
		it('Google Calendar should be sort by time', function(){
			var next= null;
			var previous= null;
			var i=0;
			for each(var index in eUser.uGmailCalendar){
				if (i==0)	previous= index;
				else {
					next= index;
					expect(previous.getTime()).toBeLessThan(next.getTime());
					previous=next;
				}
				
				i++;
			}
		});
		
		it ('Google Calendar should be an array which all elements are defined', function(){
			for each(var index in eUser.uGmailCalendar){
				expect(eUser.uGmailCalendar[index]).toBeDefined();
			}
		});
		
		it('Google Calendar array should have each element which is a non-empty array', function(){
			for each(var index in eUser.uGmailCalendar){
				expect(eUser.uGmailCalendar[index].length).not.toEqual(0);
			}
		});
		
		it ('Google Calendar should be an array which all elements has position (time of event) equal to index', function(){
			for each(var index in eUser.uGmailCalendar){
				var current= eUser.uGmailCalendar[index];
				
				for (var i=0; i< current.length; i++){
					expect(current[i].position).toBeDefined();
					expect(current[i].position.getTime())= index.getTime();
				}
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
		
		it ('if window.plugin is defined, function cordovaCalendar.listCalendars() should return response is an array of events', function(){
			if (window.plugin != undefined){
				$cordovaCalendar.listCalendars().then(function(result) {
				//success:
				expect(result.length).not.toEqual(0);
			}, function(err) {
				// error: not handle;
			});
		});
		
		
	});
});