/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 19/04/2015
 * type: loading controller
 */

angular.module('MainApp.controllers.loading', [])

.controller("LoadingController", function($scope, $rootScope, $cordovaNetwork, $ionicLoading) {
	$ionicLoading.show({
		duration: 4000,
		template: '<ion-content class="easi-full-blue"><center><img src="img/logo.png" class="logo"><br><p class="easi-font bigName">EasiLendar</p><br><div id="followingBallsG"><div id="followingBallsG_1" class="followingBallsG"></div><div id="followingBallsG_2" class="followingBallsG"></div><div id="followingBallsG_3" class="followingBallsG"></div><div id="followingBallsG_4" class="followingBallsG"></div></div></center></ion-content>'
	});

	window.onload = function() {
		if (navigator.connection != undefined) checkConnection();		// if not working, skip it
		getTimezone();
		$rootScope.goToState("form");
	}

	$rootScope.$on('$stateChangeStart', function(event, toState) {
		if (toState.name == 'loading') {
			$rootScope.goToState("form");
		}
	});

	function checkConnection() {
	    var type = $cordovaNetwork.getNetwork();

	    if ((type == Connection.CELL_2G) || (type == Connection.CELL_3G) || (type == Connection.CCELL_4G) || (type == Connection.CELL)) {
	        $rootScope.eSettings.sInternet = "3G";
	    } else if ((type == Connection.ETHERNET) || (type == Connection.WIFI)) {
	        $rootScope.eSettings.sInternet = "wifi";
	    } else { //((type == Connection.UNKNOWN) || (type == Connection.NONE))
	        $rootScope.eSettings.sInternet = "none";
	    }
	}

	function getTimezone() {
		var d = new Date();
		var n = d.getTimezoneOffset();
		$rootScope.eSettings.sTimeZone = -n / 60;
	}
})
