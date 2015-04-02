/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 02/04/2015
 * type: module all shared variables and functions use for calendar
 */

angular.module('MainApp.shareds.calendar', [])

.run(function($rootScope) {
	/*
	 * Calendar variables
	 */
	$rootScope.weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	$rootScope.months = ["January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December"
	];
	$rootScope.shortMonths = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
	// background name
	$rootScope.bkgs = ["bkg_01_jan.jpg", "bkg_02_feb.jpg", "bkg_03_mar.jpg", "bkg_04_apr.jpg",
					"bkg_05_may.jpg", "bkg_06_jun.jpg", "bkg_07_jul.jpg", "bkg_08_aug.jpg",
					"bkg_09_sep.jpg", "bkg_10_oct.jpg", "bkg_11_nov.jpg", "bkg_12_dec.jpg"
	];

	/*
	 * Calendar functions
	 */
	// Find the number of day in a month
	$rootScope.daysOfMonth = function(month, year) {
		switch (month) {
			case 1: case 3: case 5: case 7: case 8: case 10: case 12: return 31;
			case 4: case 6: case 9: case 11: return 30;
			case 2:
				if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
					return 29;
				} else return 28;
			return 0;
		};
	};

	/*
	 * Caculate the next and previous day of one day
	 */
	// tomorrow of Date
	$rootScope.tomorrow = function(today) {
		var d = today.getTime();
		var result = new Date (d + 86400000); // 86400000 is number of miliseconds in a day
		return result;
	}

	// yesterday of Date:
	$rootScope.yesterday = function(today) {
		var d = today.getTime();
		var r = new Date (d - 86400000); // 86400000 is number of miliseconds in a day
		return r;
	}
})
