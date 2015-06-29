/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 28/06/2015
 * type: loading controller
 */

angular.module('MainApp.controllers.loading', [])

.controller('LoadingController',
	function($scope, $rootScope, $cordovaNetwork,
		$localstorage, eSettings, eToast, eUser, eDatabase) {
		$scope.loadingFunction = function() {
			var cacheSetting = $localstorage.getSetting();
			if (cacheSetting !== null) {
				eSettings = cacheSetting;
			}
			eSettings.sInternet = checkConnection();
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
					eDatabase.checkSync(eUser.uID, eUser.uPassword);
				} else {
					eToast.toastWarning('You are current offline!', 2000);
				}
			} else {
				if (eSettings.sInternet === false) {
					eToast.toastError('Please connect to Internet!', 2000);
					setTimeout(function() {
						navigator.app.exitApp();
					}, 2000);
				} else {
					setTimeout(function() {
						$rootScope.goToState('form');
					}, 3000);
				}
			}
		};

		var checkConnection = function() {
			var type = navigator.connection !== undefined ?
				navigator.connection.type : undefined,
				connect;

			if (type === undefined || $cordovaNetwork.isOnline()) {
				connect = true;
			} else {
				connect = false;
			}

			return connect;
		};

		var getTimezone = function() {
			var d = new Date();
			var n = d.getTimezoneOffset();
			return -n / 60;
		};
	});
