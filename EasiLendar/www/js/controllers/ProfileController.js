/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 09/05/2015
 * type: profile controller
 */

angular.module('MainApp.controllers.profile', [])

.controller("ProfileController", function($scope, $rootScope, $ionicPopup, $ionicSlideBoxDelegate, eUser, eFriend, eEasiLendar, eCheckFriend, eDatabase, eToast) {
	// inject services
	$scope.eUser = eUser;
	$scope.eEasiLendar = eEasiLendar;
	$scope.eFriend = eFriend;
	$scope.eCheckFriend = eCheckFriend;
	$scope.eDatabase = eDatabase;
	$scope.eToast = eToast;

	// initialize var
	$scope.data = {};
	$scope.active = 0;

	$scope.isEditing = false;
	$scope.weekCalendar = eEasiLendar.newWeekCalendar();
	$scope.weekCalendar.setNavDays();

	// function
	$scope.accountType = function() {
		if (eFriend.fVIP) {
			return {
				type: "VIP",
				show: true,
			};
		} else {
			return {
				type: "Standard",
				show: false,
			};
		}
	};

	$scope.status = function() {
		if (eFriend.fBusy) {
			return {status: "Busy", icon: "ion-android-time"};
		} else {
			return {status: "Free", icon: "ion-android-time"};
		}
	};

	$scope.changeIcon = function (id) {
		if (id == eUser.uID) {
			return "ion-android-home";
		} else if (eCheckFriend.isFriend(id)) {
			return "ion-android-delete";
		} else if (eCheckFriend.isRequestedMe(id)) {
			return "ion-android-checkbox";
		}  else if (eCheckFriend.isRequested(id)) {
			return "ion-android-search";
		} else {
			return "ion-person-add";
		}
	};

	$scope.changeFunction = function(id, name) {
		if (id == eUser.uID) {
			$rootScope.goToState("myProfile");
		} else if (eCheckFriend.isFriend(id)) {
			$scope.delFriend(id, name);
		} else if (eCheckFriend.isRequestedMe(id)) {
			$scope.acceptFriend(id, name);
		}  else if (eCheckFriend.isRequested(id)) {
			eDatabase.viewProfile(id);
		} else {
			eDatabase.request(id);
		}
	};

	$scope.acceptFriend = function(id, name) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Are you sure?',
			subTitle: 'You want to be friend with ' + name
		});
		confirmPopup.then(function(res) {
			if (res) {
				eDatabase.addFriend(id);
			} else {
				console.log('You are not sure');
			}
		});
	};

	$scope.delFriend = function() {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Are you sure?',
			subTitle: 'Are you sure to unfriend ' + eFriend.fName + '?'
		});
		confirmPopup.then(function(res) {
			if (res) {
				eDatabase.deleteF(eFriend.fID);
			} else {
				console.log('You are not sure');
			}
		});
	};

	$scope.info = function() {
		var data = {};
		if (eFriend.fInfor) {
			if (eFriend.fInfor.birthday) {
				data.birth = eCalendar.parseDate(eFriend.fInfor.birthday);
			} else {
				data.birth = {
					date: "Ask for birthday!",
					year: "Ask for birthday!"
				};
			}

			if (eFriend.fInfor.gender) {
				data.gender = eFriend.fInfor.gender;
			} else {
				data.gender = "Ask for gender!";
			}

			if (eFriend.fInfor.phone) {
				data.phone = eFriend.fInfor.phone;
			} else {
				data.phone = "Ask for phone number!";
			}

			if (eFriend.fInfor.email) {
				data.email = eFriend.fInfor.email + "@gmail.com";
			} else {
				data.email = "Ask for email!";
			}

			if (eFriend.fInfor.address) {
				data.address = eFriend.fInfor.address;
			} else {
				data.address = "Ask for address!";
			}
		} else {
			data.birth = {
				date: "Ask for birthday!",
				year: "Ask for birthday!"
			};
			data.gender = "Ask for gender!";
			data.phone = "Ask for phone number!";
			data.email = "Ask for email!";
			data.address = "Ask for address!";
		}
		return data;
	};

	$scope.message = function() {
		eToast.toastInfoOne("Coming soon...", 3000);
	};

	$scope.activeTab = function(index) {
		$ionicSlideBoxDelegate.slide(index, 500);
	};

	$scope.slideHasChanged = function(index) {
		$scope.active = index;
		var elem = document.getElementById("tab-" + index);
		var element = angular.element(elem);
		element.prop('checked', true);
	};
})
