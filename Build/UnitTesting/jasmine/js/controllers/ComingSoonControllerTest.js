/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 25/04/2015
 * type: coming soon controller
 * test: 4
 */

describe('Comming soon Controller test', function() {
	var $controller, $rootScope, $scope;
	var $ionicPopup;

	// inject module
	beforeEach(module('MainApp.controllers.comingSoon'));

	// fake services
	var $ionicPopup = {
		alert: function(object) {},
	};

	// execuse before each it
	beforeEach(inject(function(_$rootScope_, _$controller_) {
		$rootScope = _$rootScope_;
		$controller = _$controller_;
		$scope = $rootScope.$new();

		$controller('ComingSoonController', {
			'$rootScope': $rootScope,
			'$scope': $scope,
			'$ionicPopup': $ionicPopup,
		});
	}));

	describe('confirm function', function() {
		it('comfirm success', function() {
			// create spy
			spyOn($ionicPopup, 'alert');

			// data
			var mail = "ninjameo9x@gmail.com";

			// toggleLeft
			$scope.confirm(mail);

			expect($ionicPopup.alert).toHaveBeenCalled();
		});

		it('comfirm success with alert', function() {
			// create spy
			spyOn($ionicPopup, 'alert');

			// data
			var mail = "ninjameo9x@gmail.com";

			// toggleLeft
			$scope.confirm(mail);

			expect($ionicPopup.alert).toHaveBeenCalled();
			expect($ionicPopup.alert).toHaveBeenCalledWith({
				title: 'Thanks for your observation!',
				template: "We are sending information to ninjameo9x@gmail.com as soon as possible!"
			});
		});

		it('comfirm fail', function() {
			// create spy
			spyOn($ionicPopup, 'alert');

			// data is undefined
			var mail;

			// toggleLeft
			$scope.confirm(mail);

			expect($ionicPopup.alert).toHaveBeenCalled();
		});

		it('comfirm fail with alert', function() {
			// create spy
			spyOn($ionicPopup, 'alert');

			// data is undefined
			var mail;

			// toggleLeft
			$scope.confirm(mail);

			expect($ionicPopup.alert).toHaveBeenCalled();
			expect($ionicPopup.alert).toHaveBeenCalledWith({
				title: 'Oop! Something is wrong!',
				template: "Your input email is uncorrect. Please try again!"
			});
		});
	});
});
