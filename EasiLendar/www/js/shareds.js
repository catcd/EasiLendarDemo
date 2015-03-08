/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 09/03/2015
 * type: module all shared variables and functions
 */

angular.module('MainApp.shareds', [])

.run(function($rootScope, $ionicPopup) {
	/**
	 * All shared variables
	 */
	// Search filter variables
	// Ngo Duc Dung
	$rootScope.eSearchFilter = {
		mTitle : '',	/*Name of meeting*/
		mDuration : 0,	/*Duration of meeting */
		mLocation : '',	/*Location of meeting*/

		mFrom : 0,		/*Time to start searching: Minute(s) from 24:00am*/
		mTo : 0,		/*Time to end searching: Minute(s) from 24:00am*/
		mFromDay : '',	/*Day to start searching: format: ddmmyy*/
		mToDay : '',	/*Day to end searching: format: ddmmyy*/

		mBreakfast : null,	/*Avoid/Prioritize*/
		mLunch : null,		/*avoid = true;*/
		mDinner : null,		/*prioritize = false ;*/
		mOffice	: null,		/*none(default) = null;*/
		mHoliday : null	/**/
	};

	// Setting variables
	// Can Duy Cat
	$rootScope.eSettings = {
		sEvent : true, 			/*Show/hide event*/
		sHoliday : true,		/*Show/hide holiday*/
		sBirthday : true,		/*Show/hide friend's birthday*/
		sLocalCalendar : true,	/*Use (or not) local calendar*/
		sGmailCalendar : true,	/*Use (or not) Gmail calendar*/

		sAutoSync : null,	/*Auto sync (not supported now)*/
		sWifiSync : null,	/*Sync with wifi (not supported now)*/
		s3GSync : null,		/*Sync with 3G (not supported now)*/

		sDefaultView : 'month',	/*enum{"day", "week", "month", "list") calendar on home page*/
		sDayView : 'eventList', /*enum{"timeGrid", "eventList") day calendar*/
		sFirstDay : 'Monday',	/*enum{"Saturday", "Sunday", "Monday") first day of week*/

		sDeviceTimeZone : true,	/*Use the time zone of device or not*/
		sTimeZone : 0,			/*UTC integer from -12 to +14*/

		sDefaultDuration : 60,	/*new event take place in sDefaultDuration minute(s)*/
		sShowWeekNumber : true,	/*Show week number option*/
		sInternet : 'none'		/*enum{"wifi", "3G", "none"} Check device conection*/
	};

	// User information
	// Nguyen Minh Trang
	$rootScope.eUser = {
		uID : '', 			/*4-15 characters (A-Z, a-z, 0-9, _), unique*/
		uName : '', 		/*UTF-8*/
		uEmail : '',		/*gmail*/
		uPassword : '',		/*8-16 characters*/
		uRemember : false,	/*remember me*/
		uFriend : [],		/*array of objects { id, name }*/

		uGmailCalendar : null,	/*Google API JSON	Calendar*/
		uLocalCalendar : null,	/*Google API JSON	Calendar*/
	};

	// Friend's information
	// Nguyen Minh Trang
	$rootScope.eFriend = {
		fName : '', 			/*UTF-8*/
		fGmailCalendar : null,	/*Google API JSON	Calendar*/
		fLocalCalendar : null,	/*Google API JSON	Calendar*/
	}

	// Show event
	// Can Duy Cat
	// Everyone else
	$rootScope.eShowEvent = {
		wShow : true,	/*show = true; hide = false.*/
		wEvent : null,	/*List of all event(s) will be shown in calendar*/

	}

	/**
	 * All functions
	 */
	// Popup
	$rootScope.showPopup = function(mtitle, url) {
		var confirmPopup = $ionicPopup.confirm({
			title: mtitle,
			templateUrl: url
		});
		confirmPopup.then(function(res) {
			if (res) {
				// TODO ok
			} else {
				// TODO cancel
			}
		});
	}
	$rootScope.showAlert = function(mtitle, url) {
		var confirmPopup = $ionicPopup.alert({
			title: mtitle,
			templateUrl: url
		});
	}
})