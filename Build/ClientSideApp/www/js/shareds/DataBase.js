/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 18/07/2015
 * type: all shared database variables and functions
 */

var database = angular.module('MainApp.shareds.dataBase', []);
database.config(function($httpProvider) {
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
})
database.factory('eDatabase', function($rootScope, $http, $ionicLoading, eToast, eUser, eSettings, eFriend, eCheckFriend, eMultiCalendar, eEasiLendar, eCalendar, $localstorage) {
	// clear all data but setting
	var clearData = function() {
		eUser.resetData();
		eFriend.resetData();
	};

	// show loading it hide when call $ionicLoading.hide() or state change
	var databaseLoading = function() {
		$ionicLoading.show({
			template: '<ion-spinner icon="android" class="loading-spinner"></ion-spinner>',
			hideOnStateChange: true
		});
	};

	// check condition for execute database function
	var checkExe = function() {
		return eUser.isLogin && eSettings.sInternet;
	};

	// saveData function for localstorage
	var saveData = function() {
		if (eUser.uRemember) {
			$localstorage.saveData();
		}
	};

	// toast error and sign out
	var fatalError = function() {
		eToast.toastError('Error. Please log in again!', 3000);
		setTimeout(function() {
			this.signOutEasi();
		}, 3500);
	};

	/*
	 * PRIVATE
	 * convert every dateTime object to String
	 */
	var toString = function() {
		if (!isNull(eUser.uCalendar)) {
			var temp = [];
			for (var x in eUser.uCalendar) {
				if (eUser.uCalendar.hasOwnProperty(x)) {
					temp[x] = eUser.uCalendar[x];
					for (var y in temp[x]) {
						if (temp[x].hasOwnProperty(y)) {
							temp[x][y].start.dateTime = temp[x][y].start.
							dateTime.toString();
							temp[x][y].end.dateTime = temp[x][y].end.dateTime.
							toString();
						}
					}
					temp[x] = angular.copy(temp[x]); // remove the $$hashKey
				}
			}
			eUser.uCalendar = temp;
		}
	};

	/*
	 * PRIVATE
	 * is used to hide loading when done
	 */
	var onComplete = function(error) {
		if (error) {
			console.log('failed');
		} else {
			$ionicLoading.hide();
		}
	};

	/*
	 * convert string dateTime to object Date
	 */
	var convertCal = function(calendar) {
		if (!isNull(calendar)) {
			var temp = [];
			for (var x in calendar) {
				if (calendar.hasOwnProperty(x)) {
					temp[x] = calendar[x];
					for (var y in temp[x]) {
						if (temp[x].hasOwnProperty(y)) {
							temp[x][y].start.dateTime = new Date(temp[x][y].start.dateTime);
							temp[x][y].end.dateTime = new Date(temp[x][y].end.dateTime);
						}
					}
				}
			}
			return temp;
		} else {
			return null;
		}
	};

	function DataBase() {
		this.databaseLoading = databaseLoading;

		// sign out function
		// reset data, delete local storage, go to form.
		this.signOutEasi = function() {
			clearData();
			$localstorage.deleteData();
			$rootScope.goToState('form');
			eToast.toastSuccess('Sign out successfully!', 3000);
		};

		// checkHack function
		this.checkHack = function(id, pass) {
			if (checkExe()) {
				$http({
					url: 'http://easilendar.wc.lt/database/checkPass.php',
					method: "POST",
					data: {
						'id': eUser.uID,
						'pass': eUser.uPassword
					}
				}).success(function(data, status, headers, config) {
					if (data != "true") {
						fatalError();
					}
				}).error(function(data, status, headers, config) {
					fatalError();
				});
			} else {
				fatalError();
			}
		}

		// load friend request save to eUser.uFRequest
		// load requested friend save to eUser.uRequested
		// load friend accepted save to eUser.uFAccepted
		this.loadFriendNoti = function() {
			$http({
				url: 'http://easilendar.wc.lt/database/loadFriendNoti.php',
				method: "POST",
				data: {
					'id': eUser.uID,
					'pass': eUser.uPassword
				}
			}).success(function(data, status, headers, config) {
				if (typeof data == 'object') {
					eUser.uFRequest = data.fRequest;
					eUser.uRequested = data.requested;
					eUser.uFAccepted = data.accepted;
					eUser.uIsDoneFNoti = true;
					saveData();
				} else if (data == 'wrong pass') {
					fatalError();
				} else {
					eToast.toastInfo('Cannot load notification!', 2000);
				}
			}).error(function(data, status, headers, config) {
				eToast.toastInfo('Cannot load notification!', 2000);
			});
		};

		// load friend list save to eUser.uFriend
		this.loadFriend = function() {
			$http({
				url: 'http://easilendar.wc.lt/database/loadFriend.php',
				method: "POST",
				data: {
					'id': eUser.uID,
					'pass': eUser.uPassword
				}
			}).success(function(data, status, headers, config) {
				if (typeof data == 'object') {
					eUser.uFriend = data;
					eUser.uIsDoneFriend = true;
					saveData();
				} else if (data == 'wrong pass') {
					fatalError();
				} else {
					eToast.toastInfo('Cannot load friend data!', 2000);
				}
			}).error(function(data, status, headers, config) {
				eToast.toastInfo('Cannot load friend data!', 2000);
			});
		};

		// updateProfile function
		// update: name, birthday, gender, phone, address
		this.updateProfile = function() {
			if (checkExe()) {
				databaseLoading();
				var upBirthday = eUser.uBirthday != null ? eUser.uBirthday.getTime().toString() : null,
					upGendar = eUser.uGender == "Male" ? 1 : 0;

				$http({
					url: 'http://easilendar.wc.lt/database/updateProfile.php',
					method: "POST",
					data: {
						'id': eUser.uID,
						'pass': eUser.uPassword,
						'name': eUser.uName,
						'birthday': upBirthday,
						'gender': upGendar,
						'phone': eUser.uPhone,
						'address': eUser.uAddress
					}
				}).success(function(data, status, headers, config) {
					$ionicLoading.hide();
					if (data == 'success') {
						eToast.toastSuccess('Update successfully!', 2000);
						saveData();
					} else if (data == 'wrong pass') {
						fatalError();
					} else {
						eToast.toastError('An error occurred. Please try again!', 2000);
					}
				}).error(function(data, status, headers, config) {
					$ionicLoading.hide();
					eToast.toastError('An error occurred. Please try again!', 2000);
				});
			} else {
				eToast.toastInfo('You are current offline', 2000);
			}
		};

		// searchFriend look for any id or name that contains 'str'
		// add to $rootScope.searchFriends
		this.searchFriend = function(str) {
			if (checkExe()) {
				databaseLoading();
				$http({
					url: 'http://easilendar.wc.lt/database/searchFriend.php',
					method: "POST",
					data: {
						'input': str,
					}
				}).success(function(data, status, headers, config) {
					$ionicLoading.hide();
					if (typeof data == 'object') {
						if (!isNull(data)) {
							$rootScope.searchFriends = data;
						}
					} else if (data = 'empty') {
						$rootScope.searchFriends = [];
					} else {
						eToast.toastError('An error occurred. Please try again!', 2000);
					}
				}).error(function(data, status, headers, config) {
					$ionicLoading.hide();
					eToast.toastError('An error occurred. Please try again!', 2000);
				});
			} else {
				eToast.toastInfo('You are current offline', 2000);
			}
		};

		// searchEvent look for any id or name that contains 'str'
		// add to $rootScope.searchEvents
		// local function
		this.searchEvent = function(str) {
			$rootScope.searchEvents = [];
			if (!isNull(str)) {
				var length = 0; // index of last element in searchEvents
				// go through all days
				for (var x in eUser.uCalendar) {
					// go through all events in this day
					for (var y in eUser.uCalendar[x]) {
						var found1 = eUser.uCalendar[x][y].summary.search(str);
						var found2 = !isNull(eUser.uCalendar[x][y].location) ?
							eUser.uCalendar[x][y].location.search(str) : -1;
						// if event summary or location contains 'str'
						if (found1 != -1 || found2 != -1) {
							$rootScope.searchEvents[length++] = eUser.uCalendar[x][y];
						}
					}
				}
			}
		};

		// send id a friend request
		this.requestFriend = function(id) {
			if (checkExe()) {
				if (id != eUser.uID && !eCheckFriend.isFriend(id) && !eCheckFriend.isRequested(id) && !eCheckFriend.isRequestedMe(id)) {
					databaseLoading();
					$http({
						url: 'http://easilendar.wc.lt/database/requestFriend.php',
						method: "POST",
						data: {
							'id': eUser.uID,
							'pass': eUser.uPassword,
							'friendID': id,
						}
					}).success(function(data, status, headers, config) {
						$ionicLoading.hide();
						if (data == 'success') {
							// add id to this user's requested list
							if (isNull(eUser.uRequested)) {
								eUser.uRequested = [];
							}
							eUser.uRequested[id] = {
								id: id
							};
							eToast.toastSuccess('Friend request sent!', 2000);
							saveData();
						} else if (data == 'wrong pass') {
							fatalError();
						} else {
							eToast.toastError('An error occurred. Please try again!', 2000);
						}
					}).error(function(data, status, headers, config) {
						$ionicLoading.hide();
						eToast.toastError('An error occurred. Please try again!', 2000);
					});
				}
			} else {
				eToast.toastInfo('You are current offline', 2000);
			}
		};

		// accept id friend request
		this.acceptFriend = function(id) {
			if (checkExe()) {
				// request myself
				if (eCheckFriend.isRequestedMe(id)) {
					databaseLoading();
					$http({
						url: 'http://easilendar.wc.lt/database/acceptFriend.php',
						method: "POST",
						data: {
							'id': eUser.uID,
							'pass': eUser.uPassword,
							'friendID': id,
						}
					}).success(function(data, status, headers, config) {
						$ionicLoading.hide();
						if (data == 'success') {
							// add friend
							eUser.uFriend[id] = eUser.uFRequest[id];
							// remove friend request
							delete eUser.uFRequest[id];

							eToast.toastSuccess('Accepeted!', 2000);
							saveData();
						} else if (data == 'wrong pass') {
							fatalError();
						} else {
							eToast.toastError('An error occurred. Please try again!', 2000);
						}
					}).error(function(data, status, headers, config) {
						$ionicLoading.hide();
						eToast.toastError('An error occurred. Please try again!', 2000);
					});
				}
			} else {
				eToast.toastInfo('You are current offline', 2000);
			}
		};

		// reject id friend request
		this.rejectFriend = function(id) {
			if (checkExe()) {
				// request myself
				if (eCheckFriend.isRequestedMe(id)) {
					databaseLoading();
					$http({
						url: 'http://easilendar.wc.lt/database/rejectFriend.php',
						method: "POST",
						data: {
							'id': eUser.uID,
							'pass': eUser.uPassword,
							'friendID': id,
						}
					}).success(function(data, status, headers, config) {
						$ionicLoading.hide();
						if (data == 'success') {
							// remove friend request
							delete eUser.uFRequest[id];

							eToast.toastSuccess('Rejected!', 2000);
							saveData();
						} else if (data == 'wrong pass') {
							fatalError();
						} else {
							eToast.toastError('An error occurred. Please try again!', 2000);
						}
					}).error(function(data, status, headers, config) {
						$ionicLoading.hide();
						eToast.toastError('An error occurred. Please try again!', 2000);
					});
				}
			} else {
				eToast.toastInfo('You are current offline', 2000);
			}
		};

		// delete id in friend list
		this.deleteFriend = function(id) {
			if (checkExe()) {
				if (eCheckFriend.isFriend(id)) {
					databaseLoading();
					$http({
						url: 'http://easilendar.wc.lt/database/deleteFriend.php',
						method: "POST",
						data: {
							'id': eUser.uID,
							'pass': eUser.uPassword,
							'friendID': id,
						}
					}).success(function(data, status, headers, config) {
						$ionicLoading.hide();
						if (data == 'success') {
							// remove friend
							delete eUser.uFriend[id];

							eToast.toastSuccess('Deleted!', 2000);
							saveData();
						} else if (data == 'wrong pass') {
							fatalError();
						} else {
							eToast.toastError('An error occurred. Please try again!', 2000);
						}
					}).error(function(data, status, headers, config) {
						$ionicLoading.hide();
						eToast.toastError('An error occurred. Please try again!', 2000);
					});
				}
			} else {
				eToast.toastInfo('You are current offline', 2000);
			}
		};

		// update everything from server equivelent to sign in again
		this.refresh = function() {
			this.loadFriendNoti();
			this.loadFriend();
			//this.loadMeetingNoti();
			//this.loadEvent();
		};

		/*
		 * get friend's calendar function return object multiCalendar of "id"
		 */
		this.getCalendar = function(id) {
			if (checkExe() && !isNull(id)) {
				var ref = new Firebase(
					'https://radiant-inferno-3243.firebaseio.com/Users/' + id);
				// loading
				this.databaseLoading();
				ref.once('value', function(snapshot) {
					var user = snapshot.val();
					if (isNull(user)) {
						alert(id + 'does not exist');
					} else {
						user.g_calendar = convertCal(user.g_calendar);
						user.local_calendar = convertCal(user.local_calendar);
						var temp = [user.g_calendar, user.local_calendar];
						eFriend.fMultiCal = eMultiCalendar.newMultiCal(temp);
						$ionicLoading.hide();
						saveData();
					}
				}, function(errorObject) {
					console.log('Failed to access' + ref);
				});
			} else {
				return false;
			}
		};

		/*
		 * deleteFN function delete friend accepted noti 'id' is 
		 * index of noti in
		 * uFAccepted array
		 */
		this.deleteFN = function(id) {
			if (checkExe() && !isNull(id)) {
				delete eUser.uFAccepted[id];
				setUFAL(); // set uFALength

				var uAccept = new Firebase(
					'https://radiant-inferno-3243.firebaseio.com/Users/' +
					eUser.uID + '/noti/fAccept/' + id);
				// loading
				this.databaseLoading();
				uAccept.set(null, onComplete);
				saveData();
			} else {
				return false;
			}
		};

		/*
		 * getInformation function id is id of a person user
		 * want to get info set
		 * info in eFriend
		 */
		this.getInformation = function(id) {
			if (checkExe() && !isNull(id)) {
				var ref = new Firebase(
					'https://radiant-inferno-3243.firebaseio.com/Users/' + id);
				// loading
				this.databaseLoading();
				ref.once('value', function(snapshot) {
					var user = snapshot.val();
					// there is no user with that "id"
					if (isNull(user)) {
						alert(id + 'does not exist');
					} else {
						// set user's info to $rootScope.eFriend
						eFriend.fID = id;
						eFriend.fName = user.name;
						eFriend.fAvatar = user.avatar;
						eFriend.fVIP = user.VIP;
						eFriend.fInfor = {
							gender: user.gender,
							birthday: user.birthday,
							phone: user.phone,
							address: user.address,
							email: user.gmail
						};
						$ionicLoading.hide();
					}
				}, function(errorObject) {
					console.log('Failed to access' + ref);
				});
			} else {
				return false;
			}
		};

		/*
		 * updateCalendar function update user's calendar to server
		 */
		this.updateCalendar = function() {
			if (checkExe()) {
				toString(); // convert
				var user = new Firebase(
					'https://radiant-inferno-3243.firebaseio.com/Users/' +
					eUser.uID);

				// loading
				this.databaseLoading();

				var uGC = user.child('g_calendar');
				if (!isNull(eUser.uCalendar)) {
					uGC.set(eUser.uCalendar);
				} else {
					uGC.set(null);
				}
				var uLocal = user.child('local_calendar');
				if (!isNull(eUser.uLocalCalendar)) {
					uLocal.set(eUser.uLocalCalendar, onComplete);
				} else {
					uLocal.set(null, onComplete);
				}
				saveData();
			} else {
				return false;
			}
		};

		/*
		 * viewProfile function
		 * id is id of a person this user wants to view profile
		 * set name, id, ava, calendar to eFriend
		 */
		this.viewProfile = function(id) {
			if (checkExe() && !isNull(id)) {
				var ref = new Firebase(
					'https://radiant-inferno-3243.firebaseio.com/Users/' + id);
				// loading
				this.databaseLoading();
				ref.once('value', function(snapshot) {
					var user = snapshot.val();
					// there is no user with that "id"
					if (isNull(user)) {
						alert(id + 'does not exist');
					} else {
						// set id's info to $rootScope.eFriend
						eFriend.fID = id;
						eFriend.fName = user.name;
						eFriend.fAvatar = user.avatar;
						eFriend.fVIP = user.VIP;
						eFriend.fFriend = user.friends;
						eFriend.fInfor = {
							gender: user.gender,
							birthday: user.birthday,
							phone: user.phone,
							address: user.address,
							email: user.gmail
						};
						if (!isNull(eUser.uFriend) &&
							!isNull(eUser.uFriend[id]) &&
							!isNull(eFriend.fFriend[eUser.uID])) {
							// set fMultiCal
							var g_calendar = convertCal(user.g_calendar);
							var local_calendar = convertCal(user.local_calendar);
							var temp = [g_calendar, local_calendar];
							eFriend.fMultiCal = eMultiCalendar.
							newMultiCal(temp);
						} else {
							eFriend.fMultiCal = null;
						}
						$ionicLoading.hide();
						$rootScope.goToState('profile');
					}
				}, function(errorObject) {
					console.log('Failed to access' + ref);
				});
			} else {
				return false;
			}
		};

		/*
		 * getFriend function get friend list of id
		 */
		this.getFriend = function(id) {
			if (checkExe() && !isNull(id)) {
				var ref = new Firebase(
					'https://radiant-inferno-3243.firebaseio.com/Users/' + id);
				// loading
				this.databaseLoading();
				ref.once('value', function(snapshot) {
					var user = snapshot.val();
					// there is no user with that "id"
					if (isNull(user)) {
						alert(id + 'does not exist');
					} else {
						eFriend.fFriend = user.friends;
						$ionicLoading.hide();
					}
				}, function(errorObject) {
					console.log('Failed to access' + ref);
				});
			} else {
				return false;
			}
		};

		/*
		 * PRIVATE
		 * help function for updateEvent
		 */
		this.updateEventHelper = function(event) {
			var startDate = new Date(event.start.dateTime),
				endDate = new Date(event.end.dateTime),
				// normal/all/over
				etype = eEasiLendar.isType(event.start, event.end);

			// date1, date2 are different if etype is over
			var date1 = new Date(startDate.getFullYear(),
				startDate.getMonth(), startDate.getDate());

			var date2 = new Date(endDate.getFullYear(),
				endDate.getMonth(), endDate.getDate());

			var day = new Firebase(
				'https://radiant-inferno-3243.firebaseio.com/Users/' +
				eUser.uID + '/g_calendar');
			// loading
			this.databaseLoading();
			if (etype != 'over') {
				var temp = isNull(eUser.uCalendar[date1]) ? null :
					angular.copy(eUser.uCalendar[date1]);
				// has only 1 day to update
				day.child(date1.toString()).set(temp, onComplete);
			} else {
				// update every from date1 to date2
				while (date1 <= date2) {
					var temp = isNull(eUser.uCalendar[date1]) ? null :
						angular.copy(eUser.uCalendar[date1]);
					if (date1 < date2) {
						day.child(date1.toString()).set(temp);
					} else {
						day.child(date1.toString()).set(temp, onComplete);
					}
					date1 = eCalendar.tomorrow(date1);
				}
			}
		};

		/*
		 * updateEvent function
		 * type is string ['create', 'del', 'edit']
		 * event1 is new created event/delete event/event before edit
		 * event2 is event after edit
		 */
		this.updateEvent = function(event1, type, event2) {
			if (checkExe() && !isNull(event1) && !isNull(type)) {
				if (type == 'create') {
					this.updateEventHelper(event1);
				} else if (type == 'del') {
					this.updateEventHelper(event1);
				} else if (type == 'edit' && !isNull(event2)) {
					this.updateEventHelper(event1);
					this.updateEventHelper(event2);
				}
				saveData();
			} else {
				return false;
			}
		};

		/*
		 * checkBusy function
		 * true if "id" is busy today, false otherwise
		 */
		this.checkBusy = function(id) {
			if (checkExe() && !isNull(id)) {
				var ref = new Firebase(
					'https://radiant-inferno-3243.firebaseio.com/Users/' + id);
				// loading
				this.databaseLoading();
				ref.once('value', function(snapshot) {
					var user = snapshot.val();
					// there is no user with that 'id'
					if (isNull(user)) {
						alert(id + 'does not exist');
					} else {
						var time = new Date();
						var today = new Date(time.getFullYear(),
							time.getMonth(),
							time.getDate());
						if (isNull(user.g_calendar) ||
							isNull(user.g_calendar[today])) {
							return false;
						} else {
							return true;
						}
					}
				}, function(errorObject) {
					console.log('Failed to access' + ref);
				});
			} else {
				return false;
			}
		};
	}
	return new DataBase();
});
