/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 26/03/2015
 * type: popover controller
 */

angular.module('MainApp.controllers.popover', [])

.controller('PopOverController', function($rootScope, $scope, $ionicPopover, $ionicActionSheet, $timeout) {
    /**
     * popover variable
     */
    // class
    $scope.mPopoverStatus = {};
    $scope.mPopoverStatus[true] = "active";
    $scope.mPopoverStatus[false] = "";

    $scope.mPopoverActive = "";

    /**
     * popover function
     */
    $scope.tabActive = function(tabName) {
        $scope.mPopoverActive = tabName;
    };

    // function for gesture
    $scope.nextRightNoti = function() {
        if ($scope.mPopoverActive == "friend") {
            $scope.tabActive("request");
        } else if ($scope.mPopoverActive == "request") {
            $scope.tabActive("respond");
        } else {
            $scope.tabActive("friend");
        }
    };
    $scope.nextLeftNoti = function() {
        if ($scope.mPopoverActive == "friend") {
            $scope.tabActive("respond");
        } else if ($scope.mPopoverActive == "request") {
            $scope.tabActive("friend");
        } else {
            $scope.tabActive("request");
        }
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
        $scope.tabActive("friend");
        $scope.friendPopover.show($event);
    };
    $scope.closePopover = function() {
        $scope.friendPopover.hide();
    };
    // Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.friendPopover.remove();
    });

    /**
     * action sheet
     */
    // friend action sheet
    $scope.friendAction = function(name) {
        // Show the action sheet
        var friendSheet = $ionicActionSheet.show({
            buttons: [{
                text: 'View'
            }, {
                text: 'Comfirm request'
            }],
            destructiveText: 'Delete request',
            titleText: name + " request",
            cancelText: 'Cancel',
            cancel: function() {
                // TODO cancel code here
            },
            destructiveButtonClicked: function() {
                // TODO delete code here
                $rootScope.showAlert("Deleted");

                return true;
            },
            buttonClicked: function(index) {
                if (index == 0) {
                    // TODO view code here
                    $rootScope.showAlert("Viewing");
                    $scope.closePopover();
                } else {
                    // TODO confirm code here
                    $rootScope.showAlert("Comfirm friend request");
                }

                return true;
            }
        });
        // hide the sheet after five seconds
        $timeout(function() {
            friendSheet();
        }, 5000);

    };

    // Request action sheet
    $scope.requestAction = function(name) {
        // Show the action sheet
        var requestSheet = $ionicActionSheet.show({
            buttons: [{
                text: 'View detail'
            }, {
                text: 'Accept'
            }],
            destructiveText: 'Reject',
            titleText: name + " appointment",
            cancelText: 'Cancel',
            cancel: function() {
                // TODO cancel code here
            },
            destructiveButtonClicked: function() {
                // TODO delete code here
                $rootScope.showAlert("Deleted");

                return true;
            },
            buttonClicked: function(index) {
                if (index == 0) {
                    // TODO view code here
                    $rootScope.showAlert("Viewing");
                    $scope.closePopover();
                } else {
                    // TODO confirm code here
                    $rootScope.showAlert("Accepted appointment");
                }

                return true;
            }
        });
        // hide the sheet after two seconds
        $timeout(function() {
            requestSheet();
        }, 5000);
    };

    /**
     * ng-style
     */
    // style for friend tab
    var calMyMargin = function() {
        if ($rootScope.eUser.uFALength != 0 || $scope.mPopoverActive == 'friend') {
            return "69px";
        } else {
            return "0px";
        }
    };

    var mMargin = calMyMargin();

    $scope.marginFriendTab = {
        "margin-top": mMargin,
    };
})

.directive('notiContent', function() {
    return {
        restrict: 'E',
        templateUrl: function(elem, attr) {
            return "templates/noti-" + attr.type + "-tab.html";
        }
    };
});
