/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 10/03/2015
 * type: module all shared variables and functions
 */

angular.module('MainApp.shareds', [])

.run(function($rootScope, $ionicPopup, $timeout) {
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

		sDefaultView : 'month',	/*enum{"day", "week", "month", "list") calendar on home page*/
		sDayView : 'eventList', /*enum{"timeGrid", "eventList") day calendar*/
		sFirstDay : 'Monday',	/*enum{"Saturday", "Sunday", "Monday") first day of week*/
		sShowWeekNumber : true,	/*Show week number option*/

		sAutoSync : null,	/*Auto sync (not supported now)*/
		sSyncWith : 'both 3G and wifi',	/*enum{"wifi only", "both 3G and wifi") Sync with (not supported now)*/

		sDeviceTimeZone : true,	/*Use the time zone of device or not*/
		sTimeZone : 7,			/*UTC integer from -12 to +14*/
		sZoneName : ["UTC-12:00 Baker Island, Howland Island",
					"UTC-11:00 American Samoa, Niue",
					"UTC-10:00 United States (Hawaii)",
					"UTC-09:00 Gambier Islands",
					"UTC-08:00 Baja California, Pacific Time",
					"UTC-07:00 Mexico (Sonora), United States (Arizona)",
					"UTC-06:00 Costa Rica, Honduras, Mexico, Nicaragua",
					"UTC-05:00 Colombia, Cuba, Jamaica, Panama, Peru",
					"UTC-04:00 Bolivia, Canada (Nova Scotia), Puerto Rico",
					"UTC-03:00 Argentina, Chile (continental), Paraguay",
					"UTC-02:00 Brazil (Fernando de Noronha), South Georgia",
					"UTC-01:00 Cape Verde, Portugal (Azores)",
					"UTC Côte d'Ivoire, Ghana, Iceland, Senegal, Saint Helena",
					"UTC+01:00 Algeria, Angola, Cameroon, Niger, Nigeria",
					"UTC+02:00 Burundi, Egypt, Mozambique, South Africa",
					"UTC+03:00 Belarus, Madagascar, Somalia, Tanzania, Uganda",
					"UTC+04:00 Armenia, Georgia, Mauritius, Oman, Seychelles",
					"UTC+05:00 Maldives, Pakistan, Uzbekistan",
					"UTC+06:00 Kazakhstan, Bangladesh, Bhutan",
					"UTC+07:00 Vietnam, Thailand, Laos, Cambodia",
					"UTC+08:00 Hong Kong, Malaysia, Philippines, Singapore",
					"UTC+09:00 East Timor, Japan, North Korea, South Korea",
					"UTC+10:00 Papua New Guinea, Australia",
					"UTC+11:00 New Caledonia, Solomon Islands, Vanuatu",
					"UTC+12:00 Kiribati (Gilbert Islands), Fiji",
					"UTC+13:00 Kiribati (Phoenix Islands), Tonga, Tokelau",
					"UTC+14:00 Kiribati (Line Islands)"],
		sDefaultDuration : 60,	/*new event take place in sDefaultDuration minute(s)*/

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
	// $rootScope.showPopup = function(mtitle, url) {
	// 	var confirmPopup = $ionicPopup.confirm({
	// 		title: mtitle,
	// 		templateUrl: url
	// 	});
	// 	confirmPopup.then(function(res) {
	// 		if (res) {
	// 			// TODO ok
	// 		} else {
	// 			// TODO cancel
	// 		}
	// 	});
	// }
	$rootScope.showChoice = function(mtitle, url, msub) {
		var confirmPopup = $ionicPopup.show({
			title: mtitle,
			subTitle: msub,
			templateUrl: url
		});
		$rootScope.closePopup = function(){
			$timeout(function() {
				confirmPopup.close();
			}, 100);
		};
	}
	$rootScope.showAlert = function(mtitle, url, msub) {
		var confirmPopup = $ionicPopup.alert({
			title: mtitle,
			subTitle: msub,
			templateUrl: url
		});
		$rootScope.closePopup = function(){
			$timeout(function() {
				confirmPopup.close();
			}, 100);
		};
	}
})

.directive('numbersOnly', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function(inputValue) {
                if (inputValue == undefined) return ''
                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
        }
    };
})
.directive('validInput', function() {
	return {
		require: 'ngModel',
		scope: { max: '='},
		link: function(scope, element, attrs, modelCtrl) {
			modelCtrl.$parsers.push(function(inputValue) {
				inputValue = inputValue.replace(/[^0-9]/g, '');
				if (inputValue == '') {
					inputValue = '0';
				}
				if (Number(inputValue) > scope.max) {
					inputValue = scope.max.toString();
				}
				if (Number(inputValue) > 0 && inputValue.charAt(0) == '0') {
					inputValue = Number(inputValue).toString();
				}
				modelCtrl.$setViewValue(inputValue);
				modelCtrl.$render();
				return Number(inputValue);
			});
		}
	};
});