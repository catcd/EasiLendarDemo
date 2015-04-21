/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 21/04/2015
 * type: unit test
 * base on: javascript, Google Calendar API
 */

describe('EasiLendar Classes Test', function() {
	var eEasiLendar;
	
	// fake services
//	var eFriend = {fMultiCal: null};
//	var eSettings = {sFirstDay: "Monday"};
//	var eCalendar = {
//		months: ["January", "February", "March", "April", "May", "June",
//				"July", "August", "September", "October", "November", "December"
//		],
//		weekDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//		shortMonths: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
//	};
	var $rootScope = {currentState: "week"};
	
	beforeEach(function() {
		module('MainApp.shareds.easiLendarClass', function($provide) {
			eCalendarMock = jasmine.createSpyObj('eCalendar', ['weekDays', 'months', 'shortMonths']);
			eUserMock = jasmine.createSpyObj('eUser', ['uGmailCalendar']);
			eFriendMock = jasmine.createSpyObj('eFriend', ['fMultiCal']);
			eSettingsMock = jasmine.createSpyObj('eSettings', ['sFirstDay']);
			$provide.value('eCalendar', eCalendarMock);
			$provide.value('eUser', eUserMock);
			$provide.value('eFriend', eFriendMock);
			$provide.value('eSettings', eSettingsMock);
		});
		
		inject(function(_eEasiLendar_) {
			eEasiLendar = _eEasiLendar_;
		});
	});
	
	describe("Events' colors", function() {
		it('should be ["#09c","#0cf","#36f","#93f","#ff9999","#fc0","#f60","#0c6","#666","#99f","#393","#c30"]', function() {
			expect(eEasiLendar.eventColor).toEqual(["#09c","#0cf","#36f","#93f","#ff9999","#fc0","#f60","#0c6","#666","#99f","#393","#c30"]);
		});
	});
});