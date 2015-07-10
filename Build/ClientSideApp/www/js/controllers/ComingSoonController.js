/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 13/05/2015
 * type: coming soon controller
 */

angular.module('MainApp.controllers.comingSoon', [])

.controller('ComingSoonController', function($scope, $ionicPopup) {
	$scope.confirm = function(mail) {
		// check email
		if (mail) {
			// do sth when email is correct here
			$ionicPopup.alert({
				title: 'Thanks for your observation!',
				template: 'We are sending information to ' +
					mail +
					' as soon as possible!'
			});
		} else {
			// do sth when email is uncorrect here
			$ionicPopup.alert({
				title: 'Oop! Something is wrong!',
				template: 'Your input email is uncorrect. Please try again!'
			});
		}
	};
});
