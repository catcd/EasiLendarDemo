/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 09/05/2015
 * type: my profile controller
 */

angular.module('MainApp.controllers.myProfile', [])

.controller("MyProfileController", function($scope, $rootScope, $ionicSlideBoxDelegate, $ionicPopup, eUser, eDatabase, eToast, eCalendar) {
	// inject service
	$scope.eUser = eUser;
	$scope.eDatabase = eDatabase;

	$scope.data = {};
	$scope.active = 0;

	$scope.rightButton = {};
	$scope.rightButton[false] = {
		icon: "ion-ios-gear-outline"
	};
	$scope.rightButton[true] = {
		icon: "ion-android-done"
	};

	$scope.leftButton = {};
	$scope.leftButton[false] = {
		icon: "ion-ios-arrow-left"
	};
	$scope.leftButton[true] = {
		icon: "ion-android-close"
	};

	$scope.tempUserData = angular.copy(eUser);
	$scope.timeInfo = {};
	$scope.rand = Math.floor(Math.random() * 30);

	$scope.quote = [{
		quote: "\"How many cares one loses when one decides not to be something but to be someone.\"",
		author: "- Gabrielle \"Coco\" Chanel"
	}, {
		quote: "\"Be who you are and say what you feel, because those who mind don’t matter and those who matter don’t mind.\"",
		author: "- Dr. Seuss"
	}, {
		quote: "\"Imitation is suicide.\"",
		author: "- Ralph Waldo Emerson"
	}, {
		quote: "\"Do your own thing on your own terms and get what you came here for.\"",
		author: "- Oliver James"
	}, {
		quote: "\"Flatter yourself critically.\"",
		author: "- Willis Goth Regier"
	}, {
		quote: "\"Do what you feel in your heart to be right, for you’ll be criticized anyway.\"",
		author: "- Eleanor Roosevelt"
	}, {
		quote: "\"Whenever you find yourself on the side of the majority, it is time to pause and reflect.\"",
		author: "- Mark Twain"
	}, {
		quote: "\"I will not let anyone walk through my mind with their dirty feet.\"",
		author: "- Mahatma Gandhi"
	}, {
		quote: "\"Better to write for yourself and have no public, than to write for the public and have no self.\"",
		author: "- Cyril Connolly"
	}, {
		quote: "\"We must not allow other people’s limited perceptions to define us.\"",
		author: "- Virginia Satir"
	}, {
		quote: "\"Don’t look for society to give you permission to be yourself.\"",
		author: "- Steve Maraboli"
	}, {
		quote: "\"If things go wrong, don’t go with them.\"",
		author: "- Roger Babson"
	}, {
		quote: "\"Wanting to be someone else is a waste of who you are.\"",
		author: "- Kurt Cobain"
	}, {
		quote: "\"Tension is who you think you should be. Relaxation is who you are.\"",
		author: "- Chinese Proverb"
	}, {
		quote: "\"Where’s your will to be weird?\"",
		author: "- Jim Morrison"
	}, {
		quote: "\"Some people say you are going the wrong way, when it’s simply a way of your own.\"",
		author: "- Angelina Jolie"
	}, {
		quote: "\"Remember to always be yourself. Unless you suck.\"",
		author: "- Joss Whedon"
	}, {
		quote: "\"Do what you can, with what you have, where you are.\"",
		author: "- Theodore Roosevelt"
	}, {
		quote: "\"Be yourself; everyone else is already taken.\"",
		author: "- Oscar Wilde"
	}, {
		quote: "\"I took a deep breath and listened to the old bray of my heart. I am. I am. I am.\"",
		author: "- Sylvia Plath"
	}, {
		quote: "\"There came a time when the risk to remain tight in the bud was more painful than the risk it took to blossom.\"",
		author: "- Anaïs Nin"
	}, {
		quote: "\"To find yourself, think for yourself.\"",
		author: "- Socrates"
	}, {
		quote: "\"If you seek authenticity for authenticity’s sake you are no longer authentic.\"",
		author: "- Jean Paul Sartre"
	}, {
		quote: "\"If you cannot be a poet, be the poem.\"",
		author: "- David Carradine"
	}, {
		quote: "\"When one is pretending the entire body revolts.\"",
		author: "- Anaïs Nin"
	}, {
		quote: "\"Be there for others, but never leave yourself behind.\"",
		author: "- Dodinsky"
	}, {
		quote: "\"Do what you must, And your friends will adjust.\"",
		author: "- Robert Brault"
	}, {
		quote: "\"Just let awareness have its way with you completely.\"",
		author: "- Scott Morrison"
	}, {
		quote: "\"We must be our own before we can be another’s.\"",
		author: "- Ralph Waldo Emerson"
	}, {
		quote: "\"This above all: to thine own self be true.\"",
		author: "- William Shakespeare"
	}, ];

	// initialize var
	$scope.isEditing = false;

	window.onload = function() {
		updateTime();
		todayStatus();
		setInterval(updateTime, 1000);
	};

	// function
	$rootScope.$on('$stateChangeStart', function(event, toState, fromState) {
		if (toState.name == 'myProfile') {
			updateTime();
			todayStatus();
			setInterval(updateTime, 1000);
			resetData();
		}
	});

	$scope.isShowFriendMore = function() {
		var count = 0;
		eUser.uFriend.forEach(function(element, index) {
			count++;
		});

		return {
			count: count,
			show: (count > 4)
		};
	};

	$scope.generateRand = function() {
		$scope.rand = Math.floor(Math.random() * 30);
	};

	var todayStatus = function() {
		var temp = new Date();
		var startToday = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());
		var check = false;

		if (eUser.uGmailCalendar !== null && eUser.uGmailCalendar[startToday] != undefined) {
			var data = eUser.uGmailCalendar[startToday];

			data.every(function(element, index) {
				if (element.start.dateTime > temp) {
					console.log(element);
					document.getElementById('my-profile-status')
						.innerHTML = "Next event: " + element.summary + "<br>" + eCalendar.convertTime(element) + (element.location != undefined ? "<br>at " + element.location : "");
					check = true;
					return false;
				}
				if (!check) {
					document.getElementById('my-profile-status').innerHTML = "Today has nothing to do left.";
				}
			});
		} else {
			document.getElementById('my-profile-status').innerHTML = "Today has nothing to do left.";
		}
	};

	$scope.info = function() {
		var data = {};
		if (eUser.uBirthday) {
			data.birth = eCalendar.parseDate(eUser.uBirthday);
		} else {
			data.birth = {
				date: "Not set",
				year: "Not set"
			};
		}

		if (eUser.uGender) {
			data.gender = eUser.uGender;
		} else {
			data.gender = "Not set";
		}

		if (eUser.uPhone) {
			data.phone = eUser.uPhone;
		} else {
			data.phone = "Not set";
		}

		if (eUser.uAddress) {
			data.address = eUser.uAddress;
		} else {
			data.address = "Not set";
		}

		return data;
	};

	var updateTime = function() {
		var t = new Date();

		$scope.timeInfo.date = eCalendar.easiConvertTime(t).date;
		$scope.timeInfo.time = eCalendar.easiConvertTime(t).time;

		document.getElementById('my-profile-date').innerHTML = $scope.timeInfo.date;
		document.getElementById('my-profile-time').innerHTML = $scope.timeInfo.time;
	};

	var resetData = function() {
		$scope.data = {};
		$scope.active = 0;
		$scope.tempUserData = angular.copy(eUser);
		$scope.isEditing = false;
	};

	$scope.rightFunction = function() {
		if ($scope.isEditing) {
			$scope.done();
		} else {
			$scope.setting();
		}
	};

	$scope.leftFunction = function() {
		if ($scope.isEditing) {
			$scope.cancel();
		} else {
			$rootScope.goHome();
		}
	};

	$scope.setting = function() {
		eToast.toastInfoOne("Coming soon...", 3000);
	};

	$scope.capture = function() {
		eToast.toastInfoOne("Coming soon...", 3000);
	};

	$scope.edit = function() {
		if (eUser.uBirthday) {
			$scope.data.date = eUser.uBirthday.getDate();
			$scope.data.month = eUser.uBirthday.getMonth() + 1;
			$scope.data.year = eUser.uBirthday.getFullYear();
		} else {
			$scope.data.date = null;
			$scope.data.month = null;
			$scope.data.year = null;
		}

		if (eUser.uGender) {
			$scope.data.gender = (eUser.uGender == "Male" ? true : false);
		} else {
			$scope.data.gender = null;
		}

		if (eUser.uPhone) {
			$scope.data.phone = eUser.uPhone;
		} else {
			$scope.data.phone = null;
		}

		$scope.activeTab(1);
		$scope.tempUserData = angular.copy(eUser);
		$scope.isEditing = true;
		$ionicSlideBoxDelegate.enableSlide(false);
	};

	$scope.done = function() {
		if ($scope.data.year || $scope.data.month || $scope.data.date) {
			$scope.data.year = ($scope.data.year == null ? "1900" : $scope.data.year);
			$scope.data.month = ($scope.data.month == null ? "1" : $scope.data.month);
			$scope.data.date = ($scope.data.date == null ? "1" : $scope.data.date);

			eUser.uBirthday = new Date(parseInt($scope.data.year), parseInt($scope.data.month) - 1, parseInt($scope.data.date));
		}

		eUser.uGender = ($scope.data.gender ? "Male" : "Female");

		$scope.data.phone = $scope.data.phone.toString();

		if ($scope.data.phone.charAt(0) == '0') {
			eUser.uPhone = $scope.data.phone;
		} else {
			eUser.uPhone = "0" + $scope.data.phone;
		}

		$scope.data = {};
		$scope.isEditing = false;
		$ionicSlideBoxDelegate.enableSlide(true);
		eDatabase.updateProfile();
	};

	$scope.cancel = function() {
		$scope.data = {};
		eUser.uName = $scope.tempUserData.uName;
		eUser.uAvatar = $scope.tempUserData.uAvatar;
		eUser.uEmail = $scope.tempUserData.uEmail;
		eUser.uGender = $scope.tempUserData.uGender;
		eUser.uPhone = $scope.tempUserData.uPhone;
		eUser.uAddress = $scope.tempUserData.uAddress;

		$scope.isEditing = false;
		$ionicSlideBoxDelegate.enableSlide(true);
	};

	$scope.nextLeftAva = function() {
		if ($scope.isEditing) {
			eUser.uAvatar = ((parseInt(eUser.uAvatar) + 8) % 9).toString();
		}
	};

	$scope.nextRightAva = function() {
		if ($scope.isEditing) {
			eUser.uAvatar = ((parseInt(eUser.uAvatar) + 1) % 9).toString();
		}
	};

	$scope.accountType = function() {
		if (eUser.uVIP) {
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

	$scope.delFriend = function(id, name) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Are you sure?',
			subTitle: 'Are you sure to unfriend ' + name + '?'
		});
		confirmPopup.then(function(res) {
			if (res) {
				eDatabase.deleteF(id);
			} else {
				console.log('You are not sure');
			}
		});
	};

	$scope.activeTab = function(index) {
		if (!$scope.isEditing) {
			$ionicSlideBoxDelegate.slide(index, 500);
		} else {
			var elem = document.getElementById("tab-1");
			var element = angular.element(elem);
			element.prop('checked', true);
		}
	};

	$scope.slideHasChanged = function(index) {
		$scope.active = index;
		var elem = document.getElementById("my-profile-tab-" + index);
		var element = angular.element(elem);
		element.prop('checked', true);
	};
})
