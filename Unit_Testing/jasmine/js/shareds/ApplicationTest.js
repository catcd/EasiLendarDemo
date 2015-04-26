/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 27/04/2015
 * type: module all shared variables and functions used for this app
 * test: 195
 */

// load the module.
beforeEach(module('MainApp.shareds.application'));

describe('eSearchFilter service test', function() {
	var eSearchFilter;

	// excuted before each "it" is run.
	beforeEach(function() {
		// inject your service for testing.
		// The _underscores_ are a convenience thing
		// so you can have your variable name be the
		// same as your injected service.
		inject(function(_eSearchFilter_) {
			eSearchFilter = _eSearchFilter_;
		});
	});

	it('Should create mTitle: ""', function() {
		expect(eSearchFilter.mTitle).toBeDefined();
		expect(eSearchFilter.mTitle).toEqual('');
	});

	it('Should create mDuration: 0', function() {
		expect(eSearchFilter.mDuration).toBeDefined();
		expect(eSearchFilter.mDuration).toEqual(0);
	});

	it('Should create mLocation: ""', function() {
		expect(eSearchFilter.mLocation).toBeDefined();
		expect(eSearchFilter.mLocation).toEqual('');
	});

	it('Should create mFrom: 0', function() {
		expect(eSearchFilter.mFrom).toBeDefined();
		expect(eSearchFilter.mFrom).toEqual(0);
	});

	it('Should create mTo: 0', function() {
		expect(eSearchFilter.mTo).toBeDefined();
		expect(eSearchFilter.mTo).toEqual(0);
	});

	it('Should create mFromDay: ""', function() {
		expect(eSearchFilter.mFromDay).toBeDefined();
		expect(eSearchFilter.mFromDay).toBeNull();
	});

	it('Should create mToDay: ""', function() {
		expect(eSearchFilter.mToDay).toBeDefined();
		expect(eSearchFilter.mToDay).toBeNull();
	});

	it('Should create mBreakfast: null', function() {
		expect(eSearchFilter.mBreakfast).toBeDefined();
		expect(eSearchFilter.mBreakfast).toBeNull();
	});

	it('Should create mLunch: null', function() {
		expect(eSearchFilter.mLunch).toBeDefined();
		expect(eSearchFilter.mLunch).toBeNull();
	});

	it('Should create mDinner: null', function() {
		expect(eSearchFilter.mDinner).toBeDefined();
		expect(eSearchFilter.mDinner).toBeNull();
	});

	it('Should create mOffice: null', function() {
		expect(eSearchFilter.mOffice).toBeDefined();
		expect(eSearchFilter.mOffice).toBeNull();
	});

	it('Should create mHoliday: null', function() {
		expect(eSearchFilter.mHoliday).toBeDefined();
		expect(eSearchFilter.mHoliday).toBeNull();
	});

	it('resetData Should work', function() {
		// change data
		eSearchFilter.mTitle = 'scdf';
		eSearchFilter.mDuration = 10;
		eSearchFilter.mLocation = 'hanoi';
		eSearchFilter.mFrom = 12;
		eSearchFilter.mTo = 20;
		eSearchFilter.mFromDay = new Date();
		eSearchFilter.mToDay = new Date();
		eSearchFilter.mBreakfast = new Date();
		eSearchFilter.mLunch = new Date();
		eSearchFilter.mDinner = new Date();
		eSearchFilter.mOffice = new Date();
		eSearchFilter.mHoliday = new Date();

		// resetData
		eSearchFilter.resetData();

		// TEST
		expect(eSearchFilter.mTitle).toEqual('');
		expect(eSearchFilter.mDuration).toEqual(0);
		expect(eSearchFilter.mLocation).toEqual('');
		expect(eSearchFilter.mFrom).toEqual(0);
		expect(eSearchFilter.mTo).toEqual(0);
		expect(eSearchFilter.mFromDay).toBeNull();
		expect(eSearchFilter.mToDay).toBeNull();
		expect(eSearchFilter.mBreakfast).toBeNull();
		expect(eSearchFilter.mLunch).toBeNull();
		expect(eSearchFilter.mDinner).toBeNull();
		expect(eSearchFilter.mOffice).toBeNull();
		expect(eSearchFilter.mHoliday).toBeNull();
	});

	it('resetData Should work without any change', function() {
		// resetData
		eSearchFilter.resetData();

		// TEST
		expect(eSearchFilter.mTitle).toEqual('');
		expect(eSearchFilter.mDuration).toEqual(0);
		expect(eSearchFilter.mLocation).toEqual('');
		expect(eSearchFilter.mFrom).toEqual(0);
		expect(eSearchFilter.mTo).toEqual(0);
		expect(eSearchFilter.mFromDay).toBeNull();
		expect(eSearchFilter.mToDay).toBeNull();
		expect(eSearchFilter.mBreakfast).toBeNull();
		expect(eSearchFilter.mLunch).toBeNull();
		expect(eSearchFilter.mDinner).toBeNull();
		expect(eSearchFilter.mOffice).toBeNull();
		expect(eSearchFilter.mHoliday).toBeNull();
	});

	it('resetData Should work even if data type went wrong', function() {
		// change data
		eSearchFilter.mTitle = new Array();
		eSearchFilter.mDuration = new Array();
		eSearchFilter.mLocation = new Array();
		eSearchFilter.mFrom = new Array();
		eSearchFilter.mTo = new Array();
		eSearchFilter.mFromDay = new Array();
		eSearchFilter.mToDay = new Array();
		eSearchFilter.mBreakfast = new Array();
		eSearchFilter.mLunch = new Array();
		eSearchFilter.mDinner = new Array();
		eSearchFilter.mOffice = new Array();
		eSearchFilter.mHoliday = new Array();

		// resetData
		eSearchFilter.resetData();

		// TEST
		expect(eSearchFilter.mTitle).toEqual('');
		expect(eSearchFilter.mDuration).toEqual(0);
		expect(eSearchFilter.mLocation).toEqual('');
		expect(eSearchFilter.mFrom).toEqual(0);
		expect(eSearchFilter.mTo).toEqual(0);
		expect(eSearchFilter.mFromDay).toBeNull();
		expect(eSearchFilter.mToDay).toBeNull();
		expect(eSearchFilter.mBreakfast).toBeNull();
		expect(eSearchFilter.mLunch).toBeNull();
		expect(eSearchFilter.mDinner).toBeNull();
		expect(eSearchFilter.mOffice).toBeNull();
		expect(eSearchFilter.mHoliday).toBeNull();
	});
});

describe('eSettings service test', function() {
	var eSettings;

	// excuted before each "it" is run.
	beforeEach(function() {
		// inject your service for testing.
		// The _underscores_ are a convenience thing
		// so you can have your variable name be the
		// same as your injected service.
		inject(function(_eSettings_) {
			eSettings = _eSettings_;
		});
	});

	it('Should create sEvent: true', function() {
		expect(eSettings.sEvent).toBeDefined();
		expect(eSettings.sEvent).toEqual(true);
	});

	it('Should create sHoliday: true', function() {
		expect(eSettings.sHoliday).toBeDefined();
		expect(eSettings.sHoliday).toEqual(true);
	});

	it('Should create sBirthday: true', function() {
		expect(eSettings.sBirthday).toBeDefined();
		expect(eSettings.sBirthday).toEqual(true);
	});

	it('Should create sLocalCalendar: true', function() {
		expect(eSettings.sLocalCalendar).toBeDefined();
		expect(eSettings.sLocalCalendar).toEqual(true);
	});

	it('Should create sGmailCalendar: true', function() {
		expect(eSettings.sGmailCalendar).toBeDefined();
		expect(eSettings.sGmailCalendar).toEqual(true);
	});

	it('Should create sDefaultView: "month"', function() {
		expect(eSettings.sDefaultView).toBeDefined();
		expect(eSettings.sDefaultView).toEqual('month');
	});

	it('Should create sDayView: "eventList"', function() {
		expect(eSettings.sDayView).toBeDefined();
		expect(eSettings.sDayView).toEqual('eventList');
	});

	it('Should create sFirstDay: "Monday"', function() {
		expect(eSettings.sFirstDay).toBeDefined();
		expect(eSettings.sFirstDay).toEqual('Monday');
	});

	it('Should create sShowWeekNumber: true', function() {
		expect(eSettings.sShowWeekNumber).toBeDefined();
		expect(eSettings.sShowWeekNumber).toEqual(true);
	});

	it('Should create sAutoSync: null', function() {
		expect(eSettings.sAutoSync).toBeDefined();
		expect(eSettings.sAutoSync).toBeNull();
	});

	it('Should create sSyncWith: "both 3G and wifi"', function() {
		expect(eSettings.sSyncWith).toBeDefined();
		expect(eSettings.sSyncWith).toEqual('both 3G and wifi');
	});

	it('Should create sDefaultDuration: 60', function() {
		expect(eSettings.sDefaultDuration).toBeDefined();
		expect(eSettings.sDefaultDuration).toEqual(60);
	});

	it('Should create sDeviceTimeZone: true', function() {
		expect(eSettings.sDeviceTimeZone).toBeDefined();
		expect(eSettings.sDeviceTimeZone).toEqual(true);
	});

	it('Should create sTimeZone: 0', function() {
		expect(eSettings.sTimeZone).toBeDefined();
		expect(eSettings.sTimeZone).toEqual(0);
	});

	it('Should create sInternet: "wifi"', function() {
		expect(eSettings.sInternet).toBeDefined();
		expect(eSettings.sInternet).toEqual('wifi');
	});

	it('resetData Should work', function() {
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

	it('resetData Should work without any change', function() {
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

	it('resetData Should work even if data type went wrong', function() {
		// change data
		eSettings.sEvent = new Array();
		eSettings.sHoliday = new Array();
		eSettings.sBirthday = new Array();
		eSettings.sLocalCalendar = new Array();
		eSettings.sGmailCalendar = new Array();
		eSettings.sDefaultView = new Array();
		eSettings.sDayView = new Array();
		eSettings.sFirstDay = new Array();
		eSettings.sShowWeekNumber = new Array();
		eSettings.sAutoSync = new Array();
		eSettings.sSyncWith = new Array();
		eSettings.sDefaultDuration = new Array();
		eSettings.sDeviceTimeZone = new Array();
		eSettings.sTimeZone = new Array();
		eSettings.sInternet = new Array();

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

describe('eUser service test', function() {
	var eUser;

	// excuted before each "it" is run.
	beforeEach(function() {
		// inject your service for testing.
		// The _underscores_ are a convenience thing
		// so you can have your variable name be the
		// same as your injected service.
		inject(function(_eUser_) {
			eUser = _eUser_;
		});
	});

	it('Should create uID: ""', function() {
		expect(eUser.uID).toBeDefined();
		expect(eUser.uID).toEqual('');
	});

	it('Should create uName: ""', function() {
		expect(eUser.uName).toBeDefined();
		expect(eUser.uName).toEqual('');
	});

	it('Should create uAvatar: "0"', function() {
		expect(eUser.uAvatar).toBeDefined();
		expect(eUser.uAvatar).toEqual('0');
	});

	it('Should create uEmail: ""', function() {
		expect(eUser.uEmail).toBeDefined();
		expect(eUser.uEmail).toEqual('');
	});

	it('Should create uPassword: ""', function() {
		expect(eUser.uPassword).toBeDefined();
		expect(eUser.uPassword).toEqual('');
	});

	it('Should create uRemember: false', function() {
		expect(eUser.uRemember).toBeDefined();
		expect(eUser.uRemember).toEqual(false);
	});

	it('Should create uFriend: []', function() {
		expect(eUser.uFriend).toBeDefined();
		expect(eUser.uFriend).toEqual([]);
	});

	it('Should create uVIP: false', function() {
		expect(eUser.uVIP).toBeDefined();
		expect(eUser.uVIP).toEqual(false);
	});

	it('Should create isLogin: false', function() {
		expect(eUser.isLogin).toBeDefined();
		expect(eUser.isLogin).toEqual(false);
	});

	it('Should create uGmailCalendar: null', function() {
		expect(eUser.uGmailCalendar).toBeDefined();
		expect(eUser.uGmailCalendar).toBeNull();
	});

	it('Should create uLocalCalendar: null', function() {
		expect(eUser.uLocalCalendar).toBeDefined();
		expect(eUser.uLocalCalendar).toBeNull();
	});

	it('Should create uFaceCalendar: null', function() {
		expect(eUser.uFaceCalendar).toBeDefined();
		expect(eUser.uFaceCalendar).toBeNull();
	});

	it('Should create uOutlookCalendar: null', function() {
		expect(eUser.uOutlookCalendar).toBeDefined();
		expect(eUser.uOutlookCalendar).toBeNull();
	});

	it('Should create uFRequest: {}', function() {
		expect(eUser.uFRequest).toBeDefined();
		expect(eUser.uFRequest).toEqual({});
	});

	it('Should create uFAccepted: {}', function() {
		expect(eUser.uFAccepted).toBeDefined();
		expect(eUser.uFAccepted).toEqual({});
	});

	it('Should create uFRLength: 0', function() {
		expect(eUser.uFRLength).toBeDefined();
		expect(eUser.uFRLength).toEqual(0);
	});

	it('Should create uFALength: 0', function() {
		expect(eUser.uFALength).toBeDefined();
		expect(eUser.uFALength).toEqual(0);
	});

	it('resetData Should work', function() {
		// change data
		eUser.uID = 'vdvf';
		eUser.uName = 'dfdg';
		eUser.uAvatar = '3';
		eUser.uEmail = 'ninjameo9x';
		eUser.uPassword = 'dfedfe';
		eUser.uRemember = true;
		eUser.uFriend = ["fgrfg", "dff"];
		eUser.uVIP = true;
		eUser.isLogin = true;
		eUser.uRequested = ["dfdf"];
		eUser.uGmailCalendar = {
			type: "df"
		};
		eUser.uLocalCalendar = {
			name: "sdfef"
		};
		eUser.uFRequest = null;
		eUser.uFAccepted = null;
		eUser.uFRLength = 10;
		eUser.uFALength = 10;

		// resetData
		eUser.resetData();

		// TEST
		expect(eUser.uID).toEqual('');
		expect(eUser.uName).toEqual('');
		expect(eUser.uAvatar).toEqual('0');
		expect(eUser.uEmail).toEqual('');
		expect(eUser.uPassword).toEqual('');
		expect(eUser.uRemember).toEqual(false);
		expect(eUser.uFriend).toEqual([]);
		expect(eUser.uVIP).toEqual(false);
		expect(eUser.isLogin).toEqual(false);
		expect(eUser.uGmailCalendar).toBeNull();
		expect(eUser.uLocalCalendar).toBeNull();
		expect(eUser.uFaceCalendar).toBeNull();
		expect(eUser.uOutlookCalendar).toBeNull();
		expect(eUser.uFRequest).toEqual({});
		expect(eUser.uFAccepted).toEqual({});
		expect(eUser.uFRLength).toEqual(0);
		expect(eUser.uFALength).toEqual(0);
	});

	it('resetData Should work without any change', function() {
		// resetData
		eUser.resetData();

		// TEST
		expect(eUser.uID).toEqual('');
		expect(eUser.uName).toEqual('');
		expect(eUser.uAvatar).toEqual('0');
		expect(eUser.uEmail).toEqual('');
		expect(eUser.uPassword).toEqual('');
		expect(eUser.uRemember).toEqual(false);
		expect(eUser.uFriend).toEqual([]);
		expect(eUser.uVIP).toEqual(false);
		expect(eUser.isLogin).toEqual(false);
		expect(eUser.uGmailCalendar).toBeNull();
		expect(eUser.uLocalCalendar).toBeNull();
		expect(eUser.uFaceCalendar).toBeNull();
		expect(eUser.uOutlookCalendar).toBeNull();
		expect(eUser.uFRequest).toEqual({});
		expect(eUser.uFAccepted).toEqual({});
		expect(eUser.uFRLength).toEqual(0);
		expect(eUser.uFALength).toEqual(0);
	});

	it('resetData Should work even if data type went wrong', function() {
		// change data
		eUser.uID = new Error('message');
		eUser.uName = new Error('message');
		eUser.uAvatar = new Error('message');
		eUser.uEmail = new Error('message');
		eUser.uPassword = new Error('message');
		eUser.uRemember = new Error('message');
		eUser.uFriend = new Error('message');
		eUser.uVIP = new Error('message');
		eUser.isLogin = new Error('message');
		eUser.uRequested = new Error('message');
		eUser.uGmailCalendar = new Error('message');
		eUser.uLocalCalendar = new Error('message');
		eUser.uFRequest = new Error('message');
		eUser.uFAccepted = new Error('message');
		eUser.uFRLength = new Error('message');
		eUser.uFALength = new Error('message');

		// resetData
		eUser.resetData();

		// TEST
		expect(eUser.uID).toEqual('');
		expect(eUser.uName).toEqual('');
		expect(eUser.uAvatar).toEqual('0');
		expect(eUser.uEmail).toEqual('');
		expect(eUser.uPassword).toEqual('');
		expect(eUser.uRemember).toEqual(false);
		expect(eUser.uFriend).toEqual([]);
		expect(eUser.uVIP).toEqual(false);
		expect(eUser.isLogin).toEqual(false);
		expect(eUser.uGmailCalendar).toBeNull();
		expect(eUser.uLocalCalendar).toBeNull();
		expect(eUser.uFaceCalendar).toBeNull();
		expect(eUser.uOutlookCalendar).toBeNull();
		expect(eUser.uFRequest).toEqual({});
		expect(eUser.uFAccepted).toEqual({});
		expect(eUser.uFRLength).toEqual(0);
		expect(eUser.uFALength).toEqual(0);
	});
});

describe('eFriend service test', function() {
	var eFriend;

	// excuted before each "it" is run.
	beforeEach(function() {
		// inject your service for testing.
		// The _underscores_ are a convenience thing
		// so you can have your variable name be the
		// same as your injected service.
		inject(function(_eFriend_) {
			eFriend = _eFriend_;
		});
	});

	it('Should create fName: ""', function() {
		expect(eFriend.fName).toBeDefined();
		expect(eFriend.fName).toEqual('');
	});

	it('Should create fAvatar: 0', function() {
		expect(eFriend.fAvatar).toBeDefined();
		expect(eFriend.fAvatar).toEqual(0);
	});

	it('Should create fVIP: false', function() {
		expect(eFriend.fVIP).toBeDefined();
		expect(eFriend.fVIP).toEqual(false);
	});

	it('Should create fID: ""', function() {
		expect(eFriend.fID).toBeDefined();
		expect(eFriend.fID).toEqual('');
	});

	it('Should create fInfor: null', function() {
		expect(eFriend.fInfor).toBeDefined();
		expect(eFriend.fInfor).toBeNull();
	});

	it('Should create fFriend: {}', function() {
		expect(eFriend.fFriend).toBeDefined();
		expect(eFriend.fFriend).toEqual({});
	});

	it('Should create fMultiCal: null', function() {
		expect(eFriend.fMultiCal).toBeDefined();
		expect(eFriend.fMultiCal).toBeNull();
	});

	it('resetData Should work', function() {
		// change data
		eFriend.fName = '';
		eFriend.fAvatar = 0;
		eFriend.fVIP = false;
		eFriend.fID = '';
		eFriend.fInfor = null;
		eFriend.fFriend = {};
		eFriend.fMultiCal = null;

		// resetData
		eFriend.resetData();

		// TEST
		expect(eFriend.fName).toEqual('');
		expect(eFriend.fAvatar).toEqual(0);
		expect(eFriend.fVIP).toEqual(false);
		expect(eFriend.fID).toEqual('');
		expect(eFriend.fInfor).toBeNull();
		expect(eFriend.fFriend).toEqual({});
		expect(eFriend.fMultiCal).toBeNull();
	});

	it('resetData Should work without any change', function() {
		// resetData
		eFriend.resetData();

		// TEST
		expect(eFriend.fName).toEqual('');
		expect(eFriend.fAvatar).toEqual(0);
		expect(eFriend.fVIP).toEqual(false);
		expect(eFriend.fID).toEqual('');
		expect(eFriend.fInfor).toBeNull();
		expect(eFriend.fFriend).toEqual({});
		expect(eFriend.fMultiCal).toBeNull();
	});

	it('resetData Should work even if data type went wrong', function() {
		// change data
		eFriend.fName = new Text();
		eFriend.fAvatar = new Text();
		eFriend.fVIP = new Text();
		eFriend.fID = new Text();
		eFriend.fInfor = new Text();
		eFriend.fFriend = new Text();
		eFriend.fMultiCal = new Text();

		// resetData
		eFriend.resetData();

		// TEST
		expect(eFriend.fName).toEqual('');
		expect(eFriend.fAvatar).toEqual(0);
		expect(eFriend.fVIP).toEqual(false);
		expect(eFriend.fID).toEqual('');
		expect(eFriend.fInfor).toBeNull();
		expect(eFriend.fFriend).toEqual({});
		expect(eFriend.fMultiCal).toBeNull();
	});
});

describe('eDate service test', function() {
	var eDate;

	// excuted before each "it" is run.
	beforeEach(function() {
		// inject your service for testing.
		// The _underscores_ are a convenience thing
		// so you can have your variable name be the
		// same as your injected service.
		inject(function(_eDate_) {
			eDate = _eDate_;
		});
	});

	it('Should create cDate: null', function() {
		expect(eDate.cDate).toBeDefined();
		expect(eDate.cDate).toBeNull();
	});

	it('resetData Should work', function() {
		// change data
		eDate.cDate = {
			name: "sfcdf"
		};

		// resetData
		eDate.resetData();

		// TEST
		expect(eDate.cDate).toBeNull();
	});

	it('resetData Should work without any change', function() {
		// resetData
		eDate.resetData();

		// TEST
		expect(eDate.cDate).toBeNull();
	});

	it('resetData Should work even if data type went wrong', function() {
		// change data
		eDate.cDate = false;

		// resetData
		eDate.resetData();

		// TEST
		expect(eDate.cDate).toBeNull();
	});
});

describe('ePoint service test', function() {
	var ePoint;

	// excuted before each "it" is run.
	beforeEach(function() {
		// inject your service for testing.
		// The _underscores_ are a convenience thing
		// so you can have your variable name be the
		// same as your injected service.
		inject(function(_ePoint_) {
			ePoint = _ePoint_;
		});
	});

	describe('case 1 normal return 0', function() {
		it('mHour = 0 should return 0', function() {
			var point = ePoint.calPoint(0);

			expect(point).toEqual(0);
		});

		it('mHour = 1 should return 0', function() {
			var point = ePoint.calPoint(1);

			expect(point).toEqual(0);
		});

		it('mHour = 2 should return 0', function() {
			var point = ePoint.calPoint(2);

			expect(point).toEqual(0);
		});

		it('mHour = 3 should return 0', function() {
			var point = ePoint.calPoint(3);

			expect(point).toEqual(0);
		});

		it('mHour = 4 should return 0', function() {
			var point = ePoint.calPoint(4);

			expect(point).toEqual(0);
		});

		it('mHour = 5 should return 0', function() {
			var point = ePoint.calPoint(5);

			expect(point).toEqual(0);
		});
	});

	describe('case 2 normal return 15', function() {
		it('mHour = 6 should return 15', function() {
			var point = ePoint.calPoint(6);

			expect(point).toEqual(15);
		});

		it('mHour = 7 should return 15', function() {
			var point = ePoint.calPoint(7);

			expect(point).toEqual(15);
		});
	});

	describe('case 3 normal return 30', function() {
		it('mHour = 8 should return 30', function() {
			var point = ePoint.calPoint(8);

			expect(point).toEqual(30);
		});

		it('mHour = 9 should return 30', function() {
			var point = ePoint.calPoint(9);

			expect(point).toEqual(30);
		});

		it('mHour = 10 should return 30', function() {
			var point = ePoint.calPoint(10);

			expect(point).toEqual(30);
		});
	});

	describe('case 4 normal return 20', function() {
		it('mHour = 11 should return 20', function() {
			var point = ePoint.calPoint(11);

			expect(point).toEqual(20);
		});

		it('mHour = 12 should return 20', function() {
			var point = ePoint.calPoint(12);

			expect(point).toEqual(20);
		});

		it('mHour = 13 should return 20', function() {
			var point = ePoint.calPoint(13);

			expect(point).toEqual(20);
		});
	});

	describe('case 5 normal return 50', function() {
		it('mHour = 14 should return 50', function() {
			var point = ePoint.calPoint(14);

			expect(point).toEqual(50);
		});

		it('mHour = 15 should return 50', function() {
			var point = ePoint.calPoint(15);

			expect(point).toEqual(50);
		});

		it('mHour = 16 should return 50', function() {
			var point = ePoint.calPoint(16);

			expect(point).toEqual(50);
		});
	});

	describe('case 6 normal return 20', function() {
		it('mHour = 17 should return 20', function() {
			var point = ePoint.calPoint(17);

			expect(point).toEqual(20);
		});

		it('mHour = 18 should return 20', function() {
			var point = ePoint.calPoint(18);

			expect(point).toEqual(20);
		});

		it('mHour = 19 should return 20', function() {
			var point = ePoint.calPoint(19);

			expect(point).toEqual(20);
		});
	});

	describe('case 7 normal return 15', function() {
		it('mHour = 20 should return 15', function() {
			var point = ePoint.calPoint(20);

			expect(point).toEqual(15);
		});

		it('mHour = 21 should return 15', function() {
			var point = ePoint.calPoint(21);

			expect(point).toEqual(15);
		});

		it('mHour = 22 should return 15', function() {
			var point = ePoint.calPoint(22);

			expect(point).toEqual(15);
		});

		it('mHour = 23 should return 15', function() {
			var point = ePoint.calPoint(23);

			expect(point).toEqual(15);
		});
	});

	describe('wrong case that return 0', function() {
		it('mHour < 0 should return 0', function() {
			var point = ePoint.calPoint(0);

			expect(point).toEqual(0);
		});

		it('mHour > 23 should return 0', function() {
			var point = ePoint.calPoint(24);

			expect(point).toEqual(0);
		});

		it('mHour is string should return 0', function() {
			var point = ePoint.calPoint('cat');

			expect(point).toEqual(0);
		});

		it('mHour is double should return 0', function() {
			var point = ePoint.calPoint(1.5);

			expect(point).toEqual(0);
		});

		it('mHour is array should return 0', function() {
			var point = ePoint.calPoint([]);

			expect(point).toEqual(0);
		});

		it('mHour is char should return 0', function() {
			var point = ePoint.calPoint('a');

			expect(point).toEqual(0);
		});

		it('mHour is object should return 0', function() {
			var point = ePoint.calPoint({});

			expect(point).toEqual(0);
		});

		it('mHour is Boolean should return 0', function() {
			var point = ePoint.calPoint(true);

			expect(point).toEqual(0);
		});

		it('mHour is undefiend should return 0', function() {
			var x;
			var point = ePoint.calPoint(x);

			expect(point).toEqual(0);
		});

		it('mHour is null should return 0', function() {
			var point = ePoint.calPoint(null);

			expect(point).toEqual(0);
		});
	});
});

describe('eToast service test', function() {
	var eToast;
	var toastrFake, toastrConfigFake;

	// fake services
	var toastrFake = {
		success: function(message, object) {},
		info: function(message, object) {},
		error: function(message, object) {},
		warning: function(message, object) {},
	};

	var toastrConfigFake = {
		allowHtml: true,
		positionClass: '',
		tapToDismiss: true,
		newestOnTop: true,
		extendedTimeOut: 0,
		preventDuplicates: false,
		maxOpened: 0,
		onShown: null,
		onHidden: null,
	};

	// excuted before each "it" is run.
	beforeEach(function() {
		module('MainApp.shareds.application', function($provide) {
			$provide.value('toastr', toastrFake);
			$provide.value('toastrConfig', toastrConfigFake);
		});

		// inject your service for testing.
		// The _underscores_ are a convenience thing
		// so you can have your variable name be the
		// same as your injected service.
		inject(function(_eToast_) {
			eToast = _eToast_;
		});
	});

	// excuted after each "it" is run.
	afterEach(function() {
		toastrConfigFake.allowHtml = true;
		toastrConfigFake.positionClass = '';
		toastrConfigFake.tapToDismiss = true;
		toastrConfigFake.newestOnTop = true;
		toastrConfigFake.extendedTimeOut = 0;
		toastrConfigFake.preventDuplicates = false;
		toastrConfigFake.maxOpened = 0;
		toastrConfigFake.onShown = null;
		toastrConfigFake.onHidden = null;
	});

	describe('toastSuccess test', function() {
		it('toastSuccess should call toastr.success', function() {
			spyOn(toastrFake, 'success')
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccess(message, delay);

			expect(toastrFake.success).toHaveBeenCalled();
		});

		it('toastSuccess should call toastr.success with right parameter', function() {
			spyOn(toastrFake, 'success')
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccess(message, delay);

			expect(toastrFake.success).toHaveBeenCalledWith("demo toast", {
				timeOut: 0
			});
		});

		it('toastSuccess should allow HTML', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccess(message, delay);

			expect(toastrConfigFake.allowHtml).toBe(true);
		});

		it('toastSuccess should config class correctly', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccess(message, delay);

			expect(toastrConfigFake.positionClass).toEqual('easi-toast-success');
		});

		it('toastSuccess should be able to tab to dismis', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccess(message, delay);

			expect(toastrConfigFake.tapToDismiss).toBe(true);
		});

		it('new toastSuccess should be on top', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccess(message, delay);

			expect(toastrConfigFake.newestOnTop).toBe(true);
		});

		it('toastSuccess display 1 second after hover', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccess(message, delay);

			expect(toastrConfigFake.extendedTimeOut).toEqual(1000);
		});

		it('toastSuccess should not prevent Duplicate', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccess(message, delay);

			expect(toastrConfigFake.preventDuplicates).toBe(false);
		});

		it('toastSuccess should be able to open many as users want', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccess(message, delay);

			expect(toastrConfigFake.maxOpened).toEqual(0);
		});

		it('onShown toastSuccess action should be null', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccess(message, delay);

			expect(toastrConfigFake.onShown).toBeNull();
		});

		it('onHidden toastSuccess action should be null', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccess(message, delay);

			expect(toastrConfigFake.onHidden).toBeNull();
		});
	});

	describe('toastSuccessOne test', function() {
		it('toastSuccessOne should call toastr.success', function() {
			spyOn(toastrFake, 'success')
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccessOne(message, delay);

			expect(toastrFake.success).toHaveBeenCalled();
		});

		it('toastSuccessOne should call toastr.success with right parameter', function() {
			spyOn(toastrFake, 'success')
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccessOne(message, delay);

			expect(toastrFake.success).toHaveBeenCalledWith("demo toast", {
				timeOut: 0
			});
		});

		it('toastSuccessOne should allow HTML', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccessOne(message, delay);

			expect(toastrConfigFake.allowHtml).toBe(true);
		});

		it('toastSuccessOne should config class correctly', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccessOne(message, delay);

			expect(toastrConfigFake.positionClass).toEqual('easi-toast-success');
		});

		it('toastSuccessOne should be able to tab to dismis', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccessOne(message, delay);

			expect(toastrConfigFake.tapToDismiss).toBe(true);
		});

		it('new toastSuccessOne should be on top', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccessOne(message, delay);

			expect(toastrConfigFake.newestOnTop).toBe(true);
		});

		it('toastSuccessOne display 1 second after hover', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccessOne(message, delay);

			expect(toastrConfigFake.extendedTimeOut).toEqual(1000);
		});

		it('toastSuccessOne should not prevent Duplicate', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccessOne(message, delay);

			expect(toastrConfigFake.preventDuplicates).toBe(false);
		});

		it('toastSuccessOne should be able to open once in the screen', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccessOne(message, delay);

			expect(toastrConfigFake.maxOpened).toEqual(1);
		});

		it('onShown toastSuccessOne action should change preventDuplicates to true', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccessOne(message, delay);

			toastrConfigFake.onShown();

			expect(toastrConfigFake.preventDuplicates).toBe(true);
		});

		it('onHidden toastSuccessOne action should change preventDuplicates to false', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccessOne(message, delay);

			toastrConfigFake.onHidden();

			expect(toastrConfigFake.preventDuplicates).toBe(false);
		});
	});

	describe('toastInfo test', function() {
		it('toastInfo should call toastr.info', function() {
			spyOn(toastrFake, 'info')
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfo(message, delay);

			expect(toastrFake.info).toHaveBeenCalled();
		});

		it('toastInfo should call toastr.info with right parameter', function() {
			spyOn(toastrFake, 'info')
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfo(message, delay);

			expect(toastrFake.info).toHaveBeenCalledWith("demo toast", {
				timeOut: 0
			});
		});

		it('toastInfo should allow HTML', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfo(message, delay);

			expect(toastrConfigFake.allowHtml).toBe(true);
		});

		it('toastInfo should config class correctly', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfo(message, delay);

			expect(toastrConfigFake.positionClass).toEqual('easi-toast-info');
		});

		it('toastInfo should be able to tab to dismis', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfo(message, delay);

			expect(toastrConfigFake.tapToDismiss).toBe(true);
		});

		it('new toastInfo should be on top', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfo(message, delay);

			expect(toastrConfigFake.newestOnTop).toBe(true);
		});

		it('toastInfo display 1 second after hover', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfo(message, delay);

			expect(toastrConfigFake.extendedTimeOut).toEqual(1000);
		});

		it('toastInfo should not prevent Duplicate', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfo(message, delay);

			expect(toastrConfigFake.preventDuplicates).toBe(false);
		});

		it('toastInfo should be able to open many as users want', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfo(message, delay);

			expect(toastrConfigFake.maxOpened).toEqual(0);
		});

		it('onShown toastInfo action should be null', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfo(message, delay);

			expect(toastrConfigFake.onShown).toBeNull();
		});

		it('onHidden toastInfo action should be null', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfo(message, delay);

			expect(toastrConfigFake.onHidden).toBeNull();
		});
	});

	describe('toastInfoOne test', function() {
		it('toastInfoOne should call toastr.info', function() {
			spyOn(toastrFake, 'info')
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfoOne(message, delay);

			expect(toastrFake.info).toHaveBeenCalled();
		});

		it('toastInfoOne should call toastr.info with right parameter', function() {
			spyOn(toastrFake, 'info')
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfoOne(message, delay);

			expect(toastrFake.info).toHaveBeenCalledWith("demo toast", {
				timeOut: 0
			});
		});

		it('toastInfoOne should allow HTML', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfoOne(message, delay);

			expect(toastrConfigFake.allowHtml).toBe(true);
		});

		it('toastInfoOne should config class correctly', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfoOne(message, delay);

			expect(toastrConfigFake.positionClass).toEqual('easi-toast-info');
		});

		it('toastInfoOne should be able to tab to dismis', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfoOne(message, delay);

			expect(toastrConfigFake.tapToDismiss).toBe(true);
		});

		it('new toastInfoOne should be on top', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfoOne(message, delay);

			expect(toastrConfigFake.newestOnTop).toBe(true);
		});

		it('toastInfoOne display 1 second after hover', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfoOne(message, delay);

			expect(toastrConfigFake.extendedTimeOut).toEqual(1000);
		});

		it('toastInfoOne should not prevent Duplicate', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfoOne(message, delay);

			expect(toastrConfigFake.preventDuplicates).toBe(false);
		});

		it('toastInfoOne should be able to open once in the screen', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfoOne(message, delay);

			expect(toastrConfigFake.maxOpened).toEqual(1);
		});

		it('onShown toastInfoOne action should change preventDuplicates to true', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfoOne(message, delay);

			toastrConfigFake.onShown();

			expect(toastrConfigFake.preventDuplicates).toBe(true);
		});

		it('onHidden toastInfoOne action should change preventDuplicates to false', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfoOne(message, delay);

			toastrConfigFake.onHidden();

			expect(toastrConfigFake.preventDuplicates).toBe(false);
		});
	});

	describe('toastError test', function() {
		it('toastError should call toastr.error', function() {
			spyOn(toastrFake, 'error')
			var message = "demo toast";
			var delay = 0;

			eToast.toastError(message, delay);

			expect(toastrFake.error).toHaveBeenCalled();
		});

		it('toastError should call toastr.error with right parameter', function() {
			spyOn(toastrFake, 'error')
			var message = "demo toast";
			var delay = 0;

			eToast.toastError(message, delay);

			expect(toastrFake.error).toHaveBeenCalledWith("demo toast", {
				timeOut: 0
			});
		});

		it('toastError should allow HTML', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastError(message, delay);

			expect(toastrConfigFake.allowHtml).toBe(true);
		});

		it('toastError should config class correctly', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastError(message, delay);

			expect(toastrConfigFake.positionClass).toEqual('easi-toast-error');
		});

		it('toastError should be able to tab to dismis', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastError(message, delay);

			expect(toastrConfigFake.tapToDismiss).toBe(true);
		});

		it('new toastError should be on top', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastError(message, delay);

			expect(toastrConfigFake.newestOnTop).toBe(true);
		});

		it('toastError display 1 second after hover', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastError(message, delay);

			expect(toastrConfigFake.extendedTimeOut).toEqual(1000);
		});

		it('toastError should not prevent Duplicate', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastError(message, delay);

			expect(toastrConfigFake.preventDuplicates).toBe(false);
		});

		it('toastError should be able to open many as users want', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastError(message, delay);

			expect(toastrConfigFake.maxOpened).toEqual(0);
		});

		it('onShown toastError action should be null', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastError(message, delay);

			expect(toastrConfigFake.onShown).toBeNull();
		});

		it('onHidden toastError action should be null', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastError(message, delay);

			expect(toastrConfigFake.onHidden).toBeNull();
		});
	});

	describe('toastErrorOne test', function() {
		it('toastErrorOne should call toastr.error', function() {
			spyOn(toastrFake, 'error')
			var message = "demo toast";
			var delay = 0;

			eToast.toastErrorOne(message, delay);

			expect(toastrFake.error).toHaveBeenCalled();
		});

		it('toastErrorOne should call toastr.error with right parameter', function() {
			spyOn(toastrFake, 'error')
			var message = "demo toast";
			var delay = 0;

			eToast.toastErrorOne(message, delay);

			expect(toastrFake.error).toHaveBeenCalledWith("demo toast", {
				timeOut: 0
			});
		});

		it('toastErrorOne should allow HTML', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastErrorOne(message, delay);

			expect(toastrConfigFake.allowHtml).toBe(true);
		});

		it('toastErrorOne should config class correctly', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastErrorOne(message, delay);

			expect(toastrConfigFake.positionClass).toEqual('easi-toast-error');
		});

		it('toastErrorOne should be able to tab to dismis', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastErrorOne(message, delay);

			expect(toastrConfigFake.tapToDismiss).toBe(true);
		});

		it('new toastErrorOne should be on top', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastErrorOne(message, delay);

			expect(toastrConfigFake.newestOnTop).toBe(true);
		});

		it('toastErrorOne display 1 second after hover', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastErrorOne(message, delay);

			expect(toastrConfigFake.extendedTimeOut).toEqual(1000);
		});

		it('toastErrorOne should not prevent Duplicate', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastErrorOne(message, delay);

			expect(toastrConfigFake.preventDuplicates).toBe(false);
		});

		it('toastErrorOne should be able to open once in the screen', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastErrorOne(message, delay);

			expect(toastrConfigFake.maxOpened).toEqual(1);
		});

		it('onShown toastErrorOne action should change preventDuplicates to true', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastErrorOne(message, delay);

			toastrConfigFake.onShown();

			expect(toastrConfigFake.preventDuplicates).toBe(true);
		});

		it('onHidden toastErrorOne action should change preventDuplicates to false', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastErrorOne(message, delay);

			toastrConfigFake.onHidden();

			expect(toastrConfigFake.preventDuplicates).toBe(false);
		});
	});

	describe('toastWarning test', function() {
		it('toastWarning should call toastr.warning', function() {
			spyOn(toastrFake, 'warning')
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarning(message, delay);

			expect(toastrFake.warning).toHaveBeenCalled();
		});

		it('toastWarning should call toastr.warning with right parameter', function() {
			spyOn(toastrFake, 'warning')
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarning(message, delay);

			expect(toastrFake.warning).toHaveBeenCalledWith("demo toast", {
				timeOut: 0
			});
		});

		it('toastWarning should allow HTML', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarning(message, delay);

			expect(toastrConfigFake.allowHtml).toBe(true);
		});

		it('toastWarning should config class correctly', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarning(message, delay);

			expect(toastrConfigFake.positionClass).toEqual('easi-toast-warning');
		});

		it('toastWarning should be able to tab to dismis', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarning(message, delay);

			expect(toastrConfigFake.tapToDismiss).toBe(true);
		});

		it('new toastWarning should be on top', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarning(message, delay);

			expect(toastrConfigFake.newestOnTop).toBe(true);
		});

		it('toastWarning display 1 second after hover', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarning(message, delay);

			expect(toastrConfigFake.extendedTimeOut).toEqual(1000);
		});

		it('toastWarning should not prevent Duplicate', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarning(message, delay);

			expect(toastrConfigFake.preventDuplicates).toBe(false);
		});

		it('toastWarning should be able to open many as users want', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarning(message, delay);

			expect(toastrConfigFake.maxOpened).toEqual(0);
		});

		it('onShown toastWarning action should be null', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarning(message, delay);

			expect(toastrConfigFake.onShown).toBeNull();
		});

		it('onHidden toastWarning action should be null', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarning(message, delay);

			expect(toastrConfigFake.onHidden).toBeNull();
		});
	});

	describe('toastWarningOne test', function() {
		it('toastWarningOne should call toastr.warning', function() {
			spyOn(toastrFake, 'warning')
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarningOne(message, delay);

			expect(toastrFake.warning).toHaveBeenCalled();
		});

		it('toastWarningOne should call toastr.warning with right parameter', function() {
			spyOn(toastrFake, 'warning')
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarningOne(message, delay);

			expect(toastrFake.warning).toHaveBeenCalledWith("demo toast", {
				timeOut: 0
			});
		});

		it('toastWarningOne should allow HTML', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarningOne(message, delay);

			expect(toastrConfigFake.allowHtml).toBe(true);
		});

		it('toastWarningOne should config class correctly', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarningOne(message, delay);

			expect(toastrConfigFake.positionClass).toEqual('easi-toast-warning');
		});

		it('toastWarningOne should be able to tab to dismis', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarningOne(message, delay);

			expect(toastrConfigFake.tapToDismiss).toBe(true);
		});

		it('new toastWarningOne should be on top', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarningOne(message, delay);

			expect(toastrConfigFake.newestOnTop).toBe(true);
		});

		it('toastWarningOne display 1 second after hover', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarningOne(message, delay);

			expect(toastrConfigFake.extendedTimeOut).toEqual(1000);
		});

		it('toastWarningOne should not prevent Duplicate', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarningOne(message, delay);

			expect(toastrConfigFake.preventDuplicates).toBe(false);
		});

		it('toastWarningOne should be able to open once in the screen', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarningOne(message, delay);

			expect(toastrConfigFake.maxOpened).toEqual(1);
		});

		it('onShown toastWarningOne action should change preventDuplicates to true', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarningOne(message, delay);

			toastrConfigFake.onShown();

			expect(toastrConfigFake.preventDuplicates).toBe(true);
		});

		it('onHidden toastWarningOne action should change preventDuplicates to false', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarningOne(message, delay);

			toastrConfigFake.onHidden();

			expect(toastrConfigFake.preventDuplicates).toBe(false);
		});
	});
});

describe('eCheckFriend service test', function() {
	var eCheckFriend;
	var eUserFake;

	// fake services
	var eUserFake = {
		uFriend: {},
		uRequested: {},
	};

	// excuted before each "it" is run.
	beforeEach(function() {
		module('MainApp.shareds.application', function($provide) {
			$provide.value('eUser', eUserFake);
		});

		// inject your service for testing.
		// The _underscores_ are a convenience thing
		// so you can have your variable name be the
		// same as your injected service.
		inject(function(_eCheckFriend_) {
			eCheckFriend = _eCheckFriend_;
		});
	});

	describe('isFriend function test', function() {
		afterEach(function() {
			eUserFake.uFriend = {};
		});

		it('Should return false if eUserFake.uFriend == null', function() {
			eUserFake.uFriend = null;
			id = "catdz95";

			var check = eCheckFriend.isFriend(id);

			expect(check).toBe(false);
		});

		it('Should return false if eUserFake.uFriend[] is undefined', function() {
			eUserFake.uFriend["catdz9x"] = {name: "Cat Can"};
			id = "catdz95";

			var check = eCheckFriend.isFriend(id);

			expect(check).toBe(false);
		});

		it('Should return true if eUserFake.uFriend[] is defined', function() {
			eUserFake.uFriend["catdz9x"] = {name: "Cat Can"};
			id = "catdz9x";

			var check = eCheckFriend.isFriend(id);

			expect(check).toBe(true);
		});
	});

	describe('isRequested function test', function() {
		afterEach(function() {
			eUserFake.uRequested = {};
		});

		it('Should return false if eUserFake.uRequested == null', function() {
			eUserFake.uRequested = null;
			id = "catdz95";

			var check = eCheckFriend.isRequested(id);

			expect(check).toBe(false);
		});

		it('Should return false if eUserFake.uRequested[] is undefined', function() {
			eUserFake.uRequested["catdz9x"] = {name: "Cat Can"};
			id = "catdz95";

			var check = eCheckFriend.isRequested(id);

			expect(check).toBe(false);
		});

		it('Should return true if eUserFake.uRequested[] is defined', function() {
			eUserFake.uRequested["catdz9x"] = {name: "Cat Can"};
			id = "catdz9x";

			var check = eCheckFriend.isRequested(id);

			expect(check).toBe(true);
		});
	});
});
