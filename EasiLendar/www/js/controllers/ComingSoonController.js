/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 21/04/2015
 * type: coming soon controller
 */

angular.module('MainApp.controllers.comingSoon', [])

.controller("ComingSoonController", function($scope, $ionicPopup, $timeout) {
	$scope.confirm = function(mail) {
		// check email
		if (mail) {
			// do sth when email is correct here
			var confirm = $ionicPopup.alert({
				title: 'Thanks for your observation!',
				template: "We are sending information to " + mail + " as soon as possible!"
			});
			$timeout(function() {
				confirm.close();
			}, 5000);
		} else {
			// do sth when email is uncorrect here
			var confirm = $ionicPopup.alert({
				title: 'Oop! Something is wrong!',
				template: "Your input email is uncorrect. Please try again!"
			});
			$timeout(function() {
				confirm.close();
			}, 5000);

		}
	}
})
