/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 17/07/2015
 * type: module all shared variables used for this app
 */

var data = angular.module('MainApp.shareds.data', []);
// Search filter variables
data.factory('eSearchFilter', function() {
	return {
		mTitle: '',		// Name of meeting
		mDuration: 0,	// Duration of meeting
		mLocation: '',	// Location of meeting

		mFrom: 0,		// Time to start searching: Minute(s) from 24:00am
		mTo: 0,			// Time to end searching: Minute(s) from 24:00am
		mFromDay: null,	// Day to start searching: format: ddmmyy
		mToDay: null,	// Day to end searching: format: ddmmyy

		mBreakfast: null,	// Avoid/Prioritize
		mLunch: null,		// avoid = true;
		mDinner: null,		// prioritize = false ;
		mOffice: null,		// none(default) = null;
		mHoliday: null,

		resetData: function() {
			this.mTitle = '';
			this.mDuration = 0;
			this.mLocation = '';

			this.mFrom = 0;
			this.mTo = 0;
			this.mFromDay = null;
			this.mToDay = null;

			this.mBreakfast = null;
			this.mLunch = null;
			this.mDinner = null;
			this.mOffice = null;
			this.mHoliday = null;
		}
	};
});

// Setting variables
data.factory('eSettings', function(){
	return {
		sLocalCalendar: true,		// Use (or not) local calendar
		sEasiLendarCalendar: true,	// Use (or not) Gmail calendar
		sGmailCalendar: true,		// Use (or not) Gmail calendar
		sOutlookCalendar: true,		// Use (or not) Facebook calendar

		sFirstDay: 'Monday',		// enum{'Saturday', 'Sunday', 'Monday'}
		sDefaultView: 'month',		// enum{'day', 'week', 'month', 'list'}
		sMonthView: 'eventList',	// enum{'timeGrid', 'eventList'}

		sAutoSync: true,			// Auto sync (not supported now)
		sTimeZone: 0,				// UTC integer from -12 to +14
		sInternet: true,			// true/false

		resetData: function(){
			this.sLocalCalendar = true;
			this.sEasilendarCalendar = true;
			this.sGmailCalendar = true;
			this.sOutlookCalendar = true;

			this.sFirstDay = 'Monday';
			this.sDefaultView = 'month';
			this.sMonthView = 'eventList';

			this.sAutoSync = true;
			this.sTimeZone = 0;
			this.sInternet = true;
		}
	};
});

// User information
data.factory('eUser', function(){
	return {
		uID: '',			// A-Z, a-z, 0-9, _
		uPassword: '',		// printable char in ASCII
		uName: '',			// printable char in ASCII
		uAvatar: '0',
		uEmail: '',			// gmail without @gmail.com
		uGender: '',		// male or female
		uBirthday: null,	// obj Date
		uPhone: '',
		uAddress: '',

		uIsDoneFriend: false,
		uIsDoneNoti: false,

		uRemember: false,
		uFriend: [],		// Associative array of { id, name }
		isLogin: false,

		uCalendar: null,	// Associative array

		uRequested: {},
		uFRequest: {},	// List of requests
		uFAccepted: {},	// List of requests accepted
		uFRLength: 0,
		uFALength: 0,

		resetData: function(){
			this.uID = '';
			this.uPassword = '';
			this.uName = '';
			this.uAvatar = '0';
			this.uEmail = '';
			this.uGender = '';
			this.uBirthday = null;
			this.uPhone = '';
			this.uAddress = '';

			this.uIsDoneFriend = false;
			this.uIsDoneNoti = false;

			this.uRemember = false;
			this.uFriend = [];
			this.isLogin = false;

			this.uCalendar = null;

			this.uRequested = {};
			this.uFRequest = {};
			this.uFAccepted = {};
			this.uFRLength = 0;
			this.uFALength = 0;
		}
	};
});

// Friend's information
data.factory('eFriend', function(){
	return {
		fName: '',
		fAvatar: '0',
		fID: '',
		fInfor: null,
		fFriend: {},

		fBusy: true,
		fMultiCal: null,	// MultiCalendar object, BusiEvent only

		resetData: function(){
			this.fName = '';
			this.fAvatar = '0';
			this.fID = '';
			this.fInfor = null;
			this.fFriend = {};

			this.fBusy = true;
			this.fMultiCal = null;
		}
	};
});