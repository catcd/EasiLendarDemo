/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 05/04/2015
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
	
	// set uFRequest's length to uFRLength
	$rootScope.setUFRL = function() {
		if ($rootScope.eUser.uFRequest ==  null) {
			$rootScope.eUser.uFRLength = 0;
		} else {
			$rootScope.eUser.uFRLength = Object.keys($rootScope.eUser.uFRequest).length;
		}
	};
	
	// set uFAccepted's length to uFALength
	$rootScope.setUFAL = function() {
		if ($rootScope.eUser.uFAccepted ==  null) {
			$rootScope.eUser.uFALength = 0;
		} else {
			$rootScope.eUser.uFALength = Object.keys($rootScope.eUser.uFAccepted).length;
		}
	};
	
	// clear all data in application when sign out
	var clearData = function() {
		// Reset all data
		// Setting
		$rootScope.eSettings = {
			sEvent: true,
			sHoliday: true,
			sBirthday: true,
			sLocalCalendar: true,
			sGmailCalendar: true,

			sDefaultView: 'month',
			sDayView: 'eventList',
			sFirstDay: 'Monday',
			sShowWeekNumber: true,

			sAutoSync: null,
			sSyncWith: 'both 3G and wifi',

			sDefaultDuration: 60,

			sDeviceTimeZone: true,
			sTimeZone: 0,
		}
		// User information
		$rootScope.eUser = {
			uID: '',
			uName: '',
			uAvatar: '0',
			uEmail: '',
			uPassword: '',
			uRemember: false,
			uFriend: [],
			uVIP : 0,
			uGmailCalendar: null,
			uLocalCalendar: null,
			isLogin: false,
			uRequested: [],
			uFRequest: {},
			uFAccepted: {},
			uFRLength: 0,
			uFALength: 0,
		}
	};
	
	// check if user has signed in or not
	var checkSignIn = function() {
		if ($rootScope.eUser.uID != "" && $rootScope.eUser.uID != null
				&& $rootScope.eUser.isLogin == true) {

			return true;
		} else return false;
	};
	
	// sign out function
	// update data, reset setting, go to form.
	$rootScope.signOutEasi = function() {
		// clear data
		clearData();
		
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
	};
	
	/*
	 * Add friend function
	 * add id of this user to "id"'s friends list
	 */
	$rootScope.addFriend = function(id) {
		if (checkSignIn() && id != null && id != "") {
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
			// check if id has sent a request
			if ($rootScope.eUser.uFRequest != null && $rootScope.eUser.uFRequest[id] != null) {
				idRef.once("value", function(snapshot) {
					var user = snapshot.val();			
					// there is no user with that "id"
					if (user == null) {
						$rootScope.showAlert(id + "does not exist");
					} else {
						// get basic info
						var name = user.name;
						var ava = user.avatar;
						// add this user to "id"'s friends list
						var fFriend = idRef.child("friends/" + $rootScope.eUser.uID);
						fFriend.set({
							id : $rootScope.eUser.uID,
							name : $rootScope.eUser.uName,
							ava: $rootScope.eUser.uAvatar,
						});
						// add this user to accepted list of "id"
						var fAccept = idRef.child("noti/fAccept/" + $rootScope.eUser.uID);
						fAccept.set({
							id : $rootScope.eUser.uID,
							name: $rootScope.eUser.uName,
							ava: $rootScope.eUser.uAvatar,
						});
						// delete this user from requested list of id
						var fRequested = idRef.child("requested/" + $rootScope.eUser.uID);
						fRequested.set(null);
						
						// delete the request of "id"
						delete $rootScope.eUser.uFRequest[id];
						$rootScope.setUFRL(); 	// set uFRLength
						
						// add "id" to friends list
						if ($rootScope.eUser.uFriend == null) $rootScope.eUser.uFriend = [];
						$rootScope.eUser.uFriend[id] = {
							id : id,
							name : name,
							ava : ava,
						};
						// update on this account (not 'id')
						var uFriend = ref.child($rootScope.eUser.uID + "/friends/" + id);
						uFriend.set({
							id : id,
							name : name,
							ava : ava,
						});
						var uFRequest = ref.child($rootScope.eUser.uID + "/noti/fRequest/" + id);
						uFRequest.set(null, onComplete);
					}
				}, function(errorObject) {
					console.log("Failed to access" + ref);
				});
			}
		}
	};
	
	/* 
	 * get friend's calendar function
	 * return object multiCalendar of "id" 
	 */
	$rootScope.getCalendar = function(id) {
		if (checkSignIn() && id != null && id != "") {
			var ref = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users/" + id);
			// loading
			$rootScope.databaseLoading();
			ref.once("value", function(snapshot) {
				var user = snapshot.val();
				if (user == null) {
					$rootScope.showAlert(id + "does not exist");
				} else {
					user.g_calendar = $rootScope.convertCal(user.g_calendar);
					user.local_calendar = $rootScope.convertCal(user.local_calendar);
					var temp = [user.g_calendar, user.local_calendar];
					$rootScope.eFriend.fMultiCal = $rootScope.newMultiCal(temp);
					$ionicLoading.hide();
				}
			}, function(errorObject) {
				console.log("Failed to access" + ref);
			});
		}
	};

	/*
	 * request friend
	 * add this user's id to fRequest of "id"
	 */
	$rootScope.request = function(id) {
		if (checkSignIn() && id != null && id != "") {
			// request myself
			if (id == $rootScope.eUser.uID) return null;
			
			var ref = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users");
					
			// reference to uRequested list of this user
			var uRequest = ref.child($rootScope.eUser.uID + "/requested/" + id);
			// reference to id
			var friend = ref.child(id);
			
			// loading
			$rootScope.databaseLoading();
			var onComplete = function(error) {
				if (error) {
					console.log("failed");
				} else {
					$ionicLoading.hide();
				}
			};
			friend.once("value", function(snapshot) {
				var user = snapshot.val();
				// there is no user with that "id"
				if (user == null) {
					$rootScope.showAlert(id + "does not exist");
				} else {
					// add this user to "id"'s friend request list
					var fRequest = friend.child("noti/fRequest/" + $rootScope.eUser.uID);
					fRequest.set({
						id : $rootScope.eUser.uID,
						name : $rootScope.eUser.uName,
						ava: $rootScope.eUser.uAvatar,
					});
					// add id to this user's requested list
					uRequest.set({
						id : id,
						name : user.name,
						ava : user.avatar,
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
		if (checkSignIn() && id != null && id != "") {
			delete $rootScope.eUser.uFAccepted[id];
			$rootScope.setUFAL();	// set uFALength
			
			var uAccept = new Firebase(
				"https://radiant-inferno-3243.firebaseio.com/Users/"
				+ $rootScope.eUser.uID + "/noti/fAccept/" + id);
			// loading
			$rootScope.databaseLoading();
			var onComplete = function(error) {
				if (error) {
					console.log("failed");
				} else {
					$ionicLoading.hide();
				}
			};
			uAccept.set(null, onComplete);
		}
	};
	
	/*
	 * deleteF function
	 * delete friend with 'id'
	 */
	$rootScope.deleteF = function(id) {
		if (checkSignIn() && id != null && id != "") {
			// delete 'id' in user's friend list
			delete $rootScope.eUser.uFriend[id];
			
			var uFriend = new Firebase(
				"https://radiant-inferno-3243.firebaseio.com/Users/"
				+ $rootScope.eUser.uID + "/friends/" + id);
			// loading
			$rootScope.databaseLoading();
			uFriend.set(null);
			
			var onComplete = function(error) {
				if (error) {
					console.log("failed");
				} else {
					$ionicLoading.hide();
				}
			};
			var fFriend = new Firebase(
				"https://radiant-inferno-3243.firebaseio.com/Users/"
				+ id + "/friends/" + $rootScope.eUser.uID);
			fFriend.set(null, onComplete);
		}
	};
	
	/*
	 * rejectF function
	 * reject friend request sent by 'id'
	 */
	$rootScope.rejectF = function(id) {
		if (checkSignIn() && id != null && id != "") {
			delete $rootScope.eUser.uFRequest[id];
			$rootScope.setUFRL();	// set uFRLength
			
			var uRequest = new Firebase(
				"https://radiant-inferno-3243.firebaseio.com/Users/"
				+ $rootScope.eUser.uID + "/noti/fRequest/" + id);
			var fRequested = new Firebase(
				"https://radiant-inferno-3243.firebaseio.com/Users/"
				+ id + "/requested/" + $rootScope.eUser.uID);
				
			// loading
			$rootScope.databaseLoading();
			var onComplete = function(error) {
				if (error) {
					console.log("failed");
				} else {
					$ionicLoading.hide();
				}
			};
			fRequested.set(null);
			uRequest.set(null, onComplete);
		}
	};

	/*
	 * searchFriend function
	 * str is a str user inserted to search for
	 * add to $rootScope.searchFriends any id or name that contains 'str'
	 */ 
	$rootScope.searchFriend = function(str) {
		$rootScope.searchFriends = [];
		if (checkSignIn()) {
			var ref = new Firebase("https://radiant-inferno-3243.firebaseio.com/Users");
			// loading
			$rootScope.databaseLoading();
			ref.once("value", function(snapshot) {
				var ids = [];
				var names = [];
				var avas = [];
				var users = snapshot.forEach(function(child) {
					ids.push(child.key());
					names.push(child.val().name);
					avas.push(child.val().avatar);
				});
				var length = 0;		// length of searchFriends
				for (var i=0; i < ids.length; i++) {
					var found1 = ids[i].search(str);
					var found2 = names[i].search(str);
					if (found1 != -1 || found2 != -1) {
						$rootScope.searchFriends[length++] = {
							id : ids[i],
							name : names[i],
							ava : avas[i],
						};
					}
				}
				$ionicLoading.hide();
			});
		}
	};
	
	/*
	 * searchEvent function
	 * str is str to search for (search in eUser.uGmailCalendar)
	 * add to $rootScope.searchEvents any id or name that contains 'str'
	 * do not interact with database
	 */
	$rootScope.searchEvent = function(str) {
		$rootScope.searchEvents = [];
		if (checkSignIn()) {
			var length = 0;	// length of searchEvents
			// go through all days
			for (var x in $rootScope.eUser.uGmailCalendar) {
				// go through all events in this day
				for (var y in $rootScope.eUser.uGmailCalendar[x]) {
					var found1 = $rootScope.eUser.uGmailCalendar[x][y].summary.search(str);
					var found2 = -1;
					if ($rootScope.eUser.uGmailCalendar[x][y].location != null) {
						found2 = $rootScope.eUser.uGmailCalendar[x][y].location.search(str);
					}
					// if event summary or location contains 'str'
					if (found1 != -1 || found2 != -1) {
						$rootScope.searchEvents[length++] = $rootScope.eUser.uGmailCalendar[x][y];
					}
				}
			}
		}
	};
	
	/*
	 * getInformation function
	 * id is id of a person user want to get info
	 * set info in eFriend
	 */
	$rootScope.getInformation = function(id) {
		if (checkSignIn() && id != null && id != "") {
			var ref = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users/" + id);
			// loading
			$rootScope.databaseLoading();
			ref.once("value", function(snapshot) {
				var user = snapshot.val();
				// there is no user with that "id"
				if (user == null) {
					$rootScope.showAlert(id + "does not exist");
				} else {
					// set user's info to $rootScope.eFriend
					$rootScope.eFriend.fName = user.name;
					$rootScope.eFriend.fAvatar = user.avatar;
					$rootScope.eFriend.fVIP = user.VIP;
					$ionicLoading.hide(); console.log($rootScope.eFriend);
				}
			}, function(errorObject) {
				console.log("Failed to access" + ref);
			});
		}
	};
	
	/*
	 * refresh function
	 * update everything from server
	 */
	$rootScope.refresh = function() {
		if (checkSignIn()) {
			var ref = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users/" + $rootScope.eUser.uID);
			// loading
			$rootScope.databaseLoading(); 
			ref.once("value", function(snapshot) {
				var user = snapshot.val();
				// copy all user's data to $rootScope
				$rootScope.eUser = {
					uID: $rootScope.eUser.uID,
					uName: user.name,
					uAvatar: user.avatar,
					uEmail: user.gmail,
					uPassword: user.password,
					uRemember: false,
					uFriend: user.friends,
					uVIP : user.VIP,
					isLogin: true,

					uRequested: user.requested,

					uGmailCalendar: user.g_calendar,
					uLocalCalendar: user.local_calendar,

					uFRequest: (user.noti == null ? null : user.noti.fRequest),
					uFAccepted: (user.noti == null ? null : user.noti.fAccept),
					uFRLength: 0,
					uFALength: 0,
				};
				// convert
				$rootScope.eUser.uGmailCalendar = $rootScope.convertCal($rootScope.eUser.uGmailCalendar);
				$rootScope.eUser.uLocalCalendar = $rootScope.convertCal($rootScope.eUser.uLocalCalendar);

				// set uFRLength and uFALength
				$rootScope.setUFRL();
				$rootScope.setUFAL();
				
				$ionicLoading.hide();
				
			}, function(errorObject) {
				$rootScope.goToState('warning');
			});
		}
	};
	
	/*
	 * updateCalendar function
	 * update user's calendar to server
	 */
	$rootScope.updateCalendar = function() {
		if (checkSignIn()) {
			toString();	// convert
			var user = new Firebase(
				"https://radiant-inferno-3243.firebaseio.com/Users/"
				+ $rootScope.eUser.uID);
				
			// loading
			$rootScope.databaseLoading();
			var onComplete = function(error) {
				if (error) {
					console.log("failed");
				} else {
					$ionicLoading.hide();
				}
			};
			var uGC = user.child("g_calendar");
			if ($rootScope.eUser.uGmailCalendar != null) {
				uGC.set($rootScope.eUser.uGmailCalendar);
			} else {
				uGC.set(null);
			}
			var uLocal = user.child("local_calendar");
			if ($rootScope.eUser.uLocalCalendar != null) {
				uLocal.set($rootScope.eUser.uLocalCalendar, onComplete);
			} else {
				uLocal.set(null, onComplete);
			}
		}
	};
	
	/* 
	 * viewProfile function
	 * id is id of a person this user wants to view profile
	 * set name, id, ava, calendar to eFriend
	 */
	$rootScope.viewProfile = function(id) {
		if (checkSignIn() && id != null && id != "") {
			var ref = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users/" + id);
			// loading
			$rootScope.databaseLoading();
			ref.once("value", function(snapshot) {
				var user = snapshot.val();
				// there is no user with that "id"
				if (user == null) {
					$rootScope.showAlert(id + "does not exist");
				} else {
					// set id's info to $rootScope.eFriend
					$rootScope.eFriend.fName = user.name;
					$rootScope.eFriend.fAvatar = user.avatar;
					$rootScope.eFriend.fVIP = user.VIP;
					// set fMultiCal
					user.g_calendar = $rootScope.convertCal(user.g_calendar);
					user.local_calendar = $rootScope.convertCal(user.local_calendar);
					var temp = [user.g_calendar, user.local_calendar];
					$rootScope.eFriend.fMultiCal = $rootScope.newMultiCal(temp);

					$ionicLoading.hide();
					$rootScope.goToState("profile");
				}
			}, function(errorObject) {
				console.log("Failed to access" + ref);
			});
		}
	};
});
