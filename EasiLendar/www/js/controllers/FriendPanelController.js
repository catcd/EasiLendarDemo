/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 8/4/2015
 * type: friend panel controller
 */

angular.module('MainApp.controllers.sideMenu.friendPanel', [])

.controller('friendPanelController', function($scope, $rootScope, $location, $ionicScrollDelegate, $ionicPopup) {
	$scope.searchFriend = '';
	$scope.mShow = false;

	var cacheFriend = angular.copy($rootScope.eUser.uFriend);

	$scope.deleteFriend = function(friend) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Are you sure ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				$rootScope.deleteF(friend.id);
				cacheFriend = angular.copy($rootScope.eUser.uFriend);
			}
		});
	}

	$scope.appointMeeting = function(friend) {
		$rootScope.eFriend.fName = friend.name;
		$rootScope.getCalendar(friend.id);
		$rootScope.goToState('searchFilter');
	}

	$scope.viewProfile = function(friend) {
		$rootScope.viewProfile(friend.id);
	}

	//auto scroll to top of panel
	$rootScope.gotoTop = function() {
		// set the location.hash to the id of
		// the element you wish to scroll to.
		$location.hash('top');
		$ionicScrollDelegate.anchorScroll(true);
	};

	//check: Did we sort friend list?
	var checkSortAZ = false;
	
	//sorting is based on name
	var sortAZ = function(array) {
		//array is sorted by name
		checkSortAZ = true;
		array.sort(function(obj1,obj2){
			return $rootScope.eUser.uFriend[obj2].name.localeCompare([obj1].name);
		})

		var sortedArray = [];
		angular.forEach(array, function(id){
			sortedArray.push($rootScope.eUser.uFriend[id]);
		})

		$rootScope.eUser.uFriend = angular.copy(sortedArray);
		//console.log($rootScope.eUser.uFriend);
	}
	
	$scope.sort = function(typeSort) {
		if (typeSort == 'AZ') {
			//only sort by name
			var arrF = [];
			for(var x in $rootScope.eUser.uFriend){
				arrF.push(x);
			}

			sortAZ(arrF);
		}
	}
	//refresh list as before sorting
	$scope.refreshList = function() {
		checkSortAZ = false;
		$rootScope.eUser.uFriend = angular.copy(cacheFriend);
	}

})
.directive('togglefriend', function($document) {
	return {
		restrict: 'E',
		link: function(scope, element, attr, $index) {
			scope.visible = false;
			scope.toggleFunc = function() {
				scope.visible = !scope.visible;
			};
			$document.bind('click', function(event) {
				var isClickedElement = element.find(event.target).length > 0;
				if (isClickedElement) return;
				scope.visible = false;
				scope.$apply();
			});
		}
	};
})

.directive('slideToggleFriend', function() {
	return {
		restrict: 'A',
		scope: {
			isOpen: "=slideToggleFriend"
		},
		link: function(scope, element, attr) {
			element.hide();
			scope.$watch('isOpen', function(newVal, oldVal) {
				if (newVal !== oldVal) {
					element.stop().slideToggle(200);
				}
			});
		}
	};
})

.directive('opacitySearchInput', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.parent().parent().addClass('search-friend-input-blur');
			element.bind('focus', function() {
				element.parent().parent().removeClass('search-friend-input-blur');
				element.parent().parent().addClass('search-friend-input-focus');
			});
			element.bind('blur', function() {
				element.parent().parent().addClass('search-friend-input-blur');
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
		link: function(scope, element, attr) {
			scope.$watch('isVisible', function() {
				var listFriend = element.parent().parent().next().next().children().children().next().next();
				if (scope.isVisible == true) {
					listFriend.addClass('blur-list-friend');
				} else {
					listFriend.removeClass('blur-list-friend');
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
})