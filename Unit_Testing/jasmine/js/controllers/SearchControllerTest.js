/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 18/04/2015
 * type: Search controller unit test
 * test: 25
 */

describe('Search', function() {
	beforeEach(module('MainApp.controllers.search'));
	var $controller, $rootScope, $scope;

	beforeEach(inject(function($injector) {
		$rootScope = $injector.get('$rootScope');
		$controller = $injector.get('$controller');
		$scope = $rootScope.$new();

		$controller('SearchController', {
			'$rootScope': $rootScope,
			'$scope': $scope
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

	it('Reset data should be work even if there is nothing change', function() {
		// reset data
		$scope.resetData();

		// test
		expect($scope.searchInput).toEqual("");
		expect($rootScope.searchFriends).toEqual([]);
		expect($rootScope.searchEvents).toEqual([]);
		expect($rootScope.searchType.type).toEqual("All");
	});

	xdescribe('$scope.isHide', function() {
		beforeEach(function(){
			$rootScope.eUser.uID = 'easilendar1';
			$rootScope.eUser.uFriend["easilendar2"] = {id: 'easilendar2', VIP: 'true', ava: 0};
			$rootScope.eUser.uRequested["easilendar3"] = {id: 'easilendar3', VIP: 'true', ava: 0};
		});

		it('ID == easilendar1 should be true', function() {
			var ID = "easilendar1"
			var check = $scope.isHide(ID);

			expect(check).toBe(true);
		});

		it('ID == easilendar2 should be true', function() {
			var ID = "easilendar2"
			var check = $scope.isHide(ID);

			expect(check).toBe(true);
		});

		it('ID == easilendar3 should be true', function() {
			var ID = "easilendar3"
			var check = $scope.isHide(ID);

			expect(check).toBe(true);
		});

		it('ID == easilendar4 should be false', function() {
			var ID = "easilendar4"
			var check = $scope.isHide(ID);

			expect(check).toBe(true);
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
			afterEach(function(){
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

			afterEach(function(){
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

			afterEach(function(){
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

			afterEach(function(){
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

			afterEach(function(){
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

			afterEach(function(){
				$scope.resetData();
			});
		});
	});
});
