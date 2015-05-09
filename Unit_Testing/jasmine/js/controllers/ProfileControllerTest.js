/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 09/05/2015
 * type: profile controller test
 * test: 33 specs
 */

describe('Friend Profile Controller test', function() {
	var $controller, $rootScope, $scope,
		$ionicPopup, $ionicSlideBoxDelegate,
		eUser, eFriend, eEasiLendar, eCheckFriend, eDatabase, eToast, eCalendar;

	// inject module
	beforeEach(module('MainApp.controllers.profile'));

	// fake services
	var $ionicSlideBoxDelegate = {
		slide: function(index, num) {},
	}

	var $ionicPopup = {
		confirm: function(object) {},
	};

	var eUser = {
		uID: null,
	}

	var eFriend = {
		fInfor: {},
		fName: null,
		fID: null,
		fBusy: null,
		fVIP: null,
	}

	var eEasiLendar = {
		newWeekCalendar: function() {
			return {
				setNavDays: function() {},
			}
		},
	};

	var eDatabase = {
		viewProfile: function(id) {},
		request: function(id) {},
		addFriend: function(id) {},
		deleteF: function(id) {},
	};

	var eCalendar = {
		parseDate: function(date) {
			return {
				year: "year",
				date: "date",
			}
		},
	};

	var eToast = {
		toastInfoOne: function(mesg, delay) {},
	};

	// fake data
	var isFriendFake; // Boolean
	var isRequestedFake; // Boolean
	var isRequestedMeFake; // Boolean

	var eCheckFriend = {
		isFriend: function(id) {
			return isFriendFake;
		},
		isRequested: function(id) {
			return isRequestedFake;
		},
		isRequestedMe: function(id) {
			return isRequestedMeFake;
		},
	};

	// execuse before each it
	beforeEach(inject(function(_$rootScope_, _$controller_) {
		$rootScope = _$rootScope_;
		$controller = _$controller_;
		$scope = $rootScope.$new();

		$rootScope.goHome = function () {};

		$controller('ProfileController', {
			'$scope': $scope,
			'$rootScope': $rootScope,
			'$ionicPopup': $ionicPopup,
			'$ionicSlideBoxDelegate': $ionicSlideBoxDelegate,
			'eUser': eUser,
			'eFriend': eFriend,
			'eEasiLendar': eEasiLendar,
			'eCheckFriend': eCheckFriend,
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

		it('should create activeProfile = 0', function() {
			var activeProfile = $scope.activeProfile;

			expect(activeProfile).toBeDefined();
			expect(activeProfile).toEqual(0);
		});

		it('should create isEditing = false', function() {
			var isEditing = $scope.isEditing;

			expect(isEditing).toBeDefined();
			expect(isEditing).toBe(false);
		});

		it('should create weekCalendar = eEasiLendar.newWeekCalendar()', function() {
			var weekCalendar = $scope.weekCalendar;

			expect(weekCalendar).toBeDefined();
		});
	});

	describe('Functional Test', function() {
		describe('status test', function() {
			it('should return busy if eFriend.fBusy true', function() {
				eFriend.fBusy = true;
				busy = $scope.status();

				expect(busy.status).toEqual("Busy");
				expect(busy.icon).toEqual("ion-android-time");
			});

			it('should return busy if eFriend.fBusy false', function() {
				eFriend.fBusy = false;
				busy = $scope.status();

				expect(busy.status).toEqual("Free");
				expect(busy.icon).toEqual("ion-android-time");
			});
		});

		describe('changeIcon test', function() {
			afterEach(function() {
				id = "";
				eUser.uID = "";
				isFriendFake = false;
				isRequestedFake = false;
				isRequestedMeFake = false;
			});

			it('should return ion home if id is myself', function() {
				id = "catdz95";
				eUser.uID = "catdz95";

				expect($scope.changeIcon(id)).toEqual("ion-android-home");
			});

			it('should return ion home if id isFriend', function() {
				isFriendFake = true;
				id = "catdz95";

				expect($scope.changeIcon(id)).toEqual("ion-android-delete");
			});

			it('should return ion home if id isRequestedMe', function() {
				isRequestedMeFake = true;
				id = "catdz95";

				expect($scope.changeIcon(id)).toEqual("ion-android-checkbox");
			});

			it('should return ion home if id isRequested', function() {
				isRequestedFake = true;
				id = "catdz95";

				expect($scope.changeIcon(id)).toEqual("ion-android-search");
			});

			it('should return ion home if id not isFriend', function() {
				isFriendFake = false;
				id = "catdz95";

				expect($scope.changeIcon(id)).toEqual("ion-person-add");
			});
		});

		describe('changeFunction test', function() {
			beforeEach(function(){
				var name = "Cat Can"
			});

			afterEach(function() {
				id = "";
				eUser.uID = "";
				isFriendFake = false;
				isRequestedFake = false;
				isRequestedMeFake = false;
			});

			it('should go home if id is myself', function() {
				id = "catdz95";
				eUser.uID = "catdz95";

				spyOn($rootScope, 'goHome');
				$scope.changeFunction(id, name);

				expect($rootScope.goHome).toHaveBeenCalled();
			});

			it('should delete friend if id isFriend', function() {
				isFriendFake = true;
				id = "catdz95";

				spyOn($scope, 'delFriend');
				$scope.changeFunction(id, name);

				expect($scope.delFriend).toHaveBeenCalled();
				expect($scope.delFriend).toHaveBeenCalledWith(id, name);
			});

			it('should delete friend if id isRequestedMe', function() {
				isRequestedMeFake = true;
				id = "catdz95";

				spyOn($scope, 'acceptFriend');
				$scope.changeFunction(id, name);

				expect($scope.acceptFriend).toHaveBeenCalled();
				expect($scope.acceptFriend).toHaveBeenCalledWith(id, name);
			});

			it('should delete friend if id isRequested', function() {
				isRequestedFake = true;
				id = "catdz95";

				spyOn(eDatabase, 'viewProfile');
				$scope.changeFunction(id, name);

				expect(eDatabase.viewProfile).toHaveBeenCalled();
				expect(eDatabase.viewProfile).toHaveBeenCalledWith(id);
			});

			it('should delete friend if id not isFriend', function() {
				isFriendFake = false;
				id = "catdz95";

				spyOn(eDatabase, 'request');
				$scope.changeFunction(id, name);

				expect(eDatabase.request).toHaveBeenCalled();
				expect(eDatabase.request).toHaveBeenCalledWith(id);
			});
		});

		describe('info test', function() {
			it('Birthday has been set', function() {
				eFriend.fInfor.birthday = true;
				result = $scope.info();

				expect(result.birth.date).toEqual("date");
				expect(result.birth.year).toEqual("year");
			});

			it('Birthday not set', function() {
				eFriend.fInfor.birthday = null;
				result = $scope.info();

				expect(result.birth.date).toEqual("Ask for birthday!");
				expect(result.birth.year).toEqual("Ask for birthday!");
			});

			it('Gender has been set', function() {
				eFriend.fInfor.gender = "Male";
				result = $scope.info();

				expect(result.gender).toEqual("Male");
			});

			it('Gender not set', function() {
				eFriend.fInfor.gender = null;
				result = $scope.info();

				expect(result.gender).toEqual("Ask for gender!");
			});

			it('Phone has been set', function() {
				eFriend.fInfor.phone = "0969422782";
				result = $scope.info();

				expect(result.phone).toEqual("0969422782");
			});

			it('Phone not set', function() {
				eFriend.fInfor.phone = null;
				result = $scope.info();

				expect(result.phone).toEqual("Ask for phone number!");
			});

			it('Email has been set', function() {
				eFriend.fInfor.email = "catcan95";
				result = $scope.info();

				expect(result.email).toEqual("catcan95@gmail.com");
			});

			it('Email not set', function() {
				eFriend.fInfor.email = null;
				result = $scope.info();

				expect(result.email).toEqual("Ask for email!");
			});

			it('Address has been set', function() {
				eFriend.fInfor.address = "Hanoi";
				result = $scope.info();

				expect(result.address).toEqual("Hanoi");
			});

			it('Address not set', function() {
				eFriend.fInfor.address = null;
				result = $scope.info();

				expect(result.address).toEqual("Ask for address!");
			});
		});

		describe('message test', function() {
			it('should notify coming soon', function() {
				spyOn(eToast, 'toastInfoOne');

				$scope.message();

				expect(eToast.toastInfoOne).toHaveBeenCalled();
				expect(eToast.toastInfoOne).toHaveBeenCalledWith("Coming soon...", 3000);
			});
		});

		describe('activeTab test', function() {
			it('should call slide to index', function() {
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
		});

		describe('slideHasChange test', function() {
			it('should change activeProfile to index', function() {
				$scope.slideHasChanged(2);

				expect($scope.activeProfile).toEqual(2);
			});

			it('should change activeProfile to 0 if index < 0', function() {
				$scope.slideHasChanged(-2);

				expect($scope.activeProfile).toEqual(0);
			});

			it('should change activeProfile to 3 if index > 3', function() {
				$scope.slideHasChanged(5);

				expect($scope.activeProfile).toEqual(3);
			});
		});
	});
});
