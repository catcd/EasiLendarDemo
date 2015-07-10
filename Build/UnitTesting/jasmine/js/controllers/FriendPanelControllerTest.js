/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 24/04/2015
 * type: friend panel controller
 * number of tests: 21
 */

/** Test for:
  * FriendPanelController
  * Filter
  */

describe('Friend Panel', function() {
	var $controller, $rootScope, $scope, $filter, $ionicScrollDelegate, $location, $ionicPopup;
	var eUser;

	beforeEach(module('MainApp.controllers.sideMenu.friendPanel'));

	var eFriend = {
		fName : '',
	};

	var eDatabase = {
		deleteF: function(id) {},
		viewProfile: function(id) {},
		getCalendar: function(id) {}
	};
	
	beforeEach(inject(function(_$rootScope_, _$controller_, _$filter_) {
		eUser = {
			uFriend : [
				{name: 'Barack Obama'}, {name: 'Kim Kardadshian'},
				{name: 'Justin Bieber'}, {name: 'Justin Timberlake'},
				{name: 'Taylor Swiff'}, {name: 'Karty Perry'},
				{name: 'Harry Potter'}, {name: 'Emma Stone'},
				{name: 'Dungk58'}, {name: '#dung@'}
			]
		};

		$rootScope = _$rootScope_;
		$controller = _$controller_;
		$filter = _$filter_;
		$scope = $rootScope.$new();

		$rootScope = {
			goToState: function(stateName){}
		};

		$location = {
			hash : function(pos){}
		};

		$ionicScrollDelegate = {
			anchorScroll : function(boolean){}
		};

		$controller('friendPanelController', {
			'$rootScope' : $rootScope, 
			'$scope': $scope,
			'$ionicScrollDelegate' : $ionicScrollDelegate,
			'$location' : $location,
			'$ionicPopup' : $ionicPopup,
			'eUser' : eUser,
			'eFriend' : eFriend,
			'eDatabase': eDatabase
			}
		);
	}));

	describe('Initialize data', function(){
		it('should create search input is ""', function(){
			expect($scope.searchFriend).toBe("");
		});

		/*xit('should create a cache to save last list of friends', function(){
			expect($scope.cacheFriend).toEqual(eUser.uFriend);
		});*/

		it('should create a eFriend.fName is ""', function(){
			expect(eFriend.fName).toBe("");
		});

		it('should create a mShow variable is false', function(){
			expect($scope.mShow).toBe(false);
		});
	});

	describe('Some basic functions', function(){
		/*xdescribe('Refresh List', function(){
			it('should return list of friends like before using sort function', function(){
				var sortedList = [
					{name: '#dung@'}, {name: 'Barack Obama'},
					{name: 'Dungk58'}, {name: 'Emma Stone'}, 
					{name: 'Harry Potter'}, {name: 'Justin Bieber'},
					{name: 'Justin Timberlake'}, {name: 'Karty Perry'},
					{name: 'Kim Kardadshian'}, {name: 'Taylor Swiff'}
				];

				var prevList = angular.copy(eUser.uFriend);
				$scope.sort('AZ');
				expect(eUser.uFriend).toEqual(sortedList);

				$scope.refreshList();
				expect(eUser.uFriend).toEqual(prevList);
			});
		});*/

		describe('viewProfile', function(){
			it('should call viewProfile function in DataBase.js', function(){
				spyOn(eDatabase, 'viewProfile');
				$scope.viewProfile(eUser.uFriend[0]);
				expect(eDatabase.viewProfile).toHaveBeenCalled();
			});
		});

		describe('appointMeeting', function(){
			it('should call getCalendar and goToState function in DataBase.js', function(){
				spyOn(eDatabase, 'getCalendar');
				$scope.appointMeeting(eUser.uFriend[0]);
				expect(eDatabase.getCalendar).toHaveBeenCalled();
				spyOn($rootScope, 'goToState');
				$scope.appointMeeting(eUser.uFriend[0]);
				expect($rootScope.goToState).toHaveBeenCalled();
			});
		});

		describe('gotoTop', function(){
			it('should call hash and anchorScroll function of $location', function(){
				spyOn($location, 'hash');
				$rootScope.gotoTop();
				expect($location.hash).toHaveBeenCalled();
				spyOn($ionicScrollDelegate, 'anchorScroll');
				$rootScope.gotoTop();
				expect($ionicScrollDelegate.anchorScroll).toHaveBeenCalled();
			});
		})
	});
	
	describe('Sort Friend', function() {
		it('should sort list of friends by name from A to Z', function() {
			var sortedList = [
				{name: '#dung@'}, {name: 'Barack Obama'},
				{name: 'Dungk58'}, {name: 'Emma Stone'}, 
				{name: 'Harry Potter'}, {name: 'Justin Bieber'},
				{name: 'Justin Timberlake'}, {name: 'Karty Perry'},
				{name: 'Kim Kardadshian'}, {name: 'Taylor Swiff'}
			];

			$scope.sort('AZ');
			expect(eUser.uFriend).toEqual(sortedList);
		});

		it('should sort list of friend by number of viewing times in descending order', function(){
			var list = [
				{name: 'Barack Obama', viewTime: 35000}, {name: 'Kim Kardadshian', viewTime: 27000},
				{name: 'Justin Bieber', viewTime: 20000}, {name: 'Justin Timberlake', viewTime: 25000}
			];
			var sortedList = [
				{name: 'Barack Obama', viewTime: 35000}, {name: 'Kim Kardadshian', viewTime: 27000},
				{name: 'Justin Timberlake', viewTime: 25000}, {name: 'Justin Bieber', viewTime: 20000},
			];

			var term = angular.copy(eUser.uFriend);
			eUser.uFriend = list;
			$scope.sort('viewTime');
			expect(eUser.uFriend).toEqual(sortedList);

			eUser.uFriend = angular.copy(term);
		});

		it('should sort list of friend by the most rescently date', function(){
			var list = [
				{name: 'Barack Obama', dateTime: new Date(2015,3,24,8,30,0,0,0)}, {name: 'Kim Kardadshian', dateTime: new Date(2015,3,23,21,30,0,0,0)},
				{name: 'Justin Bieber', dateTime: new Date(2015,1,2,8,30,0,0,0)}, {name: 'Justin Timberlake', dateTime: new Date(2015,3,24,12,30,0,0,0)}
			];
			var sortedList = [
				{name: 'Justin Timberlake', dateTime: new Date(2015,3,24,12,30,0,0,0)}, {name: 'Barack Obama', dateTime: new Date(2015,3,24,8,30,0,0,0)},
				{name: 'Kim Kardadshian', dateTime: new Date(2015,3,23,21,30,0,0,0)}, {name: 'Justin Bieber', dateTime: new Date(2015,1,2,8,30,0,0,0)},
			];

			var term = angular.copy(eUser.uFriend);
			eUser.uFriend = list;
			$scope.sort('dateTime');
			expect(eUser.uFriend).toEqual(sortedList);

			eUser.uFriend = angular.copy(term);
		});
	});

	describe('Search Friend', function(){
		it('should return length of result array is 0 when can not find friend', function(){
			var array = $filter('findingFriend');
			expect(array(eUser.uFriend,'Google').length).toEqual(0);
		});

		it('should return length of result array 1 when have one person that need to be found in list', function(){
			var array = $filter('findingFriend');
			expect(array(eUser.uFriend,'Barack Obama').length).toEqual(1);
		});

		it('should return all friends when does not input any thing into search text', function(){
			var array = $filter('findingFriend');
			expect(array(eUser.uFriend,'').length).toEqual(eUser.uFriend.length);
		});

		it('should return list has Barack Obama, Emma Stone, Harry Potter, Justin TimeberLake... when input "a" letter', function(){
			var array = $filter('findingFriend');
			var result = [
						{name: 'Barack Obama'}, {name: 'Kim Kardadshian'}, 
						{name: 'Justin Timberlake'}, {name: 'Taylor Swiff'}, 
						{name: 'Karty Perry'}, {name: 'Harry Potter'},
						{name: 'Emma Stone'}
						];
			expect(array(eUser.uFriend,'a')).toEqual(result);
		});

		it('should return list has Justin Timberlake and Justin Bieber when input "us" or "ber"', function(){
			var array = $filter('findingFriend');
			var result = [
						{name: 'Justin Bieber'},
						{name: 'Justin Timberlake'}
						];
			expect(array(eUser.uFriend,'us')).toEqual(result);
			expect(array(eUser.uFriend,'ber')).toEqual(result);
		});

		it('should return list has Justin Timberlake and Justin Bieber when input "   us" or "   ber"', function(){
			var array = $filter('findingFriend');
			var result = [
						{name: 'Justin Bieber'},
						{name: 'Justin Timberlake'}
						];
			expect(array(eUser.uFriend,'  ')).toEqual([]);
			expect(array(eUser.uFriend,'us')).toEqual(result);
			expect(array(eUser.uFriend,'  ')).toEqual([]);
			expect(array(eUser.uFriend,'ber')).toEqual(result);
		});

		it('should return length of result array is 0 when only input spaces', function(){
			var array = $filter('findingFriend');
			expect(array(eUser.uFriend,'   ').length).toEqual(0);
		});

		it('should return list has Dungk58 when input "8"', function(){
			var array = $filter('findingFriend');
			expect(array(eUser.uFriend,'8')).toEqual([{name: 'Dungk58'}]);
		});

		it('should return list has #dung@ when input "#@" then return empty list when input "*"', function(){
			var array = $filter('findingFriend');
			expect(array(eUser.uFriend,'#')).toEqual([{name: '#dung@'}]);
			expect(array(eUser.uFriend,'@')).toEqual([{name: '#dung@'}]);
			expect(array(eUser.uFriend,'*')).toEqual([]);
		});

		it('should return empty list when input "123" then return full friends in list when delete "123"', function(){
			var array = $filter('findingFriend');
			var result =  [
				{name: 'Barack Obama'}, {name: 'Kim Kardadshian'},
				{name: 'Justin Bieber'}, {name: 'Justin Timberlake'},
				{name: 'Taylor Swiff'}, {name: 'Karty Perry'},
				{name: 'Harry Potter'}, {name: 'Emma Stone'},
				{name: 'Dungk58'}, {name: '#dung@'}
			];
			expect(array(eUser.uFriend,'123')).toEqual([]);
			expect(array(eUser.uFriend,'12')).toEqual([]);
			expect(array(eUser.uFriend,'1')).toEqual([]);
			expect(array(eUser.uFriend,'')).toEqual(result);
		});
	})
});