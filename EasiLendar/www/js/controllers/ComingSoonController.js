/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 01/03/2015
 * type: coming soon controller
 */

angular.module('MainApp.controllers.comingSoon', [])

.controller("ComingSoonController", function($scope, $ionicPopup, $timeout) {
    $scope.confirm = function(mail) {
        // do sth here
        var confirm = $ionicPopup.alert({
            title: 'Thanks for your observation!',
            template: "We are sending information to "+mail+" as soon as possible!"
        });
        $timeout(function() {
            confirm.close();
        }, 5000);
    }
})
