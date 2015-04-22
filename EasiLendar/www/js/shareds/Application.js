/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 22/04/2015
 * type: module all shared variables and functions used for this app
 */

angular.module('MainApp.shareds.application', [])
/**
 * All shared variables
 * Each group (object) is one services
 */

// Search filter variables
// Ngo Duc Dung
.factory('eSearchFilter', function(){
	return {
		mTitle: '',		/*Name of meeting*/
		mDuration: 0,	/*Duration of meeting */
		mLocation: '',	/*Location of meeting*/

		mFrom: 0,		/*Time to start searching: Minute(s) from 24:00am*/
		mTo: 0,			/*Time to end searching: Minute(s) from 24:00am*/
		mFromDay: '',	/*Day to start searching: format: ddmmyy*/
		mToDay: '',		/*Day to end searching: format: ddmmyy*/

		mBreakfast: null,	/*Avoid/Prioritize*/
		mLunch: null,		/*avoid = true;*/
		mDinner: null,		/*prioritize = false ;*/
		mOffice: null,		/*none(default) = null;*/
		mHoliday: null, 	/**/

		resetData: function(){
			this.mTitle = '';
			this.mDuration = 0;
			this.mLocation = '';

			this.mFrom = 0;
			this.mTo = 0;
			this.mFromDay = '';
			this.mToDay = '';

			this.mBreakfast = null;
			this.mLunch = null;
			this.mDinner = null;
			this.mOffice = null;
			this.mHoliday = null;
		}
	};
})

// Setting variables
// Can Duy Cat
.factory('eSettings', function(){
	return {
		sEvent: true,			/*Show/hide event*/
		sHoliday: true,			/*Show/hide holiday*/
		sBirthday: true,		/*Show/hide friend's birthday*/
		sLocalCalendar: true,	/*Use (or not) local calendar*/
		sGmailCalendar: true,	/*Use (or not) Gmail calendar*/

		sDefaultView: 'month',	/*enum{"day", "week", "month", "list") calendar on home page*/
		sDayView: 'eventList',	/*enum{"timeGrid", "eventList") day calendar*/
		sFirstDay: 'Monday',	/*enum{"Saturday", "Sunday", "Monday") first day of week*/
		sShowWeekNumber: true,	/*Show week number option*/

		sAutoSync: null,				/*Auto sync (not supported now)*/
		sSyncWith: 'both 3G and wifi',	/*enum{"wifi only", "both 3G and wifi") Sync with (not supported now)*/

		sDefaultDuration: 60,	/*new event take place in sDefaultDuration minute(s)*/

		sDeviceTimeZone: true,	/*Use the time zone of device or not*/
		sTimeZone: 0,			/*UTC integer from -12 to +14*/
		sZoneList: [{location:'Africa/Abidjan', zone:0},{location:'Africa/Accra', zone:0},{location:'Africa/Addis Ababa', zone:3},{location:'Africa/Algiers', zone:1},{location:'Africa/Asmara', zone:3},{location:'Africa/Asmera', zone:3},{location:'Africa/Bamako', zone:0},{location:'Africa/Bangui', zone:1},{location:'Africa/Banjul', zone:0},{location:'Africa/Bissau', zone:0},{location:'Africa/Blantyre', zone:2},{location:'Africa/Brazzaville', zone:1},{location:'Africa/Bujumbura', zone:2},{location:'Africa/Cairo', zone:2},{location:'Africa/Casablanca', zone:0},{location:'Africa/Ceuta', zone:1},{location:'Africa/Conakry', zone:0},{location:'Africa/Dakar', zone:0},{location:'Africa/Dar es Salaam', zone:3},{location:'Africa/Djibouti', zone:3},{location:'Africa/Douala', zone:1},{location:'Africa/El Aaiun', zone:0},{location:'Africa/Freetown', zone:0},{location:'Africa/Gaborone', zone:2},{location:'Africa/Harare', zone:2},{location:'Africa/Johannesburg', zone:2},{location:'Africa/Juba', zone:3},{location:'Africa/Kampala', zone:3},{location:'Africa/Khartoum', zone:3},{location:'Africa/Kigali', zone:2},{location:'Africa/Kinshasa', zone:1},{location:'Africa/Lagos', zone:1},{location:'Africa/Libreville', zone:1},{location:'Africa/Lome', zone:0},{location:'Africa/Luanda', zone:1},{location:'Africa/Lubumbashi', zone:2},{location:'Africa/Lusaka', zone:2},{location:'Africa/Malabo', zone:1},{location:'Africa/Maputo', zone:2},{location:'Africa/Maseru', zone:2},{location:'Africa/Mbabane', zone:2},{location:'Africa/Mogadishu', zone:3},{location:'Africa/Monrovia', zone:0},{location:'Africa/Nairobi', zone:3},{location:'Africa/Ndjamena', zone:1},{location:'Africa/Niamey', zone:1},{location:'Africa/Nouakchott', zone:0},{location:'Africa/Ouagadougou', zone:0},{location:'Africa/Porto-Novo', zone:1},{location:'Africa/Sao Tome', zone:0},{location:'Africa/Timbuktu', zone:0},{location:'Africa/Tripoli', zone:1},{location:'Africa/Tunis', zone:1},{location:'Africa/Windhoek', zone:1},{location:'America/Adak', zone:-10},{location:'America/Anchorage', zone:-9},{location:'America/Anguilla', zone:-4},{location:'America/Antigua', zone:-4},{location:'America/Araguaina', zone:-3},{location:'America/Argentina/Buenos Aires', zone:-3},{location:'America/Argentina/Catamarca', zone:-3},{location:'America/Argentina/ComodRivadavia', zone:-3},{location:'America/Argentina/Cordoba', zone:-3},{location:'America/Argentina/Jujuy', zone:-3},{location:'America/Argentina/La Rioja', zone:-3},{location:'America/Argentina/Mendoza', zone:-3},{location:'America/Argentina/Rio Gallegos', zone:-3},{location:'America/Argentina/Salta', zone:-3},{location:'America/Argentina/San Juan', zone:-3},{location:'America/Argentina/San Luis', zone:-3},{location:'America/Argentina/Tucuman', zone:-3},{location:'America/Argentina/Ushuaia', zone:-3},{location:'America/Aruba', zone:-4},{location:'America/Asuncion', zone:-4},{location:'America/Atikokan', zone:-5},{location:'America/Atka', zone:-10},{location:'America/Bahia', zone:-3},{location:'America/Bahia Banderas', zone:-6},{location:'America/Barbados', zone:-4},{location:'America/Belem', zone:-3},{location:'America/Belize', zone:-6},{location:'America/Blanc-Sablon', zone:-4},{location:'America/Boa Vista', zone:-4},{location:'America/Bogota', zone:-5},{location:'America/Boise', zone:-7},{location:'America/Buenos Aires', zone:-3},{location:'America/Cambridge Bay', zone:-7},{location:'America/Campo Grande', zone:-4},{location:'America/Cancun', zone:-6},{location:'America/Catamarca', zone:-3},{location:'America/Cayenne', zone:-3},{location:'America/Cayman', zone:-5},{location:'America/Chicago', zone:-6},{location:'America/Chihuahua', zone:-7},{location:'America/Coral Harbour', zone:-5},{location:'America/Cordoba', zone:-3},{location:'America/Costa Rica', zone:-6},{location:'America/Creston', zone:-7},{location:'America/Cuiaba', zone:-4},{location:'America/Curacao', zone:-4},{location:'America/Danmarkshavn', zone:0},{location:'America/Dawson', zone:-8},{location:'America/Dawson Creek', zone:-7},{location:'America/Denver', zone:-7},{location:'America/Detroit', zone:-5},{location:'America/Dominica', zone:-4},{location:'America/Edmonton', zone:-7},{location:'America/Eirunepe', zone:-5},{location:'America/El Salvador', zone:-6},{location:'America/Ensenada', zone:-8},{location:'America/Fort Wayne', zone:-5},{location:'America/Fortaleza', zone:-3},{location:'America/Glace Bay', zone:-4},{location:'America/Godthab', zone:-3},{location:'America/Goose Bay', zone:-4},{location:'America/Grand Turk', zone:-5},{location:'America/Grenada', zone:-4},{location:'America/Guadeloupe', zone:-4},{location:'America/Guatemala', zone:-6},{location:'America/Guayaquil', zone:-5},{location:'America/Guyana', zone:-4},{location:'America/Halifax', zone:-4},{location:'America/Havana', zone:-5},{location:'America/Hermosillo', zone:-7},{location:'America/Indiana/Indianapolis', zone:-5},{location:'America/Indiana/Knox', zone:-6},{location:'America/Indiana/Marengo', zone:-5},{location:'America/Indiana/Petersburg', zone:-5},{location:'America/Indiana/Tell City', zone:-6},{location:'America/Indiana/Valparaiso', zone:-6},{location:'America/Indiana/Vevay', zone:-5},{location:'America/Indiana/Vincennes', zone:-5},{location:'America/Indiana/Winamac', zone:-5},{location:'America/Indianapolis', zone:-5},{location:'America/Inuvik', zone:-7},{location:'America/Iqaluit', zone:-5},{location:'America/Jamaica', zone:-5},{location:'America/Jujuy', zone:-3},{location:'America/Juneau', zone:-9},{location:'America/Kentucky/Louisville', zone:-5},{location:'America/Kentucky/Monticello', zone:-5},{location:'America/Knox IN', zone:-6},{location:'America/Kralendijk', zone:-4},{location:'America/La Paz', zone:-4},{location:'America/Lima', zone:-5},{location:'America/Los Angeles', zone:-8},{location:'America/Louisville', zone:-5},{location:'America/Lower Princes', zone:-4},{location:'America/Maceio', zone:-3},{location:'America/Managua', zone:-6},{location:'America/Manaus', zone:-4},{location:'America/Marigot', zone:-4},{location:'America/Martinique', zone:-4},{location:'America/Matamoros', zone:-6},{location:'America/Mazatlan', zone:-7},{location:'America/Mendoza', zone:-3},{location:'America/Menominee', zone:-6},{location:'America/Merida', zone:-6},{location:'America/Metlakatla', zone:-8},{location:'America/Mexico City', zone:-6},{location:'America/Miquelon', zone:-3},{location:'America/Moncton', zone:-4},{location:'America/Monterrey', zone:-6},{location:'America/Montevideo', zone:-3},{location:'America/Montreal', zone:-5},{location:'America/Montserrat', zone:-4},{location:'America/Nassau', zone:-5},{location:'America/New York', zone:-5},{location:'America/Nipigon', zone:-5},{location:'America/Nome', zone:-9},{location:'America/Noronha', zone:-2},{location:'America/North Dakota/Beulah', zone:-6},{location:'America/North Dakota/Center', zone:-6},{location:'America/North Dakota/New Salem', zone:-6},{location:'America/Ojinaga', zone:-7},{location:'America/Panama', zone:-5},{location:'America/Pangnirtung', zone:-5},{location:'America/Paramaribo', zone:-3},{location:'America/Phoenix', zone:-7},{location:'America/Port of Spain', zone:-4},{location:'America/Port-au-Prince', zone:-5},{location:'America/Porto Acre', zone:-5},{location:'America/Porto Velho', zone:-4},{location:'America/Puerto Rico', zone:-4},{location:'America/Rainy River', zone:-6},{location:'America/Rankin Inlet', zone:-6},{location:'America/Recife', zone:-3},{location:'America/Regina', zone:-6},{location:'America/Resolute', zone:-6},{location:'America/Rio Branco', zone:-5},{location:'America/Rosario', zone:-3},{location:'America/Santa Isabel', zone:-8},{location:'America/Santarem', zone:-3},{location:'America/Santiago', zone:-4},{location:'America/Santo Domingo', zone:-4},{location:'America/Sao Paulo', zone:-3},{location:'America/Scoresbysund', zone:-1},{location:'America/Shiprock', zone:-7},{location:'America/Sitka', zone:-9},{location:'America/St Barthelemy', zone:-4},{location:'America/St Kitts', zone:-4},{location:'America/St Lucia', zone:-4},{location:'America/St Thomas', zone:-4},{location:'America/St Vincent', zone:-4},{location:'America/Swift Current', zone:-6},{location:'America/Tegucigalpa', zone:-6},{location:'America/Thule', zone:-4},{location:'America/Thunder Bay', zone:-5},{location:'America/Tijuana', zone:-8},{location:'America/Toronto', zone:-5},{location:'America/Tortola', zone:-4},{location:'America/Vancouver', zone:-8},{location:'America/Virgin', zone:-4},{location:'America/Whitehorse', zone:-8},{location:'America/Winnipeg', zone:-6},{location:'America/Yakutat', zone:-9},{location:'America/Yellowknife', zone:-7},{location:'Antarctica/Casey', zone:11},{location:'Antarctica/Davis', zone:5},{location:'Antarctica/DumontDUrville', zone:10},{location:'Antarctica/Macquarie', zone:11},{location:'Antarctica/Mawson', zone:5},{location:'Antarctica/McMurdo', zone:12},{location:'Antarctica/Palmer', zone:-4},{location:'Antarctica/Rothera', zone:-3},{location:'Antarctica/South Pole', zone:12},{location:'Antarctica/Syowa', zone:3},{location:'Antarctica/Troll', zone:0},{location:'Antarctica/Vostok', zone:6},{location:'Arctic/Longyearbyen', zone:1},{location:'Asia/Aden', zone:3},{location:'Asia/Almaty', zone:6},{location:'Asia/Amman', zone:2},{location:'Asia/Anadyr', zone:12},{location:'Asia/Aqtau', zone:5},{location:'Asia/Aqtobe', zone:5},{location:'Asia/Ashgabat', zone:5},{location:'Asia/Ashkhabad', zone:5},{location:'Asia/Baghdad', zone:3},{location:'Asia/Bahrain', zone:3},{location:'Asia/Baku', zone:4},{location:'Asia/Bangkok', zone:7},{location:'Asia/Beirut', zone:2},{location:'Asia/Bishkek', zone:6},{location:'Asia/Brunei', zone:8},{location:'Asia/Choibalsan', zone:8},{location:'Asia/Chongqing', zone:8},{location:'Asia/Chungking', zone:8},{location:'Asia/Dacca', zone:6},{location:'Asia/Damascus', zone:2},{location:'Asia/Dhaka', zone:6},{location:'Asia/Dili', zone:9},{location:'Asia/Dubai', zone:4},{location:'Asia/Dushanbe', zone:5},{location:'Asia/Gaza', zone:2},{location:'Asia/Ha Noi', zone:7},{location:'Asia/Harbin', zone:8},{location:'Asia/Hebron', zone:2},{location:'Asia/Ho Chi Minh', zone:7},{location:'Asia/Hong Kong', zone:8},{location:'Asia/Hovd', zone:7},{location:'Asia/Irkutsk', zone:8},{location:'Asia/Istanbul', zone:2},{location:'Asia/Jakarta', zone:7},{location:'Asia/Jayapura', zone:9},{location:'Asia/Jerusalem', zone:2},{location:'Asia/Kamchatka', zone:12},{location:'Asia/Karachi', zone:5},{location:'Asia/Kashgar', zone:8},{location:'Asia/Khandyga', zone:9},{location:'Asia/Krasnoyarsk', zone:7},{location:'Asia/Kuala Lumpur', zone:8},{location:'Asia/Kuching', zone:8},{location:'Asia/Kuwait', zone:3},{location:'Asia/Macao', zone:8},{location:'Asia/Macau', zone:8},{location:'Asia/Magadan', zone:10},{location:'Asia/Makassar', zone:8},{location:'Asia/Manila', zone:8},{location:'Asia/Muscat', zone:4},{location:'Asia/Nicosia', zone:2},{location:'Asia/Novokuznetsk', zone:7},{location:'Asia/Novosibirsk', zone:6},{location:'Asia/Omsk', zone:6},{location:'Asia/Oral', zone:5},{location:'Asia/Phnom Penh', zone:7},{location:'Asia/Pontianak', zone:7},{location:'Asia/Pyongyang', zone:9},{location:'Asia/Qatar', zone:3},{location:'Asia/Qyzylorda', zone:6},{location:'Asia/Riyadh', zone:3},{location:'Asia/Saigon', zone:7},{location:'Asia/Sakhalin', zone:11},{location:'Asia/Samarkand', zone:5},{location:'Asia/Seoul', zone:9},{location:'Asia/Shanghai', zone:8},{location:'Asia/Singapore', zone:8},{location:'Asia/Taipei', zone:8},{location:'Asia/Tashkent', zone:5},{location:'Asia/Tbilisi', zone:4},{location:'Asia/Tel Aviv', zone:2},{location:'Asia/Thimbu', zone:6},{location:'Asia/Thimphu', zone:6},{location:'Asia/Tokyo', zone:9},{location:'Asia/Ujung Pandang', zone:8},{location:'Asia/Ulaanbaatar', zone:8},{location:'Asia/Ulan Bator', zone:8},{location:'Asia/Urumqi', zone:8},{location:'Asia/Ust-Nera', zone:10},{location:'Asia/Vientiane', zone:7},{location:'Asia/Vladivostok', zone:10},{location:'Asia/Yakutsk', zone:9},{location:'Asia/Yekaterinburg', zone:5},{location:'Asia/Yerevan', zone:4},{location:'Atlantic/Azores', zone:-1},{location:'Atlantic/Bermuda', zone:-4},{location:'Atlantic/Canary', zone:0},{location:'Atlantic/Cape Verde', zone:-1},{location:'Atlantic/Faeroe', zone:0},{location:'Atlantic/Faroe', zone:0},{location:'Atlantic/Jan Mayen', zone:1},{location:'Atlantic/Madeira', zone:0},{location:'Atlantic/Reykjavik', zone:0},{location:'Atlantic/South Georgia', zone:-2},{location:'Atlantic/St Helena', zone:0},{location:'Atlantic/Stanley', zone:-3},{location:'Australia/ACT', zone:10},{location:'Australia/Brisbane', zone:10},{location:'Australia/Canberra', zone:10},{location:'Australia/Currie', zone:10},{location:'Australia/Hobart', zone:10},{location:'Australia/Lindeman', zone:10},{location:'Australia/Melbourne', zone:10},{location:'Australia/NSW', zone:10},{location:'Australia/Perth', zone:8},{location:'Australia/Queensland', zone:10},{location:'Australia/Sydney', zone:10},{location:'Australia/Tasmania', zone:10},{location:'Australia/Victoria', zone:10},{location:'Australia/West', zone:8},{location:'Brazil/Acre', zone:-5},{location:'Brazil/DeNoronha', zone:-2},{location:'Brazil/East', zone:-3},{location:'Brazil/West', zone:-4},{location:'Canada/Atlantic', zone:-4},{location:'Canada/Central', zone:-6},{location:'Canada/Eastern', zone:-5},{location:'Canada/East-Saskatchewan', zone:-6},{location:'Canada/Mountain', zone:-7},{location:'Canada/Pacific', zone:-8},{location:'Canada/Saskatchewan', zone:-6},{location:'Canada/Yukon', zone:-8},{location:'Chile/Continental', zone:-4},{location:'Chile/EasterIsland', zone:-6},{location:'Cuba', zone:-5},{location:'Egypt', zone:2},{location:'Europe/Amsterdam', zone:1},{location:'Europe/Andorra', zone:1},{location:'Europe/Athens', zone:2},{location:'Europe/Belfast', zone:0},{location:'Europe/Belgrade', zone:1},{location:'Europe/Berlin', zone:1},{location:'Europe/Bratislava', zone:1},{location:'Europe/Brussels', zone:1},{location:'Europe/Bucharest', zone:2},{location:'Europe/Budapest', zone:1},{location:'Europe/Busingen', zone:1},{location:'Europe/Chisinau', zone:2},{location:'Europe/Copenhagen', zone:1},{location:'Europe/Dublin', zone:0},{location:'Europe/Gibraltar', zone:1},{location:'Europe/Guernsey', zone:0},{location:'Europe/Helsinki', zone:2},{location:'Europe/Isle of Man', zone:0},{location:'Europe/Istanbul', zone:2},{location:'Europe/Jersey', zone:0},{location:'Europe/Kaliningrad', zone:2},{location:'Europe/Kiev', zone:2},{location:'Europe/Lisbon', zone:0},{location:'Europe/Ljubljana', zone:1},{location:'Europe/London', zone:0},{location:'Europe/Luxembourg', zone:1},{location:'Europe/Madrid', zone:1},{location:'Europe/Malta', zone:1},{location:'Europe/Mariehamn', zone:2},{location:'Europe/Minsk', zone:3},{location:'Europe/Monaco', zone:1},{location:'Europe/Moscow', zone:3},{location:'Europe/Nicosia', zone:2},{location:'Europe/Oslo', zone:1},{location:'Europe/Paris', zone:1},{location:'Europe/Podgorica', zone:1},{location:'Europe/Prague', zone:1},{location:'Europe/Riga', zone:2},{location:'Europe/Rome', zone:1},{location:'Europe/Samara', zone:4},{location:'Europe/San Marino', zone:1},{location:'Europe/Sarajevo', zone:1},{location:'Europe/Simferopol', zone:3},{location:'Europe/Skopje', zone:1},{location:'Europe/Sofia', zone:2},{location:'Europe/Stockholm', zone:1},{location:'Europe/Tallinn', zone:2},{location:'Europe/Tirane', zone:1},{location:'Europe/Tiraspol', zone:2},{location:'Europe/Uzhgorod', zone:2},{location:'Europe/Vaduz', zone:1},{location:'Europe/Vatican', zone:1},{location:'Europe/Vienna', zone:1},{location:'Europe/Vilnius', zone:2},{location:'Europe/Volgograd', zone:3},{location:'Europe/Warsaw', zone:1},{location:'Europe/Zagreb', zone:1},{location:'Europe/Zaporozhye', zone:2},{location:'Europe/Zurich', zone:1},{location:'GB', zone:0},{location:'GB-Eire', zone:0},{location:'GMT', zone:0},{location:'Greenwich', zone:0},{location:'Hongkong', zone:8},{location:'Iceland', zone:0},{location:'Indian/Antananarivo', zone:3},{location:'Indian/Chagos', zone:6},{location:'Indian/Christmas', zone:7},{location:'Indian/Comoro', zone:3},{location:'Indian/Kerguelen', zone:5},{location:'Indian/Mahe', zone:4},{location:'Indian/Maldives', zone:5},{location:'Indian/Mauritius', zone:4},{location:'Indian/Mayotte', zone:3},{location:'Indian/Reunion', zone:4},{location:'Israel', zone:2},{location:'Jamaica', zone:-5},{location:'Japan', zone:9},{location:'Kwajalein', zone:12},{location:'Libya', zone:2},{location:'Mexico/BajaNorte', zone:-8},{location:'Mexico/BajaSur', zone:-7},{location:'Mexico/General', zone:-6},{location:'Navajo', zone:-7},{location:'NZ', zone:12},{location:'Pacific/Apia', zone:13},{location:'Pacific/Auckland', zone:12},{location:'Pacific/Chuuk', zone:10},{location:'Pacific/Easter', zone:-6},{location:'Pacific/Efate', zone:11},{location:'Pacific/Enderbury', zone:13},{location:'Pacific/Fakaofo', zone:13},{location:'Pacific/Fiji', zone:12},{location:'Pacific/Funafuti', zone:12},{location:'Pacific/Galapagos', zone:-6},{location:'Pacific/Gambier', zone:-9},{location:'Pacific/Guadalcanal', zone:11},{location:'Pacific/Guam', zone:10},{location:'Pacific/Honolulu', zone:-10},{location:'Pacific/Johnston', zone:-10},{location:'Pacific/Kiritimati', zone:14},{location:'Pacific/Kosrae', zone:11},{location:'Pacific/Kwajalein', zone:12},{location:'Pacific/Majuro', zone:12},{location:'Pacific/Midway', zone:-11},{location:'Pacific/Nauru', zone:12},{location:'Pacific/Niue', zone:-11},{location:'Pacific/Noumea', zone:11},{location:'Pacific/Pago Pago', zone:-11},{location:'Pacific/Palau', zone:9},{location:'Pacific/Pitcairn', zone:-8},{location:'Pacific/Pohnpei', zone:11},{location:'Pacific/Ponape', zone:11},{location:'Pacific/Port Moresby', zone:10},{location:'Pacific/Rarotonga', zone:-10},{location:'Pacific/Saipan', zone:10},{location:'Pacific/Samoa', zone:-11},{location:'Pacific/Tahiti', zone:-10},{location:'Pacific/Tarawa', zone:12},{location:'Pacific/Tongatapu', zone:13},{location:'Pacific/Truk', zone:10},{location:'Pacific/Wake', zone:12},{location:'Pacific/Wallis', zone:12},{location:'Pacific/Yap', zone:10},{location:'Poland', zone:1},{location:'Portugal', zone:0},{location:'PRC', zone:8},{location:'ROC', zone:8},{location:'ROK', zone:9},{location:'Singapore', zone:8},{location:'Turkey', zone:2},{location:'UCT', zone:0},{location:'Universal', zone:0},{location:'US/Alaska', zone:-9},{location:'US/Aleutian', zone:-10},{location:'US/Arizona', zone:-7},{location:'US/Central', zone:-6},{location:'US/Eastern', zone:-5},{location:'US/East-Indiana', zone:-5},{location:'US/Hawaii', zone:-10},{location:'US/Indiana-Starke', zone:-6},{location:'US/Michigan', zone:-5},{location:'US/Mountain', zone:-7},{location:'US/Pacific', zone:-8},{location:'US/Samoa', zone:-11},{location:'W-SU', zone:3},{location:'Zulu', zone:0}],
		sZoneName: ['UTC-11:00', 'UTC-10:00', 'UTC-09:00', 'UTC-08:00', 'UTC-07:00', 'UTC-06:00', 'UTC-05:00', 'UTC-04:00', 'UTC-03:00', 'UTC-02:00', 'UTC-01:00', 'UTC', 'UTC+01:00', 'UTC+02:00', 'UTC+03:00', 'UTC+04:00', 'UTC+05:00', 'UTC+06:00', 'UTC+07:00', 'UTC+08:00', 'UTC+09:00', 'UTC+10:00', 'UTC+11:00', 'UTC+12:00', 'UTC+13:00', 'UTC+14:00'],

		sInternet: 'wifi', /*enum{"wifi", "3G", "none"} Check device conection*/

		resetData: function(){
			this.sEvent = true;
			this.sHoliday = true;
			this.sBirthday = true;
			this.sLocalCalendar = true;
			this.sGmailCalendar = true;

			this.sDefaultView = 'month';
			this.sDayView = 'eventList';
			this.sFirstDay = 'Monday';
			this.sShowWeekNumber = true;

			this.sAutoSync = null;
			this.sSyncWith = 'both 3G and wifi';

			this.sDefaultDuration = 60;

			this.sDeviceTimeZone = true;
			this.sTimeZone = 0;

			this.sInternet = 'wifi';
		}
	};
})

// User information
// Nguyen Minh Trang
.factory('eUser', function(){
	return {
		uID: '',			/*4-15 characters (A-Z, a-z, 0-9, _), unique*/
		uName: '',			/*UTF-8*/
		uAvatar: '0',
		uEmail: '',			/*gmail*/
		uPassword: '',		/*8-16 characters*/
		uRemember: false,	/*remember me*/
		uFriend: [],		/*array of objects { id, name }*/
		uVIP : 0,
		isLogin: false,

		uRequested: [],

		uGmailCalendar: null,	/*Google API JSON	Calendar*/
		uLocalCalendar: null,	/*Google API JSON	Calendar*/

		uFRequest: {},	/*List of requests*/
		uFAccepted: {},	/*List of requests accepted*/
		uFRLength: 0,
		uFALength: 0,

		resetData: function(){
			this.uID = '';
			this.uName = '';
			this.uAvatar = '0';
			this.uEmail = '';
			this.uPassword = '';
			this.uRemember = false;
			this.uFriend = [];
			this.uVIP  = 0;
			this.isLogin = false;

			this.uRequested = [];

			this.uGmailCalendar = null;
			this.uLocalCalendar = null;

			this.uFRequest = {};
			this.uFAccepted = {};
			this.uFRLength = 0;
			this.uFALength = 0;
		}
	};
})

// $rootScope.eUser.uFRequest["huongdung1"] = { id: "huongdung1", name: "Ngo Duc Huong", ava: 1};
// $rootScope.eUser.uFRequest["ttdungsexy"] = { id: "ttdungsexy", name: "Tran Thu Dung", ava: 3};
// $rootScope.eUser.uFRequest["minhchui02"] = { id: "minhchui02", name: "Nguyen Minh Chui", ava: 5};
// $rootScope.eUser.uFRequest["manhvan003"] = { id: "manhvan003", name: "Nguyen Manh Van", ava: 8};
// $rootScope.eUser.uFRequest["boykorea58"] = { id: "boykorea58", name: "Kim Seung Trang", ava: 7};
// $rootScope.eUser.uFRequest["hotgirlno1"] = { id: "hotgirlno1", name: "Nguyen Thi Cam Duy", ava: 4};
// $rootScope.eUser.uFRequest["justinbb02"] = { id: "justinbb02", name: "Justin Bieber", ava: 4};
// $rootScope.eUser.uFRequest["kimkashi07"] = { id: "kimkashi07", name: "Kim Kadashian", ava: 8};
// $rootScope.eUser.uFRequest["gotgon1158"] = { id: "gotgon1158", name: "Yoona", ava: 7};
// $rootScope.eUser.uFRequest["badboyking"] = { id: "badboyking", name: "Son Tung MTP", ava: 0};
// $rootScope.eUser.uFRLength = 10;

// $rootScope.eUser.uFAccepted["huongnd95"] = { id: "huongnd95", name: "Ngo Duc Huong", ava: 1};
// $rootScope.eUser.uFAccepted["dungttd96"] = { id: "dungttd96", name: "Tran Thu Dung", ava: 3};
// $rootScope.eUser.uFAccepted["vannm9896"] = { id: "vannm9896", name: "Nguyen Manh Van", ava: 8};
// $rootScope.eUser.uFAccepted["trangks99"] = { id: "trangks99", name: "Kim Seung Trang", ava: 7};
// $rootScope.eUser.uFAccepted["duyntc00a"] = { id: "duyntc00a", name: "Nguyen Thi Cam Duy", ava: 4};
// $rootScope.eUser.uFAccepted["luongnt58"] = { id: "luongnt58", name: "Nguyen Thi Luong", ava: 8};
// $rootScope.eUser.uFAccepted["taylor989"] = { id: "taylor989", name: "Taylor Swift", ava: 6};
// $rootScope.eUser.uFAccepted["obamano01"] = { id: "obamano01", name: "Barack Obama", ava: 0};
// $rootScope.eUser.uFALength = 8;

// Friend's information
// Nguyen Minh Trang
.factory('eFriend', function(){
	return {
		fName: '',		/*UTF-8*/
		fAvatar: 0,		/*avatar index from 0 to 8*/
		fVIP: 0,		/*VIP or not*/
		fID: '',
		fInfor: null,
		fFriend: {},

		fMultiCal: null,	/*MultiCalendar object	Calendar*/

		resetData: function(){
			this.fName = '';
			this.fAvatar = 0;
			this.fVIP = 0;
			this.fID = '';
			this.fInfor = null;
			this.fFriend = {};

			this.fMultiCal = null;
		}
	};
})

// Calendar's information
// Ngo Duc Dung
.factory('eDate', function(){
	return {
		cDate: null, 	//Object Date that user click on month calendar

		resetData: function(){
			this.cDate = null;
		}
	};
})

/**
 * All functions
 */

// All function for single searching algorithm
.factory('eSAlgorithm', function(eTimeHeap, eCalendar){
	var eTimeHeap = eTimeHeap;
	var eCalendar = eCalendar;

	// evaluate normal case
	// evaluate step by step from start of day to end of day
	var evaluateNormal = function(mMCal, mStart, mEnd, mDuration) {
		// result Heap
		var mHeap = eTimeHeap.newTimeHeap();

		// pointer move from mStart to mEnd
		var mCurrentDay = mStart;

		// temp for event array
		var arrayEvent = null;

		// 2 busi events up and down
		var upEvent = null;
		var downEvent = null;

		// temp day to move pointer
		var tempDay = null;

		// 2 variable for push part
		// start and end
		var mTempStart = null;
		var mTempEnd = null;

		while (mCurrentDay <= mEnd) {
			// if (mMCal.calendar[mCurrentDay] == undefined) that day does not have any event
			// so push to Heap step by step
			// to reduce time
			if (mMCal.calendar[mCurrentDay] == undefined) {
				pushAllDay(mCurrentDay, mHeap);
			}
			// in the case that a day is not empty
			else {
				// get busi event
				arrayEvent = mMCal.calendar[mCurrentDay];

				/**
				 * evaluate meeting time
				 */
				// construct up and down event
				upEvent = arrayEvent[0];
				downEvent = arrayEvent[0];

				/**
				 * evaluate start of day
				 */

				// Variables to pass to pushPart()
				// mTempStart = start of mCurrentday
				// mTempEnd = start first event (upEvent)
				mTempStart = mCurrentDay;
				mTempEnd = upEvent.start.dateTime;

				pushPart(mHeap, mTempStart, mTempEnd, mDuration);
				// end of evaluate start of day

				/**
				 * evaluate middle of day
				 */
				// if day has more than 1 busi event
				// that day has some more empty part
				// start evaluate middle of day
				if (arrayEvent.length > 1) {
					// loop from the second event to last event
					for (var count = 1; count < arrayEvent.length; count++) {
						// upEvent and downEvent will be the next event of themselves
						// upEvent = last downEvent
						// downEvent = the event that counter poit to (arrayEvent[count])
						upEvent = downEvent;
						downEvent = arrayEvent[count];

						/**
						 * evaluate a part between upEvent and downEvent
						 */

						// Variables to pass to pushPart()
						// mTempStart = end of current event (upEvent.end.dateTime)
						// mTempEnd = start of next event (downEvent.start.dateTime)
						mTempStart = upEvent.end.dateTime;
						mTempEnd = downEvent.start.dateTime;

						pushPart(mHeap, mTempStart, mTempEnd, mDuration);
						// end of evaluate a part
						// next to a new loop
					}
				}
				// end of evaluate middle of day

				/**
				 * evaluate end of day
				 */

				// Variables to pass to pushPart()
				// mTempStart = end of the last event (downEvent)
				// mTempEnd = start of next day of current day
				mTempStart = downEvent.end.dateTime;
				mTempEnd = eCalendar.tomorrow(mCurrentDay);

				pushPart(mHeap, mTempStart, mTempEnd, mDuration);
				// end of evaluate end of day

				//end of evaluate meeting time
			}

			// move to next day
			mCurrentDay = eCalendar.tomorrow(mCurrentDay);
		}

		// return a timeHeap of timeNode evaluated
		return mHeap;
	};

	// function to push a part of day
	// input a heap, a start time, an end time, duration
	var pushPart = function(mHeap, mStart, mEnd, mDuration) {
		// 5 variables to save year, month, etc that start loop
		// to reduce caculate time in while loop
		var tYear = mStart.getFullYear();
		var tMonth = mStart.getMonth();
		var tDate = mStart.getDate();
		var tHour = mStart.getHours();
		var tMinutes = mStart.getMinutes();

		// count for while loop
		var i = 0;

		// temp array to save list of time Node {start, end}
		var tempArray = [];

		while (new Date(tYear, tMonth, tDate, tHour, tMinutes + i + mDuration) <= mEnd) {
			tempArray.push({
				start: new Date(tYear, tMonth, tDate, tHour, tMinutes + i),
				end: new Date(tYear, tMonth, tDate, tHour, tMinutes + i + mDuration)
			});
			i++;
		}

		if (tempArray.length != 0) {
			mHeap.push(eTimeHeap.maxNode(tempArray));
		}
		tempArray = [];
	};

	// function to push timeNode to timeHeap step by step
	// in order to reduce while loop to reduce time
	var pushAllDay = function(mDate, mHeap) {
		mHeap.push(eTimeHeap.newTimeNode(mDate, eCalendar.tomorrow(mDate)));
	};

	return {
		evaluateTime: function(mMCal, mStart, mEnd, mDuration) {
			// evaluate the normal case
			if(true) {
				var mHeap = evaluateNormal(mMCal, mStart, mEnd, mDuration);
			}

			//return the result
			return mHeap;
		}
	};
})

// service for calculate point for time
.factory('ePoint', function(){
	return {
		calPoint: function(mHour) {
		// Function to caculate a time in what part of day and return the points
		// return 0: 12: 00 am to 5: 59 am 0 pts
		// return 1: 6: 00 am to 7: 59 am + 15 pts
		// return 2: 8: 00 am to 10: 59 am + 30 pts
		// return 3: 11: 00 am to 13: 59 pm + 20 pts
		// return 4: 14: 00 pm to 16: 59 pm + 50 pts
		// return 5: 17: 00 pm to 19: 59 pm + 20 pts
		// return 6: 20: 00 pm to 12: 00 am + 15 pts
			switch (mHour) {
				case 0: case 1: case 2: case 3: case 4: case 5: return 0;
				case 6: case 7: return 15;
				case 8: case 9: case 10: return 30;
				case 11: case 12: case 13: return 20;
				case 14: case 15: case 16: return 50;
				case 17: case 18: case 19: return 20;
				case 20: case 21: case 22: case 23: return 15;
			};
		}
	};
})

/**
 * Toast function
 */
.factory('eToast', function(toastr, toastrConfig){
	return {
		// toast success
		// lots of toast show a time
		// color #33CCCC
		// width 50%
		// position center bottom
		toastSuccess: function(message, delay) {
			toastrConfig.positionClass = 'toast-sign-out';
			toastrConfig.preventDuplicates = false,

			toastr.success(message, {
				timeOut: delay
			});
		},

		// toast success one
		// only 1 toast show a time
		// color #33CCCC
		// width 50%
		// position center bottom
		toastSuccessOne: function(message, delay) {
			toastrConfig.positionClass = 'toast-sign-out';
			toastrConfig.preventDuplicates = true,

			toastr.success(message, {
				timeOut: delay
			});
		}
	};
})

/**
 * Check friend service
 * Local functions
 */
.factory('eCheckFriend', function(eUser){
	return {
		// is friend function
		// return true if ID is my friend
		isFriend: function(ID) {
			if (eUser.uFriend == null) {
				return false;
			}

			return (eUser.uFriend[ID] !== undefined);
		},

		// is requested function
		// return true if ID is my friend
		isRequested: function(ID) {
			if (eUser.uRequested == null) {
				return false;
			}

			return (eUser.uRequested[ID] !== undefined);
		}
	};
})

// some functions that are initialized from start
.run(function($rootScope, $ionicPopup, $timeout, $state, $ionicPlatform, $ionicHistory, toastr, toastrConfig, eSettings) {
	// inject services
	var eSettings = eSettings;

	// Variable for save current state
	$rootScope.currentState = "loading";

	/**
	 * All .run functions
	 */
	$rootScope.showChoice = function(mtitle, url, msub) {
		var confirmPopup = $ionicPopup.show({
			title: mtitle,
			subTitle: msub,
			templateUrl: url
		});
		$rootScope.closePopup = function() {
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
		$rootScope.closePopup = function() {
			$timeout(function() {
				confirmPopup.close();
			}, 100);
		};
	}

	// press again to exit
	$ionicPlatform.registerBackButtonAction(function(e) {
		if ($rootScope.currentState == 'form'
		|| $rootScope.currentState == 'month'
		|| $rootScope.currentState == 'week'
		|| $rootScope.currentState == 'day'
		|| $rootScope.currentState == 'list') {
			if ($rootScope.backButtonPressedOnceToExit) {
				navigator.app.exitApp();
			} else {
				$rootScope.backButtonPressedOnceToExit = true;

				// toast
				$rootScope.toastSuccess('Press Back again to exit.', 2000);

				setTimeout(function() {
					$rootScope.backButtonPressedOnceToExit = false;
				}, 2000);
			}
			e.preventDefault();
		}
		return false;
	}, 101);

	// exit app function
	// confirm and exit app
	// only on the mobile or tablet device
	$rootScope.exitEasi = function() {
		var confirmPopup = $ionicPopup.confirm({
			title: "Exit confirm",
			subTitle: "Are you sure?"
		});
		confirmPopup.then(function(res) {
			if (res) {
				navigator.app.exitApp();
			} else {
				// TODO cancel
			}
		});
	}

	// go home function
	$rootScope.goHome = function() {
		$rootScope.goToState(eSettings.sDefaultView);
	}

	// go to any state
	$rootScope.goToState = function(state) {
		// delete stack history
		// push new page to the top of the stack
		// disable all animation
		$ionicHistory.nextViewOptions({
			historyRoot: true,
			disableAnimate: true,
			expire: 300
		});
		$state.go(state);
		$rootScope.currentState = state;
	}
})
