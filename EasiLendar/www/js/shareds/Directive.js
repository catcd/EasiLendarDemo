/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 29/03/2015
 * type: all common directive
 */

angular.module('MainApp.shareds.directive', [])

/**
 * All directive
 */
// Directive input number only (A)
.directive('numbersOnly', function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, modelCtrl) {
			modelCtrl.$parsers.push(function(inputValue) {
				if (inputValue == undefined) return ''
				var transformedInput = inputValue.replace(/[^0-9]/g, '');
				if (transformedInput != inputValue) {
					modelCtrl.$setViewValue(transformedInput);
					modelCtrl.$render();
				}
				return transformedInput;
			});
		}
	};
})
// Directive input number only smaller than max="int"
// 0x convert to x, empty char convert to 0
.directive('validInput', function() {
	return {
		require: 'ngModel',
		scope: {
			max: '='
		},
		link: function(scope, element, attrs, modelCtrl) {
			modelCtrl.$parsers.push(function(inputValue) {
				inputValue = inputValue.replace(/[^0-9]/g, '');
				if (inputValue == '') {
					inputValue = '0';
				}
				if (Number(inputValue) > scope.max) {
					inputValue = scope.max.toString();
				}
				if (Number(inputValue) > 0 && inputValue.charAt(0) == '0') {
					inputValue = Number(inputValue).toString();
				}
				modelCtrl.$setViewValue(inputValue);
				modelCtrl.$render();
				return Number(inputValue);
			});
		}
	};
})
// Directive month
// Draw the month have eDate
.directive('easiMonth', function() {
	return {
		controller: 'MonthController',
		restrict: 'E',
		templateUrl: 'templates/template-month.html'
	};
})
// Directive draw week
// Draw the week have eDate
.directive('easiWeek', function() {
	return {
		controller: 'WeekController',
		restrict: 'E',
		templateUrl: 'templates/template-week.html'
	};
})
// Directive draw day event list
// Draw the list event of eDate
.directive('easiDay', function() {
	return {
		controller: 'ListController',
		restrict: 'E',
		templateUrl: 'templates/template-day-event-list.html'
	};
})
