/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 15/07/2015
 * type: friend panel controller
 */

angular.module('MainApp.controllers.sideMenu.friendPanel', [])

.controller('friendPanelController',
	function($scope, $rootScope, $location, $ionicScrollDelegate,
	$ionicPopup, eUser, eFriend, eDatabase) {
	//Using eUser, eFriend, eDatebase factory
	$scope.eUser = eUser;
	$scope.eFriend = eFriend;
	$scope.eDatabase = eDatabase;

	$scope.searchFriend = '';
	$scope.mShow = false;

	$scope.deleteFriend = function(friend) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Are you sure ?'
		});

		confirmPopup.then(function(res) {
			if(res) {
				$scope.eDatabase.deleteF(friend.id);
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

//filter friends list
.filter('findingFriend',function(){
	//items = friends array
	return function(items, searchFriend){
		if(!searchFriend){
			return items;
		}
		var results = [];
		searchFriend = searchFriend.toLowerCase();
		angular.forEach(items, function(item){
			if (item.name.toLowerCase().indexOf(searchFriend) > -1){
				results.push(item);
			}
		});

		return results;
	};
});