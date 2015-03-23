/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 24/03/2015
 * type: popover controller
 */

angular.module('MainApp.controllers.popover', [])

.controller('PopOverController', function($scope, $ionicPopover) {
    /**
     * popover variable
     */
    // class
    $scope.mPopoverStatus = {};
    $scope.mPopoverStatus[true] = "active";
    $scope.mPopoverStatus[false] = "";

    $scope.mPopoverActive = "friend";

    /**
     * popover function
     */
    $scope.tabActive = function(tabName) {
        $scope.mPopoverActive = tabName;
    };

    /**
     * friend popover
     */
    $scope.friendPopover = $ionicPopover.fromTemplate(template, {
        scope: $scope,
    });

    // .fromTemplateUrl() method
    $ionicPopover.fromTemplateUrl('templates/noti-popover.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.friendPopover = popover;
    });

    $scope.openPopover = function($event) {
        $scope.friendPopover.show($event);
    };
    $scope.closePopover = function() {
        $scope.friendPopover.hide();
    };
    // Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.friendPopover.remove();
    });
})
