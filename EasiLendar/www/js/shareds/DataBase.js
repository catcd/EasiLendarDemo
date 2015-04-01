/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 01/04/2015
 * type: all shared database variables and functions
 */

var database = angular.module('MainApp.shareds.dataBase', []);

database.run (function($rootScope, $ionicLoading, toastr, toastrConfig) {	
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
	
	// sign out function
	// update data, reset setting, go to form.
	$rootScope.signOutEasi = function() {
		// update on database
		$rootScope.update();
	}
	
	/*
	 * Update function
	 * Only call when isLogin = true
	 * save every data of user in server
	 */
	$rootScope.update = function() {
		if ($rootScope.eUser.uID != "" 
				&& typeof($rootScope.eUser.uID) != "undefined" 
				&& $rootScope.eUser.isLogin == true) {
					
			toString();
			var ref = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users/"
					+ $rootScope.eUser.uID);
			// loading
			$rootScope.databaseLoading();
			var onComplete = function(error) {
				if (error) {
					console.log("failed");
				} else {
					// Clear cache
					// TODO
	
					// change state
					$rootScope.goToState("form");

					// notice
					toastrConfig.positionClass = 'toast-sign-out';
					toastrConfig.preventDuplicates = true;

					toastr.success('Sign out successfully!', {
						timeOut: 3000,
						extendedTimeout: 2000
					});
					
					// Reset all data
					// Setting
					$rootScope.eSettings.sEvent = true;
					$rootScope.eSettings.sHoliday = true;
					$rootScope.eSettings.sBirthday = true;
					$rootScope.eSettings.sLocalCalendar = true;
					$rootScope.eSettings.sGmailCalendar = true;
					$rootScope.eSettings.sDefaultView = 'month';
					$rootScope.eSettings.sDayView = 'eventList';
					$rootScope.eSettings.sFirstDay = 'Monday';
					$rootScope.eSettings.sShowWeekNumber = true;
					$rootScope.eSettings.sAutoSync = null;
					$rootScope.eSettings.sSyncWith = 'both 3G and wifi';
					$rootScope.eSettings.sDefaultDuration = 60;
					$rootScope.eSettings.sDeviceTimeZone = true;
					// User information
					$rootScope.eUser.uID = '';
					$rootScope.eUser.uName = '';
					$rootScope.eUser.uAvatar = '0';
					$rootScope.eUser.uEmail = '';
					$rootScope.eUser.uPassword = '';
					$rootScope.eUser.uRemember = false;
					$rootScope.eUser.uFriend = [];
					$rootScope.eUser.isLogin = false;
					$rootScope.eUser.uGmailCalendar = null;
					$rootScope.eUser.uLocalCalendar = null;
				}
			};
			ref.set({
				// Name
				name : $rootScope.eUser.uName,
				// Avatar
				avatar : $rootScope.eUser.uAvatar,
				// Gmail
				gmail : $rootScope.eUser.uEmail,
				// Password
				password : $rootScope.eUser.uPassword,
				// Friends list
				friends : ($rootScope.eUser.uFriend == null?null:$rootScope.eUser.uFriend),
				// Local calendar
				local_calendar : ($rootScope.eUser.uLocalCalendar == null?null:$rootScope.eUser.uLocalCalendar),
				// Google calendar
				g_calendar : ($rootScope.eUser.uGmailCalendar==null?null:$rootScope.eUser.uGmailCalendar),
				// VIP account
				VIP : $rootScope.eUser.uVIP,
				// notifications
				noti: {
					fRequest: $rootScope.eUser.uFRequest==null?null:$rootScope.eUser.uFRequest==null,
					fAccept: $rootScope.eUser.uFAccepted==null?null:$rootScope.eUser.uFAccepted,
				},
			}, onComplete);
		}
	};
	
	/*
	 * Add friend function
	 * add id of this user to "id"'s friends list
	 */
	$rootScope.addFriend = function(id) {
		if ($rootScope.eUser.uID != "" 
				&& typeof($rootScope.eUser.uID) != "undefined"
				&& $rootScope.eUser.isLogin == true) {
					
			var ref = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users");
					
			var idRef = ref.child(id);
			// loading
			$rootScope.databaseLoading();
			var onComplete = function(error) {
				if (error) {
					console.log("failed");
				} else {
					$ionicLoading.hide();
				}
			};
			idRef.once("value", function(snapshot) {
				var user = snapshot.val();
				// there is no user with that "id"
				if (user == null) {
					$rootScope.showAlert(id + "does not exist");
				} else {
					// check if id has sent a request
					if ($rootScope.eUser.uFRequest != null && $rootScope.eUser.uFRequest[id] != null) {
						// add this user's id to "id"'s friends list
						var friend = idRef.child("friends/" + $rootScope.eUser.uID);
						friend.set({
							name : $rootScope.eUser.uName,
							ava: $rootScope.eUser.uAvatar,
						});
						// add this user's id to accepted list of "id"
						var accept = idRef.child("noti/fAccept/" + $rootScope.eUser.uID);
						accept.set({
							name: $rootScope.eUser.uName,
							ava: $rootScope.eUser.uAvatar,
						});

						// delete the request of "id"
						delete $rootScope.eUser.uFRequest[id];
						// add "id" to friends list
						if ($rootScope.eUser.uFriend == null) $rootScope.eUser.uFriend = [];
						$rootScope.eUser.uFriend[id] = {
							name : user.name,
							ava : user.avatar,
						};
						// update on this account (not 'id')
						var selfFriends = ref.child($rootScope.eUser.uID+"/friends");
						var list = $rootScope.eUser.uFriend == null?null:$rootScope.eUser.uFriend;
						selfFriends.set(list);
						var selfFRequest = ref.child($rootScope.eUser.uID + "/noti/fRequest");
						selfFRequest.set($rootScope.eUser.uFRequest, onComplete);
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
			&& typeof($rootScope.eUser.uID) != "undefined"
			&& $rootScope.eUser.isLogin == true) {
				
			var ref = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users/" + id);
			// loading
			$rootScope.databaseLoading();
			ref.once("value", function(snapshot) {
				var user = snapshot.val();
				user.g_calendar = $rootScope.convertCal(user.g_calendar);
				user.local_calendar = $rootScope.convertCal(user.local_calendar);
				var temp = [user.g_calendar, user.local_calendar];
				$ionicLoading.hide();
				console.log($rootScope.newMultiCal(temp));
			});
		}
	};

	/*
	 * request friend
	 * add this user's id to fRequest of "id"
	 */
	$rootScope.request = function(id) {
		if ($rootScope.eUser.uID != "" 
			&& typeof($rootScope.eUser.uID) != "undefined"
			&& $rootScope.eUser.isLogin == true) {
				
			var ref = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users/" + id);
			// loading
			$rootScope.databaseLoading();
			var onComplete = function(error) {
				if (error) {
					console.log("failed");
				} else {
					$ionicLoading.hide();
				}
			};
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
					}, onComplete);
				}
			}, function(errorObject) {
				console.log("Failed to access" + ref);
			});
		}
	};
	
	/*
	 * deleteFN function
	 * delete friend accepted noti 
	 * 'id' is index of noti in uFAccepted array
	 */
	$rootScope.deleteFN = function(id) {
		if ($rootScope.eUser.uID != "" 
			&& typeof($rootScope.eUser.uID) != "undefined"
			&& $rootScope.eUser.isLogin == true) {
				
			delete $rootScope.eUser.uFAccepted[id];
			var accept = new Firebase(
				"https://radiant-inferno-3243.firebaseio.com/Users/"
				+ $rootScope.eUser.uID + "/noti/fAccept");
			// loading
			$rootScope.databaseLoading();
			var onComplete = function(error) {
				if (error) {
					console.log("failed");
				} else {
					$ionicLoading.hide();
				}
			};
			accept.set($rootScope.eUser.uFAccepted, onComplete);
		}
	};
	
	/*
	 * deleteF function
	 * delete friend with 'id'
	 */
	$rootScope.deleteF = function(id) {
		if ($rootScope.eUser.uID != "" 
			&& typeof($rootScope.eUser.uID) != "undefined"
			&& $rootScope.eUser.isLogin == true) {
			
			// delete 'id' in user's friend list
			delete $rootScope.eUser.uFriend[id];
			var friend = new Firebase(
				"https://radiant-inferno-3243.firebaseio.com/Users/"
				+ $rootScope.eUser.uID + "/friends");
			// loading
			$rootScope.databaseLoading();
			friend.set($rootScope.eUser.uFriend);
			
			var onComplete = function(error) {
				if (error) {
					console.log("failed");
				} else {
					$ionicLoading.hide();
				}
			};
			var idFriendList = new Firebase(
				"https://radiant-inferno-3243.firebaseio.com/Users/"
				+ id + "/friends/"+ $rootScope.eUser.uID);
			idFriendList.set(null, onComplete);
		}
	};
	
	/*
	 * rejectF function
	 * reject friend request sent by 'id'
	 */
	$rootScope.rejectF = function(id) {
		if ($rootScope.eUser.uID != "" 
			&& typeof($rootScope.eUser.uID) != "undefined"
			&& $rootScope.eUser.isLogin == true) {
			
			delete $rootScope.eUser.uFRequest[id];
			var request = new Firebase(
				"https://radiant-inferno-3243.firebaseio.com/Users/"
				+ $rootScope.eUser.uID + "/noti/fRequest");
			// loading
			$rootScope.databaseLoading();
			var onComplete = function(error) {
				if (error) {
					console.log("failed");
				} else {
					$ionicLoading.hide();
				}
			};
			request.set($rootScope.eUser.uFRequest, onComplete);
		}
	};
});