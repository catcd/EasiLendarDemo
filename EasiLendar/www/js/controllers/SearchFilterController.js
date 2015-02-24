/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 24/02/2015
 * type: paticular controller
 */

angular.module('MainApp.controllers.searchFilter', [])

.controller("SearchFilterController", function($scope, $ionicPopup) {
    $scope.fShow = false;
    $scope.showAdvanceFilter = function() {
        $scope.fShow = !($scope.fShow);
    }
})
