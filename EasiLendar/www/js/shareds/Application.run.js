/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 25/04/2015
 * type: all function initialize from start of program
 */

angular.module('MainApp.shareds.run', [])

// some functions that are initialized from start
.run(function($rootScope, $ionicPopup, $timeout, $state, $ionicPlatform, $ionicHistory, toastr, toastrConfig, eSettings) {
	// inject services
	var eSettings = eSettings;

	// Variable for save current state
	$rootScope.currentState = "loading";

	/**
	 * All .run functions
	 */
	$rootScope.showAlert = function(mtitle, url, msub) {
		var confirmPopup = $ionicPopup.alert({
			title: mtitle,
			subTitle: msub,
			templateUrl: url
		});
		$rootScope.closePopup = function() {
			$timeout(function() {
				confirmPopup.close();
			}, 100);
		};
	}

	// press again to exit
	$ionicPlatform.registerBackButtonAction(function(e) {
		if ($rootScope.currentState == 'form'
		|| $rootScope.currentState == 'month'
		|| $rootScope.currentState == 'week'
		|| $rootScope.currentState == 'day'
		|| $rootScope.currentState == 'list') {
			if ($rootScope.backButtonPressedOnceToExit) {
				navigator.app.exitApp();
			} else {
				$rootScope.backButtonPressedOnceToExit = true;

				// toast
				$rootScope.toastSuccess('Press Back again to exit.', 2000);

				setTimeout(function() {
					$rootScope.backButtonPressedOnceToExit = false;
				}, 2000);
			}
			e.preventDefault();
		}
		return false;
	}, 101);

	// exit app function
	// confirm and exit app
	// only on the mobile or tablet device
	$rootScope.exitEasi = function() {
		var confirmPopup = $ionicPopup.confirm({
			title: "Exit confirm",
			subTitle: "Are you sure?"
		});
		confirmPopup.then(function(res) {
			if (res) {
				navigator.app.exitApp();
			} else {
				// TODO cancel
			}
		});
	}

	// go home function
	$rootScope.goHome = function() {
		$rootScope.goToState(eSettings.sDefaultView);
	}

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
	}
})
