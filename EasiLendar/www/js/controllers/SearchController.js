/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 05/04/2015
 * type: paticular controller
 */

angular.module('MainApp.controllers.search', [])

.controller("SearchController", function($scope, $rootScope, toastr, toastrConfig) {
	// search input
	$scope.searchInput = "";

	// Variable to save search result
	$rootScope.searchFriends = [];
	$rootScope.searchEvents = [];

	// type for search
	$rootScope.searchType = {
		type: "All"
	};

	// search call
	$scope.search = function() {
		// demo data for friend
		if ($rootScope.searchType.type == "All" || $rootScope.searchType.type == "People") {
			$rootScope.searchFriend($scope.searchInput);
			console.log($rootScope.searchFriends);
		}

		// demo data for events
		if ($rootScope.searchType.type == "All" || $rootScope.searchType.type == "Events") {
			$rootScope.searchEvent($scope.searchInput);
			console.log($rootScope.searchEvents);
		}
	}

	// add person call
	$scope.addPerson = function(ID) {
		$rootScope.request(ID);

		// toast
		toastrConfig.positionClass = 'toast-sign-out';

		toastr.success('Sending request.', {
			timeOut: 2000
		});
	}

	// change event call
	$scope.changeCall = function(event) {
		// do something here

		// toast
		toastrConfig.positionClass = 'toast-sign-out';

		toastr.success('Coming soon...', {
			timeOut: 2000
		});
	}

	// function to check if empty result
	$scope.isEmptyResult = function() {
		return (($rootScope.searchType.type == "All" && $rootScope.searchFriends.length == 0 && $rootScope.searchEvents.length == 0)
			|| ($rootScope.searchType.type == "People" && $rootScope.searchFriends.length == 0)
			|| ($rootScope.searchType.type == "Events" && $rootScope.searchEvents.length == 0));
	}

	// show people search
	$scope.isShowPeople = function() {
		return ($rootScope.searchType.type == "All"
			|| $rootScope.searchType.type == "People");
	}

	// show event search
	$scope.isShowEvents = function() {
		return ($rootScope.searchType.type == "All"
			|| $rootScope.searchType.type == "Events");
	}
})
