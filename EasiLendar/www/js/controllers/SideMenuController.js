/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 24/02/2015
 * type: side menu controller
 */

angular.module('MainApp.controllers.sideMenu', [])

.controller('sideMenuController', function($scope, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
})
