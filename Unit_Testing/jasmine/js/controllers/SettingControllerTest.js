/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 25/04/2015
 * type: Setting controller unit test
 * test: 5
 */

describe('Setting controller test', function() {
	var $rootScope, $controller, $scope;
	var eSettingMock;

	beforeEach(module('MainApp.controllers.setting'));

	// inject setting service
	beforeEach(function() {
		// load the module.
		module('MainApp.shareds.application')

		// inject your service for testing.
		// The _underscores_ are a convenience thing
		// so you can have your variable name be the
		// same as your injected service.
		inject(function(_eSettings_) {
			eSettingMock = _eSettings_;
		});
	});

	// execuse before each it
	beforeEach(inject(function(_$rootScope_, _$controller_) {
		$rootScope = _$rootScope_;
		$controller = _$controller_;
		$scope = $rootScope.$new();

		$controller('SettingController', {
			'$rootScope': $rootScope,
			'$scope': $scope,
			'eSettings': eSettingMock,
		});
	}));

	describe('Initialize data (inject services)', function() {
		it('Should inject eSettings service to $rootScope.eSettings', function() {
			var eSettings = $rootScope.eSettings

			expect(eSettings).toBeDefined();
		});

		it('Should define all variable attr', function() {
			var eSettings = $rootScope.eSettings

			expect(eSettings.sEvent).toBeDefined();
			expect(eSettings.sHoliday).toBeDefined();
			expect(eSettings.sBirthday).toBeDefined();
			expect(eSettings.sLocalCalendar).toBeDefined();
			expect(eSettings.sGmailCalendar).toBeDefined();
			expect(eSettings.sDefaultView).toBeDefined();
			expect(eSettings.sDayView).toBeDefined();
			expect(eSettings.sFirstDay).toBeDefined();
			expect(eSettings.sShowWeekNumber).toBeDefined();
			expect(eSettings.sAutoSync).toBeDefined();
			expect(eSettings.sSyncWith).toBeDefined();
			expect(eSettings.sDefaultDuration).toBeDefined();
			expect(eSettings.sDeviceTimeZone).toBeDefined();
			expect(eSettings.sTimeZone).toBeDefined();
			expect(eSettings.sZoneList).toBeDefined();
			expect(eSettings.sZoneName).toBeDefined();
			expect(eSettings.sInternet).toBeDefined();
		});

		it('Should be able to access variable', function() {
			var eSettings = $rootScope.eSettings

			expect(eSettings.sEvent).toBe(true);
			expect(eSettings.sHoliday).toBe(true);
			expect(eSettings.sBirthday).toBe(true);
			expect(eSettings.sLocalCalendar).toBe(true);
			expect(eSettings.sGmailCalendar).toBe(true);
			expect(eSettings.sDefaultView).toEqual('month');
			expect(eSettings.sDayView).toEqual('eventList');
			expect(eSettings.sFirstDay).toEqual('Monday');
			expect(eSettings.sShowWeekNumber).toEqual(true);
			expect(eSettings.sAutoSync).toBeNull();
			expect(eSettings.sSyncWith).toEqual('both 3G and wifi');
			expect(eSettings.sDefaultDuration).toEqual(60);
			expect(eSettings.sDeviceTimeZone).toBe(true);
			expect(eSettings.sTimeZone).toEqual(0);
			expect(eSettings.sInternet).toEqual('wifi');
		});

		it('Should be able to change variable data', function() {
			var eSettings = $rootScope.eSettings

			eSettings.sEvent = false;
			eSettings.sHoliday = false;
			eSettings.sBirthday = false;
			eSettings.sLocalCalendar = false;
			eSettings.sGmailCalendar = false;
			eSettings.sDefaultView = 'week';
			eSettings.sDayView = 'dayGrid';
			eSettings.sFirstDay = 'Sunday';
			eSettings.sShowWeekNumber = false;
			eSettings.sAutoSync = true;
			eSettings.sSyncWith = 'wifi only';
			eSettings.sDefaultDuration = 120;
			eSettings.sDeviceTimeZone = false;
			eSettings.sTimeZone = 7;
			eSettings.sInternet = '3G';

			expect(eSettings.sEvent).toBe(false);
			expect(eSettings.sHoliday).toBe(false);
			expect(eSettings.sBirthday).toBe(false);
			expect(eSettings.sLocalCalendar).toBe(false);
			expect(eSettings.sGmailCalendar).toBe(false);
			expect(eSettings.sDefaultView).toEqual('week');
			expect(eSettings.sDayView).toEqual('dayGrid');
			expect(eSettings.sFirstDay).toEqual('Sunday');
			expect(eSettings.sShowWeekNumber).toBe(false);
			expect(eSettings.sAutoSync).not.toBeNull();
			expect(eSettings.sSyncWith).toEqual('wifi only');
			expect(eSettings.sDefaultDuration).toEqual(120);
			expect(eSettings.sDeviceTimeZone).toBe(false);
			expect(eSettings.sTimeZone).toEqual(7);
			expect(eSettings.sInternet).toEqual('3G');
		});

		it('resetData should be work', function() {
			var eSettings = $rootScope.eSettings

			// change data
			eSettings.sEvent = false;
			eSettings.sHoliday = false;
			eSettings.sBirthday = false;
			eSettings.sLocalCalendar = false;
			eSettings.sGmailCalendar = false;
			eSettings.sDefaultView = 'week';
			eSettings.sDayView = 'dayGrid';
			eSettings.sFirstDay = 'Sunday';
			eSettings.sShowWeekNumber = false;
			eSettings.sAutoSync = true;
			eSettings.sSyncWith = 'wifi only';
			eSettings.sDefaultDuration = 120;
			eSettings.sDeviceTimeZone = false;
			eSettings.sTimeZone = 7;
			eSettings.sInternet = '3G';

			// resetData
			eSettings.resetData();

			// TEST
			expect(eSettings.sEvent).toBe(true);
			expect(eSettings.sHoliday).toBe(true);
			expect(eSettings.sBirthday).toBe(true);
			expect(eSettings.sLocalCalendar).toBe(true);
			expect(eSettings.sGmailCalendar).toBe(true);
			expect(eSettings.sDefaultView).toEqual('month');
			expect(eSettings.sDayView).toEqual('eventList');
			expect(eSettings.sFirstDay).toEqual('Monday');
			expect(eSettings.sShowWeekNumber).toEqual(true);
			expect(eSettings.sAutoSync).toBeNull();
			expect(eSettings.sSyncWith).toEqual('both 3G and wifi');
			expect(eSettings.sDefaultDuration).toEqual(60);
			expect(eSettings.sDeviceTimeZone).toBe(true);
			expect(eSettings.sTimeZone).toEqual(0);
			expect(eSettings.sInternet).toEqual('wifi');
		});
	});
});
