/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 12/05/2015
 * type: friend panel controller
 */

angular.module('MainApp.controllers.sideMenu.friendPanel', [])

.controller('friendPanelController', function($scope, $rootScope, $location, $ionicScrollDelegate, $ionicPopup, eUser, eFriend, eDatabase) {
	//Using eUser, eFriend, eDatebase factory
	$scope.eUser = eUser;
	$scope.eFriend = eFriend;
	$scope.eDatabase = eDatabase;

	$scope.searchFriend = '';
	$scope.mShow = false;

	//$scope.cacheFriend = angular.copy($scope.eUser.uFriend);

	//refresh list as before sorting
	/*$scope.refreshList = function() {
		$scope.eUser.uFriend = angular.copy($scope.cacheFriend);
	}*/

	$scope.deleteFriend = function(friend) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Are you sure ?'
		});

		confirmPopup.then(function(res) {
			if(res) {
				$scope.eDatabase.deleteF(friend.id);
				$scope.cacheFriend = angular.copy($scope.eUser.uFriend);
			}
		});
	};

	$scope.appointMeeting = function(friend) {
		$scope.eFriend.fName = friend.name;
		$scope.eDatabase.getCalendar(friend.id);
		$rootScope.goToState('searchFilter');
	};

	$scope.viewProfile = function(friend) {
		$scope.eDatabase.viewProfile(friend.id);
	};

	//auto scroll to top of panel
	$rootScope.gotoTop = function() {
		// set the location.hash to the id of
		// the element you wish to scroll to.
		$location.hash('friend-top');
		$ionicScrollDelegate.anchorScroll(true);
	};
	
	//sorting is based on name
	var sortAZ = function(array) {
		array.sort(function(obj1,obj2){
			return $scope.eUser.uFriend[obj1].name.localeCompare($scope.eUser.uFriend[obj2].name);
		});

		var sortedArray = [];
		angular.forEach(array, function(id){
			sortedArray.push($scope.eUser.uFriend[id]);
		});

		$scope.eUser.uFriend = angular.copy(sortedArray);
	};
	
	var sortViewTime = function(array){
		array.sort(function(obj1,obj2){
			return (
				$scope.eUser.uFriend[obj2].viewTime - $scope.eUser.uFriend[obj1].viewTime
			);
		});

		var sortedArray = [];
		angular.forEach(array, function(id){
			sortedArray.push($scope.eUser.uFriend[id]);
		});

		$scope.eUser.uFriend = angular.copy(sortedArray);
	};

	var sortDateTime = function(array){
		array.sort(function(obj1,obj2){
			return (
				$scope.eUser.uFriend[obj2].dateTime - $scope.eUser.uFriend[obj1].dateTime
			);
		});

		var sortedArray = [];
		angular.forEach(array, function(id){
			sortedArray.push($scope.eUser.uFriend[id]);
		});

		$scope.eUser.uFriend = angular.copy(sortedArray);
	};

	$scope.sort = function(typeSort) {
		var arrF = [];
		for(var x in $scope.eUser.uFriend){
			arrF.push(x);
		}

		if (typeSort == 'AZ') {
			//only sort by name
			sortAZ(arrF);
		}

		if(typeSort == 'viewTime') {
			//sort by number of viewing times in descending order
			sortViewTime(arrF);
		}

		if(typeSort == 'dateTime') {
			//sort by the most recently date
			sortDateTime(arrF);
		}
	};
})

.directive('slideToggleFunc', function($document) {
	return {
		restrict: 'E',
		link: function(scope) {
			scope.visible = { index: false, value: false};
			scope.toggleFunc = function() {
				scope.visible.value = !scope.visible.value;
			};
			$document.bind('click', function() {
				if(scope.visible.index === true){
					scope.visible.index = false;
					scope.visible.value = false;
				}

				if(scope.visible.value === true){
					scope.visible.index = true;
				}

				scope.$apply();
			});
		}
	};
})

.directive('opacitySearchInput', function() {
	return {
		restrict: 'A',
		link: function(scope, element) {
			var parent = element.parent().parent();
			parent.addClass('friend-search-input-blur');
			element.bind('focus', function() {
				parent.removeClass('friend-search-input-blur');
				parent.addClass('friend-search-input-focus');
			});
			element.bind('blur', function() {
				parent.addClass('friend-search-input-blur');
			});
		}
	};
})

.directive('sortOption', function() {
	return {
		restrict: 'A',
		scope: {
			isVisible: '='
		},
		link: function(scope, element) {
			scope.$watch('isVisible', function() {
				var parent = element.parent().parent();
				var listFriend = parent.next().next().children().children().next().next();
				if (scope.isVisible === true) {
					listFriend.addClass('friend-blur-list');
				} else {
					listFriend.removeClass('friend-blur-list');
				}
			});
		}
	};
})

//filter friends list
.filter('findingFriend',function(){
	//items = friends array
	return function(items, searchFriend){
		if(!searchFriend){
			return items;
		}
		var results = [];
		angular.forEach(items, function(item){
			if(item.name.toLowerCase().indexOf(searchFriend.toLowerCase()) > -1){
				results.push(item);
			}
		});

		return results;
	};
});