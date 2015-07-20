/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 20/07/2015 by Page
 * type: particular controller
 */
 
angular.module('MainApp.controllers.sync', [])

.controller('SyncController', 
	function($scope, $rootScope, $document, $cordovaCalendar,
	eUser, eSync, eToast, $ionicPopup, eGoogle) {

	$scope.logIN = -1;
	$scope.email = '';
	
	// gapi was stored in eGoogle factory, assign it here
	var gapi = eGoogle.gapi;
	
	$scope.logMeOut = function () {
		$scope.logIN = 0;
		$scope.email = '';
		eToast.toastSuccessOne('Log out successfully', 2000);
		// code for local host:

		// code can not be used for local host:

		/*var theUrl = 'https://accounts.google.com/o/oauth2/revoke?token='+result;

		var li = document.createElement('li');

		li.appendChild(document.createTextNode(theUrl));
		document.getElementById('events').appendChild(li);

		var xmlHttp = null;
		xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", theUrl, false );
		xmlHttp.send( null ); */
	};
	
	/*  Sync to local calendar
			Use Cordova.calendar  */

			
	$scope.syncToLocal = function() {

		// Fail to connect:

		if (window.plugins === undefined) {
			return false;
		}
			
		var toDay = new Date();
		var dd = toDay.getDate();
		var mm = toDay.getMonth() + 1; //January is 0!
		var yyyy = toDay.getFullYear();

		if (dd < 10) {
			dd = '0' + dd;
		}

		if (mm < 10) {
			mm = '0' + mm;
		}

		toDay = mm + '/' + dd + '/' + yyyy;

		// form of timeMax: "yyyy-mm-dd T hh:mm:ss - offset

		var oneYearAgo = (yyyy - 1) + '-' + mm + '-' + dd + 'T' + '00:00:00-00:00';
		var oneYearLater = (yyyy + 1) + '-' + mm + '-' + dd + 'T' + '00:00:00-00:00';
	
		$cordovaCalendar.listEventsInRange(new Date(oneYearAgo), 
											new Date(oneYearLater))
		.then(function (result) {
			//success:
			eUser.uLocalCalendar = result;
			eSync.handleLocalCalendar();
	
			return true;
				
		}, function(err) {
			err=null;
			// error:
			return false;
		});
	};

	//Array of all social networks and calendar applications
	$scope.allApps = [
		{ title: 'calendar', array: [ {name: 'local', options: [ {name: 'Update events', id: 'events'} ]},
									  {name: 'google', options: [ { name: 'Log out', id: 'logout'}, {name: 'Update events', id: 'events'}]}
		]},
	];

	/* Update events
	 * name = local: from local calendar
	 * name = google: from google calendar
	 */

	$scope.updateEvents = function (name){
		if (name == 'google'){
			eGoogle.makeApiCallNoBound();
		}
		if (name == 'local'){
			$scope.syncToLocal();
		}
	};

	/* Check login status
	 */
	$scope.checkLoginStatus = function (name){
		if (name == 'google'){
			return eGoogle.handleClientLoad();
		}
	};

	/* Log in
	 * name = google: from google calendar
	 */
	$scope.login = function(name){
		if (name == 'google'){
			eGoogle.handleAuthClick(null);
		}
	};

	/* Log out
	 * name = google: from google calendar
	 */

	$scope.logout = function(name){
		if (name == 'google'){
			$scope.logMeOut();
			$scope.isShowDes = {};
		}
	};

	//Handle and call correspond function
	$scope.handleOptions = function(app, option){
		if (option == 'logout'){
			if (app == 'google') {
				$scope.logout('google');
			}
		}
		else if(option == 'events'){
			if (app == 'local') {
				$scope.updateEvents('local');
			} else if (app == 'google') {
				$scope.updateEvents('google');
			}
		}
	};

	/* Show & Hide slide toggle
	 * Based on login status
	 */

	$scope.isShowDes = {};

	$scope.isShow = function (name) {
		if ($scope.isShowDes[name] == true) {
			return true;
		} else {
			return false;
		}
	};

	var activeShow = function (name) {
		$scope.isShowDes = {};
		$scope.isShowDes[name] = true;
	};

	var deactiveShow = function () {
		$scope.isShowDes = {};
	};

	var clickShow = function (name) {
		if ($scope.isShow(name) == true) {
			deactiveShow();
		} else {
			activeShow(name);
		}
	};

	var setTimeOut = 0;
	$scope.toggleFunc = function (name) {
		if(name == 'google'){
			var loginGC = $scope.checkLoginStatus('google');

			if(loginGC != 1) { 
				var confirmPopup = $ionicPopup.confirm({
					title: 'You need to login first'
				});

				confirmPopup.then(function(res) {
					if(res) {
						$scope.login('google');
					}
				});
			}

			else if (loginGC == 1){ clickShow(name); }
		}
		if(name == 'local') {
			clickShow(name);
		}
	};
});