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
			$rootScope.searchFriends[0] = { ID: 'cancatdz', name: 'Cat Can', ava: 1 };
			$rootScope.searchFriends[1] = { ID: 'dungk58', name: 'Ngo Duc Huong', ava: 4 };
			$rootScope.searchFriends[2] = { ID: 'pagenguyen', name: 'Nguyen Minh Page', ava: 6 };
			// $rootScope.searchFriend($scope.searchInput);
			console.log($rootScope.searchFriends);
		}

		// demo data for events
		if ($rootScope.searchType.type == "All" || $rootScope.searchType.type == "Events") {
			$rootScope.searchEvent($scope.searchInput);
			console.log($rootScope.searchEvents);
		}

		// $rootScope.searchFriends = [];
		// $rootScope.searchEvents = [];
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

	// convert time function
	// format from hh:mm to hh:mm
	$scope.convertTime = function(event) {
		// get and convert start time
		var mStart = (event.start.dateTime.getHours() < 10 ? "0" : "") + event.start.dateTime.getHours()
					+ ":"
					+ (event.start.dateTime.getMinutes() < 10 ? "0" : "") + event.start.dateTime.getMinutes();
		// get and convert start date
		var mStartDate = (event.start.dateTime.getDate() < 10 ? "0" : "") + event.start.dateTime.getDate()
						+ "/"
						+ (event.start.dateTime.getMonth() < 9 ? "0" : "") + (event.start.dateTime.getMonth() + 1)
						+ "/"
						+ event.start.dateTime.getFullYear();

		// get and convert end time
		var mEnd = (event.end.dateTime.getHours() < 10 ? "0" : "") + event.end.dateTime.getHours()
					+ ":"
					+ (event.end.dateTime.getMinutes() < 10 ? "0" : "") + event.end.dateTime.getMinutes();
		// get and convert end date
		var mEndDate = (event.end.dateTime.getDate() < 10 ? "0" : "") + event.end.dateTime.getDate()
						+ "/"
						+ (event.end.dateTime.getMonth() < 9 ? "0" : "") + (event.end.dateTime.getMonth() + 1)
						+ "/"
						+ event.end.dateTime.getFullYear();

		// return data
		// if start date and end date are equal
		// return once
		if (mStartDate == mEndDate) {
			return "from " + mStart
					+ " to " + mEnd + " " + mEndDate;
		}
		// if they are not equal
		// return both start date and end date
		else {
			return "from " + mStart + " " + mStartDate +
					" to " + mEnd + " " + mEndDate;
		}
	}

})
