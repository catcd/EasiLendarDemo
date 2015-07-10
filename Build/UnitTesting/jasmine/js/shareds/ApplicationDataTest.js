/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 09/05/2015
 * type: test data services
 * test: 80 specs
 */

// load the module.
beforeEach(module('MainApp.shareds.data'));

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

    it('Should create sFaceCalendar: true', function() {
        expect(eSettings.sFaceCalendar).toBeDefined();
        expect(eSettings.sFaceCalendar).toEqual(true);
    });

    it('Should create sOutlookCalendar: true', function() {
        expect(eSettings.sOutlookCalendar).toBeDefined();
        expect(eSettings.sOutlookCalendar).toEqual(true);
    });

    it('Should create sDefaultView: "month"', function() {
        expect(eSettings.sDefaultView).toBeDefined();
        expect(eSettings.sDefaultView).toEqual('month');
    });

    it('Should create sDayView: "eventList"', function() {
        expect(eSettings.sDayView).toBeDefined();
        expect(eSettings.sDayView).toEqual('eventList');
    });

    it('Should create sMonthView: "eventList"', function() {
        expect(eSettings.sMonthView).toBeDefined();
        expect(eSettings.sMonthView).toEqual('eventList');
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
        eSettings.sFaceCalendar = false;
        eSettings.sOutlookCalendar = false;

        eSettings.sDefaultView = 'week';
        eSettings.sDayView = 'dayGrid';
        eSettings.sMonthView = 'dayGrid';
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
        expect(eSettings.sFaceCalendar).toBe(true);
        expect(eSettings.sOutlookCalendar).toBe(true);
        expect(eSettings.sDefaultView).toEqual('month');
        expect(eSettings.sDayView).toEqual('eventList');
        expect(eSettings.sMonthView).toEqual('eventList');
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
        expect(eSettings.sFaceCalendar).toBe(true);
        expect(eSettings.sOutlookCalendar).toBe(true);
        expect(eSettings.sDefaultView).toEqual('month');
        expect(eSettings.sDayView).toEqual('eventList');
        expect(eSettings.sMonthView).toEqual('eventList');
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
        eSettings.sFaceCalendar = new Array();
        eSettings.sOutlookCalendar = new Array();
        eSettings.sDefaultView = new Array();
        eSettings.sDayView = new Array();
        eSettings.sMonthView = new Array();
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
        expect(eSettings.sFaceCalendar).toBe(true);
        expect(eSettings.sOutlookCalendar).toBe(true);
        expect(eSettings.sDefaultView).toEqual('month');
        expect(eSettings.sDayView).toEqual('eventList');
        expect(eSettings.sMonthView).toEqual('eventList');
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

    it('Should create uGender: ""', function() {
        expect(eUser.uGender).toBeDefined();
        expect(eUser.uGender).toBeNull();
    });

    it('Should create uBirthday: ""', function() {
        expect(eUser.uBirthday).toBeDefined();
        expect(eUser.uBirthday).toBeNull();
    });

    it('Should create uPhone: ""', function() {
        expect(eUser.uPhone).toBeDefined();
        expect(eUser.uPhone).toBeNull();
    });

    it('Should create uAddress: ""', function() {
        expect(eUser.uAddress).toBeDefined();
        expect(eUser.uAddress).toBeNull();
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

    it('Should create uTodo: ""', function() {
        expect(eUser.uTodo).toBeDefined();
        expect(eUser.uTodo).toBeNull();
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

        eUser.uGender = 'dfedfe';
        eUser.uBirthday = 'dzzgdfgzd';
        eUser.uPhone = 'dfedgggzdfe';
        eUser.uAddress = 'dfedgzdgfe';

        eUser.uRemember = true;
        eUser.uFriend = ["fgrfg", "dff"];
        eUser.uVIP = true;
        eUser.isLogin = true;
        eUser.uRequested = ["dfdf"];
        eUser.uTodo = {
            name: "sdfef"
        };
        eUser.uGmailCalendar = {
            type: "df"
        };
        eUser.uLocalCalendar = {
            name: "sdfef"
        };
        eUser.uFaceCalendar = {
            type: "df"
        };
        eUser.uOutlookCalendar = {
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
        expect(eUser.uGender).toBeNull();
        expect(eUser.uBirthday).toBeNull();
        expect(eUser.uPhone).toBeNull();
        expect(eUser.uAddress).toBeNull();
        expect(eUser.uRemember).toEqual(false);
        expect(eUser.uFriend).toEqual([]);
        expect(eUser.uVIP).toEqual(false);
        expect(eUser.isLogin).toEqual(false);
        expect(eUser.uTodo).toBeNull();
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
        expect(eUser.uGender).toBeNull();
        expect(eUser.uBirthday).toBeNull();
        expect(eUser.uPhone).toBeNull();
        expect(eUser.uAddress).toBeNull();
        expect(eUser.uRemember).toEqual(false);
        expect(eUser.uFriend).toEqual([]);
        expect(eUser.uVIP).toEqual(false);
        expect(eUser.isLogin).toEqual(false);
        expect(eUser.uTodo).toBeNull();
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
        eUser.uID = new Image();

        eUser.uName = new Image();
        eUser.uAvatar = new Image();
        eUser.uEmail = new Image();
        eUser.uPassword = new Image();

        eUser.uGender = new Image();
        eUser.uBirthday = new Image();
        eUser.uPhone = new Image();
        eUser.uAddress = new Image();

        eUser.uRemember = new Image();
        eUser.uFriend = new Image();
        eUser.uVIP = new Image();
        eUser.isLogin = new Image();
        eUser.uRequested = new Image();
        eUser.uTodo = new Image();

        eUser.uGmailCalendar = new Image();
        eUser.uLocalCalendar = new Image();
        eUser.uFaceCalendar = new Image();
        eUser.uOutlookCalendar = new Image();

        eUser.uFRequest = new Image();
        eUser.uFAccepted = new Image();
        eUser.uFRLength = new Image();
        eUser.uFALength = new Image();

        // resetData
        eUser.resetData();

        // TEST
        expect(eUser.uID).toEqual('');
        expect(eUser.uName).toEqual('');
        expect(eUser.uAvatar).toEqual('0');
        expect(eUser.uEmail).toEqual('');
        expect(eUser.uPassword).toEqual('');
        expect(eUser.uGender).toBeNull();
        expect(eUser.uBirthday).toBeNull();
        expect(eUser.uPhone).toBeNull();
        expect(eUser.uAddress).toBeNull();
        expect(eUser.uRemember).toEqual(false);
        expect(eUser.uFriend).toEqual([]);
        expect(eUser.uVIP).toEqual(false);
        expect(eUser.isLogin).toEqual(false);
        expect(eUser.uTodo).toBeNull();
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
        eFriend.fName = new Array();
        eFriend.fAvatar = new Array();
        eFriend.fVIP = new Array();
        eFriend.fID = new Array();
        eFriend.fInfor = new Array();
        eFriend.fFriend = new Array();
        eFriend.fMultiCal = new Array();

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

describe('eTodo service test', function() {
    var eTodo;

    // excuted before each "it" is run.
    beforeEach(function() {
        // inject your service for testing.
        // The _underscores_ are a convenience thing
        // so you can have your variable name be the
        // same as your injected service.
        inject(function(_eTodo_) {
            eTodo = _eTodo_;
        });
    });

    it('Should create tChecklist', function() {
        expect(eTodo.tChecklist).toBeDefined();
    });

    it('tChecklist should contain more than 1 checklist', function() {
        expect(eTodo.tChecklist.length).toBeGreaterThan(1);
    });

    it('resetData Should work', function() {
        // change data
        eTodo.tChecklist = [{
            name: "sfcdf"
        }, {
            name: "sfcdf"
        }, ];

        // resetData
        eTodo.resetData();

        // TEST
        expect(eTodo.tChecklist).toEqual([]);
    });

    it('resetData Should work without any change', function() {
        // resetData
        eTodo.resetData();

        // TEST
        expect(eTodo.tChecklist).toEqual([]);
    });

    it('resetData Should work even if data type went wrong', function() {
        // change data
        eTodo.tChecklist = false;

        // resetData
        eTodo.resetData();

        // TEST
        expect(eTodo.tChecklist).toEqual([]);
    });
});
