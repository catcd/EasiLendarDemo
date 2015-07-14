/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 05/07/2015
 * type: my profile controller
 */

angular.module('MainApp.controllers.myProfile', [])

.controller('MyProfileController', function($scope, $rootScope, $ionicSlideBoxDelegate, $ionicPopup, eUser, eDatabase, eToast, eCalendar) {
	// inject service
	$scope.eUser = eUser;
	$scope.eDatabase = eDatabase;
	$scope.eCalendar = eCalendar;

	// init constant
	$scope.rightButton = {};
	$scope.rightButton[false] = {
		icon: 'ion-android-settings'
	};
	$scope.rightButton[true] = {
		icon: 'ion-android-done'
	};
	$scope.leftButton = {};
	$scope.leftButton[false] = {
		icon: 'ion-home'
	};
	$scope.leftButton[true] = {
		icon: 'ion-android-close'
	};

	// init var
	$scope.data = {};
	$scope.active = 0;
	$scope.isEditing = false;
	var enableSlide = true;

	$scope.onLoadMyProfile = function() {
		updateTime();
		eventStatus();
		setInterval(updateTime, 1000);
	};

	var updateTime = function() {
		var t = new Date();

		var date = eCalendar.easiConvertTime(t).date;
		var time = eCalendar.easiConvertTime(t).time;

		document.getElementById('mp-date').innerHTML = date;
		document.getElementById('mp-time').innerHTML = time;
	};

	var eventStatus = function() {
		var count = 0,
			calendar,
			temp = new Date(),
			startToday = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());

		if (eUser.uGmailCalendar !== null && eUser.uGmailCalendar[startToday] !== undefined) {
			var calendar = eUser.uGmailCalendar[startToday];

			calendar.every(function(element) {
				if (element.start.dateTime > temp) {
					count++;
				}
			});
		}

		if (count > 0) {
			document.getElementById('mp-status').innerHTML = 'Today has ' + count + ' event(s) to do.';
		} else {
			document.getElementById('mp-status').innerHTML = 'Today has nothing to do left.';
		}
	};

	// function next to avatar
	$scope.capture = function() {
		eToast.toastInfo('Coming soon...', 3000);
	};

	$scope.edit = function() {
		$scope.data.name = eUser.uName;
		$scope.data.date = eUser.uBirthday;
		$scope.data.gender = (eUser.uGender == 'Male' ? true : false);
		$scope.data.phone = eUser.uPhone;
		$scope.data.address = eUser.uAddress;

		$scope.activeTab(1);
		$scope.isEditing = true;
		enableSlide = false;
	};

	// function to active tab
	$scope.activeTab = function(index) {
		if (enableSlide) {
			$scope.active = index <= 3 && index >= 0 ? index : 0;

			var elem = document.getElementById('mp-tab-' + index);
			var element = angular.element(elem);
			element.prop('checked', true);
		}
	};

	// function for right and left btn on header bar
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

	$scope.done = function() {
		eUser.uName = $scope.data.name;

		eUser.uBirthday = $scope.data.date;

		eUser.uGender = ($scope.data.gender ? 'Male' : 'Female');

		if ($scope.data.phone) {
			$scope.data.phone = $scope.data.phone.toString();

			eUser.uPhone = $scope.data.phone.charAt(0) == '0' ?
				$scope.data.phone : '0' + $scope.data.phone;
		}

		eUser.uAddress = $scope.data.address;

		$scope.data = {};
		$scope.isEditing = false;
		enableSlide = true;
		eDatabase.updateProfile();
	};

	$scope.setting = function() {
		eToast.toastInfo('Coming soon...', 3000);
	};

	$scope.cancel = function() {
		$scope.data = {};

		$scope.isEditing = false;
		enableSlide = true;
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

	// select birthday
	$scope.currentDate = new Date();

	$scope.datePickerCallback = function(val) {
		if (typeof(val) === 'undefined') {
			console.log('Date not selected');
		} else {
			$scope.data.date = new Date(val);
			$scope.mBirthday = eCalendar.parseDate($scope.data.date).date +
							' ' + eCalendar.parseDate($scope.data.date).year;
		}
	};

	$scope.mBirthday = '';
});
