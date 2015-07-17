/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 17/07/2015
 * type: paticular controller
 */

var search = angular.module('MainApp.controllers.search', []);

search.controller('SearchController', function($scope, $rootScope, eToast, eDatabase, eUser, eCheckFriend, eCalendar) {
	// search data
	$scope.data = {
		input: '',
		type: 'People',
		submit: false,
	};

	// Variable to save search result
	$rootScope.searchFriends = [];
	$rootScope.searchEvents = [];

	// reset data whenever go to search
	$rootScope.$on('$stateChangeStart', function(event, toState) {
		if (toState.name == 'search') {
			resetData();
		}
	});

	var resetData = function() {
		$scope.data = {
			input: '',
			type: 'People',
			submit: false,
		};
		$rootScope.searchFriends = [];
		$rootScope.searchEvents = [];
	};

	// search call
	$scope.search = function() {
		if (!isNull($scope.data.input)) {
			eDatabase.searchFriend($scope.data.input);
			eDatabase.searchEvent($scope.data.input);
			$scope.data.submit = true;
			$rootScope.searchFriends[0] = {
				id: 'cancatdz',
				name: 'Cat Can',
				ava: '0'
			};
			$rootScope.searchFriends[1] = {
				id: 'dungk58',
				name: 'Ngo Duc Huong',
				ava: '0'
			};
			$rootScope.searchFriends[2] = {
				id: 'pagenguyen',
				name: 'Nguyen Minh Page',
				ava: '0'
			};
		} else {
			eToast.toastInfo('No input.', 2000);
		}
	};

	// click people on people result
	$scope.clickPerson = function(person) {
		if (person.id == eUser.uID) {
			$rootScope.goToState('myProfile');
		} else {
			eDatabase.viewProfile(person.id);
		}
	};

	/* action of 2 button
	____________||______button 1(blue)______||______button 2(red)_______||
	me          ||hide                      ||hide                      ||
	friend      ||hide                      ||delete friend             ||
	requested   ||hide                      ||hide                      ||
	requestMe   ||accept friend request     ||reject friend request     ||
	other       ||request friend            ||hide                      ||
	*/
	// function for button 1 the blue one
	$scope.clickButton1 = function(id) {
		if (eCheckFriend.isRequestedMe(id)) {
			eDatabase.acceptFriend(id);
		} else {
			eDatabase.requestFriend(id);
		}
	};
	$scope.dataBtn1 = function(id) {
		if (id == eUser.uID || eCheckFriend.isFriend(id) || eCheckFriend.isRequested(id)) {
			return {icon: '', hide: true};
		} else if (eCheckFriend.isRequestedMe(id)) {
			return {icon: 'ion-android-done', hide: false};
		} else {
			return {icon: 'ion-android-person-add', hide: false};
		}
	};
	// function for button 2 the red one
	$scope.clickButton2 = function(id) {
		if (eCheckFriend.isFriend(id)) {
			var confirmPopup = $ionicPopup.confirm({
				title: 'Delete friend',
				subTitle: 'Are you sure?'
			});
			confirmPopup.then(function(res) {
				if (res) eDatabase.deleteFriend(id);
			});
		} else if (eCheckFriend.isRequestedMe(id)) {
			var confirmPopup = $ionicPopup.confirm({
				title: 'Reject friend request',
				subTitle: 'Are you sure?'
			});
			confirmPopup.then(function(res) {
				if (res) eDatabase.rejectFriend(id);
			});
		}
	};
	$scope.dataBtn2 = function(id) {
		if (eCheckFriend.isFriend(id)) {
			return {icon: 'ion-android-delete', hide: false};
		} else if (eCheckFriend.isRequestedMe(id)) {
			return {icon: 'ion-android-close', hide: false};
		} else {
			return {icon: '', hide: true};
		}
	};

	// call on click 1 event
	$scope.clickEvent = function() {
		eToast.toastInfo('Coming soon...', 2000);
	};

	// event detail function
	$scope.eventDetail = function(event) {
		var result = eCalendar.eventTime(event);
		if (event.location !== undefined) {
			result = result + ' at ' + event.location;
		}

		return result;
	};
});
