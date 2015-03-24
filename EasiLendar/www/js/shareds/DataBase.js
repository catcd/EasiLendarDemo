/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 24/03/2015
 * type: all shared database variables and functions
 */

var database = angular.module('MainApp.shareds.dataBase', []);

database.run (function($rootScope) {
	/*
	 * convert every dateTime object to String
	 */
	var toString = function () {
		if ($rootScope.eUser.uGmailCalendar != null) {
			var temp = [];
			for (x in $rootScope.eUser.uGmailCalendar) {
				temp[x] = $rootScope.eUser.uGmailCalendar[x];
			for (y in temp[x]) {
					temp[x][y].start.dateTime = temp[x][y].start.dateTime.toString();
					temp[x][y].end.dateTime = temp[x][y].end.dateTime.toString();
				}
				temp[x] = angular.copy(temp[x]);
			}
			$rootScope.eUser.uGmailCalendar = temp;
		}
	};
	
	/*
	 * Update function
	 * Only call when isLogin = true
	 * save every data of user in server
	 */
	$rootScope.update = function() {
		if ($rootScope.eUser.uID != "" 
				&& typeof($rootScope.eUser.uID) != "undefined") {
					
			toString();
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
});