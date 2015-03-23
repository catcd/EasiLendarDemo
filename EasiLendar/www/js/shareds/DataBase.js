/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 23/03/2015
 * type: all shared database variables and functions
 */

var database = angular.module('MainApp.shareds.dataBase', []);

database.run (function($rootScope) {
	/*
	 * Update function
	 * Only call when isLogin = true
	 * save every data of user in server
	 */
	$rootScope.update = function() {
		if ($rootScope.eUser.uID != "" 
				&& typeof($rootScope.eUser.uID) != "undefined") {
			
			var ref = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users/"
					+ $rootScope.eUser.uID);
			ref.set({
				name : $rootScope.eUser.uName,
				password : $rootScope.eUser.uPassword,
				local_calendar : $rootScope.eUser.uLocalCalendar,
				g_calendar : $rootScope.eUser.uGmailCalendar,
				friends : $rootScope.eUser.uFriend,
				VIP : $rootScope.eUser.uVIP,
				gmail : $rootScope.eUser.uEmail,
			});
		}
	}
	
	/*
	 * convert every dateTime object to String
	var toString = function () {
		if ($rootScope.eUser.uGmailCalendar != null) {
			for (x in $rootScope.eUser.uGmailCalendar) {
				x = $rootScope.eUser.uGmailCalendar[x];
				for (y in x) {
					x[y].start.dateTime = x[y].start.dateTime.toString();
					x[y].end.dateTime = x[y].end.dateTime.toString();
					console.log(x[y].start.dateTime);
				}
			}
		}
	};
	*/
});