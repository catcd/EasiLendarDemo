/**
 * starter: Can Duy Cat
 * owner: Nguyen Manh Duy
 * last update: 16/04/2015
 * type: all shared sync function
 */

describe('Sync service test', function() {
	var eSync, eUser;

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
				expect(eSync.logIN).toEqual(1);
				expect(makeApiCallNoBound).toHaveBeenCalled();
			}
			else{
				expect(eSync.logIN).toEqual(0);
			}
		});
	});
	
	describe('log out', function(){
		beforeEach(function(){
			eSync.logMeOut();
		});
		
		it('value logIN should change from 1 to 0', function(){
			expect(eSync.logIN).toEqual(0);
		});

		it ('value email should change to empty string', function(){
			expect(eSync.email).toEqual('');
		});
	});

	describe('Google Calendar data', function(){
		beforeEach(function(){
			var event= null;
			var length=0;
			eSync.logIN= 0;
			eSync.handleAuthClick(event);
			
			// shoule be access to get calendar and calendar should be non-empty array :
		});
		
		it('makeApiCallNoBound function should be called', function(){
			expect(eSync.makeApiCallNoBound).toHaveBeenCalled();
		});
		
		it ('gapi.client.load function should be called', function(){
			expect(gapi.client.load).toHaveBeenCalled();
		});
		
		it ('convertMe function should be called', function(){
			expect(eSync.convertMe).toHaveBeenCalled();
		});
		
		it ('extraCopy function should be called', function{
			expect(eSync.extraCopy).toHaveBeenCalled();
		});
		
		it('Google Calendar should be gotten from api', function(){
			for (var index in eUser.uGmailCalendar){
				length++;
			}
			
			expect(length).not.toEqual(0);
		});
		
		it('Google Calendar should be convert to array which index is an Object Date', function(){
			var length = 0;
			for (var index in eUser.uGmailCalendar){
				expect(index.getTime()).not.toBeUndefined();
			}
		});
		
		it('Google Calendar should be sort by time', function(){
			var next= null;
			var previous= null;
			var i=0;
			for (var index in eUser.uGmailCalendar){
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
			for (var index in eUser.uGmailCalendar){
				expect(eUser.uGmailCalendar[index].length).not.toEqual(0);
			}
		});
	});
	
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
			
			var addingResult= eSync.addSingleEvent(summary, start, end, location);
			
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
		
		it ('new event should be same as input about startTime', function(){
			expect(event.start.dateTime.getTime()).toEqual(start.getTime());
		});
		
		it ('new event should be same as input about endTime', function(){
			expect(event.end.dateTime.getTime()).toEqual(end.getTime());
		});
		
		it ('new event should be same as input about location', function(){
			expect(event.location).toEqual(location);
		});
		
		it ('if input of start are not object Date or null, function should return false', function(){
			var invalidStart= null;
			var addingResultFalse= eSync.addSingleEvent(summary, invalidStart, end, location);
			
			expect(addingResultFalse).toEqual(false);
		});
		
		it ('if input of end are not object Date or null, function should return false', function(){
			var invalidEnd= null;
			var addingResultFalse= eSync.addSingleEventWithFriend(summary, start, invalidEnd, location);
			
			expect(addingResultFalse).toEqual(false);
		});
	});
	
	describe('test deleteEventWithId', function(){
		beforeEach(function(){
			eSync.makeApiCallNoBound();
			var newLength = 0;
			var oldLength = 0;
			var ID= '';
			var found = false;
			
			if (eUser.uGmailCalendar.length!= 0){
				for (var index in eUser.uGmailCalendar){
					for (var i in eUser.uGmailCalendar[index]){
						oldLength ++;
						ID= eUser.uGmailCalendar[index][i].Id;
					}
				}
			}
			
			eSync.deleteEventWithId(ID);
			
			if (eUser.uGmailCalendar.length!= 0){
				for (var index in eUser.uGmailCalendar){
					for (var i in eUser.uGmailCalendar[index]){
						newLength ++;
						if (eUser.uGmailCalendar[index][i].Id == ID)
							found = true;
					}
				}
			}
		});
		
		it ('if ID input is not valid, function should return false', function(){
			var resultFalse = eSync.deleteEventWithId('');
			expect(resultFalse).toEqual(false);
		});
		
		it ('new Length should be old Length -1', function(){
			expect(newLength).toEqual(oldLength-1);
		});
		
		it ('event which was deleted should not be found', function(){
			expect(found).toEqual(false);
		});
		
		it ('gapi.client.calendar.events.delete should be called', function(){
			expect(gapi.client.calendar.events.delete).toHaveBeenCalled();
		});
	});
	
	