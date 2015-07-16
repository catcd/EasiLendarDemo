/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 17/07/2015
 * type: my profile controller
 */

angular.module('MainApp.controllers.myProfile', [])

.controller('MyProfileController', function($scope, $rootScope, $ionicPopup, eUser, eSettings, eDatabase, eToast, eCalendar) {
	// inject service
	$scope.eUser = eUser;
	$scope.eCalendar = eCalendar;

	// initialize constant
	$scope.rightButton  = {};
	$scope.rightButton[false] = 'ion-android-settings';
	$scope.rightButton[true] = 'ion-android-done';
	$scope.leftButton = {};
	$scope.leftButton[false] = 'ion-home';
	$scope.leftButton[true] = 'ion-android-close';

	// initialize variable
	$scope.data = {};
	$scope.active = 0;
	$scope.isEditing = false;
	var enableSlide = true;

	// function next to avatar
	$scope.capture = function() {
		eToast.toastInfo('Coming soon...', 2000);
	};

	$scope.edit = function() {
		if (eSettings.sInternet) {
			$scope.data.name = eUser.uName;
			$scope.data.date = eUser.uBirthday;
			$scope.data.gender = (eUser.uGender == 'male' ? true : false);
			$scope.data.phone = eUser.uPhone;
			$scope.data.address = eUser.uAddress;

			$scope.activeTab(0);
			$scope.isEditing = true;
			enableSlide = false;
		} else {
			eToast.toastInfo('You are current offline', 2000);
		}
	};

	// function to active tab
	$scope.activeTab = function(index) {
		if (enableSlide) {
			if (!eSettings.sInternet && (index == 2 || index == 3)) {
				eToast.toastInfo('You are current offline', 2000);
			} else {
				$scope.active = index <= 3 && index >= 0 ? index : 0;

				var elem = document.getElementById('mp-tab-' + index);
				var element = angular.element(elem);
				element.prop('checked', true);
			}
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
			eUser.uPhone = $scope.data.phone.charAt(0) == '0' ?	$scope.data.phone : '0' + $scope.data.phone;
		}

		eUser.uAddress = $scope.data.address;

		$scope.cancel();
		eDatabase.updateProfile();
	};

	$scope.setting = function() {
		eToast.toastInfo('Coming soon...', 2000);
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
			$scope.mBirthday = eCalendar.parseDate($scope.data.date).utcDate;
		}
	};

	$scope.mBirthday = eUser.uBirthday != null ? eCalendar.parseDate(eUser.uBirthday).utcDate : '';
});