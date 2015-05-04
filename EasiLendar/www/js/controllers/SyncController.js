/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 04/05/2015
 * type: paticular controller
 */

angular.module('MainApp.controllers.sync', [])

.controller('SyncController', function($scope, $rootScope, $document, eUser, eFacebook, eSync, $ionicPopup) {
	// Using eSync, eUser, eFacebook service
	//$scope.eSync = eSync;
	$scope.eUser = eUser;
	$scope.eSync = eSync;

	//Array of all social nextworks and calendar applications
	$scope.allApps = [
		{ title: 'social', array: [ {name: 'facebook', options: [ { name: 'Log out', id: 'logout'}, {name: 'Update events', id: 'events'}]} ]},
		{ title: 'calendar', array: [ {name: 'local', options: [ {name: 'Update events', id: 'events'} ]},
									  {name: 'google', options: [ { name: 'Log out', id: 'logout'}, {name: 'Update events', id: 'events'}]}
		]},
	];

	//array of all user's events on facebook
	$scope.fbEvents = [];

	/* Check login status
	 */
	$scope.checkLoginStatus = function(name){
		if(name == 'facebook'){
			return eFacebook.fbSetLoginStatus();
		}
		
		if(name == 'google'){
			return eSync.handleClientLoad();
		}
	}

	/*$scope.checkFBLoginStatus = function(){
		//check login
		var status = $scope.checkLoginStatus('facebook');
	}*/

	/* Log in
	 * name = facebook: from facebook
	 * name = google: from google calendar
	 */

	$scope.login = function(name){
		if(name == 'facebook'){
			eFacebook.fbLogin();
		}

		else if(name == 'google'){
			eSync.handleAuthClick(null);
		}
	};


	/** Convert to arrays in eUser service
	  * eUser.uFaceCalendar
	*/
	$scope.convertMe = function(name){
		if(name == 'facebook'){
			if($scope.fbEvents.length == 0) return;

			eUser.uFacebook = [];

			/* Update events to eUser.uFaceCalendar */
			for(var i = 0; i < $scope.fbEvents.length; i++){
				/** All property of an event obj
				  * start: time to start event
				  * end: time to end event
				  * timezone: 
				  * summary: name of event
				  * location: where to organize event
				  * position: position of event in parent array of eUser.uFaceCalendar
				  * colorID: color of events, default is 0
				  * id: default is 'facebook'
				  * status: default is true
				  */

				if($scope.fbEvents[i].end_time != undefined){
					var start = new Date($scope.fbEvents[i].start_time);
					var end_time = new Date($scope.fbEvents[i].end_time);
					var duration = end_time.getDate() - start.getDate();
				}
				else { duration = 0; }

				for(var j=0; j <= duration; j++){
					end = (end_time >  new Date(start.getFullYear(),start.getMonth(),start.getDate()+1,0,0,0,0)) ? new Date(start.getFullYear(),start.getMonth(),start.getDate()+1,0,0,0,0) : end_time;

					var obj = { start: null, end: null, summary: null, location: null, id: null, position: null, colorID: 0, src: 'facebook', status: true };
					
					obj.start = angular.copy(start);
					obj.end = angular.copy(end);

					obj.summary = $scope.fbEvents[i].name;
					obj.location = $scope.fbEvents[i].place;
					obj.id = $scope.fbEvents[i].id;
					obj.position = obj.start;
					obj.position = new Date(obj.position.setHours(0,0,0,0));
						//Create new array if this uFaceCalendar have not has any event obj
					if(eUser.uFacebook[obj.position] == undefined || eUser.uFacebook[obj.position] == null) {
						eUser.uFacebook[obj.position] = [];
					};

					//Update a new event obj
					eUser.uFacebook[obj.position].push(obj);

					start = angular.copy(end);
				}
			}
		}
	}

	/* Update events
	 * name = facebook: from facebook
	 * name = local: from local calendar
	 * name = google: from google calendar
	 */

	$scope.updateEvents = function(name){
		if(name == 'facebook'){
			//execute secondly
			facebookConnectPlugin.api("me/events", ['user_events'], 
				function (events) {
					$scope.fbEvents = angular.copy(events.data);
					$scope.convertMe('facebook');
					$rootScope.showAlert('SUCCESS');
				},
				function (error) {
					$rootScope.showAlert("Failed: " + error);
				}
			);
		}

		if(name == 'google'){
			eSync.makeApiCallNoBound();
		}
	};

	/* Log out
	 * name = facebook: from facebook
	 * name = google: from google calendar
	 */

	$scope.logout = function(name){
		if(name == 'facebook'){
			eFacebook.fbLogout();
			eFacebook.fbSetLoginStatus();
		}

		else if(name == 'google'){
			eSync.logMeOut();
		}
	};

	//Handle and call correspond function
	$scope.handleOptions = function(app, option){
		if(option == 'logout'){
			if(app == 'facebook') { $scope.logout('facebook'); }
			else if(app == 'google') { $scope.logout('google'); }
		}

		else if(option == 'events'){
			if(app == 'facebook') { $scope.updateEvents('facebook'); }
			else if(app == 'local') { $scope.updateEvents('local'); }
			else if(app == 'google') { $scope.updateEvents('google'); }
		}
	}
})

.directive('slideToggleSync', function($document, $ionicPopup, $rootScope) {
	return {
		restrict: 'E',
		controller: 'SyncController',
		link: function(scope, element, attr, $index) {
			scope.visible = { index: false, value: false};

			/* status of log in 
			 * loginFB: status in facebook; false = not log in
			 * loginGC: status in google	false = not log in
			 */

			/* Set slide toggle and call login function */
			scope.toggleFunc = function(name) {
				if(name == 'facebook'){
					var loginFB = scope.checkLoginStatus('facebook');

					if( loginFB != 'connected') {
						var confirmPopup = $ionicPopup.confirm({
							title: 'You need to login first'
						});

						confirmPopup.then(function(res) {
							if(res) {
								scope.login('facebook');
								scope.checkLoginStatus('facebook');
							}
						});
					}

					else { scope.visible.value = !scope.visible.value; }
				}
				
				if(name == 'google'){
					var loginGC = scope.checkLoginStatus('google');

					if(loginGC == 0) { 
						var confirmPopup = $ionicPopup.confirm({
							title: 'You need to login'
						});

						confirmPopup.then(function(res) {
							if(res) {
								scope.login('google');
							}
						});
					}

					else if(loginGC == 1){
						scope.visible.value = !scope.visible.value;
					}
				}

				if(name == 'local') {
					scope.visible.value = !scope.visible.value;
				}
			};

			$document.bind('click', function(event) {
				if(scope.visible.index == true){
					scope.visible.index = false;
					scope.visible.value = false;
				};

				if(scope.visible.value == true){
					scope.visible.index = true;
				}

				scope.$apply();
			});
		}
	};
})