/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 16/07/2015
 * type: all common directive
 */

var directive = angular.module('MainApp.shareds.directive', []);
// Directive input number only (Attribute)
directive.directive('numbersOnly', function() {
    return {
        require: 'ngModel',
        scope: {
            max: '='
        },
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function(inputValue) {
                inputValue = inputValue.replace(/[^0-9]/g, '');
                if (Number(inputValue) > scope.max) {
                    inputValue = scope.max.toString();
                }
                modelCtrl.$setViewValue(inputValue);
                modelCtrl.$render();
                return Number(inputValue);
            });
        }
    };
});
// Draw the week calendar (Element)
directive.directive('easiWeek', function() {
    return {
        controller: 'WeekController',
        restrict: 'E',
        templateUrl: 'templates/template-week.html'
    };
});
