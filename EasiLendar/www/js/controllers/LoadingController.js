/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 15/03/2015
 * type: loading controller
 */

angular.module('MainApp.controllers.loading', [])

.controller("LoadingController", function($scope, $rootScope, $cordovaNetwork, $ionicLoading, $state) {
	$ionicLoading.show({
		duration: 4000,
		template: '<ion-content class="easi-full-blue"><center><img src="img/logo.png" class="logo"><br><p class="easi-font bigName">EasiLendar</p><br><div id="followingBallsG"><div id="followingBallsG_1" class="followingBallsG"></div><div id="followingBallsG_2" class="followingBallsG"></div><div id="followingBallsG_3" class="followingBallsG"></div><div id="followingBallsG_4" class="followingBallsG"></div></div></center></ion-content>'
	});
	window.onload = function() {
		// checkConnection();		// not working
		getTimezone();
		$state.go("form");
	}

	function checkConnection() {
		var type = navigator.connection.type;		// not working
		var type = $cordovaNetwork.getNetwork();	// not working

		var states = {};
		states[Connection.UNKNOWN]  = 'Unknown connection';
		states[Connection.ETHERNET] = 'Ethernet connection';
		states[Connection.WIFI]     = 'WiFi connection';
		states[Connection.CELL_2G]  = 'Cell 2G connection';
		states[Connection.CELL_3G]  = 'Cell 3G connection';
		states[Connection.CELL_4G]  = 'Cell 4G connection';
		states[Connection.CELL]     = 'Cell generic connection';
		states[Connection.NONE]     = 'No network connection';

		alert('Connection type: ' + states[type]);
	}

	function getTimezone() {
		var d = new Date();
		var n = d.getTimezoneOffset();
		$rootScope.eSettings.sTimeZone = -n / 60;
	}
})
