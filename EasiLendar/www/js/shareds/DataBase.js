/**
 * starter: Can Duy Cat 
 * owner: Nguyen Minh Trang 
 * last update: 26/04/2015 
 * type: all shared database variables and functions
 */

var database = angular.module('MainApp.shareds.dataBase', []);

database.factory('eDatabase', function($rootScope, $ionicLoading, eToast, eUser, eSettings, eFriend, eMultiCalendar) {
	/*
	 * convert every dateTime object to String
	 */
	var toString = function () {
		if (eUser.uGmailCalendar != null) {
			var temp = [];
			for (var x in eUser.uGmailCalendar) {
				temp[x] = eUser.uGmailCalendar[x];
			for (var y in temp[x]) {
					temp[x][y].start.dateTime = temp[x][y].start.dateTime.toString();
					temp[x][y].end.dateTime = temp[x][y].end.dateTime.toString();
				}
				temp[x] = angular.copy(temp[x]);	// remove the $$hashKey
			}
			eUser.uGmailCalendar = temp;
		}
	};
	
	// clear all data in application when sign out
	var clearData = function() {
		// Reset all data
		// Setting
		eSettings.resetData();
		// User information
		eUser.resetData();
	};

	// check if user has signed in or not
	var checkSignIn = function() {
		if (eUser.uID != "" && eUser.uID != null
				&& eUser.isLogin == true) {

			return true;
		} else return false;
	};
	
	// is used to hide loading when done
	var onComplete = function(error) {
		if (error) {
			console.log("failed");
		} else {
			$ionicLoading.hide();
		}
	};
	
	// convert string dateTime to object Date
	var convertCal = function(calendar) {
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
		} else return null;
	};
	
	function db() {
		this.convertCal = convertCal;
	
		// show loading balls
		this.databaseLoading = function() {
			$ionicLoading.show({
				template: '<div id="followingBallsG"><div id="followingBallsG_1" class="followingBallsG"></div><div id="followingBallsG_2" class="followingBallsG"></div><div id="followingBallsG_3" class="followingBallsG"></div><div id="followingBallsG_4" class="followingBallsG"></div></div>',
				hideOnStateChange: true,
			});
		};
	
		// set uFRequest's length to uFRLength
		this.setUFRL = function() {
			if (eUser.uFRequest ==  null) {
				eUser.uFRLength = 0;
			} else {
				eUser.uFRLength = Object.keys(eUser.uFRequest).length;
			}
		};
	
		// set uFAccepted's length to uFALength
		this.setUFAL = function() {
			if (eUser.uFAccepted ==  null) {
				eUser.uFALength = 0;
			} else {
				eUser.uFALength = Object.keys(eUser.uFAccepted).length;
			}
		};
		
		// sign out function
		// update data, reset setting, go to form.
		this.signOutEasi = function() {
			// clear data
			clearData();
		
			// Clear cache
			// TODO
	
			// change state
			$rootScope.goToState("form");

			// notice
			eToast.toastSuccessOne('Sign out successfully!', 3000);
		};
	
		/*
		 * Add friend function add id of this user to "id"'s friends list
		 */
		this.addFriend = function(id) {
			if (checkSignIn() && id != null && id != "") {
				var ref = new Firebase(
				"https://radiant-inferno-3243.firebaseio.com/Users");
				var idRef = ref.child(id);
				
				// loading
				this.databaseLoading();
				
				// check if id has sent a request
				if (eUser.uFRequest != null && eUser.uFRequest[id] != null) {
					idRef.once("value", function(snapshot) {
						var user = snapshot.val();			
						// there is no user with that "id"
						if (user == null) {
							alert(id + "does not exist");
						} else {
							// get basic info
							var name = user.name;
							var ava = user.avatar;
							var vip = user.VIP;
							// add this user to "id"'s friends list
							var fFriend = idRef.child("friends/" + eUser.uID);
							fFriend.set({
								id : eUser.uID,
								name : eUser.uName,
								ava: eUser.uAvatar,
								VIP : vip,
							});
							// add this user to accepted list of "id"
							var fAccept = idRef.child("noti/fAccept/" + eUser.uID);
							fAccept.set({
								id : eUser.uID,
								name: eUser.uName,
								ava: eUser.uAvatar,
							});
							// delete this user from requested list of id
							var fRequested = idRef.child("requested/" + eUser.uID);
							fRequested.set(null);
					
							// delete the request of "id"
							delete eUser.uFRequest[id];
							this.setUFRL(); 	// set uFRLength
						
							// add "id" to friends list
							if (eUser.uFriend == null) eUser.uFriend = [];
							eUser.uFriend[id] = {
								id : id,
								name : name,
								ava : ava,
								VIP: vip,
							};
							// update on this account (not 'id')
							var uFriend = ref.child(eUser.uID + "/friends/" + id);
							uFriend.set({
								id : id,
								name : name,
								ava : ava,
								VIP: vip,
							});
							var uFRequest = ref.child(eUser.uID + "/noti/fRequest/" + id);
							uFRequest.set(null, onComplete);
						}
					}, function(errorObject) {
						console.log("Failed to access" + ref);
					});
				}
			}
		};
	
		/*
		 * get friend's calendar function return object multiCalendar of "id"
		 */
		this.getCalendar = function(id) {
			if (checkSignIn() && id != null && id != "") {
				var ref = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users/" + id);
				// loading
				this.databaseLoading();
				ref.once("value", function(snapshot) {
					var user = snapshot.val();
					if (user == null) {
						alert(id + "does not exist");
					} else {
						user.g_calendar = this.convertCal(user.g_calendar);
						user.local_calendar = this.convertCal(user.local_calendar);
						var temp = [user.g_calendar, user.local_calendar];
						eFriend.fMultiCal = eMultiCal.newMultiCal(temp);
						$ionicLoading.hide();
					}
				}, function(errorObject) {
					console.log("Failed to access" + ref);
				});
			}
		};

		/*
		 * request friend add this user's id to fRequest of "id"
		 */
		this.request = function(id) {
			if (checkSignIn() && id != null && id != "") {
				// request myself
				if (id == eUser.uID) return null;
			
				var ref = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users");

				// reference to uRequested list of this user
				var uRequest = ref.child(eUser.uID + "/requested/" + id);
				// reference to id
				var friend = ref.child(id);
			
				// loading
				this.databaseLoading();

				friend.once("value", function(snapshot) {
					var user = snapshot.val();
					// there is no user with that "id"
					if (user == null) {
						alert(id + "does not exist");
					} else {
						// add this user to "id"'s friend request list
						var fRequest = friend.child("noti/fRequest/" + eUser.uID);
						fRequest.set({
							id : eUser.uID,
							name : eUser.uName,
							ava: eUser.uAvatar,
						});
						// add id to this user's requested list
						if (eUser.uRequested == null) eUser.uRequested = [];
						eUser.uRequested[id] = {
							id : id,
							name : user.name,
							ava : user.avatar,
						};
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
	 	* deleteFN function delete friend accepted noti 'id' is index of noti in
	 	* uFAccepted array
	 	*/
		this.deleteFN = function(id) {
			if (checkSignIn() && id != null && id != "") {
				delete eUser.uFAccepted[id];
				this.setUFAL();	// set uFALength
			
				var uAccept = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users/"
					+ eUser.uID + "/noti/fAccept/" + id);
				// loading
				this.databaseLoading();
				uAccept.set(null, onComplete);
			}
		};
	
		/*
	 	* deleteF function delete friend with 'id'
	 	*/
		this.deleteF = function(id) {
			if (checkSignIn() && id != null && id != "") {
				// delete 'id' in user's friend list
				delete eUser.uFriend[id];

				var uFriend = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users/"
					+ eUser.uID + "/friends/" + id);
				// loading
				this.databaseLoading();
				uFriend.set(null);

				var fFriend = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users/"
					+ id + "/friends/" + eUser.uID);
				fFriend.set(null, onComplete);
			}
		};
	
		/*
	 	* rejectF function reject friend request sent by 'id'
	 	*/
		this.rejectF = function(id) {
			if (checkSignIn() && id != null && id != "") {
				delete eUser.uFRequest[id];
				this.setUFRL();	// set uFRLength
			
				var uRequest = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users/"
					+ eUser.uID + "/noti/fRequest/" + id);
				var fRequested = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users/"
					+ id + "/requested/" + eUser.uID);
				
				// loading
				this.databaseLoading();
				fRequested.set(null);
				uRequest.set(null, onComplete);
			}
		};

		/*
	 	* searchFriend function str is a str user inserted to search for add to
	 	* $rootScope.searchFriends any id or name that contains 'str'
	 	*/ 
		this.searchFriend = function(str) {
			$rootScope.searchFriends = [];
			if (checkSignIn() && str != '' && str != null) {
				var ref = new Firebase("https://radiant-inferno-3243.firebaseio.com/Users");
				// loading
				this.databaseLoading();
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
	 	* searchEvent function str is str to search for (search in
	 	* eUser.uGmailCalendar) add to $rootScope.searchEvents any id or name that
	 	* contains 'str' do not interact with database
	 	*/
		this.searchEvent = function(str) {
			$rootScope.searchEvents = [];
			if (checkSignIn() && str != '' && str != null) {
				var length = 0;	// length of searchEvents
				// go through all days
				for (var x in eUser.uGmailCalendar) {
					// go through all events in this day
					for (var y in eUser.uGmailCalendar[x]) {
						var found1 = eUser.uGmailCalendar[x][y].summary.search(str);
						var found2 = -1;
						if (eUser.uGmailCalendar[x][y].location != null) {
							found2 = eUser.uGmailCalendar[x][y].location.search(str);
						}
						// if event summary or location contains 'str'
						if (found1 != -1 || found2 != -1) {
							$rootScope.searchEvents[length++] = eUser.uGmailCalendar[x][y];
						}
					}
				}
			}
		};
	
		/*
	 	* getInformation function id is id of a person user want to get info set
	 	* info in eFriend
	 	*/
		this.getInformation = function(id) {
			if (checkSignIn() && id != null && id != "") {
				var ref = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users/" + id);
				// loading
				this.databaseLoading();
				ref.once("value", function(snapshot) {
					var user = snapshot.val();
					// there is no user with that "id"
					if (user == null) {
						alert(id + "does not exist");
					} else {
						// set user's info to $rootScope.eFriend
						eFriend.fID = id;
						eFriend.fName = user.name;
						eFriend.fAvatar = user.avatar;
						eFriend.fVIP = user.VIP;
						$ionicLoading.hide();
					}
				}, function(errorObject) {
					console.log("Failed to access" + ref);
				});
			}
		};
	
		/*
	 	* refresh function update everything from server
	 	*/
		this.refresh = function() {
			if (checkSignIn()) {
				var ref = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users/" + eUser.uID);
				// loading
				this.databaseLoading(); 
				ref.once("value", function(snapshot) {
					var user = snapshot.val();
					// copy all user's data to eUser
					eUser.uID = id;
					eUser.uName = user.name;
					eUser.uAvata = user.avatar;
					eUser.uEmail = user.gmail;
					eUser.uPassword = pass;
					eUser.uRemember = $scope.isRemember;
					eUser.uFriend = user.friends;
					eUser.uVIP = user.VIP;
					eUser.isLogin = true;

					eUser.uRequested = user.requested;

					// convert
					eUser.uGmailCalendar = convertCal(user.g_calendar);
					eUser.uLocalCalendar = convertCal(user.local_calendar);

					eUser.uFRequest = (user.noti == null ? null : user.noti.fRequest);
					eUser.uFAccepted = (user.noti == null ? null : user.noti.fAccept);
					eUser.uFRLength = 0;
					eUser.uFALength = 0;

					// set uFRLength and uFALength
					this.setUFRL();
					this.setUFAL();
				
					$ionicLoading.hide();
				
				}, function(errorObject) {
					$rootScope.goToState('warning');
				});
			}
		};
	
		/*
	 	* updateCalendar function update user's calendar to server
	 	*/
		this.updateCalendar = function() {
			if (checkSignIn()) {
				toString();	// convert
				var user = new Firebase(
						"https://radiant-inferno-3243.firebaseio.com/Users/"
						+ eUser.uID);
				
				// loading
				this.databaseLoading();

				var uGC = user.child("g_calendar");
				if (eUser.uGmailCalendar != null) {
					uGC.set(eUser.uGmailCalendar);
				} else {
					uGC.set(null);
				}
				var uLocal = user.child("local_calendar");
				if (eUser.uLocalCalendar != null) {
					uLocal.set(eUser.uLocalCalendar, onComplete);
				} else {
					uLocal.set(null, onComplete);
				}
			}
		};
	
		/*
	 	* viewProfile function id is id of a person this user wants to view profile
	 	* set name, id, ava, calendar to eFriend
	 	*/
		this.viewProfile = function(id) {
			if (checkSignIn() && id != null && id != "") {
				var ref = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users/" + id);
				// loading
				this.databaseLoading();
				ref.once("value", function(snapshot) {
					var user = snapshot.val();
					// there is no user with that "id"
					if (user == null) {
						alert(id + "does not exist");
					} else {
						// set id's info to $rootScope.eFriend
						eFriend.fID = id;
						eFriend.fName = user.name;
						eFriend.fAvatar = user.avatar;
						eFriend.fVIP = user.VIP;
						eFriend.fFriend = user.friends;
						if (eFriend.fFriend[eUser.uID] != undefined) {console.log(user.g_calendar);
							// set fMultiCal
							var g_calendar = convertCal(user.g_calendar);			
							var local_calendar = convertCal(user.local_calendar);
							var temp = [g_calendar, local_calendar];
							eFriend.fMultiCal = eMultiCalendar.newMultiCal(temp);
						} else eFriend.fMultiCal = null;
						$ionicLoading.hide();
						$rootScope.goToState("profile");
					}
				}, function(errorObject) {
					console.log("Failed to access" + ref);
				});
			}
		};

		/*
	 	* getFriend function get friend list of id
	 	*/
		this.getFriend = function(id) {
			if (checkSignIn() && id != null && id != "") {
				var ref = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users/" + id);
				// loading
				this.databaseLoading();
				ref.once("value", function(snapshot) {
					var user = snapshot.val();
					// there is no user with that "id"
					if (user == null) {
						alert(id + "does not exist");
					} else {
						eFriend.fFriend = user.friends;
						$ionicLoading.hide();
					}
				}, function(errorObject) {
					console.log("Failed to access" + ref);
				});
			}
		};
	};
	
	var db = new db();
	return db;
});