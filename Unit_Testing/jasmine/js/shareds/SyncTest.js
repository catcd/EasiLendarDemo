/**
 * starter: Can Duy Cat
 * owner: Nguyen Manh Duy
 * last update: 16/04/2015
 * type: all shared sync function
 */

describe('Sync service test', function() {
	var eSync;

	// excuted before each "it" is run.
	beforeEach(function() {
		// load the module.
		module('MainApp.shareds.sync');

		// inject your service for testing.
		// The _underscores_ are a convenience thing
		// so you can have your variable name be the
		// same as your injected service.
		inject(function(_eSync_) {
			eSync = _eSync_;
		});
	});
	
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
	
	describe('request Google API permission', function(){
		var clientId = '164260242142-4er9a46uufjlu6h6hsbv3s7479mqv6pr.apps.googleusercontent.com';
		var scopes = 'https://www.googleapis.com/auth/calendar';
		var authResult;
		
		beforeEach(function(){
			gapi.auth.authorize({
								client_id: clientId,
								scope: scopes,
								immediate: true,
								cookie_policy: 'single_host_origin'
								}, eSync.handleAuthResult);
		});
		
		it('receive token function be called', function(){
			expect(eSync.handleAuthResult(authResult)).toHaveBeenCalled();
			eSync.handleAuthResult(authResult);
			if (authResult && !authResult.error) {
				expect(eSync.logInResult).toEqual(true);
				expect(makeApiCallNoBound).toHaveBeenCalled();
			}
			else{
				expect(eSync.logInResult).toEqual(false);
			}
		});
	});
	
	// All test about Google Calendar have been tested in SyncControllerTest
	
	describe('test addSingleEvent', function(){
	
		beforeEach(function(){
			var toDay = new Date();
			var start= new Date(toDay);
			var position = new Date(start.getFullYear(), start.getMonth(), start.getDate());
			
			var end= new Date(st.getTime() + 3600000);
			var summary= 'test add event';
			var location= 'anywhere';
	
			var resource = {
				"summary": summary,
				"location": location,
				"start": {
					"dateTime": start
				},
				"end": {
					"dateTime": end
				}
			};
			
			var addingResult= eSync.addSingleEventWithFriend(summary, start, end, location);
			
			eSync.makeApiCallNoBound();
			
			if (eUser.uGmailCalendar[position] != undefined)
			{
				var found= false;
				var event;
				for (var i=0; i< eUser.uGmailCalendar[position].length; i++){
					if (eUser.uGmailCalendar[position][i].summary== summary){
						found = true;
						event = eUser.uGmailCalendar[position][i];
						break;
					}
				}
			}
		});
		
		it ('gapi.client should be defined', function(){
			expect(gapi.client).toBeDefined();
		});
		
		it ('gapi.client. should be defined', function(){
			expect(gapi.client.calendar.events.insert).toHaveBeenCalled();
		});
		
		it ('addingResult should return true when user have logged in', function(){
			expect(addingResult).toEqual(true);
		});
				
		it ('eUser.uGmailCalendar should have an element in index position', function(){
			expect(eUser.uGmailCalendar[position]).toBeDefined();
		});
	
		it ('eUser.uGmailCalendar should have new event', function(){
			expect(found).toEqual(true);
		});
		
		it ('new event should be same as input', function(){
			expect(event.start.dateTime.getTime()).toEqual(start.getTime());
			expect(event.end.dateTime.getTime()).toEqual(end.getTime());
			expect(event.location).toEqual(location);
		});
		
		it ('if input of start are not object Date or null, function should return false', function(){
			var invalidStart= null;
			var addingResultFalse= eSync.addSingleEventWithFriend(summary, invalidStart, end, location);
			
			expect(addingResultFalse).toEqual(false);
		});
		
		it ('if input of end are not object Date or null, function should return false', function(){
			var invalidEnd= null;
			var addingResultFalse= eSync.addSingleEventWithFriend(summary, start, invalidEnd, location);
			
			expect(addingResultFalse).toEqual(false);
		});
	});