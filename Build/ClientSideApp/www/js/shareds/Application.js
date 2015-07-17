/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 17/07/2015
 * type: module all shared functions used for this app
 */

var application = angular.module('MainApp.shareds.application', [])

// function must be contruct from beginning
application.run(function($rootScope, $ionicPopup, $state, $ionicPlatform, $ionicHistory, eToast, eSettings) {
	// check if object is null/undefined/"" or not
	isNull = function(obj) {
		if (obj === null || obj === undefined || obj === '') {
			return true;
		}
		return false;
	};

	// Variable for save current state
	$rootScope.currentState = 'loading';

	$rootScope.showAlert = function(mtitle, url, msub) {
		var confirmPopup = $ionicPopup.alert({
			title: mtitle,
			subTitle: msub,
			templateUrl: url
		});
		$rootScope.closePopup = function() {
			setTimeout(function() {
				confirmPopup.close();
			}, 100);
		};
	};

	// press again to exit
	$ionicPlatform.registerBackButtonAction(function(e) {
		if ($rootScope.currentState == 'form' || $rootScope.currentState == 'month' || $rootScope.currentState == 'week' || $rootScope.currentState == 'day' ||	$rootScope.currentState == 'list') {
			if ($rootScope.backOnce) {
				navigator.app.exitApp();
			} else {
				$rootScope.backOnce = true;
				eToast.toastSuccess('Press Back again to exit.', 2000);
				setTimeout(function() {
					$rootScope.backOnce = false;
				}, 2000);
			}
		}
		return false;
	}, 101);

	// exit app function only on device
	$rootScope.exitEasi = function() {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Exit EasiLendar',
			subTitle: 'Are you sure?'
		});
		confirmPopup.then(function(res) {
			if (res) navigator.app.exitApp();
		});
	};

	// go home function
	$rootScope.goHome = function() {
		$rootScope.goToState(eSettings.sDefaultView);
	};

	// go to any state
	$rootScope.goToState = function(state) {
		// delete stack history
		// push new page to the top of the stack
		// disable all animation
		$ionicHistory.nextViewOptions({
			historyRoot: true,
			disableAnimate: true,
			expire: 300
		});
		$state.go(state);
		$rootScope.currentState = state;
	};
});

// Toast service
application.factory('eToast', function(toastr, toastrConfig) {
	return {
		// color #419696
		toastSuccess: function(message, delay) {
			toastrConfig.positionClass = 'easi-toast-success';
			toastr.success(message, {
				timeOut: delay
			});
		},
		// color #33CCCC
		toastInfo: function(message, delay) {
			toastrConfig.positionClass = 'easi-toast-info';
			toastr.info(message, {
				timeOut: delay
			});
		},
		// color #D65930
		toastError: function(message, delay) {
			toastrConfig.positionClass = 'easi-toast-error';
			toastr.error(message, {
				timeOut: delay
			});
		},
		// color #646464
		toastWarning: function(message, delay) {
			toastrConfig.positionClass = 'easi-toast-warning';
			toastr.warning(message, {
				timeOut: delay
			});
		},
	};
})

// Check friend service
// Local functions
application.factory('eCheckFriend', function(eUser) {
	return {
		// return true if ID is my friend
		isFriend: function(ID) {
			return (eUser.uFriend !== null && eUser.uFriend[ID] !== undefined);
		},
		// return true if sent ID a friend request
		isRequested: function(ID) {
			return (eUser.uRequested !== null && eUser.uRequested[ID] !== undefined);
		},
		// return true if ID've sent me a friend request
		isRequestedMe: function(ID) {
			return (eUser.uFRequest !== null &&	eUser.uFRequest[ID] !== undefined);
		}
	};
})

// Local storage
application.factory('$localstorage', function($window, eSettings, eUser) {
	return {
		// use any key
		set: function(key, value) {
			$window.localStorage[key] = value;
		},
		get: function(key, defaultValue) {
			return $window.localStorage[key] || defaultValue;
		},
		setObject: function(key, value) {
			$window.localStorage[key] = JSON.stringify(value);
		},
		getObject: function(key) {
			return JSON.parse($window.localStorage[key] || '{}');
		},
		// use easilendar as key
		saveData: function() {
			$window.localStorage['easilendar'] = JSON.stringify(eUser);
		},
		getData: function() {
			return JSON.parse($window.localStorage['easilendar'] || 'null');
		},
		deleteData: function() {
			$window.localStorage['easilendar'] = JSON.stringify(null);
		},
		// use easilendarS as key
		saveSetting: function() {
			$window.localStorage['easilendarS'] = JSON.stringify(eSettings);
		},
		getSetting: function() {
			return JSON.parse($window.localStorage['easilendarS'] || 'null');
		},
		deleteSetting: function() {
			$window.localStorage['easilendarS'] = JSON.stringify(null);
		}
	}
});
