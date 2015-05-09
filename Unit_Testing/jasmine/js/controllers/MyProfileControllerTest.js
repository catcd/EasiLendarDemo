/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 09/05/2015
 * type: my profile controller unit test
 * test: 84 specs
 */

describe('My Profile Controller test', function() {
	var $controller, $rootScope, $scope,
		$ionicSlideBoxDelegate, $ionicPopup,
		eUser, eDatabase, eToast, eCalendar;

	// inject module
	beforeEach(module('MainApp.controllers.myProfile'));

	// fake services
	var $ionicSlideBoxDelegate = {
		slide: function(index, num) {},
		enableSlide: function(bool) {},
	}

	var $ionicPopup = {
		confirm: function(object) {},
	};

	var eUser = {
		uFriend: null,
		uGmailCalendar: null,
		uBirthday: null,
		uGender: null,
		uPhone: null,
		uAddress: null,
		uName: null,
		uAvatar: null,
		uEmail: null,
		uVIP: null,
	}

	var eDatabase = {
		updateProfile: function() {},
		deleteF: function(id) {},
	};

	var eToast = {
		toastInfoOne: function(mesg, delay) {},
	};

	var eCalendar = {
		convertTime: function(date) {
			return "result";
		},
		parseDate: function(date) {
			return {
				year: "year",
				date: "date",
			}
		},
		easiConvertTime: function(date) {
			return {
				time: "time",
				date: "date",
			}
		},
	};

	// execuse before each it
	beforeEach(inject(function(_$rootScope_, _$controller_) {
		$rootScope = _$rootScope_;
		$controller = _$controller_;
		$scope = $rootScope.$new();

		$rootScope.goHome = function() {};

		$controller('MyProfileController', {
			'$rootScope': $rootScope,
			'$scope': $scope,
			'$ionicSlideBoxDelegate': $ionicSlideBoxDelegate,
			'$ionicPopup': $ionicPopup,
			'eUser': eUser,
			'eDatabase': eDatabase,
			'eToast': eToast,
			'eCalendar': eCalendar,
		});
	}));

	describe('Intialize data', function() {
		it('should create data = {}', function() {
			var data = $scope.data;

			expect(data).toBeDefined();
			expect(data).toEqual({});
		});

		it('should create active = 0', function() {
			var active = $scope.active;

			expect(active).toBeDefined();
			expect(active).toEqual(0);
		});

		it('should create rightButton = {}', function() {
			var rightButton = $scope.rightButton;

			expect(rightButton).toBeDefined();
			expect(rightButton[false]).toEqual({
				icon: "ion-ios-gear-outline"
			});
			expect(rightButton[true]).toEqual({
				icon: "ion-android-done"
			});
		});

		it('should create leftButton = {}', function() {
			var leftButton = $scope.leftButton;

			expect(leftButton).toBeDefined();
			expect(leftButton[false]).toEqual({
				icon: "ion-ios-arrow-left"
			});
			expect(leftButton[true]).toEqual({
				icon: "ion-android-close"
			});
		});

		it('should create tempUserData = angular.copy(eUser)', function() {
			var tempUserData = $scope.tempUserData;

			expect(tempUserData).toBeDefined();
			expect(tempUserData).toEqual(angular.copy(eUser));
		});

		it('should create timeInfo = {}', function() {
			var timeInfo = $scope.timeInfo;

			expect(timeInfo).toBeDefined();
			expect(timeInfo).toEqual({});
		});

		it('should create rand = Math.floor(Math.random() * 30)', function() {
			var rand = $scope.rand;

			expect(rand).toBeDefined();
			expect(rand).toBeGreaterThan(-1);
			expect(rand).toBeLessThan(30);
		});

		it('should create quote = 30 quotes', function() {
			var quote = $scope.quote;

			expect(quote).toBeDefined();
			expect(quote.length).toEqual(30);
		});

		it('should create isEditing = false', function() {
			var isEditing = $scope.isEditing;

			expect(isEditing).toBeDefined();
			expect(isEditing).toBe(false);
		});
	});

	describe('Functional Test', function() {
		describe('Mini function', function() {
			describe('accountType test', function() {
				it('should return type vip with show true if eUser.uVIP true', function() {
					eUser.uVIP = true;
					type = $scope.accountType();

					expect(type.type).toEqual("VIP");
					expect(type.show).toBe(true);
				});

				it('should return type standard with show false if eUser.uVIP false', function() {
					eUser.uVIP = false;
					type = $scope.accountType();

					expect(type.type).toEqual("Standard");
					expect(type.show).toBe(false);
				});
			});

			describe('countFriend test', function() {
				it('should return 0 when eUser.uFriend == null', function() {
					eUser.uFriend = null;

					expect($scope.countFriend()).toEqual(0);
				});

				it('should return 0 when eUser.uFriend is undefined', function() {
					eUser.uFriend = undefined;

					expect($scope.countFriend()).toEqual(0);
				});

				it('should return 0 when eUser.uFriend is not an object', function() {
					eUser.uFriend = "undefined";

					expect($scope.countFriend()).toEqual(0);
				});

				it('should count if and only if element is a friend', function() {
					eUser.uFriend = {};

					eUser.uFriend["catdz95"] = {
						id: "catdz95",
						name: "Cat Can",
						VIP: true,
						ava: 0,
					};
					var result = $scope.countFriend();

					expect(result).toEqual(1);
				});

				it('should not count element is not a friend', function() {
					eUser.uFriend = {};

					eUser.uFriend["catdz95"] = {
						id: "catdz95",
						name: "Cat Can",
						VIP: true,
						ava: 0,
					};
					eUser.uFriend["catdz952"] = {
						other: "here"
					};
					var result = $scope.countFriend();

					expect(result).toEqual(1);
				});
			});

			describe('generateRand test', function() {
				it('should generate a rand num from 0 to 29', function() {
					$scope.generateRand();

					expect($scope.rand).toBeGreaterThan(-1);
					expect($scope.rand).toBeLessThan(30);
				});

				it('should generate correctly with generate twice', function() {
					$scope.generateRand();
					$scope.generateRand();

					expect($scope.rand).toBeGreaterThan(-1);
					expect($scope.rand).toBeLessThan(30);
				});
			});

			describe('info test', function() {
				it('Birthday has been set', function() {
					eUser.uBirthday = true;
					result = $scope.info();

					expect(result.birth.date).toEqual("date");
					expect(result.birth.year).toEqual("year");
				});

				it('Birthday not set', function() {
					eUser.uBirthday = null;
					result = $scope.info();

					expect(result.birth.date).toEqual("Not set");
					expect(result.birth.year).toEqual("Not set");
				});

				it('Gender has been set', function() {
					eUser.uGender = "Male";
					result = $scope.info();

					expect(result.gender).toEqual("Male");
				});

				it('Gender not set', function() {
					eUser.uGender = null;
					result = $scope.info();

					expect(result.gender).toEqual("Not set");
				});

				it('Phone has been set', function() {
					eUser.uPhone = "0969422782";
					result = $scope.info();

					expect(result.phone).toEqual("0969422782");
				});

				it('Phone not set', function() {
					eUser.uPhone = null;
					result = $scope.info();

					expect(result.phone).toEqual("Not set");
				});

				it('Address has been set', function() {
					eUser.uAddress = "Hanoi";
					result = $scope.info();

					expect(result.address).toEqual("Hanoi");
				});

				it('Address not set', function() {
					eUser.uAddress = null;
					result = $scope.info();

					expect(result.address).toEqual("Not set");
				});
			});

			describe('activeTab test', function() {
				it('should call slide to index if isEditing is false', function() {
					spyOn($ionicSlideBoxDelegate, 'slide');
					$scope.isEditing = false;
					$scope.activeTab(1);

					expect($ionicSlideBoxDelegate.slide).toHaveBeenCalled();
					expect($ionicSlideBoxDelegate.slide).toHaveBeenCalledWith(1, 500);
				});

				it('should call slide to 3 if index > 3', function() {
					spyOn($ionicSlideBoxDelegate, 'slide');
					$scope.isEditing = false;
					$scope.activeTab(4);

					expect($ionicSlideBoxDelegate.slide).toHaveBeenCalled();
					expect($ionicSlideBoxDelegate.slide).toHaveBeenCalledWith(3, 500);
				});

				it('should call slide to 0 if index < 0', function() {
					spyOn($ionicSlideBoxDelegate, 'slide');
					$scope.isEditing = false;
					$scope.activeTab(-4);

					expect($ionicSlideBoxDelegate.slide).toHaveBeenCalled();
					expect($ionicSlideBoxDelegate.slide).toHaveBeenCalledWith(0, 500);
				});

				it('should active tab 1 if isEditing is true', function() {
					spyOn($ionicSlideBoxDelegate, 'slide');
					$scope.isEditing = true;
					$scope.activeTab(3);

					expect($ionicSlideBoxDelegate.slide).not.toHaveBeenCalled();
				});
			});

			describe('slideHasChange test', function() {
				it('should change active to index', function() {
					$scope.slideHasChanged(2);

					expect($scope.active).toEqual(2);
				});

				it('should change active to 0 if index < 0', function() {
					$scope.slideHasChanged(-2);

					expect($scope.active).toEqual(0);
				});

				it('should change active to 3 if index > 3', function() {
					$scope.slideHasChanged(5);

					expect($scope.active).toEqual(3);
				});
			});
		});

		describe('Button click function', function() {
			describe('rightFunction test', function() {
				it('should call done if isEditing == true', function() {
					spyOn($scope, 'done');
					$scope.isEditing = true;

					$scope.rightFunction();

					expect($scope.done).toHaveBeenCalled();
				});

				it('should call setting if isEditing == true', function() {
					spyOn($scope, 'setting');
					$scope.isEditing = false;

					$scope.rightFunction();

					expect($scope.setting).toHaveBeenCalled();
				});
			});

			describe('leftFunction test', function() {
				it('should call cancel if isEditing == true', function() {
					spyOn($scope, 'cancel');
					$scope.isEditing = true;

					$scope.leftFunction();

					expect($scope.cancel).toHaveBeenCalled();
				});

				it('should call setting if isEditing == true', function() {
					spyOn($rootScope, 'goHome');
					$scope.isEditing = false;

					$scope.leftFunction();

					expect($rootScope.goHome).toHaveBeenCalled();
				});
			});

			describe('setting test', function() {
				it('should notify coming soon', function() {
					spyOn(eToast, 'toastInfoOne');

					$scope.setting();

					expect(eToast.toastInfoOne).toHaveBeenCalled();
					expect(eToast.toastInfoOne).toHaveBeenCalledWith("Coming soon...", 3000);
				});
			});

			describe('capture test', function() {
				it('should notify coming soon', function() {
					spyOn(eToast, 'toastInfoOne');

					$scope.capture();

					expect(eToast.toastInfoOne).toHaveBeenCalled();
					expect(eToast.toastInfoOne).toHaveBeenCalledWith("Coming soon...", 3000);
				});
			});

			describe('nextLeftAva test', function() {
				it('should do nothing if isEditing = false', function() {
					eUser.uAvatar = '5';
					$scope.isEditing = false;
					$scope.nextLeftAva();

					expect(eUser.uAvatar).toEqual('5');
				});

				it('should do minus by 1 if isEditing = true', function() {
					eUser.uAvatar = '5';
					$scope.isEditing = true;
					$scope.nextLeftAva();

					expect(eUser.uAvatar).toEqual('4');
				});

				it('should do change to 8 if eUser.uAvatar = 0', function() {
					eUser.uAvatar = '0';
					$scope.isEditing = true;
					$scope.nextLeftAva();

					expect(eUser.uAvatar).toEqual('8');
				});
			});

			describe('nextRightAva test', function() {
				it('should do nothing if isEditing = false', function() {
					eUser.uAvatar = '5';
					$scope.isEditing = false;
					$scope.nextRightAva();

					expect(eUser.uAvatar).toEqual('5');
				});

				it('should do plus by 1 if isEditing = true', function() {
					eUser.uAvatar = '5';
					$scope.isEditing = true;
					$scope.nextRightAva();

					expect(eUser.uAvatar).toEqual('6');
				});

				it('should do change to 0 if eUser.uAvatar = 8', function() {
					eUser.uAvatar = '8';
					$scope.isEditing = true;
					$scope.nextRightAva();

					expect(eUser.uAvatar).toEqual('0');
				});
			});

			describe('edit test', function() {
				it('should get birthday data if eUser.uBirthday != null', function() {
					eUser.uBirthday = new Date(1995, 8, 14);
					$scope.edit();

					expect($scope.data.date).toEqual(14);
					expect($scope.data.month).toEqual(9);
					expect($scope.data.year).toEqual(1995);
				});

				it('should set data to null if eUser.uBirthday == null', function() {
					eUser.uBirthday = null;
					$scope.edit();

					expect($scope.data.date).toBeNull();
					expect($scope.data.month).toBeNull();
					expect($scope.data.year).toBeNull();
				});

				it('should set gender data true if eUser.uGender == male', function() {
					eUser.uGender = "Male";
					$scope.edit();

					expect($scope.data.gender).toBe(true);
				});

				it('should set gender data null if eUser.uGender == female', function() {
					eUser.uGender = "Female";
					$scope.edit();

					expect($scope.data.gender).toBe(false);
				});

				it('should set gender data false if eUser.uGender == null', function() {
					eUser.uGender = null;
					$scope.edit();

					expect($scope.data.gender).toBeNull();
				});

				it('should get phone data null if eUser.uPhone != null', function() {
					eUser.uPhone = "0969422782";
					$scope.edit();

					expect($scope.data.phone).toEqual("0969422782");
				});

				it('should set gender data false if eUser.uPhone == null', function() {
					eUser.uPhone = null;
					$scope.edit();

					expect($scope.data.phone).toBeNull();
				});

				it('should active tab 1', function() {
					spyOn($scope,'activeTab');
					$scope.edit();

					expect($scope.activeTab).toHaveBeenCalled();
					expect($scope.activeTab).toHaveBeenCalledWith(1);
				});

				it('should copy eUser to tempUserData', function() {
					$scope.edit();

					expect($scope.tempUserData).toEqual(eUser);
				});

				it('should change isEditing to true', function() {
					$scope.edit();

					expect($scope.isEditing).toBe(true);
				});

				it('should disable slide', function() {
					spyOn($ionicSlideBoxDelegate, 'enableSlide');
					$scope.edit();

					expect($ionicSlideBoxDelegate.enableSlide).toHaveBeenCalled();
					expect($ionicSlideBoxDelegate.enableSlide).toHaveBeenCalledWith(false);
				});
			});

			describe('done test', function() {
				it('should not change birthday if all birthday data are null', function() {
					eUser.uBirthday = new Date(1995, 8, 14);
					$scope.data.year = null;
					$scope.data.month = null;
					$scope.data.date = null;

					$scope.done();

					expect(eUser.uBirthday).toEqual(new Date(1995, 8, 14));
				});

				it('should change birthday to new birthday', function() {
					eUser.uBirthday = new Date(1995, 8, 14);
					$scope.data.year = 1995;
					$scope.data.month = 8;
					$scope.data.date = 30;

					$scope.done();

					expect(eUser.uBirthday).toEqual(new Date(1995, 7, 30));
				});

				it('should change year to 1990 if null', function() {
					eUser.uBirthday = new Date(1995, 8, 14);
					$scope.data.year = null;
					$scope.data.month = 6;
					$scope.data.date = 1;

					$scope.done();

					expect(eUser.uBirthday).toEqual(new Date(1990, 5, 1));
				});

				it('should change month to 1 if null', function() {
					eUser.uBirthday = new Date(1995, 8, 14);
					$scope.data.year = 1995;
					$scope.data.month = null;
					$scope.data.date = 30;

					$scope.done();

					expect(eUser.uBirthday).toEqual(new Date(1995, 0, 30));
				});

				it('should change date to 1 if null', function() {
					eUser.uBirthday = new Date(1995, 8, 14);
					$scope.data.year = 1995;
					$scope.data.month = 6;
					$scope.data.date = null;

					$scope.done();

					expect(eUser.uBirthday).toEqual(new Date(1995, 5, 1));
				});

				it('should change gender to male if data gender true', function() {
					$scope.data.gender = true;

					$scope.done();

					expect(eUser.uGender).toEqual("Male");
				});

				it('should change gender to female if data gender false', function() {
					$scope.data.gender = false;

					$scope.done();

					expect(eUser.uGender).toEqual("Female");
				});

				it('should change phone to new phone if not null', function() {
					$scope.data.phone = "0969422782";

					$scope.done();

					expect(eUser.uPhone).toEqual("0969422782");
				});

				it('should not change phone to new phone if null', function() {
					$scope.data.phone = null;
					eUser.uPhone = "0969422782";

					$scope.done();

					expect(eUser.uPhone).toEqual("0969422782");
				});

				it('should reset data to {}', function() {
					$scope.done();

					expect($scope.data).toEqual({});
				});

				it('should change isEditing back to false', function() {
					$scope.done();

					expect($scope.isEditing).toBe(false);
				});

				it('should enable slide back', function() {
					spyOn($ionicSlideBoxDelegate, 'enableSlide');
					$scope.done();

					expect($ionicSlideBoxDelegate.enableSlide).toHaveBeenCalled();
					expect($ionicSlideBoxDelegate.enableSlide).toHaveBeenCalledWith(true);
				});

				it('should update profile', function() {
					spyOn(eDatabase, 'updateProfile');
					$scope.done();

					expect(eDatabase.updateProfile).toHaveBeenCalled();
				});
			});

			describe('Cancel test', function() {
				it('should reset data to {}', function() {
					$scope.cancel();

					expect($scope.data).toEqual({});
				});

				it('should reset data to tempUserData', function() {
					$scope.tempUserData.uName = "Cat Can";
					$scope.tempUserData.uAvatar = 0;
					$scope.tempUserData.uEmail = "ninjameo9x";
					$scope.tempUserData.uGender = "Male";
					$scope.tempUserData.uPhone = "0969422782";
					$scope.tempUserData.uAddress = "Hanoi";

					$scope.cancel();

					expect(eUser.uName).toEqual("Cat Can");
					expect(eUser.uAvatar).toEqual(0);
					expect(eUser.uEmail).toEqual("ninjameo9x");
					expect(eUser.uGender).toEqual("Male");
					expect(eUser.uPhone).toEqual("0969422782");
					expect(eUser.uAddress).toEqual("Hanoi");
				});

				it('should change isEditing back to false', function() {
					$scope.cancel();

					expect($scope.isEditing).toBe(false);
				});

				it('should enable slide back', function() {
					spyOn($ionicSlideBoxDelegate, 'enableSlide');
					$scope.cancel();

					expect($ionicSlideBoxDelegate.enableSlide).toHaveBeenCalled();
					expect($ionicSlideBoxDelegate.enableSlide).toHaveBeenCalledWith(true);
				});
			});
		});
	});
});
