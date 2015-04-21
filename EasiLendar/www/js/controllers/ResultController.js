/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 21/04/2015
 * type: paticular controller
 */

var result = angular.module('MainApp.controllers.result', []);

result.controller("ResultController",
	function($rootScope, $scope, $ionicPopup, $state, eSettings, eFriend, eMultiCalendar, eEasiLendar, eSAlgorithm, eSearchFilter) {

	// Constants
	var NUM_OF_OPTIONS = 5;
	
	// link to home's default view
	var link = eSettings.sDefaultView;
	
	$scope.done = function() {
		eFriend.fMultiCal = null;
		$rootScope.goToState(link);
	};

	if (eFriend.fMultiCal != null) {
		// the multiCalendar combine this user calendar with user's friend's calendar
		$rootScope.resultMultiCalendar = eMultiCalendar.newMultiCal([eUser.uGmailCalendar, eFriend.fMultiCal.calendar]);
	} else {
		$rootScope.resultMultiCalendar = eMultiCalendar.newMultiCal([eUser.uGmailCalendar]);
	}
	// this scope's week calendar
	$scope.weekCalendar = eEasiLendar.newWeekCalendar();
	$scope.weekCalendar.setNavDays();
	
	var date = new Date();	// today
	$scope.navStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	$scope.navEnd = $scope.weekCalendar.navDays[6].origin.toDate();	// end of the week
	
	// the options heap
	$scope.mHeap = eSAlgorithm.evaluateTime($rootScope.resultMultiCalendar, $scope.navStart, $scope.navEnd, eSearchFilter.mDuration);
	
	// options object
	$scope.options = {
		list : [],
		add : function(mHeap) {
			this.list = [];
			if (mHeap != null) {
				var num = mHeap.timeList.length;
				if (num > NUM_OF_OPTIONS) num = NUM_OF_OPTIONS;
				for (var i=0; i < num; i++) {
					var max = mHeap.pop(); // Time Node 
					var option = new Option(max.start, max.end);
					this.list.push(option);
				}
			}
		},
		selectOption : function(option) {
			$scope.showAlert('Your meeting time: ' + option.display());
		},
		next : function() {
			$scope.weekCalendar.nextWeek();
			
			if ($scope.weekCalendar.navDays[0].origin.toDate() >= new Date()) {
				$scope.navStart = $scope.weekCalendar.navDays[0].origin.toDate();
				$scope.navEnd = $scope.weekCalendar.navDays[6].origin.toDate();
				$scope.mHeap = eSAlgorithm.evaluateTime($rootScope.resultMultiCalendar, $scope.navStart, $scope.navEnd, eSearchFilter.mDuration);
			} else if ($scope.weekCalendar.navDays[6].origin.toDate() > new Date()) {
				var date = new Date();	// today
				$scope.navStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
				$scope.navEnd = $scope.weekCalendar.navDays[6].origin.toDate();
				$scope.mHeap = eSAlgorithm.evaluateTime($scope.resultMultiCalendar, $scope.navStart, $scope.navEnd, eSearchFilter.mDuration);
			} else {
				$scope.mHeap = null;
			}
			this.add($scope.mHeap);
		},
		prev : function() {
			$scope.weekCalendar.prevWeek();
			
			if ($scope.weekCalendar.navDays[0].origin.toDate() >= new Date()) {
				$scope.navStart = $scope.weekCalendar.navDays[0].origin.toDate();
				$scope.navEnd = $scope.weekCalendar.navDays[6].origin.toDate();
				$scope.mHeap = eSAlgorithm.evaluateTime($rootScope.resultMultiCalendar, $scope.navStart, $scope.navEnd, eSearchFilter.mDuration);
			} else if ($scope.weekCalendar.navDays[6].origin.toDate() > new Date()) {
				var date = new Date();	// today
				$scope.navStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
				$scope.navEnd = $scope.weekCalendar.navDays[6].origin.toDate();
				$scope.mHeap = eSAlgorithm.evaluateTime($rootScope.resultMultiCalendar, $scope.navStart, $scope.navEnd, eSearchFilter.mDuration);
			} else {
				$scope.mHeap = null;
			}
			
			this.add($scope.mHeap);
		},
	};
	
	// add options heap to options' list to display
	$scope.options.add($scope.mHeap);
	
	// watch for changes in eFriend.fMultiCal
	$scope.$watch('eFriend.fMultiCal', function() {
		if (eFriend.fMultiCal != null) {
			// the multiCalendar combine this user calendar with user's friend's calendar
			$rootScope.resultMultiCalendar = eMultiCalendar.newMultiCal([eUser.uGmailCalendar, eFriend.fMultiCal.calendar]);
		} else {
			$rootScope.resultMultiCalendar = eMultiCalendar.newMultiCal([eUser.uGmailCalendar]);
		}		
		// this scope's week calendar
		$scope.weekCalendar = eEasiLendar.newWeekCalendar();
		$scope.weekCalendar.setNavDays();
		
		var date = new Date();	// today
		$scope.navStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		$scope.navEnd = $scope.weekCalendar.navDays[6].origin.toDate();
		$scope.mHeap = eSAlgorithm.evaluateTime($rootScope.resultMultiCalendar, $scope.navStart, $scope.navEnd, eSearchFilter.mDuration);
		
		$scope.options.add($scope.mHeap);
	});
	// watch for changes in eSearchFilter.mDuration
	$scope.$watch('eSearchFilter.mDuration', function() {
		if (eFriend.fMultiCal != null) {
			// the multiCalendar combine this user calendar with user's friend's calendar
			$rootScope.resultMultiCalendar = eMultiCalendar.newMultiCal([eUser.uGmailCalendar, eFriend.fMultiCal.calendar]);
		} else {
			$rootScope.resultMultiCalendar = eMultiCalendar.newMultiCal([eUser.uGmailCalendar]);
		}
		var date = new Date();	// today
		$scope.navStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		$scope.navEnd = $scope.weekCalendar.navDays[6].origin.toDate();
		$scope.mHeap = eSAlgorithm.evaluateTime($rootScope.resultMultiCalendar, $scope.navStart, $scope.navEnd, eSearchFilter.mDuration);
		$scope.options.add($scope.mHeap);
	});
	
	/* Class option */
	function Option(start, end) {
		/* Convert functions */
		// Convert Object Date to dd/mm/yyyy format
		var convertDate = function (date) {
			var year = date.getFullYear();
			var month = date.getMonth(); 	// 0 - 11
			var day = date.getDate();
			if (day < 10) day = "0" + day;
			if (month + 1 < 10) month = "0" + (month + 1);
			return day + '/' + month + '/' + year;
		};
		
		// Convert time to hh:mm format
		// time is Object date
		var convertTime = function(time) {
			var hour = time.getHours(); 	// 0 - 23
			var min = time.getMinutes();  // 0 - 59
			if (hour < 10) hour = "0" + hour;
			if (min < 10) min = "0" + min;
			return hour + ":" + min;
		};
		
		/* initiate attributes */
		this.date1 = convertDate(start);
		this.date2 = convertDate(end);
		this.from = convertTime(start);
		this.to = convertTime(end);
		
		/* Display option */
		this.display = function() {
			// not all day 
			if (this.date1 == this.date2) {
				return this.date1 + ": from " + this.from 
				+ " - to " + this.to;
			} else if (this.from != "00:00") {
				return this.date1 + ": from " + this.from 
				+ " - to Midnight";
			} else {
				return this.date1 + ": Any time";
			}
		};
	};	// end of class Option
});
