/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 29/05/2015
 * type: home controller
 */

angular.module('MainApp.controllers.home', [])

.controller('HomeController',
	function($scope, $rootScope, $ionicPopover, eDatabase) {
		$scope.eDatabase = eDatabase;
		// today function
		// must call the corresponding today function
		$scope.today = function() {
			if ($rootScope.currentState == 'month') {
				$rootScope.monthToday();
			} else if ($rootScope.currentState == 'day') {
				$rootScope.dayToday();
			} else if ($rootScope.currentState == 'list') {
				$rootScope.listToday();
			} else if ($rootScope.currentState == 'week') {
				$rootScope.weekToday();
			}
		};

		var template = '';

		/**
		 * calendar select popover
		 */
		$scope.calendarPopover = $ionicPopover.fromTemplate(template, {
			scope: $scope,
		});

		// .fromTemplateUrl() method
		$ionicPopover.fromTemplateUrl('templates/calendar-select-popover.html', {
			scope: $scope,
		}).then(function(popover) {
			$scope.calendarPopover = popover;
		});

		$scope.selectPopover = function($event) {
			$scope.calendarPopover.show($event);
		};
		$scope.closeSelect = function() {
			$scope.calendarPopover.hide();
		};
		// Cleanup the popover when we're done with it!
		$scope.$on('$destroy', function() {
			$scope.calendarPopover.remove();
		});
	});
