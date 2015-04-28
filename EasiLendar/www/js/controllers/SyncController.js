/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 28/04/2015
 * type: paticular controller
 */

angular.module('MainApp.controllers.sync', [])

.controller('SyncController', function($scope, $rootScope, $document, eUser, $ionicPopup) {
	//$scope.eSync = eSync;
	$scope.eUser = eUser;

	//Array of all social nextworks and calendar applications
	$scope.allApps = [
		{ title: 'social', array: [ {name: 'facebook', options: [ { name: 'Log out', id: 'logout'}, {name: 'Update events', id: 'events'}]} ]},
		{ title: 'calendar', array: [ {name: 'local', options: [ {name: 'Update events', id: 'events'} ]},
									  {name: 'google', options: [ { name: 'Log out', id: 'logout'}, {name: 'Update events', id: 'events'}]}
		]},
	];

	/* status of log in 
	 * loginFB: status in facebook; false = not log in
	 * loginGC: status in google	false = not log in
	 */
	$scope.loginFB = false;
	$scope.loginGC = false;

	/* Check login status
	 */
	$scope.checkLoginStatus = function(name){
		if(name == 'facebook'){
			return true;
		}

		else if(name == 'google'){
			return true;
		}
	}

	/* Log in
	 * name = facebook: from facebook
	 * name = google: from google calendar
	 */

	$scope.login = function(name){
		if(name == 'facebook'){
			//console.log('A');
		}

		else if(name == 'google'){
			//console.log('B');
		}
	};

	/* Update events
	 * name = facebook: from facebook
	 * name = local: from local calendar
	 * name = google: from google calendar
	 */

	$scope.updateEvents = function(name){
		if(name == 'facebook'){
			//console.log('A');
		}

		else if(name == 'local'){
			//console.log('B');
		}

		else{
			//console.log('C');
		}
	};

	/* Log out
	 * name = facebook: from facebook
	 * name = google: from google calendar
	 */

	$scope.logout = function(name){
		if(name == 'facebook'){
			//console.log('A');
		}

		else if(name == 'google'){
			//console.log('B');
		}
	};

})

.directive('slideToggleSync', function($document, $ionicPopup) {
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
					scope.loginFB = scope.checkLoginStatus('facebook');

					if(scope.loginFB == false) {
						var confirmPopup = $ionicPopup.confirm({
							title: 'Coming Soon'
						});

						confirmPopup.then(function(res) {
							if(res) {
								scope.login(name);
							}
						});
					}

					if(scope.loginFB == true){
						scope.visible.value = !scope.visible.value;
					}
				}

				if(name == 'google'){
					scope.loginGC = scope.checkLoginStatus('google');

					if(scope.loginGC == false) { 
						var confirmPopup = $ionicPopup.confirm({
							title: 'You need to login'
						});

						confirmPopup.then(function(res) {
							if(res) {
								scope.login(name);
								scope.loginGC = true;
							}
						});
					}

					if(scope.loginGC == true){
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

.directive('toggleSync', function() {
	return {
		restrict: 'A',
		scope: {
			isOpen: "=toggleSync"
		},
		link: function(scope, element, attr) {
			element.hide();
			var i = 0;
			scope.$watch('isOpen', function(newVal, oldVal) {
				if (newVal != oldVal) {
					element.stop().slideToggle(200);
				}
			});
		}
	};
})