/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 03/04/2015
 * type: paticular controller
 */

var result = angular.module('MainApp.controllers.result', []);

result.controller("ResultController", function($rootScope, $scope, $ionicPopup, $state) {
	
	// link to home's default view
	var link = $rootScope.eSettings.sDefaultView;
	
	$scope.done = function() {
		$rootScope.goToState(link);
	};
	
	$rootScope.resultMultiCalendar = $rootScope.newMultiCal([$rootScope.eUser.uGmailCalendar, $rootScope.eFriend.fMultiCal.calendar]);
	
	$scope.weekCalendar = $rootScope.newWeekCalendar();
	$scope.weekCalendar.setNavDays();
	
	$scope.navStart = new Date();	// today
	$scope.navEnd = $scope.weekCalendar.navDays[6].origin.toDate();	// end of the week
	
	$scope.mHeap = $rootScope.evaluateTime($rootScope.resultMultiCalendar, $scope.navStart, $scope.navEnd, 120);
	
	$scope.options = {
		list : [],
		add : function(mHeap) {
			if (mHeap != null) {
				this.list = [];
				for (var i=0; i < 5; i++) {
			//		var max = mHeap.pop(); // Time Node
			//		var option = new Option(max.start, max.end);
				//	this.list.push(option);
				}
			}
		},
		selectOption : function(option) {
			$scope.showAlert('Your meeting time: ' + option.display);
		},
		next : function() {
			$scope.weekCalendar.nextWeek();
			
			if ($scope.weekCalendar.navDays[0].origin.toDate() >= new Date()) {
				$scope.navStart = $scope.weekCalendar.navDays[0].origin.toDate();
				$scope.navEnd = $scope.weekCalendar.navDays[6].origin.toDate();
				$scope.mHeap = $scope.evaluateTime($rootScope.resultMultiCalendar, $scope.navStart, $scope.navEnd, 120);
			} else if ($scope.weekCalendar.navDays[6].origin.toDate() > new Date()) {
				$scope.navStart = new Date();
				$scope.navEnd = $scope.weekCalendar.navDays[6].origin.toDate();
				$scope.mHeap = $rootScope.evaluateTime($scope.resultMultiCalendar, $scope.navStart, $scope.navEnd, 120);
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
				$scope.mHeap = $scope.evaluateTime($rootScope.resultMultiCalendar, $scope.navStart, $scope.navEnd, 120);
			} else if ($scope.weekCalendar.navDays[6].origin.toDate() > new Date()) {
				$scope.navStart = new Date();
				$scope.navEnd = $scope.weekCalendar.navDays[6].origin.toDate();
				$scope.mHeap = $rootScope.evaluateTime($rootScope.resultMultiCalendar, $scope.navStart, $scope.navEnd, 120);
			} else {
				$scope.mHeap = null;
			}
			
			this.add($scope.mHeap);
		},
	};
	
	$scope.options.add($scope.mHeap);
	
	// watch for changes in eFriend.fMultiCal
	$scope.$watch('eFriend.fMultiCal', function() {
		$rootScope.resultMultiCalendar = $rootScope.newMultiCal([$rootScope.eUser.uGmailCalendar, $rootScope.eFriend.fMultiCal.calendar]);
		$scope.navStart = new Date();
		$scope.navEnd = $scope.weekCalendar.navDays[6].origin.toDate();
		$scope.mHeap = $rootScope.evaluateTime($rootScope.resultMultiCalendar, $scope.navStart, $scope.navEnd, 120);
		
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
		this.date = convertDate(start);
		this.from = convertTime(start);
		this.to = convertTime(end);
		
		/* Display option */
		this.display = function() {
			// not all day 
			if (start.getDate() == end.getDate()) {
				return this.date + ": from " + this.from 
				+ " - to " + this.to;
			}
			// free all day
			else {
				return this.date + ": Any time";
			}
		};
	};	// end of class Option
});
