/**
 * starter: Can Duy Cat
 * owner: Nguyen Thi Luong
 * last update: 18/03/2015
 * type: day controller
 */
/*test for:
 *first last day function
*/
describe('Day Calendar', function() {
	var $controller, $rootScope, $scope;
	var eCalendar,eEasiLendar,eSettings;
	beforeEach(module('MainApp.controllers.day'));
	var eCalendar = {};
	var eEasiLendar={
	newDay: function(){},};
	var eSettings = {};
	
	
	beforeEach(function() {
		module('MainApp.controllers.day', function($provide) {
			eCalendarMock = jasmine.createSpyObj('eCalendar', [ 'months', 'shortMonths']);
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
	describe('setNavMonth',function(){
	var month1 = 1;
	var month2 = 2;
	var month3 = 1;
	it('as month', function(){
	var result :"January";
	expect(setNavMonth(month1, month2)).toEqual(result);
	});
	});
	
});