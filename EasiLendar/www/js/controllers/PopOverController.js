/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 24/02/2015
 * type: popover controller
 */

angular.module('MainApp.controllers.popover', [])

.controller('PopOverController', function($scope, $ionicPopover) {
    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope,
    });

    // .fromTemplateUrl() method
    $ionicPopover.fromTemplateUrl('templates/my-popover.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.openPopover = function($event) {
        $scope.popover.show($event);
    };
    $scope.closePopover = function() {
        $scope.popover.hide();
    };
    // Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.popover.remove();
    });
})
