/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 22/07/2015
 * type: paticular controller
 */

/*SEARCH-FILTER CONTROLLER*/
angular.module('MainApp.controllers.searchFilter', [])

.controller('SearchFilterController', function(
	$rootScope, $scope, $filter, $document, eSearchFilter,
	eSettings, eFriend, eUser, eDatabase, eToast) {
	//Using eSearchFilter, eSettings, eFriend factory
	$scope.eSearchFilter = eSearchFilter;
	$scope.eSettings = eSettings;
	$scope.eFriend = eFriend;
	$scope.eUser = eUser;
	$scope.eDatabase = eDatabase;

	$scope.timeValues = {
		mDurationHour: 1,
		mDurationMinute: 0,
		mFromTime: null,
		mToTime: null,
		mFromDay: new Date(),
		mToDay: new Date()
	};

	var resetValues = angular.copy($scope.timeValues);

	$scope.priorityTimes = [{
		name: 'Breakfast',
		values: null,
		index: 0
	}, {
		name: 'Lunch',
		values: null,
		index: 1
	}, {
		name: 'Dinner',
		values: null,
		index: 2
	}, {
		name: 'Office',
		values: null,
		index: 3
	}, {
		name: 'Holiday',
		values: null,
		index: 4
	}];
	var pristine = angular.copy($scope.priorityTimes);

	$scope.$watch('timeValues.mDurationHour', function() {
		$scope.convertToMinute();
	});
	$scope.$watch('timeValues.mDurationMinute', function() {
		$scope.convertToMinute();
	});
	$scope.$watch('timeValues.mFromTime', function() {
		eSearchFilter.mFrom = new Date($scope.timeValues.mFromTime);
	});
	$scope.$watch('timeValues.mToTime', function() {
		eSearchFilter.mTo = new Date($scope.timeValues.mToTime);
	});
	$scope.$watch('timeValues.mFromDay', function() {
		if ($scope.timeValues.mFromDay !== null) {
			var date = $scope.timeValues.mFromDay;
			var month = date.getMonth();
			var year = date.getFullYear();
			var d = new Date(year, month, date.getDate());
			eSearchFilter.mFromDay = d;
		}
	});
	$scope.$watch('timeValues.mToDay', function() {
		if ($scope.timeValues.mToDay !== undefined) {
			var date = $scope.timeValues.mToDay;
			var month = date.getMonth();
			var year = date.getFullYear();
			var d = new Date(year, month, date.getDate());
			eSearchFilter.mToDay = d;
		}
	});
	$scope.$watch('priorityTimes[0].values', function() {
		eSearchFilter.mBreakfast = $scope.priorityTimes[0].values;
	});
	$scope.$watch('priorityTimes[1].values', function() {
		eSearchFilter.mLunch = $scope.priorityTimes[1].values;
	});
	$scope.$watch('priorityTimes[2].values', function() {
		eSearchFilter.mDinner = $scope.priorityTimes[2].values;
	});
	$scope.$watch('priorityTimes[3].values', function() {
		eSearchFilter.mOffice = $scope.priorityTimes[3].values;
	});
	$scope.$watch('priorityTimes[4].values', function() {
		eSearchFilter.mHoliday = $scope.priorityTimes[4].values;
	});

	$scope.convertToMinute = function() {
		var hour = $scope.timeValues.mDurationHour;
		var minutes = $scope.timeValues.mDurationMinute;
		if (hour >= 0 && hour < 24) {
			if(minutes >= 0 && minutes < 60) {
				eSearchFilter.mDuration = hour * 60 + minutes;
			}
		}
	};

	//previous state of search-filter state
	$scope.preState = '';
	$scope.personName = angular.copy(eFriend.fName);

	$rootScope.$on('$stateChangeStart',
		function(event, toState, toParams, fromState) {
			if (toState.name == 'searchFilter') {
				$scope.preState = fromState.name;
				$scope.personName = angular.copy(eFriend.fName);
			}
		});

	$scope.submitFilter = function() {
		// 'You want to meet' field
		if($scope.personName == '') {
			eToast.toastError('You want to meet ?',300);
		}
		else if(eFriend.fMultiCal === null) {
			eToast.toastError($scope.personName + ' does not have calendar',300);
		}
		// Title field
		else if(eSearchFilter.mTitle == '') {
			eToast.toastError('Title is required',300);
		}
		// Duration field
		else if(!eSearchFilter.mDuration || eSearchFilter.mDuration === 0) {
			eToast.toastError('Duration is required',300);
		}
		else { $scope.goToState('result'); }
	};

	//reset all datas when out of Search Filter page.
	$scope.deleteValue = function(form) {
		/*RESET VALUE*/
		$scope.timeValues = angular.copy(resetValues);
		eSearchFilter.resetData();
		$scope.priorityTimes = angular.copy(pristine);
		/* RESET FORM*/
		form.$setPristine();
		form.$setUntouched();
		var inputs = document.getElementsByTagName('input');
		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].checked !== undefined || inputs[i].checked !== null) {
				inputs[i].checked = false;
			}
		}

		/*RESET VALUE*/
		$scope.mShow = false;
		$scope.showDay = true;
		$scope.showTime = false;
		$scope.titleOfButton = 'ADVANCE FILTER';

		if ($scope.preState == 'profile') {
			$rootScope.goToState('profile');
		} else {
			$scope.personName = '';
			eFriend.fName = '';
			eFriend.fMultiCal = null;
			$rootScope.goHome();
		}
	};

	$scope.mShow = false;
	$scope.showDay = true;
	$scope.showTime = false;
	$scope.titleOfButton = 'ADVANCE FILTER';
	$scope.toggleFunc = function() {
		$scope.mShow = !$scope.mShow;
		if ($scope.mShow === true) {
			$scope.titleOfButton = '';
		} else {
			$scope.titleOfButton = 'ADVANCE FILTER';
		}
	};

	$scope.showDate = function() {
		$scope.showDay = !$scope.showDay;
		$scope.showTime = !$scope.showTime;
		if ($scope.showTime === true) {
			$scope.timeValues.mDurationHour = 0;
			$scope.timeValues.mDurationMinute = 1;
		} else {
			$scope.timeValues.mDurationHour = 1;
			$scope.timeValues.mDurationMinute = 0;
		}
	};

	/* Chose person who you want to meet */
	//search person input to find who you want to meet

	$scope.showListPersons = false; //hide list of persons
	$scope.noFound = true; //true when no friend is found

	//show-hide list friend when enter a friend's name
	$scope.$watch('personName', function() {
		if ($scope.personName !== '') {
			$scope.showListPersons = true;
			var array = $filter('filterFriend');
			if (array(eUser.uFriend, $scope.personName).length !== 0) {
				$scope.noFound = false;
			} else {
				$scope.noFound = true;
			}
		} else {
			$scope.showListPersons = false;
		}
	});

	//hide list of persons when click anywhere
	$document.bind('click', function() {
		$scope.showListPersons = false;
	});
	//hide list of persons when scroll content
	$scope.hideListPerson = function() {
		$scope.showListPersons = false;
	};

	$scope.wantToMeet = function(person) {
		$scope.personName = person.name;
		eDatabase.getCalendar(person.id);
		//console.log(eFriend.fMultiCal);
	};
})

.directive('checkUncheckRadio', function() {
	return {
		restrict: 'A',
		scope: {
			isChecked: '='
		},
		link: function(scope, element) {
			var labelRadio = element.next();
			labelRadio.bind('mousedown', function() {
				if (element.prop('checked') === true) {
					labelRadio.bind('mouseup', function() {
						setTimeout(function() {
							element.prop('checked', false);
						}, 5);
					});
					scope.isChecked = null;
				} else {
					labelRadio.bind('mouseup', function() {
						setTimeout(function() {
							element.prop('checked', true);
						}, 5);
					});
				}
			});
		}
	};
})

.directive('changeIcon', function() {
	return {
		restrict: 'A',
		scope: {
			isChange: '=changeIcon'
		},
		link: function(scope, element) {
			scope.$watch('isChange', function() {
				if (scope.isChange === false) {
					element.attr('class', 'icon ion-arrow-down-b');
				} else {
					element.attr('class', 'icon ion-arrow-up-b');
				}
			});
		}
	};
})

.directive('autoFocusInput', function($timeout) {
	return {
		restrict: 'A',
		scope: {
			maxlength: '=autoFocusInput'
		},
		link: function(scope, element) {
			element.bind('input', function() {
				if (element.val().length >= scope.maxlength) {
					$timeout(function() {
						element.parent().parent().find('input')[1].focus();
					});
				}
			});
		}
	};
})

.filter('filterFriend', function() {
	//items = friends array
	return function(items, person) {
		if (!person) {
			return items;
		}
		var results = [];
		angular.forEach(items, function(item) {
			if(item !== undefined){
				if (item.name.toLowerCase().indexOf(person.toLowerCase()) > -1) {
					results.push(item);
				}
			}
		});

		return results;
	};
});
