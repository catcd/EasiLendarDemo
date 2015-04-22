/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 21/04/2015
 * type: paticular controller
 */

angular.module('MainApp.controllers.search', [])

.controller("SearchController", function($scope, $rootScope, eToast, eDatabase, eUser, eCheckFriend) {
	// search input
	$scope.searchInput = "";

	// Variable to save search result
	$rootScope.searchFriends = [];
	$rootScope.searchEvents = [];

	// type for search
	$rootScope.searchType = {
		type: "All"
	};

	$rootScope.$on('$stateChangeStart', function(event, toState) {
		if (toState.name == 'search') {
			$scope.resetData();
		}
	});

	$scope.resetData = function() {
		// reset search input
		$scope.searchInput = "";

		// reset Variable to save search result
		$rootScope.searchFriends = [];
		$rootScope.searchEvents = [];

		$rootScope.searchType.type = "All";
	}

	// search call
	$scope.search = function() {
		// search data for friend
		if ($rootScope.searchType.type == "All" || $rootScope.searchType.type == "People") {
			eDatabase.searchFriend($scope.searchInput);
			// $rootScope.searchFriends[0] = { ID: 'cancatdz', name: 'Cat Can', ava: 1 };
			// $rootScope.searchFriends[1] = { ID: 'dungk58', name: 'Ngo Duc Huong', ava: 4 };
			// $rootScope.searchFriends[2] = { ID: 'pagenguyen', name: 'Nguyen Minh Page', ava: 5 };

			console.log($rootScope.searchFriends);
		}

		// search data for events
		if ($rootScope.searchType.type == "All" || $rootScope.searchType.type == "Events") {
			eDatabase.searchEvent($scope.searchInput);
			console.log($rootScope.searchEvents);
		}
	}

	// add person call
	$scope.addPerson = function(ID) {
		eDatabase.request(ID);

		// toast
		eToast.toastSuccess('Sending request.', 2000);
	}

	// add person call
	$scope.viewPerson = function(ID) {
		eDatabase.viewProfile(ID);

		// toast
		eToast.toastSuccess('Please wait a moment!', 1500);
	}

	// is hide button or not
	$scope.isHide = function(ID) {
		// my account
		if (ID == eUser.uID) {
			return true;
		}

		// friend
		if (eCheckFriend.isFriend(ID)) {
			return true;
		}

		// requested
		if (eCheckFriend.isRequested(ID)) {
			return true;
		}
		return false;
	}

	// change event call
	$scope.changeCall = function(event) {
		// do something here

		// toast
		eToast.toastSuccess('Coming soon...', 2000);
	}

	// function to check if empty result
	$scope.isEmptyResult = function() {
		return (($rootScope.searchType.type == "All" && $rootScope.searchFriends.length == 0 && $rootScope.searchEvents.length == 0) || ($rootScope.searchType.type == "People" && $rootScope.searchFriends.length == 0) || ($rootScope.searchType.type == "Events" && $rootScope.searchEvents.length == 0));
	}

	// show people search
	$scope.isShowPeople = function() {
		return ($rootScope.searchType.type == "All" || $rootScope.searchType.type == "People");
	}

	// show event search
	$scope.isShowEvents = function() {
		return ($rootScope.searchType.type == "All" || $rootScope.searchType.type == "Events");
	}
})
