/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 25/04/2015
 * type: popover controller unit test
 * test: 28
 */

describe('Popover controller for notification test', function() {
	var $controller, $rootScope, $scope;
	var $ionicPopover, $ionicActionSheet, eDatabase;

	beforeEach(module('MainApp.controllers.popover'));

	var $ionicPopover = {
		fromTemplate: function(input, object) {
			return {
				show: function($event) {},
				hide: function() {},
				remove: function() {},
			};
		},
		fromTemplateUrl: function() {
			return {
				then: function(object) {}
			};
		},
	};

	var $ionicActionSheet = {
		show: function (object) {},
	};

	var eDatabase = {
		rejectF: function (id) {},
		viewProfile: function (id) {},
		addFriend: function (id) {},
	};

	// execuse before each it
	beforeEach(inject(function(_$rootScope_, _$controller_) {
		$rootScope = _$rootScope_;
		$controller = _$controller_;
		$scope = $rootScope.$new();

		$controller('PopOverController', {
			'$rootScope': $rootScope,
			'$scope': $scope,
			'$ionicPopover': $ionicPopover,
			'$ionicActionSheet': $ionicActionSheet,
			'eDatabase': eDatabase,
		});
	}));

	describe('Initialize popover', function() {
		it('$scope.friendPopover should be created', function() {
			var popover = $scope.friendPopover;

			expect(popover).toBeDefined();
		});

		it('$scope.friendPopover show should be defined', function() {
			var popover = $scope.friendPopover;

			expect(popover.show).toBeDefined();
		});

		it('$scope.friendPopover hide should be defined', function() {
			var popover = $scope.friendPopover;

			expect(popover.hide).toBeDefined();
		});

		it('$scope.friendPopover remove should be defined', function() {
			var popover = $scope.friendPopover;

			expect(popover.remove).toBeDefined();
		});
	});

	describe('Popover function', function() {
		it('$scope.openPopover should call show', function() {
			var popover = $scope.friendPopover;
			// create spy
			spyOn(popover, 'show');

			// function
			$scope.openPopover();

			//test
			expect(popover.show).toHaveBeenCalled();
		});

		it('$scope.closePopover should call hide', function() {
			var popover = $scope.friendPopover;
			// create spy
			spyOn(popover, 'hide');

			// function
			$scope.closePopover();

			//test
			expect(popover.hide).toHaveBeenCalled();
		});
	});

	describe('Initialize noti data', function() {
		it('should define popup status', function() {
			var status = $scope.mPopoverStatus;

			expect(status).toBeDefined();
		});

		it('status[true] and status[false] must be correct', function() {
			var status = $scope.mPopoverStatus;

			expect(status[true]).toEqual("active");
			expect(status[false]).toEqual("");
		});

		it('should define friendTabClass', function() {
			var ftclass = $scope.friendTabClass;

			expect(ftclass).toBeDefined();
		});

		it('ftclass[true] and ftclass[false] must be correct', function() {
			var ftclass = $scope.friendTabClass;

			expect(ftclass[true]).toEqual("margin-top-69");
			expect(ftclass[false]).toEqual("margin-top-0");
		});

		it('should define popover active as defalt equal to ""', function() {
			var active = $scope.mPopoverActive;

			expect(active).toBeDefined();
			expect(active).toEqual("");
		});
	});

	describe('tabActive function test', function() {
		it('should be able to change to friend tab', function() {
			var tab = "friend";

			// active
			$scope.tabActive(tab);

			var active = $scope.mPopoverActive;
			expect(active).toEqual("friend");
		});

		it('should be able to change to request tab', function() {
			var tab = "request";

			// active
			$scope.tabActive(tab);

			var active = $scope.mPopoverActive;
			expect(active).toEqual("request");
		});

		it('should be able to change to respond tab', function() {
			var tab = "respond";

			// active
			$scope.tabActive(tab);

			var active = $scope.mPopoverActive;
			expect(active).toEqual("respond");
		});

		it('should not be able to change to xxx tab', function() {
			var tab = "respond";
			$scope.tabActive(tab);

			var tab = "xxx";

			// active
			$scope.tabActive(tab);

			var active = $scope.mPopoverActive;
			expect(active).toEqual("respond");
		});

		it('should not be able to change to empty tab', function() {
			var tab = "respond";
			$scope.tabActive(tab);

			var tab = "";

			// active
			$scope.tabActive(tab);

			var active = $scope.mPopoverActive;
			expect(active).toEqual("respond");
		});
	});

	describe('nextRightNoti function test', function() {
		it('should change to friend if current tab is empty or invalid', function() {
			$scope.mPopoverActive = "";

			$scope.nextRightNoti();
			var active = $scope.mPopoverActive;

			// test
			expect(active).toEqual("friend");
		});

		it('should change to request if current tab is friend', function() {
			$scope.tabActive("friend");

			$scope.nextRightNoti();
			var active = $scope.mPopoverActive;

			// test
			expect(active).toEqual("request");
		});

		it('should change to respond if current tab is request', function() {
			$scope.tabActive("request");

			$scope.nextRightNoti();
			var active = $scope.mPopoverActive;

			// test
			expect(active).toEqual("respond");
		});

		it('should change to friend if current tab is respond', function() {
			$scope.tabActive("respond");

			$scope.nextRightNoti();
			var active = $scope.mPopoverActive;

			// test
			expect(active).toEqual("friend");
		});
	});

	describe('nextLeftNoti function test', function() {
		it('should change to friend if current tab is empty or invalid', function() {
			$scope.mPopoverActive = "";

			$scope.nextLeftNoti();
			var active = $scope.mPopoverActive;

			// test
			expect(active).toEqual("friend");
		});

		it('should change to respond if current tab is friend', function() {
			$scope.tabActive("friend");

			$scope.nextLeftNoti();
			var active = $scope.mPopoverActive;

			// test
			expect(active).toEqual("respond");
		});

		it('should change to friend if current tab is request', function() {
			$scope.tabActive("request");

			$scope.nextLeftNoti();
			var active = $scope.mPopoverActive;

			// test
			expect(active).toEqual("friend");
		});

		it('should change to request if current tab is respond', function() {
			$scope.tabActive("respond");

			$scope.nextLeftNoti();
			var active = $scope.mPopoverActive;

			// test
			expect(active).toEqual("request");
		});
	});

	describe('Action Sheet function test', function() {
		it('$scope.friendAction should call $ionicActionSheet.show', function() {
			spyOn($ionicActionSheet, 'show');
			var friend = {name: 'Cat Can', id: "catdz95"};

			$scope.friendAction(friend);

			// test
			expect($ionicActionSheet.show).toHaveBeenCalled();
		});

		it('$scope.friendAction should call $ionicActionSheet.show with an object', function() {
			spyOn($ionicActionSheet, 'show');
			var friend = {name: 'Cat Can', id: 'catdz95'};

			$scope.friendAction(friend);

			// test
			expect($ionicActionSheet.show).toHaveBeenCalledWith(jasmine.any(Object));
		});

		it('$scope.requestAction should call $ionicActionSheet.show', function() {
			spyOn($ionicActionSheet, 'show');
			var friend = {name: 'Cat Can', id: "catdz95"};

			$scope.requestAction(friend);

			// test
			expect($ionicActionSheet.show).toHaveBeenCalled();
		});

		it('$scope.requestAction should call $ionicActionSheet.show with an object', function() {
			spyOn($ionicActionSheet, 'show');
			var friend = {name: 'Cat Can', id: 'catdz95'};

			$scope.requestAction(friend);

			// test
			expect($ionicActionSheet.show).toHaveBeenCalledWith(jasmine.any(Object));
		});
	});
});
