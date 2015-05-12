/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 12/05/2015
 * type: home controller
 */

angular.module('MainApp.controllers.eventEdit', [])

.controller('EventDetailController', function($scope, $rootScope,
	eEvent, eEasiLendar, eCalendar, eSync) {

	// check if obj is null/undefined/'' or not
	$scope.isNull = function( obj ) {
		if (obj === null || obj === undefined || obj === '') {
			return true;
		}
		return false;
	};

	// week day full
	$scope.weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
		'Friday','Saturday'];

	// display object
	$scope.display = $scope.isNull( eEvent.pointer ) ? null : new Display();
	$scope.$watch('currentState', function() {
		$scope.display = $scope.isNull( eEvent.pointer ) ? null : new Display();
	});

	// delete function
	$scope.del = function() {
		// call to delete event function in eSync to sync with Google
		eSync.deleteEventWithId(eEvent.pointer.id);
		// close event view
		$scope.close();
	};

	// edit function
	$scope.edit = function() {
		$rootScope.toEventForm('edit');
	};

	// close function
	$scope.close = function() {
		// clear data
		eEvent.pointer = null;
		$rootScope.goToState(eEvent.popBackState());
	};

	$scope.newDisplay = function() {
		return new Display();
	};

	/*
	* PRIVATE
	* Display class
	*/
	function Display() {
		// private functions
		var displayDate = function() {
			if ($scope.isNull(eEvent.pointer.start) || 
				$scope.isNull(eEvent.pointer.end) ||
				$scope.isNull(eEvent.pointer.start.dateTime) ||
				$scope.isNull(eEvent.pointer.end.dateTime)) {
				return null;
			}
			var start = eEvent.pointer.start.dateTime;
			var end = eEvent.pointer.end.dateTime;
			var type = eEasiLendar.isType(eEvent.pointer.start,
				eEvent.pointer.end);
			var day1, month1, date1, year1, hour1, min1;
			var hour2, min2;
			day1 = $scope.weekDays[start.getDay()];
			month1 = eCalendar.months[start.getMonth()];
			date1 = start.getDate();
			year1 = start.getFullYear();
			hour1 = start.getHours();
			min1 = start.getMinutes();
			hour2 = end.getHours();
			min2 = end.getMinutes();
			if (hour1 < 10) {
				hour1 = '0' + hour1;
			}
			if (min1 < 10) {
				min1 = '0' + min1;
			}
			if (hour2 < 10) {
				hour2 = '0' + hour2;
			}
			if (min2 < 10) {
				min2 = '0' + min2;
			}
			var line1, line2;

			switch (type) {
				case 'normal':
					line1 = day1 + ', ' + month1 + ' ' + date1 + ', ' + year1;
					line2 = hour1 + ':' + min1 + ' - ' + hour2 + ':' + min2;
					return [line1, line2];
				case 'all':
					line1 = day1 + ', ' + month1 + ' ' + date1 + ', ' + year1;
					return [line1];
				case 'over':
					var day2 = $scope.weekDays[end.getDay()];
					var month2 = eCalendar.months[end.getMonth()];
					var date2 = end.getDate();
					var year2 = end.getFullYear();
					// line1 to display
					line1 = day1 + ', ' + month1 + ' ' + date1 + ', ' +
					year1 + ', ' + hour1 + ':' + min1 + ' -';
					// line2 to display
					line2 = day2 + ', ' + month2 + ' ' + date2 + ', ' +
					year2 + ', ' + hour2 + ':' + min2;
					return [line1, line2];
			}
		};

		// display data
		this.summary = eEvent.pointer.summary;
		this.date = displayDate();
		this.color = {
			'background-color': $scope.isNull(eEvent.pointer.colorId) ? 
			eEasiLendar.eventColor[0] :
			eEasiLendar.eventColor[eEvent.pointer.colorId]
		};
		this.location = eEvent.pointer.location;
	} // end of display class
});
