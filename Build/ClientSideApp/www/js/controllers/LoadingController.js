/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 10/07/2015
 * type: loading controller
 */

angular.module('MainApp.controllers.loading', [])

.controller('LoadingController', function($scope, $rootScope, $cordovaNetwork, $localstorage, $http, eSettings, eToast, eUser, eDatabase) {
	$scope.loadingFunction = function() {
		var cacheSetting = $localstorage.getSetting();
		if (cacheSetting !== null) {
			eSettings = cacheSetting;
		}
		eSettings.sInternet = $rootScope.checkConnection();
		if (eSettings.sDeviceTimeZone === true) {
			eSettings.sTimeZone = getTimezone();
		}

		var cacheData = $localstorage.getData();

		if (cacheData !== null) {
			eUser = cacheData;

			setTimeout(function() {
				$rootScope.goHome();
				var noti = 'Welcome ' + eUser.uName + '!';
				eToast.toastSuccess(noti, 4000);
			}, 3000);

			if (eSettings.sInternet === true) {
				eDatabase.checkHack(eUser.uID, eUser.uPassword);
			} else {
				eToast.toastWarning('You are current offline!', 2000);
			}
		} else {
			if (eSettings.sInternet === false) {
				eToast.toastError('Unable to connect to Internet!', 3000);
				setTimeout(function() {
					navigator.app.exitApp();
				}, 4000);
			} else {
				setTimeout(function() {
					$rootScope.goToState('form');
				}, 3000);
			}
		}
	};

	$rootScope.checkConnection = function() {
		var xhr = new XMLHttpRequest();
		var file = "http://easilendar.wc.lt/database/testInternet.php";
		var randomNum = Math.round(Math.random() * 10000);
		 
		xhr.open('HEAD', file + "?rand=" + randomNum, false);
		 
		try {
			xhr.send();
			 
			if (xhr.status >= 200 && xhr.status < 304) {
				return true;
			} else {
				return false;
			}
		} catch (e) {
			return false;
		}
	};

	var getTimezone = function() {
		var d = new Date();
		var n = d.getTimezoneOffset();
		return -n / 60;
	};
});
