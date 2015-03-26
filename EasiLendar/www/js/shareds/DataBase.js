/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 26/03/2015
 * type: all shared database variables and functions
 */

var database = angular.module('MainApp.shareds.dataBase', []);

database.run (function($rootScope, $ionicLoading) {	
	/*
	 * convert every dateTime object to String
	 */
	var toString = function () {
		if ($rootScope.eUser.uGmailCalendar != null) {
			var temp = [];
			for (var x in $rootScope.eUser.uGmailCalendar) {
				temp[x] = $rootScope.eUser.uGmailCalendar[x];
			for (var y in temp[x]) {
					temp[x][y].start.dateTime = temp[x][y].start.dateTime.toString();
					temp[x][y].end.dateTime = temp[x][y].end.dateTime.toString();
				}
				temp[x] = angular.copy(temp[x]);	// remove the $$hashKey
			}
			$rootScope.eUser.uGmailCalendar = temp;
		}
	};
	
	// convert string dateTime to object Date
	$rootScope.convertCal = function(calendar) {
		if (calendar != null && calendar != "") {
			var temp = [];
			for (var x in calendar) {
				temp[x] = calendar[x];
				for (var y in temp[x]) { 
					temp[x][y].start.dateTime = new Date(temp[x][y].start.dateTime);
					temp[x][y].end.dateTime = new Date(temp[x][y].end.dateTime);
				}
			}
			return temp;
		}
	};
	
	// show loading balls
	$rootScope.databaseLoading = function() {
		$ionicLoading.show({
			template: '<div id="followingBallsG"><div id="followingBallsG_1" class="followingBallsG"></div><div id="followingBallsG_2" class="followingBallsG"></div><div id="followingBallsG_3" class="followingBallsG"></div><div id="followingBallsG_4" class="followingBallsG"></div></div>',
			hideOnStateChange: true,
		});
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
				avatar : $rootScope.eUser.uAvatar,
				gmail : $rootScope.eUser.uEmail,
				password : $rootScope.eUser.uPassword,
				friends : ($rootScope.eUser.uFriend == null?null:$rootScope.eUser.uFriend),
				local_calendar : ($rootScope.eUser.uLocalCalendar == null?null:$rootScope.eUser.uLocalCalendar),
				g_calendar : ($rootScope.eUser.uGmailCalendar==null?null:$rootScope.eUser.uGmailCalendar),
				VIP : $rootScope.eUser.uVIP,
				noti: {
					fRequest: $rootScope.eUser.uFRequest,
					fAccept: $rootScope.eUser.uFAccepted,
				},
			});
		}
	};
	
	/*
	 * Add friend function
	 * add id of this user to "id"'s friends list
	 */
	$rootScope.addFriend = function(id) {
		if ($rootScope.eUser.uID != "" 
				&& typeof($rootScope.eUser.uID) != "undefined") {
			var ref = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users/" + id);
			ref.once("value", function(snapshot) {
				var user = snapshot.val();
				// there is no user with that "id"
				if (user == null) {
					$rootScope.showAlert(id + "does not exist");
				} else {
					// check if id has sent a request
					if ($rootScope.eUser.uFRequest[id] != null) {
						// add this user's id to "id"'s friends list
						var friend = ref.child("friends/" + $rootScope.eUser.uID);
						friend.set({
							name : $rootScope.eUser.uName,
							ava: $rootScope.eUser.uAvatar,
						});
						// add this user's id to accepted list of "id"
						var accept = ref.child("noti/fAccept/" + $rootScope.eUser.uID);
						accept.set({
							name: $rootScope.eUser.uName,
							ava: $rootScope.eUser.uAvatar,
						});
						
						// delete the request of "id"
						delete $rootScope.eUser.uFRequest[id];
						// add "id" to friends list
						$rootScope.eUser.uFriend[id] = {
							name : user.name,
							ava : user.avatar,
						};
					}
				}
			}, function(errorObject) {
				console.log("Failed to access" + ref);
			});
		}
	};
	
	/* 
	 * get friend's calendar function
	 * return object multiCalendar of "id" 
	 */
	$rootScope.getCalendar = function(id) {
		if ($rootScope.eUser.uID != "" 
			&& typeof($rootScope.eUser.uID) != "undefined") {
			var ref = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users/" + id);
			ref.once("value", function(snapshot) {
				var user = snapshot.val();
				user.g_calendar = $rootScope.convertCal(user.g_calendar);
				user.local_calendar = $rootScope.convertCal(user.local_calendar);
				var temp = [user.g_calendar, user.local_calendar];
				$rootScope.eFriend.fMultiCal = $rootScope.newMultiCal(temp);
			});
		}
	};
	
	/*
	 * request friend
	 * add this user's id to fRequest of "id"
	 */
	$rootScope.request = function(id) {
		if ($rootScope.eUser.uID != "" 
			&& typeof($rootScope.eUser.uID) != "undefined") {
			var ref = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users/" + id);
			ref.once("value", function(snapshot) {
				var user = snapshot.val();
				// there is no user with that "id"
				if (user == null) {
					$rootScope.showAlert(id + "does not exist");
				} else {
					// add this user's id to "id"'s friends list
					var request = ref.child("noti/fRequest/" + $rootScope.eUser.uID);
					request.set({
						name : $rootScope.eUser.uName,
						ava: $rootScope.eUser.uAvatar,
					});
				}
			}, function(errorObject) {
				console.log("Failed to access" + ref);
			});
		}
	};
	
});