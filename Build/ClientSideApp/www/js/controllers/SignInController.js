/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 17/07/2015
 * type: particular controller
 */

var signIn = angular.module('MainApp.controllers.signIn', []);
signIn.config(function($httpProvider) {
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
})
signIn.controller('SignInController', function($scope, $rootScope, $ionicLoading, $http, eDatabase, eUser, eToast) {
	// All constants
	var MAX_ID_LENGTH = 16,
		MIN_ID_LENGTH = 6,
		MAX_PASSWORD_LENGTH = 32,
		MIN_PASSWORD_LENGTH = 8,
		MAX_NAME_LENGTH = 255,
		NUM_OF_WARNINGS = 5;

	// check if Remember Me is checked
	$scope.isRemember = false;

	// create new user for ng-model and check data itself
	// Class User is defined at the end of file
	$scope.user = new User();

	// warning object contains all warnings in register
	$scope.warnings = {
		// array of messages
		mes: new Array(NUM_OF_WARNINGS),

		// function
		// reset messages (set to null)
		reset: function(num) {
			if (num < NUM_OF_WARNINGS) this.mes[num] = null;
		},
		// reset messages (set to null)
		resetAll: function() {
			for (var i = 0; i < NUM_OF_WARNINGS; i++) {
				this.reset(i);
			}
		},
		// check if mes[i] is a warning or NULL
		check: function(num) {
			return isNull(this.mes[num]);
		}
	};

	// sign in function with firebase
	$scope.signIn = function() {
		if ($scope.user.checkID() != true) {
			eToast.toastError('Input ID error! Please retype!', 3000);
		} else if ($scope.user.checkPass() != true) {
			eToast.toastError('Input Password error! Please retype!', 3000);
		} else {
			eDatabase.databaseLoading();
			// connect throught http connection
			$http({
				url: 'http://easilendar.wc.lt/database/signIn.php',
				method: "POST",
				data: {
					'id': $scope.user.id,
					'pass': $scope.user.password
				}
			}).success(function(data, status, headers, config) {
				$ionicLoading.hide();
				if (data == 'wrong') {
					eToast.toastError('Wrong password! Please try again!', 2000);
				} else if (typeof data == 'object') {
					// copy data
					eUser.uID = $scope.user.id;
					eUser.uName = data.name;
					eUser.uAvatar = data.avatar;
					eUser.uEmail = data.gmail;
					eUser.uPassword = $scope.user.password;

					if (!isNull(data.gender)) eUser.uGender = data.gender == 1 ? "Male" : "Female";
					if (!isNull(data.birthday)) eUser.uBirthday = new Date(parseInt(data.birthday));
					if (!isNull(data.phone)) eUser.uPhone = data.phone;
					if (!isNull(data.address)) eUser.uAddress = data.address;

					eUser.uRemember = $scope.isRemember;
					eUser.isLogin = true;
					// get calendar, noti and friends
					$scope.user.reset();
					$rootScope.goHome();
				} else {
					eToast.toastError('An error occurred. Please try again!', 2000);
				}
			}).error(function(data, status, headers, config) {
				$ionicLoading.hide();
				eToast.toastError('An error occurred. Please try again!', 2000);
			});
		}
	};
	// 				eUser.uFriend = user.friends;
	// 				eUser.uGmailCalendar = eDatabase.convertCal(user.g_calendar);
	// 				eUser.uLocalCalendar = eDatabase.convertCal(user.local_calendar);
	// 				eUser.uFaceCalendar = eDatabase.convertCal(user.face_calendar);
	// 				eUser.uRequested = user.requested;
	// 				eUser.uFRequest = isNull(user.noti) ? null : user.noti.fRequest;
	// 				eUser.uFAccepted = isNull(user.noti) ? null : user.noti.fAccept;
	// 				eUser.uFRLength = 0;
	// 				eUser.uFALength = 0;
	// 				eDatabase.setUFRL();
	// 				eDatabase.setUFAL();
	// 				eDatabase.loadFriendInfo(eUser.uRequested);
	// 				eDatabase.loadFriendInfo(eUser.uFriend, 'friend');
	// 				eDatabase.loadFriendInfo(eUser.uFRequest);
	// 				eDatabase.loadFriendInfo(eUser.uFAccepted, 'noti');

	// register function
	$scope.register = function() {
		// flag array, contains temporary warning messages
		var flag = [],
			check = true;

		flag[0] = $scope.user.checkID(); // ID: true or message
		flag[1] = $scope.user.checkName(); // Name: true or message
		flag[2] = $scope.user.checkEmail(); // Email: true or message
		flag[3] = $scope.user.checkPass(); // Password: true or message
		flag[4] = $scope.user.checkCPass(); // Confirm password: true or message

		for (var i = 0; i < NUM_OF_WARNINGS; i++) {
			if (flag[i] != true) {
				$scope.warnings.mes[i] = flag[i];
				check = false;
			}
		}
		if (check) {
			eDatabase.databaseLoading();

			// cut email string to save (get rid of '@gmail.com')
			var pos = $scope.user.email.search('@');
			var mail;
			if (pos == -1) {
				mail = $scope.user.email;
			} else {
				mail = $scope.user.email.slice(0, pos);
			}

			// connect throught http connection
			$http({
				url: 'http://easilendar.wc.lt/database/register.php',
				method: "POST",
				data: {
					'id': $scope.user.id,
					'name': $scope.user.name,
					'pass': $scope.user.password,
					'mail': mail
				}
			}).success(function(data, status, headers, config) {
				$ionicLoading.hide();
				if (data == 'success') {
					// TODO send email throught gmail API
					eToast.toastSuccess('Welcome to EasiLendar!', 2000);
					$scope.user.reset();
					$rootScope.goToState('form');
				} else if (data == 'exist id') {
					$scope.warnings.mes[0] = 'Existed ID'
				} else if (data == 'exist gmail') {
					$scope.warnings.mes[2] = 'Existed email'
				} else {
					eToast.toastError('An error occurred. Please try again!', 2000);
				}
			}).error(function(data, status, headers, config) {
				$ionicLoading.hide();
				eToast.toastError('An error occurred. Please try again!', 2000);
			});
		}
	};

	// Class User
	function User() {
		// all informations
		this.id = '';
		this.name = '';
		this.email = '';
		this.password = '';
		this.re_password = '';

		// reset all data
		this.reset = function() {
			this.id = '';
			this.name = '';
			this.email = '';
			this.password = '';
			this.re_password = '';
		};

		//check ID and return warning if wrong
		this.checkID = function() {
			// check null
			if (isNull(this.id)) return 'Required';
			// check length
			if (this.id.length < MIN_ID_LENGTH) return 'Too short';
			if (this.id.length > MAX_ID_LENGTH) return 'Too long';
			// check charset: 0..9 || a..z || A..Z || _
			for (var i = 0; i < this.id.length; i++) {
				if (!(this.id.charAt(i) == '_' ||
						this.id.charAt(i) >= 'a' && this.id.charAt(i) <= 'z' ||
						this.id.charAt(i) >= 'A' && this.id.charAt(i) <= 'Z' ||
						this.id.charAt(i) >= '0' && this.id.charAt(i) <= '9')) {
					return 'Charset invalid';
				}
			}
			return true;
		};

		// check Password and return warning if wrong
		this.checkPass = function() {
			// check null
			if (isNull(this.password)) return 'Required';
			// check length
			if (this.password.length < MIN_PASSWORD_LENGTH) return 'Too short';
			if (this.password.length > MAX_PASSWORD_LENGTH) return 'Too long';
			// check charset: printable ASCII char
			for (var i = 0; i < this.password.length; i++) {
				if (this.password.charCodeAt(i) < 32 ||
					this.password.charCodeAt(i) > 126) {
					return 'Charset invalid';
				}
			}
			return true;
		};

		// check confirm password and return warning if wrong
		this.checkCPass = function() {
			// check null
			if (isNull(this.re_password)) return 'Required';
			// check match
			if (this.re_password != this.password) return 'Not match';
			return true;
		};

		// check Name and return warning if wrong
		this.checkName = function() {
			// check null
			if (isNull(this.name)) return 'Required';
			// check length
			if (this.id.length > MAX_NAME_LENGTH) return 'Too long';
			// check charset: printable ASCII char
			for (var i = 0; i < this.id.length; i++) {
				if (this.password.charCodeAt(i) < 32 ||
					this.password.charCodeAt(i) > 126) {
					return 'Charset invalid';
				}
			}
			return true;
		};

		// check Email and return warning if wrong
		this.checkEmail = function() {
			// check null
			if (isNull(this.email)) return 'Required';
			// check gmail
			if (-1 == this.email.search('@gmail.com')) return 'Gmail Only';
			return true;
		};
	}; // End of class User

	// check if object is null/undefined/"" or not
	isNull = function(obj) {
		if (obj === null || obj === undefined || obj === '') {
			return true;
		}
		return false;
	};
});
