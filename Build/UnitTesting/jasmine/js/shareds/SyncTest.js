/**
 * starter: Can Duy Cat
 * owner: Nguyen Manh Duy
 * last update: 16/04/2015
 * type: all shared sync function
 */

beforeEach(module('MainApp.shareds.sync'));

// Test eCopyData factory:

describe('test eCopyData factory', function(){
	var eCopyData;
	
	// excuted before each "it" is run.
	beforeEach(function() {
		// load the module.
		// inject your service for testing.
		// The _underscores_ are a convenience thing
		// so you can have your variable name be the
		// same as your injected service.
		inject(function(_eCopyData_) {
			eCopyData = _eCopyData_;
		});
	});
	
	// Test function extraCopy:
	
	describe('test function extraCopy', function(){
		
		var startFirst, endFirst, endSecond, uGCFirst, uGCNewFirst, uGCSecond, uGCNewSecond, epsilon, t1, t2;
		
		beforeEach(function(){
			startFirst = {dateTime: '2015-03-05T00:00:00.000Z'};
			endFirst = {dateTime: '2015-03-05T03:05:00.000Z'};
			endSecond = {dateTime: '2015-03-07T00:00:00.000Z'};
		
			eventOfGoogleFirst = {created: '2015-03-15T07:40:54.000Z', id: 'q1at6c8gt9girc152nprjs3edc', start: startFirst, end: endFirst, status: 'confirmed', summary: 'Test'};
			eventOfGoogleSecond = {created: '2015-03-15T07:40:54.000Z', id: 'q1at6c8gt9girc152nprjs3edc', start: startFirst, end: endSecond, status: 'confirmed', summary: 'Test'};
		
			uGCFirst = new Array();
			uGCFirst[0]= eventOfGoogleFirst;
			uGCNewFirst = new Array();
		
			uGCSecond = new Array();
			uGCSecond[0]= eventOfGoogleSecond;
			uGCNewSecond = new Array();
		
			eCopyData.extraCopy(uGCFirst, uGCNewFirst);
			eCopyData.extraCopy(uGCSecond, uGCNewSecond);
			
			epsilon= "Thu Mar 05 2015 00:00:00 GMT+0700 (Local Standard Time)";
			t1= "Fri Mar 06 2015 00:00:00 GMT+0700 (Local Standard Time)";
			t2= "Sat Mar 07 2015 00:00:00 GMT+0700 (Local Standard Time)";
		});
		
		it ('extraCopy should convert to Array which index is Date Object', function(){
			for (var index in uGCNewFirst){
				expect((new Date(index)).getHours).toBeDefined();
			}
		});
		
		it ('extraCopy should convert to Array which each element is an defined object', function(){
			for (var index in uGCNewFirst){
				expect(uGCNewFirst[index]).toBeDefined();
			}
		});
	
		it ('extraCopy should convert to Array which each element is an array has 1 defined element', function(){
			for (var index in uGCNewFirst){
				expect(uGCNewFirst[index][0]).toBeDefined();
			}
		});
	
		it ('extraCopy should convert to Array which each element is an array has 1 element at least', function(){
			var length= 0;
			for (var index in uGCNewFirst){
				for (var integer in uGCNewFirst[index]){
					length++;
				}
				expect(length).toEqual(1);
			}
		});
		
		it ('extraCopy should convert to Array which each element is an array which index is time of all event belong to it', function(){
			expect(uGCNewFirst[new Date(epsilon)]).toBeDefined();
			expect(uGCNewFirst[new Date(epsilon)][0]).toBeDefined();
			var eventConfess = uGCNewFirst[new Date(epsilon)][0];
			
			expect(eventConfess.position).toEqual(new Date(epsilon));
			expect(eventConfess.summary).toEqual("Test");
			expect(status).toEqual('');
			//...//
		});
		
		it ('extraCopy should handle long-time event', function(){
			expect(uGCNewSecond[new Date(epsilon)]).toBeDefined();
		});
		
		it ('extraCopy should devise long-time event to array of all-day events', function(){
			expect(uGCNewSecond[new Date(t1)]).toBeDefined();
			expect(uGCNewSecond[new Date(t2)]).toBeDefined();
		});
		
		it ('extraCopy should devise long-time event to array of events', function(){
			expect(uGCNewSecond[new Date(t1)][0]).toBeDefined();
			expect(uGCNewSecond[new Date(t2)][0]).toBeDefined();
		});
		
		it ('extraCopy should devise long-time event to array of similar events', function(){
			expect(uGCNewSecond[new Date(t1)][0].summary).toEqual("Test");
			expect(uGCNewSecond[new Date(t2)][0].summary).toEqual("Test");
		});
	});
});

// Test eSync factory:

describe('Sync service test', function() {
	
	var eSync;
	var eCopyData;
	
	angular.module("Virtual", [])
	.factory('eUser', function(){
		return {
			uGmailCalendar: null,
		};
	})
	.factory('eDatabase', function(){
		return {};
	});
	
	// excuted before each "it" is run.
	beforeEach(function() {
		module("Virtual");
		// load the module.
		// inject your service for testing.
		// The _underscores_ are a convenience thing
		// so you can have your variable name be the
		// same as your injected service.
		inject(function(_eSync_, _eUser_, _eCopyData_) {
			eSync = _eSync_;
			eUser = _eUser_;
			eCopyData = _eCopyData_;
		});
	});
	
	// Test logInToGmailCalendar function:
	
	describe('test logInToGmailCalendar function', function(){
		it ('gapi should be defined', function(){
			expect(gapi).toBeDefined();
		});
		
		it ('gapi.auth should be defined', function(){
			expect(gapi.auth).toBeDefined();
		});
	});
	
	// Test testLogInResult function:
	
	describe('test testLogInResult function', function(){
		
		var authResultTrue, authResultFalse;
		beforeEach(function(){
			authResultTrue= {success: "emplt"};
			authResultFalse= null;
		});
		
		it ('eSync.logInResult shoule be true if success', function(){
			eSync.testLogInResult(authResultTrue);
			expect(eSync.logInResult).toEqual(true);
		});
		
		it ('eSync.logInResult shoule be false if failure', function(){
			eSync.testLogInResult(authResultFalse);
			expect(eSync.logInResult).toEqual(false);
		});
	});
	
	// Test convertMe function:
	
	describe('test convertMe function', function(){
		beforeEach(function(){
			startFirst = {dateTime: '2015-03-05T00:00:00.000Z'};
			endFirst = {dateTime: '2015-03-05T03:05:00.000Z'};
			
			eventOfGoogleFirst = {created: '2015-03-15T07:40:54.000Z', id: 'q1at6c8gt9girc152nprjs3edc', start: startFirst, end: endFirst, status: 'confirmed', summary: 'Test'};
			
			eUser.uGmailCalendar = new Array();
			eUser.uGmailCalendar[0]= eventOfGoogleFirst;
		});
		
		it ('eCopyData.extraCopy should be call to convert data of eUser.uGmailCalendar', function(){
			spyOn(eCopyData, 'extraCopy');
			eSync.convertMe();
			expect(eCopyData.extraCopy).toHaveBeenCalled();
		});
		
		it ('if eUser.uGmailCalendar is empty, eCopyData.extraCopy should not have been called', function(){
			eUser.uGmailCalendar = new Array();
			spyOn(eCopyData, 'extraCopy');
			eSync.convertMe();
			expect(eCopyData.extraCopy).not.toHaveBeenCalled();
		});
	});
	
	// Test makeValidDate function:
	
	describe('test makeValidDate', function(){
		var date, epsilon;
		beforeEach(function(){
			date = new Date("Thu Mar 05 2015 00:00:00 GMT+0700 (Local Standard Time)");
			epsilon= '2015-02-05T00:00:00-00:00';
		});
		
		it ('expect makeValidDate convert to date form of google', function(){
			var result= eSync.makeValidDate(date);
			expect(result).toEqual(epsilon);
		})
	});
	
	// test addSingleEvent function:
	
	describe('test addSingleEvent', function(){
	
		var summary, start, end, location, invalidEnd, invalidStart;
		beforeEach(function(){
			summary= "love";
			start= {dateTime: '2015-02-05T00:00:00-00:00'};
			end= {dateTime: '2015-02-05T04:00:00-00:00'};
			invalidStart= null;
			invalidEnd= null;
		});
		
		it ('gapi.client should be defined', function(){
			expect(gapi.client).toBeDefined();
		});
		
		it ('if input of start are not object Date or null, function should return false', function(){
			var addingResultFalse= eSync.addSingleEvent(summary, invalidStart, end, location);
			
			expect(addingResultFalse).toEqual(false);
		});
		
		it ('if input of end are not object Date or null, function should return false', function(){
			var addingResultFalse= eSync.addSingleEvent(summary, start, invalidEnd, location);
			
			expect(addingResultFalse).toEqual(false);
		});
		
		it ('if input of end are not object Date or null, function should return false', function(){
			spyOn(eSync, 'addEventToGoogle');
			
			var addingResultFalse= eSync.addSingleEvent(summary, start, end, location);
			
			expect(eSync.addEventToGoogle).toHaveBeenCalled();
		});
	});
	
	// Test length function:
	
	describe('test length function', function(){
		it('length function should return length of array', function(){
			var x= [1,2,2];
			var y= eSync.length(x);
			expect(y).toEqual(3);
		});
	});
	
	// test deleteEventWithId function:
	
	describe('test deleteEventWithId', function(){
		var startFirst, endFirst, eventOfGoogleFirst;
		
		beforeEach(function(){
			startFirst = {dateTime: '2015-03-05T00:00:00.000Z'};
			endFirst = {dateTime: '2015-03-05T03:05:00.000Z'};
			
			eventOfGoogleFirst = {created: '2015-03-15T07:40:54.000Z', id: 'q1at6c8gt9girc152nprjs3edc', start: startFirst, end: endFirst, status: 'confirmed', summary: 'Test'};
			eUser.uGmailCalendar= new Array();
			eUser.uGmailCalendar[0]= eventOfGoogleFirst;
			eSync.convertMe();
		});
		
		it ('if ID input is not valid, function should return false', function(){
			var resultFalse = eSync.deleteEventWithId('');
			expect(resultFalse).toEqual(false);
		});
	});
	
	// Test editEventWithId function:
	
	describe('test editEventWithId', function(){
		var startFirst, endFirst, eventOfGoogleFirst;
		
		beforeEach(function(){
			startFirst = {dateTime: '2015-03-05T00:00:00.000Z'};
			endFirst = {dateTime: '2015-03-05T03:05:00.000Z'};
			
			eventOfGoogleFirst = {created: '2015-03-15T07:40:54.000Z', id: 'q1at6c8gt9girc152nprjs3edc', start: startFirst, end: endFirst, status: 'confirmed', summary: 'Test'};
			eUser.uGmailCalendar= new Array();
			eUser.uGmailCalendar[0]= eventOfGoogleFirst;
			eSync.convertMe();
		});
		
		it ('if ID input is not valid, function should return false', function(){
			var resultFalse = eSync.editEventWithId('', eventOfGoogleFirst);
			expect(resultFalse).toEqual(false);
		});
		
		it ('if ID input is valid, function should call delete and edit function', function(){
			spyOn(eSync, 'addSingleEvent');
			spyOn(eSync, 'deleteEventWithId');
			
			eSync.editEventWithId('q1at6c8gt9girc152nprjs3edc', eventOfGoogleFirst);
			expect(eSync.addSingleEvent).toHaveBeenCalled();
			expect(eSync.deleteEventWithId).toHaveBeenCalled();
		});
	});
	
	// Test syncToLocal function:
	
	describe('test syncToLocal', function(){
		it ('because testing to Local Calendar only run on real device, function should return false first', function(){
			var re= eSync.syncToLocal();
			expect(re).toEqual(false);
		});
	});
});
	