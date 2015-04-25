/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 25/04/2015
 * type: Search controller unit test
 * test: 36
 */

describe('Search', function() {
	var $controller, $rootScope, $scope;
	var eToast, eDatabase, eUser, eCheckFriend;

	// fake data
	var isFriendFake; // Boolean
	var isRequestedFake; // Boolean

	// inject module
	beforeEach(module('MainApp.controllers.search'));

	// fake services
	var eToast = {
		toastSuccess: function(msg, time) {},
	};

	var eDatabase = {
		searchFriend: function(input) {},
		searchEvent: function(input) {},
		request: function(id) {},
		viewProfile: function(id) {},
	};

	var eUser = {
		uID: "",
	};

	var eCheckFriend = {
		isFriend: function(id) {
			return isFriendFake;
		},
		isRequested: function(id) {
			return isRequestedFake;
		},
	};

	// execuse before each it
	beforeEach(inject(function(_$rootScope_, _$controller_) {
		$rootScope = _$rootScope_;
		$controller = _$controller_;
		$scope = $rootScope.$new();

		$controller('SearchController', {
			'$rootScope': $rootScope,
			'$scope': $scope,
			'eToast': eToast,
			'eDatabase': eDatabase,
			'eUser': eUser,
			'eCheckFriend': eCheckFriend,
		});
	}));

	describe('Initialize search data', function() {
		it('should create search INPUT var', function() {
			var searchInput = $scope.searchInput;

			expect(searchInput).toBeDefined();
		});
		it('should create search OUTPUT', function() {
			var friendOutput = $rootScope.searchFriends;
			var eventsOutput = $rootScope.searchEvents;

			expect(friendOutput).toBeDefined();
			expect(eventsOutput).toBeDefined();
		});
		it('should create default searchType is "All"', function() {
			var searchType = $rootScope.searchType.type;

			expect(searchType).toEqual("All");
		});
	});

	describe('Test reset data function', function() {
		it('Reset data should be work', function() {
			// Change data
			$scope.searchInput = "abc";
			$rootScope.searchFriends = ["friend1", "friend2"];
			$rootScope.searchEvents = ["event1", "event2"];
			$rootScope.searchType.type = "People";

			// reset data
			$scope.resetData();

			// test
			expect($scope.searchInput).toEqual("");
			expect($rootScope.searchFriends).toEqual([]);
			expect($rootScope.searchEvents).toEqual([]);
			expect($rootScope.searchType.type).toEqual("All");
		});

		it('Reset data should be work even if the data type is gone wrong', function() {
			// Change data
			$scope.searchInput = true;
			$rootScope.searchFriends = 123;
			$rootScope.searchEvents = false;
			$rootScope.searchType.type = -5;

			// reset data
			$scope.resetData();

			// test
			expect($scope.searchInput).toEqual("");
			expect($rootScope.searchFriends).toEqual([]);
			expect($rootScope.searchEvents).toEqual([]);
			expect($rootScope.searchType.type).toEqual("All");
		});

		it('Reset data should be work even if there is nothing change', function() {
			// reset data
			$scope.resetData();

			// test
			expect($scope.searchInput).toEqual("");
			expect($rootScope.searchFriends).toEqual([]);
			expect($rootScope.searchEvents).toEqual([]);
			expect($rootScope.searchType.type).toEqual("All");
		});
	});

	describe('Test search function', function() {
		it('Should call searchFriend when searchType.type == All', function() {
			spyOn(eDatabase, 'searchFriend');

			// Change data
			$rootScope.searchType.type = "All";
			$scope.searchInput = "Cat";

			// search
			$scope.search();

			// test
			expect(eDatabase.searchFriend).toHaveBeenCalled();
			expect(eDatabase.searchFriend).toHaveBeenCalledWith("Cat");
		});

		it('Should call searchEvent when searchType.type == All', function() {
			spyOn(eDatabase, 'searchEvent');

			// Change data
			$rootScope.searchType.type = "All";
			$scope.searchInput = "Cat";

			// search
			$scope.search();

			// test
			expect(eDatabase.searchEvent).toHaveBeenCalled();
			expect(eDatabase.searchEvent).toHaveBeenCalledWith("Cat");
		});

		it('Should call searchFriend when searchType.type == People', function() {
			spyOn(eDatabase, 'searchFriend');

			// Change data
			$rootScope.searchType.type = "People";
			$scope.searchInput = "Cat";

			// search
			$scope.search();

			// test
			expect(eDatabase.searchFriend).toHaveBeenCalled();
			expect(eDatabase.searchFriend).toHaveBeenCalledWith("Cat");
		});

		it('Should not call searchEvent when searchType.type == People', function() {
			spyOn(eDatabase, 'searchEvent');

			// Change data
			$rootScope.searchType.type = "People";
			$scope.searchInput = "Cat";

			// search
			$scope.search();

			// test
			expect(eDatabase.searchEvent).not.toHaveBeenCalled();
		});

		it('Should call searchEvent when searchType.type == Events', function() {
			spyOn(eDatabase, 'searchEvent');

			// Change data
			$rootScope.searchType.type = "Events";
			$scope.searchInput = "Cat";

			// search
			$scope.search();

			// test
			expect(eDatabase.searchEvent).toHaveBeenCalled();
			expect(eDatabase.searchEvent).toHaveBeenCalledWith("Cat");
		});

		it('Should not call searchFriend when searchType.type == Events', function() {
			spyOn(eDatabase, 'searchFriend');

			// Change data
			$rootScope.searchType.type = "Event";
			$scope.searchInput = "Cat";

			// search
			$scope.search();

			// test
			expect(eDatabase.searchFriend).not.toHaveBeenCalled();
		});
	});

	describe('Test addPerson function', function() {
		it('Should call eDatabase.request when addPerson', function() {
			spyOn(eDatabase, 'request');

			// addPerson
			$scope.addPerson("catdz95");

			// test
			expect(eDatabase.request).toHaveBeenCalled();
			expect(eDatabase.request).toHaveBeenCalledWith("catdz95");
		});

		it('Should call eToast.toastSuccess when addPerson', function() {
			spyOn(eToast, 'toastSuccess');

			// addPerson
			$scope.addPerson("catdz95");

			// test
			expect(eToast.toastSuccess).toHaveBeenCalled();
			expect(eToast.toastSuccess).toHaveBeenCalledWith('Sending request.', 2000);
		});
	});

	describe('Test viewPerson function', function() {
		it('Should call eDatabase.viewProfile when viewPerson', function() {
			spyOn(eDatabase, 'viewProfile');

			// viewPerson
			$scope.viewPerson("catdz95");

			// test
			expect(eDatabase.viewProfile).toHaveBeenCalled();
			expect(eDatabase.viewProfile).toHaveBeenCalledWith("catdz95");
		});

		it('Should call eToast.toastSuccess when viewPerson', function() {
			spyOn(eToast, 'toastSuccess');

			// viewPerson
			$scope.viewPerson("catdz95");

			// test
			expect(eToast.toastSuccess).toHaveBeenCalled();
			expect(eToast.toastSuccess).toHaveBeenCalledWith('Please wait a moment!', 1500);
		});
	});

	describe('$scope.isHide', function() {
		it('Should be true if ID === eUser.uID', function() {
			// construct data
			var ID = "easilendar1";
			eUser.uID = "easilendar1";

			// check
			var check = $scope.isHide(ID);

			//test
			expect(check).toBe(true);
		});

		it('Should be true if isFriend(ID) is true', function() {
			// construct data
			var ID = "easilendar1";
			isFriendFake = true;

			// check
			var check = $scope.isHide(ID);

			//test
			expect(check).toBe(true);
		});

		it('Should be true if isRequested(ID) is true', function() {
			// construct data
			var ID = "easilendar1";
			isRequestedFake = true;

			// check
			var check = $scope.isHide(ID);

			//test
			expect(check).toBe(true);
		});

		it('Should be false if ID != eUser.uID and isFriend(ID) is false and isRequested(ID) is false', function() {
			// construct data
			var ID = "easilendar1";
			eUser.uID = "easilendar2";
			isFriendFake = false;
			isRequestedFake = false;

			// check
			var check = $scope.isHide(ID);

			//test
			expect(check).toBe(false);
		});
	});

	describe('$scope.isEmptyResult', function() {
		describe('$scope.isEmptyResult not empty', function() {
			it('searchType = All and searchFriends.length != 0 and searchEvents.length != 0', function() {
				$rootScope.searchFriends = ["friend1", "friend2"];
				$rootScope.searchEvents = ["event1", "event2"];
				$rootScope.searchType.type = "All";

				var check = $scope.isEmptyResult();

				expect(check).toBe(false);
			});

			it('searchType = All and searchFriends.length != 0 and searchEvents.length == 0', function() {
				$rootScope.searchFriends = ["friend1", "friend2"];
				$rootScope.searchEvents = [];
				$rootScope.searchType.type = "All";

				var check = $scope.isEmptyResult();

				expect(check).toBe(false);
			});

			it('searchType = All and searchFriends.length == 0 and searchEvents.length != 0', function() {
				$rootScope.searchFriends = [];
				$rootScope.searchEvents = ["event1", "event2"];
				$rootScope.searchType.type = "All";

				var check = $scope.isEmptyResult();

				expect(check).toBe(false);
			});

			it('searchType = People and searchFriends.length != 0 and searchEvents.length == 0', function() {
				$rootScope.searchFriends = ["friend1", "friend2"];
				$rootScope.searchEvents = [];
				$rootScope.searchType.type = "People";

				var check = $scope.isEmptyResult();

				expect(check).toBe(false);
			});

			it('searchType = Events and searchFriends.length == 0 and searchEvents.length != 0', function() {
				$rootScope.searchFriends = [];
				$rootScope.searchEvents = ["event1", "event2"];
				$rootScope.searchType.type = "Events";

				var check = $scope.isEmptyResult();

				expect(check).toBe(false);
			});
			afterEach(function() {
				$scope.resetData();
			});
		});

		describe('$scope.isEmptyResult empty', function() {
			it('searchType = All and searchFriends.length == 0 and searchEvents.length == 0', function() {
				$rootScope.searchFriends = [];
				$rootScope.searchEvents = [];
				$rootScope.searchType.type = "All";

				var check = $scope.isEmptyResult();

				expect(check).toBe(true);
			});

			it('searchType = People and searchFriends.length == 0 and searchEvents.length == 0', function() {
				$rootScope.searchFriends = [];
				$rootScope.searchEvents = [];
				$rootScope.searchType.type = "People";

				var check = $scope.isEmptyResult();

				expect(check).toBe(true);
			});

			it('searchType = People and searchFriends.length == 0 and searchEvents.length != 0', function() {
				$rootScope.searchFriends = [];
				$rootScope.searchEvents = ["event1", "event2"];
				$rootScope.searchType.type = "People";

				var check = $scope.isEmptyResult();

				expect(check).toBe(true);
			});

			it('searchType = Events and searchFriends.length == 0 and searchEvents.length == 0', function() {
				$rootScope.searchFriends = [];
				$rootScope.searchEvents = [];
				$rootScope.searchType.type = "All";

				var check = $scope.isEmptyResult();

				expect(check).toBe(true);
			});

			it('searchType = Events and searchFriends.length != 0  and searchEvents.length == 0', function() {
				$rootScope.searchFriends = ["friend1", "friend2"];
				$rootScope.searchEvents = [];
				$rootScope.searchType.type = "Events";

				var check = $scope.isEmptyResult();

				expect(check).toBe(true);
			});

			afterEach(function() {
				$scope.resetData();
			});
		});
	});

	describe('$scope.isShowPeople', function() {
		describe('$scope.isShowPeople not show', function() {
			it('searchType = Events', function() {
				$rootScope.searchType.type = "Events";

				var check = $scope.isShowPeople();

				expect(check).toBe(false);
			});

			afterEach(function() {
				$scope.resetData();
			});
		});

		describe('$scope.isShowPeople show', function() {
			it('searchType = All', function() {
				$rootScope.searchType.type = "All";

				var check = $scope.isShowPeople();

				expect(check).toBe(true);
			});

			it('searchType = People', function() {
				$rootScope.searchType.type = "People";

				var check = $scope.isShowPeople();

				expect(check).toBe(true);
			});

			afterEach(function() {
				$scope.resetData();
			});
		});
	});

	describe('$scope.isShowEvents', function() {
		describe('$scope.isShowEvents not show', function() {
			it('searchType = People', function() {
				$rootScope.searchType.type = "People";

				var check = $scope.isShowEvents();

				expect(check).toBe(false);
			});

			afterEach(function() {
				$scope.resetData();
			});
		});

		describe('$scope.isShowEvents show', function() {
			it('searchType = All', function() {
				$rootScope.searchType.type = "All";

				var check = $scope.isShowEvents();

				expect(check).toBe(true);
			});

			it('searchType = Events', function() {
				$rootScope.searchType.type = "Events";

				var check = $scope.isShowEvents();

				expect(check).toBe(true);
			});

			afterEach(function() {
				$scope.resetData();
			});
		});
	});
});
